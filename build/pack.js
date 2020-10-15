const Npmpub = require('@peiyou/npmpub');
const fs = require('fs');
const path = require('path')
const {getPackages} = require('./dir-config')
const exec = require('child_process').exec

const DEFAULT_MANIFEST = 'package.json';
const npmpub = new Npmpub();
const registry = process.env.NPMPUB_REGISTRY || 'https://npm.100tal.com'

async function install (package) {
  console.log(`${package}, npm install ...`)
  return new Promise((resolve, reject) => {
    exec('npm install', function (error, stdout, stderr) {
      if (error) {
        console.error(`${package} install error:`, error, stdout, stderr)
        throw new Error(error)
        reject(error)
      } else {
        console.log(`${package} install success.`)
        resolve()
      }
    })
  })
}

async function runLib (package) {
  return new Promise(async (resolve, reject) => {
    console.log(`${package} run pack...`)
    exec('npm run pack', function (error, stdout, stderr) {
      if (error) {
        console.error(`${package} pack error:`, error, stdout, stderr)
        throw new Error(error)
        reject(error)
      } else {
        console.log(`${package} pack success.`)
        resolve()
      }
    })
  })
}

async function getPackConfig (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw new Error(err)
        reject(err)
      } else {
        const jsondata = JSON.parse(data)
        resolve(jsondata)
      }
    });
  })
}

async function singleTask (package) {
  console.log(`当前目录: ${process.cwd()}`);
  try {
    process.chdir(package)
    console.log(`切换目录: ${process.cwd()}`);
  } catch (e) {
    console.error('切换失败', e);
    process.exit(1);
  }
  await install(package)
  await runLib(package)
}

async function start () {
  console.log('Task Start...')
  const packages = getPackages()
  for (const package of packages) {
    const packJson = await getPackConfig(path.resolve(package, DEFAULT_MANIFEST))
    console.log('package:', package)
    const checkVersion = await npmpub.checkVersion(packJson.name, packJson.version, registry).catch(e => {
      throw new Error(e)
    })
    if (checkVersion) {
      await singleTask(package).catch(e => {
        throw new Error(e)
      })
    } else {
      console.error(`${package}, <= remote.version, ignored the tasks of install and lib.`)
    }
  }
}

start().catch(e => {
  console.error(e)
  process.exit(1);
})
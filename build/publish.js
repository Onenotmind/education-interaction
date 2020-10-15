const Npmpub = require('@peiyou/npmpub');
const { getPackages } = require('./dir-config')

function getEnvInfo() {
  return {
    username: process.env.NPMPUB_USERNAME,
    password: process.env.NPMPUB_PASSWORD,
    registry: process.env.NPMPUB_REGISTRY
  };
}

async function singlePub(npmpub, dir) {
  console.log(`start publish: ${dir}`);
  const ret = await npmpub.tryPub(dir).catch((e) => {
    console.error('try to publish Error', e)
    process.exit(1);
  });
  let msg = '';
  if (ret.code === 0) {
    msg = 'success published.';
  } else if (ret.code === 1) {
    msg = '<= remote.version, ignored.';
  }
  console.log(`${ret.name}@${ret.version} ${msg}`);
}

async function main() {
  const { username, password, registry } = getEnvInfo();
  const npmpub = new Npmpub();
  await npmpub.login(username, password, registry);
  const dirs = getPackages()
  for (const dir of dirs) {
    singlePub(npmpub, dir);
  }
}

try {
  main();
} catch (err) {
  process.exit(1);
}

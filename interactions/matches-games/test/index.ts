import {App,InitStep, moduleManager, bridgeManager, PhaserCEBridge } from '@peiyou/app-manager';
import { UnderstandTest } from './understand-test';

App.init({
  bridges: [
    new PhaserCEBridge({
      gameConfig: {
        width: 1920,
        height: 1080,
        parent: "rootphaserce"
      },
    })
  ],
  firstModule: null,
  loadElement: "#loading",
  preloads: [],    //预加载资源
  onInited: function():void {
    let understandtest = new UnderstandTest();
    understandtest.start();
  }
});
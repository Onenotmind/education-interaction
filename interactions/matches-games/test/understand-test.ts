import { moduleManager, core, resourceManager } from '@peiyou/app-manager';
import { UnderstandPopup, Stage } from '../src';
import S = PIXI.GroupD8.S;

export class UnderstandTest{
  async start(){
    resourceManager.path.setRoot('interaction-assets/')
    await moduleManager.open(UnderstandPopup);
    setTimeout(() => {
      core.dispatch(Stage.Start, this.mockCreateData());
    }, 100);
    
    setTimeout(() => {
      core.dispatch(Stage.Sync, this.mockSyncData());
    }, 10000);

    setTimeout(() => {
      core.dispatch(Stage.Rank, this.mockRankData());
    }, 16000);
  }

  mockCreateData(){
    let commonStartContent = {
      content:{
        time: 10000,
      }
    }
    return commonStartContent
  }

  mockRankData(){
    let rankContent = {
      content: {
        badge: {
          currentLevel: 1,
          currentLevelRate: 0.85,
          lastLevel: 1,
          lastLevelRate: 0.55,
          tips: '继续加油哦',
          levelType: 'bigLevel'
        },
        answerStuNum: 10,
        isNewReward: false
      }
    }
    return rankContent
  }

  mockSyncData(){
    let syncContent = {
      content: {
        actualStuNum: 10,
        stuAnswerInfos: [
          {
            stuid: '111',
            stuName: '张三',
            stuImg: '',
          },
          {
            stuid: '222',
            stuName: '李四',
            stuImg: '',
          }
        ]
      }
    }
    return syncContent
  }
}

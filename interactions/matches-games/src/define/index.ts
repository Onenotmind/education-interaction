interface StuAnswerInfos {
  stuid: string,
  stuName: string,
  stuImg: string
}

export enum Stage {
  Start = 'understand-start',
  Sync = 'understand-sync',
  Rank = 'understand-rank'
}
export interface Create {
  content: {
    time: number // 单位ms
  }
}

export interface Sync {
  content: {
    actualStuNum: number
    stuAnswerInfos: StuAnswerInfos[]
  }
}

export interface Rank {
  content: {
    badge: {
      currentLevel: number,
      currentLevelRate: number,
      lastLevel: number,
      lastLevelRate: number,
      tips: string,
      levelType: number
    },
    answerStuNum: number,
    isNewReward: boolean
  }
}
import { MediatorClass, core, PopupBase } from '@peiyou/app-manager';
import { InteractionDescription, ProgressBar, Tips, RightTips, Badge, helper, Audio, Title, getBackground } from '@peiyou/interaction-common-component'
import { Create, Rank, Sync, Stage } from '../define'

@MediatorClass("UnderstandPopup")
class UnderstandPopup extends PopupBase {
  private EVENT_FINISH = 'finish'
  private bg = null
  private countdown = null
  private choiceTip = null
  private progressBar: any = null
  private description = null

  constructor () {
    super()
    this.bg = getBackground()
    core.listen(Stage.Start, this.show.bind(this))
    core.listen(Stage.Sync, this.sync.bind(this))
    core.listen(Stage.Rank, this.rank.bind(this))
    this.preloadAssets()
  }

  async preloadAssets () {
    const preloadConfig = {
      dragonbone: [{ key: 'badge', i18n: true }, 'badge_down'],
      image: ['defaultPortrait']
    }
    super.preloadAssets(preloadConfig, 'common')
  }

  public async show (data: Create) {
    this.bg.show('small')
    const { content: { time } } = data
    this.createComponent(Audio, {})
    this.progressBar = await this.createComponent(ProgressBar, { progressType: ProgressBar.progressType.participation })
    this.choiceTip = await this.createComponent(Tips, { interaction: 'true_or_false', displayTipsTime: 5000 })
    await this.createComponent(Title, { titleText: 'understand' })
    this.description = await this.createComponent(InteractionDescription, {
      title: '刚刚老师讲的内容听懂了吗?',
      subTitle: { value: '请如实提交，对错结果不会影响段位', style: { fill: '#ffffff' } }
    })
    this.countdown = await this.createComponent(RightTips, {
      countDown: time * 1000
    })
  }

  public sync (data: Sync) {
    const opt = {
      progressName: ProgressBar.progressName.participation,
      needBubble: true
    }
    if (this.progressBar) {
      this.progressBar.updateProgress(opt, data.content)
    }
  }

  public async rank (data: Rank) {
    const { content: { badge: badgeData = {}, isNewReward } } = data
    const { content: { answerStuNum } } = data
    const param = { participationCount: answerStuNum }
    this.destoryComponent([this.choiceTip, this.description, this.countdown])
    const badge = await this.createComponent(Badge, {})
    // 2.0播放徽章动画，3.0不调用能量槽
    if (!isNewReward) {
      await helper.playProgressBadgeAni(this.progressBar, badge, badgeData, param)
    }
  }
}

export { UnderstandPopup }

/**
 * Created by Naver on 2017. 8. 2..
 */
export default class Animation {
  constructor() {
    this.FADE_OUT_TRANSITION_TIME = '1s';
    this.FADE_IN_TRANSITION_TIME = '1.5s';
    this.OPACITY_TRANSPARENCY = 0;
    this.OPACITY_UNTRANSPARENCY = 1;
    this.DELETE_TIMEING_MILLI = 900;
    this.SHOW_TIMEING_MILLI = 100;
  }

  fadeOut(toDelete) {
    const toFadeOut = toDelete;
    toFadeOut.style.transition = this.FADE_OUT_TRANSITION_TIME;
    toFadeOut.style.opacity = this.OPACITY_TRANSPARENCY;
    setTimeout(() => {
      toDelete.remove();
    }, this.DELETE_TIMEING_MILLI);
  }

  fadeIn(toInsert) {
    const toFadeIn = toInsert;
    toFadeIn.style.transition = '0s';
    toFadeIn.style.opacity = this.OPACITY_TRANSPARENCY;
    setTimeout(() => {
      toFadeIn.style.transition = this.FADE_IN_TRANSITION_TIME;
      toFadeIn.style.opacity = this.OPACITY_UNTRANSPARENCY;
    }, this.SHOW_TIMEING_MILLI);
  }
}

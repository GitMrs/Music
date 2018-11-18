<template>
  <div class="player" v-show="playList.length > 0">
    <transition 
      name="full"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="full-screen" v-show='fullScreen'>
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back" @click='back'>
          <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="adClass" >
              <img class="image" :src="currentSong.image">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">11</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l" v-html="_format(this.currentTime)" ></span>
          <div class="progress-bar-wrapper">
            <progress-bar :precent="precent"  @percenChange="percenChange" />
          </div>
          <span class="time time-r" v-html="_format(currentSong.duration)"></span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="iconMode" @click="changeModel" ></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i  class="icon-prev" @click="prevPlay"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlay" ></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i  class="icon-next" @click="nextPlay"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite" ></i>
          </div>
        </div>
      </div>
    </div>  
    </transition>
    <transition name='min'>
      <div class="min-screen" v-show='!fullScreen'>
       <div class="icon" @click="full">
          <img class="play" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"  ></h2>
          <p class="desc" v-html="currentSong.singer" ></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="precent">
            <i :class="miniIcon" class="icon-mini" @click.stop="togglePlay"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
    </div>  
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error='error' @timeupdate="updataTime"></audio>
  </div>    
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import {playMode} from '../../common/js/config'
import animations from "create-keyframe-animation";
import { prefixStyle } from "../../common/js/dom";
import ProgressBar from '../../base/progress-bar';
import ProgressCircle from '../../base/progress-circle'
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  data(){
    return {
      songReady: false,
      currentTime:0,
      radius: 32
    }
  },
  computed: {
    adClass() {
      return this.playing ? "play" : "pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    disableCls(){
      return this.songReady ? "" : "disable"
    },
    precent(){
      return this.currentTime / this.currentSong.duration;
    },
    iconMode(){
      console.log(this.playMode)
      return this.playMode === playMode.sequence ? 'icon-sequence' : this.playMode === playMode.loop ? 
      'icon-loop' : 'icon-random'
    },
    miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    ...mapGetters(["fullScreen", "playList", "currentSong", "playing","currentIndex","playMode"])
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    full() {
      this.setFullScreen(true);
    },
    togglePlay() {
      this.setPlayState(!this.playing);
    },
    nextPlay(){
      if(!this.songReady) return
      let index = this.currentIndex + 1;
      if(index === this.playList.length){
        index = 0
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.togglePlay()
      }
      this.songReady = false
    },
    prevPlay(){
      if(!this.songReady) return
      let index = this.currentIndex - 1;
      if(index === -1){
        let index = this.playList.length - 1;
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.togglePlay()
      }
      this.songReady = false
    },
    ready(){
      this.songReady = true;
    },
    error(){
      this.songReady = true;
    },
    updataTime(e){
      this.currentTime = e.target.currentTime
    },
    percenChange(percent){
      this.$refs.audio.currentTime = this.currentSong.duration * percent
      if(!this.playing){
        this.togglePlay()
      }
    },
    changeModel(){
      const mode = (this.playMode + 1) % 3;
      console.log(this.playMode)
      this.setPlayMode(mode)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    _format(interval){
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60) 
      return `${minute}:${second}`
    },
    _pad(num, n=2){
      let len = num.toString().length
      while(len <  n){
        num = '0' + num
        len ++
      }
      return num
    },
    showPlaylist() {},
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode:"SET_PLAY_MODE"
    })
  },
  created() {
    console.log(this.playList);
    console.log(this.currentSong);
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  components:{
    ProgressBar,
    ProgressCircle
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.player {
  .full-screen {
    position fixed;
    left 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: $color-highlight-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      height: 40px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .play {
            animation: rotate 20s linear infinite;
          }
          .pause {
            animation-play-state: paused;
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;
        }

        i {
          font-size: 40px;
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.full-enter-active, &.full-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.full-enter, &.full-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .min-screen {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    tranfrom: rotate(0);
  }

  100% {
    tranfrom: rotate(360deg);
  }
}
</style>

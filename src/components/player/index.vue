<template>
  <div class="player" v-show="playList.length > 0">
    <div class="full-screen" v-show='fullScreen'>
      <div class="background">
        <img width="100%" height="100%" :src='this.playList[this.currentIndex].image'>
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{this.playList[this.currentIndex].name}}</h1>
        <h2 class="subtitle">{{this.playList[this.currentIndex].album}}</h2>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" >
              <img class="image" >
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
          <span class="time time-l"></span>
          <div class="progress-bar-wrapper">
          </div>
          <span class="time time-r"></span>
        </div>
        <div class="operators">
          <div class="icon i-left" >
            <i ></i>
          </div>
          <div class="icon i-left">
            <i  class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i ></i>
          </div>
          <div class="icon i-right" >
            <i  class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon" ></i>
          </div>
        </div>
      </div>
    </div>  
    <div class="min-screen" v-show='!fullScreen'></div>  
  </div>    
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["fullScreen", "playList","currentIndex"])
  },
  created(){
    console.log(this.playList[this.currentIndex])
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.player {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;

  .full-screen {
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

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
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

      &.normal-enter-active, &.normal-leave-active {
        transition: all 0.4s;

        .top, .bottom {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }

      &.normal-enter, &.normal-leave-to {
        opacity: 0;

        .top {
          transform: translate3d(0, -100px, 0);
        }

        .bottom {
          transform: translate3d(0, 100px, 0);
        }
      }
    }
  }

  .min-screen {
    position: fixed;
    height: 60px;
    width: 100%;
    bottom: 0;
    background: $color-dialog-background;
  }
}
</style>
<template>
  <div class="progress-bar" @click="changeTime"  ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper" ref="progressBtn" 
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd"
        >
          <div class="progress-btn"></div>
        </div>
    </div>  
  </div>  
</template>
<script>
const BAR_WIDTH = 16;
import {prefixStyle} from '../../common/js/dom';
const transform = prefixStyle('transform');
export default {
  props:{
    precent:{
      type:Number,
      default:0
    }
  },
  created(){
    this.touch = {}
  },
  methods:{
    progressTouchStart(e){
      this.touch.initied = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e){
      if(!this.touch.initied){
        return
      }
      const deltax = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - BAR_WIDTH, Math.max(0,this.touch.left + deltax));
      this._offset(offsetWidth)
    },
    progressTouchEnd(){
      this.touch.initied = false
      this._triggerPercent()
    },
    changeTime(e){
      this._offset(e.offsetX)
      this._triggerPercent()
    },
    _offset(width){
      this.$refs.progress.style.width = width + "px";
      this.$refs.progressBtn.style[transform] = `translate3d(${width}px,0,0)`
    },
    _triggerPercent(){
      const BarWidth = this.$refs.progressBar.clientWidth - BAR_WIDTH;
      const precent = this.$refs.progress.clientWidth / BarWidth
      this.$emit('percenChange',precent)
    }
  },
  watch:{
    precent(newVal){
      if(newVal >= 0 && !this.touch.initied){
        const BarWidth = this.$refs.progressBar.clientWidth - BAR_WIDTH;
        const offsetWidth = BarWidth  * newVal;  
        this._offset(offsetWidth)  
      }       
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0,0,0,0.3)

    .progress
      height 100%
      width 0%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme

</style>

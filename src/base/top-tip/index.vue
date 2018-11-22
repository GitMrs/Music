<template>
  <transition class="drap">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>  
    </div>  
  </transition>
</template>
<script>
export default {
  props:{
    delay:{
      type:Number,
      default:2000
    }
  },
  data(){
    return {
      showFlag:false
    }
  },
  methods:{
    show(){
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      },this.delay)
    },
    hide(){
      this.showFlag = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.top-tip
  position fixed
  top 0
  width 100%
  z-index 500
  background  $color-dialog-background
  &.drap-enter-active, &.drap-leave-active
    transition all 0.3s
  &.drap-enter, &.drap-leave-to
    transform translate3d(0,-100%,0)
</style>

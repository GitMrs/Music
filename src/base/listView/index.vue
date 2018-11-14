<template>
  <Scroll ref="listView" :data='data' class="list-view">
    <ul>
      <li v-for="(groud,index) in data" :key="index" ref='listGroup'>
        <h3 class="title-mark">{{groud.title}}</h3>
        <ol>
          <li v-for="(item,_index) in groud.items" :key="_index">
            <img :src="item.avatar" class="avatar" :alt="index" >
            <b>{{item.name}}</b>
          </li>
        </ol>
      </li>
    </ul>
    <div class="shortcut" @touchstart.stop.prevent='onShortcutTouchStart'>
      <ul class="shortcut-wrap">
        <li v-for="(item,index) in shortcutList" :key="index" :data-index='index'>{{item}}</li>
      </ul>
    </div>
  </Scroll>    
</template>
<script>
import Scroll from '../scroll';
import {getData} from '../../common/js/dom'
export default {
  name:'listView',
  props:{
    data:{
      type:Array,
      deafult:[]
    }
  },
  methods:{
    onShortcutTouchStart(e){
      let index = getData(e.target, 'index')
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  components:{
    Scroll
  },
  computed:{
    shortcutList(){
      return this.data.map(ground => {
        return ground.title.substr(0,1)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.list-view
  height 100%
  overflow hidden
  position relative
  padding 10px
  ul
    li
      margin-top 10px
      .title-mark
        line-height 34px
        color $color-text-ll
      ol
        li
          overflow hidden
          img 
            width 50px
            display inline-block
            float left
            margin-right 10px
            border-radius 100%
          b
            display inline-block
            line-height 50px
  .shortcut
    position absolute
    right 0
    top 50%
    transform translate3d(0,-55%,0)
    z-index 99999
    .shortcut-wrap
      width 10%
      border-radius 10px
      li
        line-height 12px
        text-align center 
        font-size 12px
        margin-top 0
        width 28px
        background rgba(0,0,0,0.1)
        height 24px
       
</style>

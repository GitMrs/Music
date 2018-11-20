<template>
  <Scroll ref="listView" :data='data' class="list-view" :probeType='probeType' :listenScroll='listenScroll' @scroll='scroll'>
    <ul>
      <li v-for="(groud,index) in data" :key="index" ref='listGroup'>
        <h3 class="title-mark">{{groud.title}}</h3>
        <ol>
          <li @click='selectItem(item)' v-for="(item,_index) in groud.items" :key="_index">
            <img :src="item.avatar" class="avatar" :alt="index" >
            <b>{{item.name}}</b>
          </li>
        </ol>
      </li>
    </ul>
    <div class="shortcut" @touchstart.stop.prevent='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
      <ul class="shortcut-wrap">
        <li v-for="(item,index) in shortcutList" :key="index" :data-index='index' :class="{'current': currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref='fixed'>
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <Loading v-show='!data.length' />
  </Scroll>    
</template>
<script>
import Scroll from "../scroll";
import Loading from '../loading'
import { getData } from "../../common/js/dom";
import {playlistMixin} from '../../common/js/mixin';
const ANCHOR_HEIGHT = 24;
const TITLE_HEIGHT = 34
export default {
  name: "listView",
  mixins:[playlistMixin],
  props: {
    data: {
      type: Array,
      deafult: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff:1
    };
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.probeType = 2
    this.listHeight = [];
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this.scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this.scrollTo(anchorIndex);
    },
    scrollTo(_index) {
      if(!_index && _index !== 0){
        return
      }else if(_index < 0){
        _index =0
      }else if(_index > this.listHeight.length -2){
        _index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[_index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[_index], 0);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    handlePlaylist(){
      // const bottom = playlist.length > 0 ? "60px" : "";
    
      // this.$refs.musicWrap.$el.style.bottom = bottom
      // this.$refs.musicWrap.refresh()
    },
    _calulateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectItem(item){
      this.$emit('selectId',item)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calulateHeight();
      }, 20);
    },
    scrollY(newY){
      const listHeight = this.listHeight;
      //当滚动到顶部
      if(newY > 0){
        this.currentIndex = 0
      }
      //在中间部分滚z
      for(let i = 0;i<listHeight.length - 1;i++){
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if(-newY >= height1 && -newY < height2){
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      //当滚动到底部 切newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal){
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if(this.fixedTop === fixedTop) return
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3D(0,${this.fixedTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.data.map(ground => {
        return ground.title.substr(0, 1);
      });
    },
    fixedTitle(){
      if(this.scrollY > 0){
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.list-view {
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: 10px;

  ul {

    li {
      margin-top: 10px;

      .title-mark {
        line-height: 34px;
        color: $color-text-ll;
        background $color-dialog-background
        padding-left 10px
      }

      ol {
        li {
          overflow: hidden;

          img {
            width: 50px;
            display: inline-block;
            float: left;
            margin-right: 10px;
            border-radius: 100%;
          }

          b {
            display: inline-block;
            line-height: 50px;
          }
        }
      }
    }
  }

  .shortcut {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(0, -55%, 0);
    z-index: 99999;

    .shortcut-wrap {
      width: 10%;
      border-radius: 10px;

      li {
        line-height: 24px;
        text-align: center;
        font-size: 12px;
        margin-top: 0;
        width: 28px;
        background: rgba(0, 0, 0, 0.1);
        height: 24px;
        color $color-text-ll
      }
      .current{
        color $color-theme  
      }
    }
  }
  .list-fixed{
    position absolute;
    top 0;
    left 0;
    width 100%
    box-sizing border-box
    padding 0 10px
    .fixed-title{
      color $color-text-l
      line-height 34px
      background $color-dialog-background  
      padding-left 10px
    }  
  }
}
</style>

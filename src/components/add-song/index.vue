<template>
  <transition name="slide">
    <div class="add-song" @click.stop v-show="flagShow">
      <div class="header">
        <h3 class="title">添加歌曲</h3>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-wrap">
        <search @query="onQueryChange" placeholder="搜索歌曲" />
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @changeSwitch="changeSwitch" />
        <div class="list-wrap">
          <scroll ref="songList" v-if="currentIndex===0" class="list-scroll" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @selectSong="addSong"></song-list>
            </div>
          </scroll>
          <scroll ref="searchList" v-if="currentIndex===1" class="list-scroll" :data="historyList">
            <div class="list-inner">
              <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="historyList" @deleteItem="deleteHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" @selectHistory="saveSearch" @listScroll="blurInput" />
      </div>
      <TopTip ref="TopTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到列表中</span>
        </div>
      </TopTip>
    </div>
  </transition>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import Search from '../../base/search-box';
import Suggest from '../suggest';
import Switches from '../../base/switches';
import SearchList from '../../base/search-list';
import SongList from '../../base/song-list';
import Scroll from '../../base/scroll';
import TopTip from '../../base/top-tip';
import {searchMixin} from '../../common/js/mixin';
import { setTimeout } from 'timers';
export default {
  data(){
    return {
      flagShow:false,
      query:"",
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ],
      currentIndex:0
    }
  },
  mixins:[searchMixin],
  computed:{
    ...mapGetters(['historyList','playHistory'])
  },
  methods:{
    show(){
      this.flagShow = true
      setTimeout(() => {
        if(this.currentIndex === 0){
          this.$refs.songList.refresh()
        }else{
          this.$refs.searchList.refresh()
        }
      },200)
    },
    hide(){
      this.flagShow = false
    },
    searchVal(val){
      this.query = val
    },
    changeSwitch(index){
      this.currentIndex = index 
    },
    addSong(item){
      if(item.index !== 0){
        this.insertSong(item.song)
        this.showTip()
      }
    },
    showTip(){
      this.$refs.TopTip.show()
    },
    ...mapActions(['insertSong','deleteHistory'])
  },
  components:{
    Search,
    Suggest,
    Switches,
    Scroll,
    SearchList,
    SongList,
    TopTip
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';
.add-song
  position fixed
  z-index 6
  width 100%
  bottom 0
  top 0
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%,0,0)
  .header
    height 45px
    position relative
    text-align center
    .title
      line-height 45px
      font-size $font-size-large
      color $color-text
    .close
      position absolute
      right 0px
      top 0px
      .icon-close
        display: block
        padding: 12px
        font-size: 18px
        color: $color-theme
  .search-wrap
    margin 20px
  .shortcut
    .list-wrap
      position: absolute
      top: 165px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 0px 30px
  .search-result
    position: fixed
    top: 124px
    bottom: 0
    width: 100%
  .tip-title
    text-align: center
    padding: 18px 0
    font-size: 0
    .icon-ok
      font-size: $font-size-medium
      color: $color-theme
      margin-right: 4px
    .text
      font-size: $font-size-medium
      color: $color-text
</style>

<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrap">
        <switches :switches="switches" :currentIndex='currentIndex' @changeSwitch="changeSwitch" />
      </div>
      <div class="play-btn">
        <i class="icon-play"></i>
        <span class="text" @click="play" >随机播放全部</span>
      </div>
      <div class="list-wrap" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @selectSong="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @selectSong="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import Switches from '../../base/switches';
import Scroll from '../../base/scroll';
import SongList from '../../base/song-list';
import NoResult from '../../base/no-result';
import {playlistMixin} from '../../common/js/mixin';
export default {
  mixins:[playlistMixin],
  data(){
    return {
      switches:[
        {
          name:'我喜欢列表'
        },
        {
          name:"最近听列表"
        }
      ],
      currentIndex:0
    }
  },
  computed:{
    noResult(){
      if(this.currentIndex === 0){
        return !this.favoriteList.length
      }else{
        return !this.playHistory.length
      }
    },
    noResultDesc(){
      if(this.favoriteList.length === 0){
        return '暂无收藏歌曲'
      }else{
        return '你还没有听过歌曲'
      }
    },
    ...mapGetters(['favoriteList','playHistory'])
  },
  created(){
    this.$favoriteList
  },
  methods:{  
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    back(){
      this.$router.back()
    },
    changeSwitch(index){
      this.currentIndex = index
    },
    selectSong(item){
      this.insertSong(item.song)
    },
    play(){
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      if(list.length === 0){
        return
      }
      this.randomPlay({
        list
      })
    },
    ...mapActions(['insertSong','randomPlay'])
  },
  components:{
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.user-center
  position fixed
  bottom 0
  top 0
  width 100%
  z-index 100
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%,0,0)
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    height 45px
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .switches-wrap
    margin: 10px 0 30px 0
  .play-btn
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid  $color-text-l
    color: $color-text-l
    border-radius: 100px
    font-size: 0
    .icon-play
      display: inline-block
      vertical-align: middle
      margin-right: 6px
      font-size: $font-size-medium-x
    .text
      display: inline-block
      vertical-align: middle
      font-size: $font-size-small
  .list-wrap
    position: absolute
    top: 110px
    bottom: 0
    width: 100%
    .list-scroll
      height: 100%
      overflow: hidden
      .list-inner
        padding: 5px 30px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>

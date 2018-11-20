<template>
  <div class="music-list">
    <div class="Header" ref='Header'>
      <b @click="back" class="icon-back"></b>
      <h3>{{title}}</h3>
    </div>
    <div class="music-bg" :style="bgStyle" ref="bgWrap">
      <button class="random" @click="randomFn">随机播放</button>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll class="music-wrap" :data="songs" ref="musicWrap" :probe-type='probeType' @scroll="scroll" :listen-scroll='listenScroll'>
      <div class="list-wrap">
        <song-list @selectSong="selectSong" :songs="songs" :rank="rank" />
        <!-- <rank-list v-else-if="pathName === 'Rank'" @selectSong="selectSong" :songs="songs" ></rank-list> -->
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from "../../base/scroll";
import SongList from "../../base/song-list";
import RankList from '../../base/rank-list';
import {prefixStyle} from '../../common/js/dom';
import { mapActions } from "vuex";
import {playlistMixin} from "../../common/js/mixin"
const RESERVED_HEIGHT = 40;
const transform = prefixStyle('transform')
export default {
  name: "music",
  mixins:[playlistMixin],
  props: {
    bgImage: {
      type: String,
      defaulf: ""
    },
    songs: {
      type: Array,
      defaulf: []
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      defaulf: ""
    },
    rank: {
      type:Boolean,
      defaulf:false
    }
  },
  data() {
    return {
      scrollY: 0,
      imageHeight: 0,
      minTransalteY: 0
    };
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.pathName = this.$router.history.current.matched[0].name;
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back() {
     this.$router.back()
    },
    randomFn(){
      this.randomPlay({
        list:this.songs
      })
    },
    selectSong(item) {
      console.log(item)
      this.selectPlay({
        list: this.songs,
        index: item.index
      });
    },
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.musicWrap.$el.style.bottom = bottom
      this.$refs.musicWrap.refresh()
    },
    ...mapActions(["selectPlay","randomPlay"])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTransalteY, newY);
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      let opcity = newY / this.minTransalteY;
      let parent = Math.abs(newY / this.imageHeight);
      let scale = 1;
      if (opcity < 1) {
        scale += parent;
      } else {
        scale;
      }
      if (newY == 0) {
        this.$refs.Header.style.background = `rgba(34,34,34,0)`;
      } else if (newY < 0) {
        this.$refs.Header.style.background = `rgba(34,34,34,${opcity})`;
      }
      this.$refs.bgWrap.style["transform"] = `scale(${scale})`;
    }
  },
  components: {
    Scroll,
    SongList,
    RankList
  },
  mounted() {
    this.imageHeight = this.$refs.bgWrap.clientHeight;
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.musicWrap.$el.style.top = `${this.imageHeight}px`;
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.music-list {
  height: 100%;
  width: 100%;

  .music-bg {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .random{
      position absolute
      left 50%
      transform translate3d(-50%,0,0)
      bottom 10px
      border 1px solid $color-theme;
      color $color-theme;
      background transparent;
      line-height 33px;
      padding 0 10px;
      border-radius 5px;
    }
  }

  .Header {
    line-height: 40px;
    position: absolute;
    height: 40px;
    width: 100%;
    z-index: 10000;
    top: 0;
  }

  b {
    position: absolute;
    left: 10px;
    top: 11px;
    font-size: $font-size-large;
  }

  h3 {
    text-align: center;
    color: #fff;
  }

  .bg-layer {
    height: 100%;
    width: 100%;
    background: $color-background;
  }

  .music-wrap {
    position: fixed;
    bottom: 0;
    // overflow hidden
  }
}
</style>

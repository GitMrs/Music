<template>
  <div class="music-list">
    <div class="Header" ref='Header'>
      <b @click="back" class="icon-back"></b>
      <h3>{{title}}</h3>
    </div>
    <div class="music-bg" :style="bgStyle" ref="bgWrap">
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll class="music-wrap" :data="songs" ref="musicWrap" :probe-type='probeType' @scroll="scroll" :listen-scroll='listenScroll'>
      <div class="list-wrap">
        <song-list v-if="pathName === 'Singer'" @selectSong="selectSong" :songs="songs" />
        <rank-list v-else-if="pathName === 'Rank'" @selectSong="selectSong" :songs="songs" ></rank-list>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from "../../base/scroll";
import SongList from "../../base/song-list";
import RankList from '../../base/rank-list';
import { mapActions } from "vuex";
const RESERVED_HEIGHT = 40;
export default {
  name: "music",
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
    console.log(this.songs)
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
      if (this.pathName === "Rank") {
        this.$router.push("/rank");
      } else if (this.pathName === "Singer") {
        this.$router.push("/singer");
      }
    },
    selectSong(item) {
      // console.log(item)
      this.selectPlay({
        list: this.songs,
        index: item.index
      });
    },
    ...mapActions(["selectPlay"])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTransalteY, newY);
      this.$refs.layer.style["transform"] = `translate3d(0,${translateY}px,0)`;
      this.$refs.layer.style[
        "-webkit-transform"
      ] = `translate3d(0,${translateY}px,0)`;
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

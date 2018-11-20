<template>
  <transition name="slide">
    <div class="distDetai">
      <MusicList :title="title" :bgImage="bgImage" :songs="song" />
    </div> 
  </transition>
</template>
<script>
import MusicList from "../music-list";
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  name: "dist-detail",
  data(){
    return {
      song:[]
    }
  },
  computed:{
    title() {
      return this.disc.name
    },
    bgImage(){
      return this.disc.pic
    },
    ...mapGetters(["disc"])
  },
  components: {
    MusicList
  },
  created() {
    this._initData()
  },
  methods:{
    _initData(){
      if(!this.disc.id){
        this.$router.go(-1)
        return
      }
      const url = `https://api.bzqll.com/music/tencent/songList?key=579621905&id=${this.disc.id}`
      axios.get(url).then(res => {
        if(res.data.code === 200){
          this.song = res.data.data.songs
        }
        console.log(res)
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.slide-enter-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.distDetai {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background: $color-background;
}
</style>

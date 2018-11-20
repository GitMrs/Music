<template>
  <div class="rank">
    <Scroll ref="scroll" :data='discData' class="rank-wrap">
      <div>
        <Swiper @loadImage='loadImage' :swiperData='SwiperData' />
        <DiscList :discData='discData' />
        <div class="loading-content">
          <Loading v-show="!discData.length" />
        </div>
      </div>
    </Scroll>
    <router-view />
  </div>
</template>
<script>
import Swiper from "../swiper";
import DiscList from "../discList";
import axios from "axios";
import Loading from '../../base/loading'
import Scroll from '../../base/scroll';
import { getRecomment } from "../../api/recommend.js";
export default {
  name: "rank",
  data() {
    return {
      SwiperData: [],
      discData: []
    };
  },
  created() {
    this.getData();
    this.getDisc();
  },
  methods: {
    getData() {
      getRecomment().then(res => {
        if (res.code == 0) {
          this.SwiperData = res.data.slider;
        }
      });
    },
    getDisc() {
      const url = "https://api.bzqll.com/music/tencent/hotSongList";
      const data = {
        key: 579621905,
        // categoryId: 10000000,
        sortId: 3,
        limit: 60
      };
      axios.get(url,{
        params:data
      }).then(res => {
        if(res.data.code == 200){
          this.discData = res.data.data
        }
      })
    },
    loadImage() {
       this.$refs.scroll.refresh()
    }
  },
  components: {
    Swiper,
    DiscList,
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus" scoped>
.rank{
  height 100%
  .rank-wrap{
    height  calc(100% - 88px) ;
    overflow hidden  
  }  
}
</style>
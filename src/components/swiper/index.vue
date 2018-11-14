<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for='(i,index) in swiperData' :key="index">
      <a :href="i.linkUrl">
          <img :src="i.picUrl" class="nendsclick"  @load="loadImage" alt="index" width="100%">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>  
</template>
<script>
export default {
  name: "carrousel",
  props: {
    swiperData: Array
  },
  data() {
    return {
      swiperOption: {
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        // loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      checkloaded:false
    };
  },
  created() {},
  methods:{
    loadImage(){
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$emit('loadImage')
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>

<template>
   <transition name='slide'>
      <div class="singerDetail">
        <MusicList :songs="song" :bgImage="bgImage" :title="title"  />
      </div>
   </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import {getSingerDetail} from '../../api/singer';
import {createSong} from '../../common/js/song';
import MusicList from '../music-list';
export default {
  data(){
    return {
      song:[]
    }
  },
  computed:{
    ...mapGetters([
      'singer'
    ]),
    title(){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    }
  },
  created(){
    this._initData()
  },
  methods:{
    _initData() {
      // console.log(typeof this.singer)
      if(!this.singer.id){
        this.$router.push('/singer')
        return 
      }
      getSingerDetail(this.singer.id).then(res => {
        if(res.code == 0){
          this.song = this._normalizeSongs(res.data.list)
          console.log(res)
        }
      })
    },
    _normalizeSongs(list){
      let res = [];
      list.forEach(item => {
        let { musicData } = item
        if(musicData.songid && musicData.albummid){
          res.push(createSong(musicData))
        }
      })
      return res
    }

  },
  components:{
    MusicList
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.slide-enter-active
  transition all 0.3s
.slide-enter,.slide-leave-to
  transform translate3d(100%,0,0)
.singerDetail
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background: $color-background;
</style>

<template>
  <transition name='slide'>
    <div class="rank-list">
      <MusicList :title="title" :bgImage="bgImage" :songs="songs" :rank="ranks" />
    </div>      
  </transition>  
</template>
<script>
import MusicList from '../music-list';
import {getRankListData} from '../../api/rank';
import {createSong} from '../../common/js/song';
import {mapGetters} from 'vuex'
export default {
  name:'rank-list',
  data(){
    return {
      name:'',
      bgImage:'',
      title:'',
      songs:[],
      ranks:true
    }
  },
  created(){
    this._getData()
    this.title = this.rank.topTitle;
    this.bgImage = this.rank.picUrl;
  },
  computed:{
    ...mapGetters(["rank"])
  },
  methods:{
    _getData(){
      if(!this.rank.id){
        return this.$router.back()
      }
      getRankListData(this.rank.id).then(res => {
        if(res.code == 0){
          this.songs = this._normalizeSong(res.songlist)
        }
      })
    },
    _normalizeSong(data){
      let res = []
      data.forEach(item => {
        let { data } = item;
        if(data.albummid && data.songid){
          res.push(createSong(data))
        }
      })
      return res
    }
  },
  components:{
    MusicList
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.slide-enter-active
  transition all 0.2s
.slide-enter, .slide-leave-to
  transform translate3d(100%,0,0)
.rank-list
  height: 100%
  width: 100%
  position: fixed
  top: 0
  background: $color-background
</style>

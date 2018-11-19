<template>
  <transition name='slide'>
    <div class="rank-list">
      <MusicList :title="title" :bgImage="bgImage" :songs="songs" />
    </div>      
  </transition>  
</template>
<script>
import MusicList from '../music-list';
import {getRankListData} from '../../api/rank';
import {mapGetters} from 'vuex'
export default {
  name:'rank-list',
  data(){
    return {
      name:'',
      bgImage:'',
      title:'',
      songs:[]
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
        return this.$router.push('/rank')
      }
      getRankListData(this.rank.id).then(res => {
        if(res.code == 0){
          this.songs = res.songlist
        }
      })
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
  z-index: 999999
  background: $color-background
</style>

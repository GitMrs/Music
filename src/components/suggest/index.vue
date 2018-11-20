<template>
  <Scroll :data='result' class="suggest" @scrollToEnd="searchMore" :pullup="pullup">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="playMusic({item,index})">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="basMore" />
    </ul>
  </Scroll>
</template>
<script>
import {searchKey} from '../../api/search';
import {filterSinger} from '../../common/js/song';
import Scroll from '../../base/scroll';
import Loading from '../../base/loading';
import axios from 'axios';
import {mapActions} from 'vuex';
const TYPE_SINGER = 'singer';
const NUM = 30;
export default {
  props:{
    query:{
      type:String,
      default:""
    },
  },
  data(){
    return {
      page:1,
      pullup:true,
      basMore:true,
      result:[]
    }
  },
  methods:{
    search(type){
      this.basMore = true
      const url = `https://api.bzqll.com/music/tencent/search?key=579621905&s=${this.query}&limit=${NUM}&offset=${this.page}`;
      axios.get(url).then(res => {
        if(res.data.code === 200){
          if(res.data.data.length < NUM){
            this.basMore = false
          }else{
             this.result = type ? this.result.concat(res.data.data) : res.data.data
          }
        }
      })
    },
    getDisplayName(item){
      return `${item.name} - ${item.singer}`
    },
    playMusic(item){
      this.selectPlay({
        list: this.result,
        index: item.index
      })
    },
    searchMore(){
      if(!this.basMore){
        return
      }
        this.page++
        this.search(1)
    },
    ...mapActions(["selectPlay"])
  },
  watch:{
    query(){
      this.search(0)
    }
  },
  components:{
    Scroll,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 0 30px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 30px
      width: 30px
      [class^="icon-"]
        font-size: 14px
        color: $color-text-d
    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>

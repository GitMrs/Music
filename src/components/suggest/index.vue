<template>
  <Scroll :data='result' class="suggest" @scrollToEnd="searchMore" :pullup="pullup" @beforeScroll="listScroll" :beforeScroll="beforeScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index" @click="playMusic(item)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="basMore" />
    </ul>
    <div v-show="!basMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </Scroll>
</template>
<script>
import Scroll from '../../base/scroll';
import Loading from '../../base/loading';
import NoResult from '../../base/no-result';
import axios from 'axios';
import {mapActions} from 'vuex';
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
      basMore:false,
      beforeScroll:true,
      result:[]
    }
  },
  methods:{
    search(type){
      if(!this.query){
        return
      }
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
      this.insertSong(item)
      this.$emit('selectHistory')
    },
    listScroll(){
      this.$emit('listScroll')
    },
    searchMore(){
      if(!this.basMore){
        return
      }
        this.page++
        this.search(1)
    },
    ...mapActions(["insertSong"])
  },
  watch:{
    query(){
      this.search(0)
    }
  },
  components:{
    Scroll,
    Loading,
    NoResult
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

<template>
  <div class="search">
    <div class="search-box-wrap">
      <Search ref="searchBox" :placeholder="placeholder" @query="queryChange" />
    </div>
    <div class="shortcut-wrap" v-show="!query" >
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.k)" v-for="(item, index) in hotKey" :key="index" class="item">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-suggest" v-show="query">
      <Suggest :query="query" />
    </div>
  </div>
</template>
<script>
import Search from "../../base/search-box";
import {getHotKey} from '../../api/search';
import Suggest from '../suggest';
export default {
  name:"search",
  data(){
    return {
      placeholder:"搜索歌手、歌曲",
      hotKey:[],
      query:""
    }
  },
  created(){
    this._initHotKet()
  },
  methods:{
    queryChange(val){
      // console.log(val)
      this.query = val
      console.log(this.query)
    },
    addQuery(val){
      this.$refs.searchBox.setQuery(val)
    },
    _initHotKet(){
      getHotKey().then(res => {
        console.log(res)
        if(res.code === 0){
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      })
    }
  },
  components:{
    Search,
    Suggest
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.search
  .search-box-wrap
     margin: 20px
  .shortcut-wrap
    .shortcut
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        ul
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
  .search-suggest
    position: fixed
    width: 100%
    top: 178px
    bottom: 0

</style>
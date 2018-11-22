<template>
  <div class="search">
    <div class="search-box-wrap">
      <Search ref="searchBox" :placeholder="placeholder" @query="onQueryChange" />
    </div>
    <div class="shortcut-wrap" v-show="!query" >
      <Scroll ref="shortcut" class="shortcut" :data="shortcut">
       <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" v-for="(item, index) in hotKey" :key="index" class="item">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show='historyList.length'>
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="deleteAll" >
              <i class="icon-clear"></i>
            </span>
            </h1>
            <search-list :searches='historyList' @clickItem="onQueryChange" @deleteItem="deleteHistory" />
          </div>
        </div>
      </Scroll>
    </div>
    <div class="search-suggest" v-show="query">
      <Suggest :query="query" @listScroll="blurInput" @selectHistory="saveSearch"/>
    </div>
    <Confirm ref="confirm" :text="confirmTitle" @sureFn="sureClear" />
  </div>
</template>
<script>
import Search from "../../base/search-box";
import {getHotKey} from '../../api/search';
import {mapActions, mapGetters} from 'vuex';
import Suggest from '../suggest';
import Confirm from '../../base/confirm';
import Scroll from '../../base/scroll';
import SearchList from '../../base/search-list';
import {searchMixin} from '../../common/js/mixin';
export default {
  name:"search",
  data(){
    return {
      placeholder:"搜索歌手、歌曲",
      hotKey:[],
      query:"",
      confirmTitle:"是否确认清空所以删除?",
      refreshDelay:20
    }
  },
  mixins:[searchMixin],
  created(){
    this._initHotKet()
  },
  methods:{
    deleteAll(){
      this.$refs.confirm.show()
    },
    sureClear(){
      this.clearHistory()
    },
    _initHotKet(){
      getHotKey().then(res => {
        if(res.code === 0){
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      })
    },
    ...mapActions(["setSearchHistory","deleteHistory","clearHistory"])
  },
  components:{
    Search,
    Suggest,
    SearchList,
    Scroll,
    Confirm
  },
  computed:{
    shortcut(){
      return this.hotKey.concat(this.historyList)
    },
    ...mapGetters(['historyList'])
  },
  watch:{
    query(newQuery){
      if(!newQuery){
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';
.search
  .search-box-wrap
     margin: 20px
  .shortcut-wrap
    position: fixed
    top: 178px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
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
      .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
  .search-suggest
    position: fixed
    width: 100%
    top: 178px
    bottom: 0

</style>
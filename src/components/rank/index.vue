<template>
  <div class="rank">
    <Scroll class="rank-wrap" :data='rankData'>
      <div>
        <dl v-for="(item, index) in rankData" :key="index" @click="goRankList(item)">
          <dd>
            <img v-lazy="item.picUrl" :alt="index" width="100px" height="100px">
          </dd>
          <dt>
            <p v-for="(song, _index) in item.songList" :key="_index">{{format(song)}}</p>
          </dt>
        </dl>
      </div>
    </Scroll>
    <Loading v-show="!rankData.length" />
    <router-view />
  </div>
</template>
<script>
import { getRankData } from "../../api/rank";
import Loading from '../../base/loading';
import Scroll from "../../base/scroll";
import {mapMutations} from 'vuex';
export default {
  name: "rank",
  data() {
    return {
      rankData: []
    };
  },
  created() {
    this._initData();
  },
  computed:{
   
  },
  methods: {
    _initData() {
      getRankData().then(res => {
        if (res.code == 0) {
          this.rankData = res.data.topList;
        }
      });
    },
     format(song){
      return `${song.songname} - ${song.singername}`
    },
    goRankList(item){
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setRank(item)
    },
    ...mapMutations({
      setRank:'SET_RANK'
    })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .rank
    height calc(100% - 88px)
    width 100%
    box-sizing border-box
    .rank-wrap
      height 100%
      width 100%
      overflow hidden
      dl
        display flex
        margin-top 10px
        overflow hidden
        dd
          // flex 2
        dt
          flex 1
          overflow hidden
          height 100px
          background: $color-highlight-background
          p
            font-size $font-size-small 
            color $color-text-l
            line-height 22px
            padding 10px 0 0 10px
            box-sizing border-box
            no-wrap()
</style>

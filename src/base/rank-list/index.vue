<template>
  <div class="rank-list">
    <ul>
      <li @click="selectItem(rank,index)" v-for="(rank,index) in songs" :key="index">
        <div class="img">
            <img src="" alt="" width="80px" height="80px">
        </div>
        <div class="content">
          <h2 class="name">{{rank.name}}</h2>
          <p class="desc">{{getDesc(rank)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    songs:{
      type:Array,
      defaulf:[]
    }
  },
  created(){
    console.log(this.songs)
  },
  methods:{
    getDesc(rank){
      return `${rank.singer} _ ${rank.album}`
    },
    selectItem(rank,index){
      this.$emit('selectrank',{rank,index})
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.rank-list
  // margin-top 10px
  padding 10px
  li
    margin 10px 0
    display flex
    .img
      // flex 2
    .content
      // background $color-text-l
      flex 1
      .name
        color $color-text-ll
        font-size $font-size-medium-x
        padding 10px 0
      .desc
        color $color-text-l
        font-size $font-size-small
</style>

<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song,index) in songs" :key="index" class="item">
        <div class="rank" v-show="rank">
           <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name ? song.name : song.songname}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
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
    },
    rank:{
      type:Boolean,
      defaulf:false
    }
  },
  methods:{
    getDesc(song){
      if(song.album){
        return `${song.singer} - ${song.album}`
      }else{
        return song.albumname
      }
    },
    selectItem(song,index){
      this.$emit('selectSong',{song,index})
    },
    getRankCls(index){
      if(index <= 2){
        return `icon icon${index}`
      }else{
        return 'text'
      }
    },
    getRankText(index){
      if(index > 2){
        return index
      }
    }
  },
  created(){
    console.log(this.songs)
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import "../../common/stylus/mixin";
.song-list
  // margin-top 10px
  padding 10px
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    font-size: $font-size-medium
    margin 10px 0
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 30px
      text-align: center
      .icon
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        color: $color-text
      .desc
        no-wrap()
        margin-top: 4px
        color: $color-text-d
</style>

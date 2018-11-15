<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song,index) in songs" :key="index">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
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
    }
  },
  methods:{
    getDesc(song){
      return `${song.singer} _ ${song.album}`
    },
    selectItem(song,index){
      this.$emit('selectSong',{song,index})
    }
  }  
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.song-list
  // margin-top 10px
  padding 10px
  li
    margin 10px 0
    .content
      // background $color-text-l
      .name
        color $color-text-ll
        font-size $font-size-medium-x
        padding 10px 0
      .desc
        color $color-text-l
        font-size $font-size-small
</style>

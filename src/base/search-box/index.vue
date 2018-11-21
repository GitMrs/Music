<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" ref="query" v-model="query" class="box" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="searchClear"></i>
  </div>
</template>
<script>
import {debounce} from '../../common/js/util';
export default {
  name:"search",
  props:{
    placeholder:{
      type:String,
      default:"搜索"
    }
  },
  data(){
    return {
      query:""
    }
  },
  created(){
    this.$watch("query",debounce((newQuery)=>{
      this.$emit('query',newQuery)
    },200))
  },
  methods:{
    searchClear(){
      this.query = ""
    },
    setQuery(val){
      this.query = val
    },
    blur(){
      this.$refs.query.blur()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background: $color-highlight-background
  border-radius: 6px
  .icon-search
    font-size 24px
    color $color-background
  .box
    flex 1
    margin 0 5px
    background: $color-highlight-background
    color: $color-text
    font-size: $font-size-medium
    &::placeholder
        color: $color-text-d
  .icon-dismiss
    font-size: 16px
    color: $color-background

</style>

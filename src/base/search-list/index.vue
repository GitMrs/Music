<template>
  <div class="search-list">
    <ul>
      <li class="search-item" v-for="(item, index) in searches" :key="index" >
        <span class="text" @click="ClickItem(item)">{{item}}</span>
        <span class="icon" @click="DeleteItem(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>  
</template>
<script>
export default {
  props:{
    searches:{
      type:Array,
      default:[]
    }
  },
  methods:{
    ClickItem(item){
      this.$emit('clickItem',item)
    },
    DeleteItem(item){
      this.$emit('deleteItem',item)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';
.search-list
  .search-item
    display flex
    align-items center
    height 40px
    overflow hidden
    .text
      flex 1
      color $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size $font-size-small
        color $color-text-d
</style>

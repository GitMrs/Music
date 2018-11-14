<template>
  <div class="dist">
    <h3 class="title">热门歌单</h3>
    <div class="dist-main">
      <dl v-for="(item,index) in discData" :key="index">
        <dd>
          <img v-lazy="item.pic" :alt="index" width="100%">
        </dd>
        <dt>
          <h3>{{item.name}}</h3>
          <b>{{item.creator}}</b>
          <time>{{item.createTime}}</time>
        </dt>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: "disc",
  props: {
    discData: Array
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.dist {
  margin-top: 1rem;

  .title {
    color: $color-theme;
    text-align: center;
  }

  .dist-main {
    overflow: hidden;

    dl {
      display: flex;
      margin: 20px;

      dd {
        flex: 2;
      }

      dt {
        flex: 8;
        padding: 10px;

        h3 {
          margin: 3px 0;
          color: $color-text-ll;
        }

        b {
          display: block;
          color: $color-text-l;
          margin: 6px 0;
        }

        time {
          color: $color-text-l;
        }
      }
    }
  }
}
</style>

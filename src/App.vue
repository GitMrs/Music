<template>
  <div id="app">
    <m-Header />
    <m-Tab />
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import MHeader from "./components/header";
import MTab from "./components/tab";
export default {
  name: "app",
  components: {
    MHeader,
    MTab
  }
};
</script>

<style lang="stylus">
@import '/common/stylus/variable';

#app {
  color: $color-theme;
  height 100%
}
</style>


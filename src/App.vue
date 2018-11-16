<template>
  <div id="app">
    <m-Header />
    <m-Tab />
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
    <!-- <Player /> -->
  </div>
</template>

<script>
import MHeader from "./components/header";
import MTab from "./components/tab";
// import Player from './components/player';
export default {
  name: "app",
  components: {
    MHeader,
    MTab,
    // Player
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


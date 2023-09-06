<template>
  <v-app id="app">
    <div>
      <TopBar />
      <BottomBar />
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import TopBar from "./components/Navigation/TopBar.vue";
import BottomBar from "./components/Navigation/BottomBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    TopBar,
    BottomBar,
  },
  data: () => ({}),
});
</script>

<style lang="scss">
@import "styles.scss";
</style>

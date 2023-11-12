<template>
  <v-app id="app">
    <div>
      <TopBar />
      <v-main class="main-class">
        <router-view />
      </v-main>
      <BottomBar />
    </div>
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

.main-class {
  margin-top: 110px; /* height of the TopBar */
  margin-bottom: 60px; /* height of the BottomBar */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

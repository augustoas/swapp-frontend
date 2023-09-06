<template>
  <div v-if="isMobile" class="bottom-tab-bar">
    <router-link to="/home" class="tab-item" active-class="active">
      <span class="tab-label">Home</span>
    </router-link>
    <router-link to="/search" class="tab-item" active-class="active">
      <i class="fas fa-search tab-icon"></i>
      <span class="tab-label">Search</span>
    </router-link>
    <router-link to="/profile" class="tab-item" active-class="active">
      <i class="fas fa-user tab-icon"></i>
      <span class="tab-label">Profile</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { navigationIcons, globalIcons } from "@/assets/icons/icons";

import ResponsiveMixin from "@/mixins/responsiveMixin";

import BaseIcon from "../Base/BaseIcon.vue";

@Component({
  components: {
    BaseIcon,
  },
})
export default class BottomBar extends Mixins(ResponsiveMixin) {
  public navigationIcons = navigationIcons;
  public globalIcons = globalIcons;
}
</script>

<style scoped>
.bottom-tab-bar {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.tab-item {
  text-align: center;
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}

.tab-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.tab-label {
  margin-top: 2px;
  font-size: 12px;
}

.active {
  color: #007bff; /* Adjust active color */
}
</style>

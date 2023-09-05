<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile" class="top-bar top-bar--desktop">
      <div class="top-bar__logo">
        <img src="@/assets/swapp-logo-brand.png" alt="Swapp" />
      </div>
      <div class="top-bar__center-col">
        <BaseButton class="top-bar__menu-item" :text="'Post a Task'" />
        <span class="top-bar__menu-item">Browse tasks</span>
        <span class="top-bar__menu-item">How it works</span>
      </div>
      <div class="top-bar__right-col" v-if="authenticated">
        <div>
          <img
            class="top-bar__notification-icon"
            src="@/assets/bell.png"
            alt="Bell"
          />
          <span class="top-bar__notification">9</span>
        </div>
        <img src="@/assets/circle.png" alt="Circle" />
      </div>
      <div class="top-bar__right-col" v-else>
        <span class="top-bar__menu-item">Sign up</span>
        <span class="top-bar__menu-item">Log in</span>
        <BaseButton :text="'Become a Swapper'" :secondary="true" />
      </div>
    </div>
    <div v-if="isMobile" class="top-bar top-bar--mobile">
      <div class="top-bar__logo">
        <img src="@/assets/swapp-logo-only.png" alt="Swapp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ResponsiveMixin from "@/mixins/responsiveMixin";

import BaseButton from "@/components/Base/BaseButton.vue";

const auth = namespace("auth");

@Component({
  components: {
    BaseButton,
  },
})
export default class TopBar extends Mixins(ResponsiveMixin) {
  @auth.State("authenticated")
  public authenticated!: boolean;
}
</script>

<style lang="scss">
/* Common styles for both versions */
.top-bar {
  height: 88px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.top-bar--mobile {
  display: none;
}

.top-bar__logo img {
  width: auto;
  height: 70px;
  margin-left: 37px;
  margin-top: 9px;
}

.top-bar__search-input {
  margin: 24px 0px 24px 36px !important;
  max-width: 350px !important;
  color: blue; /* Replace with your color variable */
}

.top-bar__center-col {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.top-bar__center-col .top-bar__menu-item {
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.top-bar__right-col {
  margin-right: 38px;
  display: flex;
  align-items: center;
}

.top-bar__right-col .top-bar__menu-item {
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.top-bar__notification {
  position: absolute;
  width: 15px;
  height: 15px;
  right: 90px;
  top: 24px;
  background-color: #ff6760;
  font-size: 9px;
  border: solid 1px #ff6760;
  border-radius: 25px;
  color: white;
  font-weight: 600;
}

.top-bar__notification-icon {
  margin-right: 20px;
}

.top-bar--mobile {
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  display: block;
}
</style>

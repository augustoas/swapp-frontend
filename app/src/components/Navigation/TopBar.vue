<template>
  <div class="top-bar">
    <div class="top-bar__logo">
      <img src="@/assets/logo-image.png" alt="Swapp" />
    </div>
    <div class="top-bar__center-col">
      <BaseButton class="top-bar__menu-item" :text="'Post a Task'" />
      <span class="top-bar__menu-item">Browse tasks</span>
      <span class="top-bar__menu-item">How it works</span>
    </div>
    <!-- <v-text-field
      class="top-bar__search-input"
      rounded
      label="Search"
      prepend-inner-icon="mdi-magnify"
      filled
      background-color="#FFFFFF"
      height="40px"
      dense
      color="blue"
    ></v-text-field> -->
    <div class="top-bar__right-col">
      <span class="top-bar__menu-item">Sign up</span>
      <span class="top-bar__menu-item">Log in</span>
      <BaseButton :text="'Become a Swapper'" :secondary="true" />
      <!-- <div>
        <img
          class="top-bar__notification-icon"å
          src="@/assets/bell.png"
          alt="Bell"
        />
        <span class="top-bar__notification">9</span>
      </div>
      <img src="@/assets/circle.png" alt="Circle" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/Base/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class TopBar extends Vue {}
</script>

<style lang="scss">
.top-bar {
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
}

.top-bar__logo {
  align-self: center;
  margin-left: 35px;
}

.top-bar__search-input {
  margin: 24px 0px 24px 36px !important;
  max-width: 350px !important;
  color: "blue";
}

.top-bar__center-col {
  margin: 24px 38px 24px 0px !important;
  display: flex;
  align-items: center;
}

.top-bar__center-col .top-bar__menu-item {
  margin-right: 20px;
  cursor: pointer;
}

.top-bar__right-col {
  margin: 24px 38px 24px 0px !important;
  display: flex;
  align-items: center;
}

.top-bar__right-col .top-bar__menu-item {
  margin-right: 20px;
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
</style>

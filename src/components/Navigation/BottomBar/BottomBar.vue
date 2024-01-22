<template>
  <div v-if="isMobile" class="bottom-tab-bar">
    <div v-for="(item, index) in items" :key="item.name">
      <div @click="selectItem(index)">
        <router-link :to="item.path" class="tab-item">
          <BaseIcon
            :fill="getFilled(index)"
            :icon="item.icon"
            :width="25"
            :height="25"
            :viewBox="'0 0 25 25'"
            :color="'var(--base-dark-blue)'"
          />
          <span :class="{ 'tab-label': true, active: getFilled(index) }">
            {{ item.name }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { EventBus } from "@/utils/eventBus";
import { State } from "@/store/auth";

import { Component, Mixins } from "vue-property-decorator";
import { navigationIcons, globalIcons } from "@/assets/icons/icons";
import { BottomBarItem } from "@/types/bottomBar.types";

import ResponsiveMixin from "@/mixins/responsiveMixin";

import BaseIcon from "../../Base/BaseIcon.vue";

const auth = namespace("auth");

@Component({
  components: {
    BaseIcon,
  },
})
export default class BottomBar extends Mixins(ResponsiveMixin) {
  public navigationIcons = navigationIcons;
  public globalIcons = globalIcons;

  public selectedItem = 0;

  @auth.State("authenticated")
  public authenticated!: State["authenticated"];

  @auth.State("auth")
  public auth!: State["auth"];

  get items(): BottomBarItem[] {
    const commonItems: BottomBarItem[] = [
      {
        path: "/",
        name: "Home",
        icon: this.navigationIcons.homeIcon,
      },
      {
        path: "/jobs",
        name: "Browse Jobs",
        icon: this.navigationIcons.magnifyIcon,
      },
      {
        path: "/post",
        name: "Post a Job",
        icon: this.navigationIcons.plusIcon,
      },
      {
        path: "/jobs",
        name: "My Jobs",
        icon: this.navigationIcons.listIcon,
      },
    ];

    if (this.authenticated) {
      return [
        ...commonItems,
        {
          path: "/profile",
          name: "Profile",
          icon: this.navigationIcons.accountIcon,
        },
      ];
    } else {
      return [
        ...commonItems,
        {
          path: "/signin",
          name: "Sign In",
          icon: this.navigationIcons.signInIcon,
        },
      ];
    }
  }

  created() {
    const storedSelectedItem = localStorage.getItem("currentTab");
    if (storedSelectedItem !== null) {
      this.selectedItem = parseInt(storedSelectedItem);
    }
    EventBus.$on("updateCurrentTab", (tab) => {
      // Handle the event and data
      console.log("updateCurrentTab tab", tab);
      this.selectItem(tab);
    });
  }

  getFilled(index: number) {
    return index === this.selectedItem ? true : false;
  }

  selectItem(index: number) {
    this.selectedItem = index;
    localStorage.setItem("currentTab", this.selectedItem.toString());
  }
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
  color: var(--base-dark-blue);
}
</style>

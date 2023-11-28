<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile" class="top-bar top-bar--desktop">
      <div class="top-bar__logo" @click="navigateToPath('/', tabs.HOME)">
        <img src="@/assets/swapp-logo-brand.png" alt="Swap" />
      </div>
      <div class="top-bar__center-col">
        <BaseButton
          class="top-bar__menu-item"
          :text="topBarMessages.postTask"
          @click="navigateToPath('/post', tabs.NEW_JOB)"
        />
        <span
          class="top-bar__menu-item"
          @click="navigateToPath('/jobs', tabs.JOBS)"
        >
          {{ topBarMessages.browseTasks }}
        </span>
        <span
          class="top-bar__menu-item"
          @click="navigateToPath('/', tabs.HOME)"
        >
          {{ topBarMessages.howItWorks }}
        </span>
      </div>
      <div class="top-bar__right-col" v-if="authenticated">
        <img
          class="top-bar__notification-icon"
          src="@/assets/bell.png"
          alt="Bell"
        />
        <span class="top-bar__notification">9</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="top-bar__profile-menu-activator"
            >
              <BaseIcon
                class="top-bar__account-icon"
                :icon="navigationIcons.accountIcon"
                :width="30"
                :height="30"
                :viewBox="'0 0 20 20'"
              />
            </div>
          </template>

          <v-list>
            <v-list-item @click="navigateToPath('/profile', tabs.PROFILE)">
              <v-list-item-title>
                {{ topBarMessages.myProfile }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="onSignOut">
              <v-list-item-title>{{ topBarMessages.logOut }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="top-bar__right-col" v-else>
        <span
          class="top-bar__menu-item"
          @click="navigateToPath('/signup', tabs.SIGN_UP)"
        >
          {{ topBarMessages.signUp }}
        </span>
        <span
          class="top-bar__menu-item"
          @click="navigateToPath('/signin', tabs.SIGN_IN)"
        >
          {{ topBarMessages.logIn }}
        </span>
        <BaseButton
          :text="topBarMessages.becomeASwaper"
          :secondary="true"
          @click="navigateToPath('/newswaper')"
        />
      </div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile" class="top-bar top-bar--mobile">
      <div class="top-bar__logo">
        <img
          src="@/assets/swapp-logo-only.png"
          alt="Swap"
          width="50"
          height="50"
          @click="navigateToPath('/', tabs.HOME)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Tabs } from "@/utils/consts";
import { EventBus } from "@/utils/eventBus";

import { ActionsSignatures, State } from "@/store/auth";
import { Component, Mixins } from "vue-property-decorator";

import { navigationIcons } from "@/assets/icons/icons";

import ResponsiveMixin from "@/mixins/responsiveMixin";

import BaseIcon from "../Base/BaseIcon.vue";
import BaseButton from "@/components/Base/BaseButton.vue";

const auth = namespace("auth");

@Component({
  components: {
    BaseIcon,
    BaseButton,
  },
})
export default class TopBar extends Mixins(ResponsiveMixin) {
  @auth.State("authenticated")
  public authenticated!: State["authenticated"];

  @auth.Action
  public signOut!: ActionsSignatures["signOut"];

  public navigationIcons = navigationIcons;
  public tabs = Tabs;

  public isModalVisible = false;

  get topBarMessages() {
    return this.$i18n.messages[this.$i18n.locale].topBar || {};
  }

  public navigateToPath(path, tab) {
    if (this.$route.path !== path) {
      this.$router.push(path);
      EventBus.$emit("updateCurrentTab", tab);
    }
  }

  public onSignOut() {
    this.signOut();
  }
}
</script>

<style lang="scss">
/* Common styles for both versions */
.top-bar {
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

.top-bar__logo img {
  width: auto;
  height: 50px;
  margin-left: 37px;
  margin-top: 15px;
  cursor: pointer;
}

.top-bar__search-input {
  flex: 1;
  max-width: none !important;
  margin: 20px 20px !important;
  background-color: #fff !important;
  border-radius: 20px !important;
  .v-input__icon--prepend-inner {
    color: blue;
  }
  .v-label {
    color: blue !important;
  }
  .v-input__control {
    height: 40px;
    display: flex;
    align-items: center;
  }
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
  right: 70px;
  top: 24px;
  background-color: #ff6760;
  font-size: 9px;
  border: solid 1px #ff6760;
  border-radius: 25px;
  color: white;
  font-weight: 600;
}

.top-bar__notification-icon {
  margin-right: 10px;
}

/* MOBILE */

.top-bar--mobile {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  justify-content: center;

  .top-bar__logo img {
    height: 60px !important;
    margin-top: 10px;
    margin-left: 0px;
  }
}
</style>

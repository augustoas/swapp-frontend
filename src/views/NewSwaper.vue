<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile">
      <div>DESKTOP BECOME A ER PAGE</div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile">
      <div>MOBILE BECOME A SWAPER PAGE</div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from "@/store/auth";
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
export default class NewSwaper extends Mixins(ResponsiveMixin) {
  @auth.State("auth")
  public auth!: State["auth"];
}
</script>

<style lang="scss">
/* Common styles for both versions */

/* MOBILE */
</style>

<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile">
      <div>DESKTOP SIGN UP</div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile">
      <div>MOBILE SIGN UP</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";

import BaseButton from "@/components/Base/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class SignUp extends Mixins(ResponsiveMixin) {}
</script>

<style lang="scss">
/* Common styles for both versions */

/* MOBILE */
</style>

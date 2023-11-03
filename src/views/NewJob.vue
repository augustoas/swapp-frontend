<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile">
      <div>DESKTOP NEW JOB</div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile">
      <div>MOBILE NEW JOB</div>
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
export default class NewJob extends Mixins(ResponsiveMixin) {}
</script>

<style lang="scss">
/* Common styles for both versions */

/* MOBILE */
</style>

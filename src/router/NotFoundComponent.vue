<template>
  <div>
    <!-- Desktop version -->
    <div v-if="!isMobile">
      <div>404 NOT FOUND</div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile">
      <div>404 NOT FOUND</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";

import ResponsiveMixin from "@/mixins/responsiveMixin";

@Component({})
export default class NotFoundComponent extends Mixins(ResponsiveMixin) {}
</script>

<style lang="scss">
/* Common styles for both versions */

/* MOBILE */
</style>

<template>
  <div class="icon-wrapper">
    <svg :width="width" :height="height" :viewBox="viewBox" fill="none">
      <path :d="icon.path" :fill="getIconFilled()" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SvgIcon } from "@/types/types";

@Component
export default class BaseIcon extends Vue {
  @Prop({ required: true }) readonly icon!: SvgIcon;
  @Prop({ default: 18 }) readonly width!: string | number;
  @Prop({ default: 18 }) readonly height!: string | number;
  @Prop({ default: "0 0 18 18" }) readonly viewBox!: string;
  @Prop({ default: false }) readonly fill!: boolean;
  @Prop({ default: "var(--navbar-icon-blue)" }) readonly color!: string;

  getIconFilled() {
    return this.fill ? this.color : "var(--navbar-icon-grey)";
  }

  public asd = this.getIconFilled();
}
</script>

<style scoped>
.icon-wrapper {
  display: flex;
}
</style>

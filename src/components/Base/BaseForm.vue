<template>
  <div :class="{ 'base-form': true, 'base-form--mobile': isMobile }">
    <div class="base-form__section">
      <h2 class="base-form__title">{{ title }}</h2>
      <div class="base-form__divider-line"></div>
      <h2 class="base-form__subtitle">{{ subtitle }}</h2>
    </div>
    <div class="base-form__body">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Mixins } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";

@Component
export default class BaseForm extends Mixins(ResponsiveMixin) {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly subtitle!: string;

  created() {
    console.log("BaseForm Props:", this.title, this.subtitle);
  }
}
</script>

<style lang="scss">
.base-form {
  max-width: 568px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px !important;
  margin-bottom: 32px !important;
  border: 1px solid #b0b0b0 !important;
  border-radius: 12px !important;
  padding-bottom: 20px;
}

.base-form__body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.base-form__body * {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.base-form__section {
  width: 100%;
  margin-bottom: 20px;
}

.base-form__title {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
}

.base-form__subtitle {
  font-size: 20px;
  color: #222222;
  font-weight: 600;
  margin-top: 25px;
  margin-left: 55px;
  float: left;
}

.base-form__divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
}

/* MOBILE SPECIFIC */

.base-form--mobile {
  border: none !important;
}
</style>

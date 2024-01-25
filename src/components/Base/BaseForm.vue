<template>
  <div
    :class="{ 'base-form': true, 'base-form--mobile': isMobile }"
    :style="{ 'max-width': maxWidth }"
  >
    <div class="base-form__section">
      <div class="base-form__step-container">
        <span v-if="showStepNumber" class="base-form__step-number"
          >Paso {{ currentStep + "/" + steps }}</span
        >
      </div>
      <h2 class="base-form__subtitle">{{ subtitle }}</h2>
    </div>
    <div class="base-form__body">
      <slot name="content"></slot>
    </div>
    <div class="base-form__errors-container">
      <div v-for="(errorList, key) in validationErrors" :key="key">
        <div
          v-for="(error, index) in errorList"
          :key="index"
          class="base__error-message"
        >
          {{ error }}
        </div>
      </div>
    </div>
    <div class="base-form__inputs">
      <slot name="inputs"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Mixins, Watch } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";

@Component
export default class BaseForm extends Mixins(ResponsiveMixin) {
  @Prop() readonly title!: string;
  @Prop({ required: true }) readonly subtitle!: string;
  @Prop({ default: "568px" }) readonly maxWidth!: string;
  @Prop({ default: false }) readonly showStepNumber!: boolean;
  @Prop() readonly currentStep!: number;
  @Prop() readonly steps!: number;
  @Prop() readonly validationErrors!: string;

  created() {
    console.log("BaseForm Props:", this.title, this.subtitle);
  }

  @Watch("validationErrors")
  onComponentChange() {
    console.log("validation Errors changed");
  }
}
</script>

<style lang="scss" scoped>
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
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.base-form__section {
  width: 100%;
  margin-bottom: 20px;
}

.base-form__step-container {
  display: flex;
  align-items: center;
  margin: 20px 65px 10px 65px;
  justify-content: right;
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
  margin-top: 20px;
  margin-left: 65px;
  float: left;
}

.base-form__divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
}

.base-form__inputs {
  margin-top: 80px;
  display: flex;
}

.base-form__errors-container {
  width: 77%;
  margin-top: 10px;
}

.base-form__step-number {
  font-size: 12px;
}

/* MOBILE SPECIFIC */

.base-form--mobile {
  border: none !important;

  .base-form__subtitle {
    float: none;
    margin-left: 0px;
  }
}
</style>

<template>
  <v-dialog
    class="base-dialog"
    v-model="visible"
    max-width="500px"
    :persistent="persistent"
  >
    <v-card class="base-dialog__body">
      <v-card-title class="base-dialog__title">{{ title }}</v-card-title>
      <div class="base-dialog__divider-line"></div>
      <v-card-subtitle class="base-dialog__subtitle">{{
        subtitle
      }}</v-card-subtitle>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions class="base-dialog__button-container">
        <v-spacer></v-spacer>
        <v-btn
          class="base-dialog__cancel-button"
          v-if="showCancelButton"
          text
          @click="handleCancel"
          >{{ cancelText }}</v-btn
        >
        <v-btn class="base-dialog__ok-button" @click="handleOk">{{
          okText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseModal extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly subtitle!: string;
  @Prop({ default: "OK" }) readonly okText!: string;
  @Prop({ default: "Cancel" }) readonly cancelText!: string;
  @Prop({ default: true }) readonly showCancelButton!: boolean;
  @Prop({ default: false }) readonly value!: boolean;
  @Prop({ default: false }) readonly persistent!: boolean;

  get visible() {
    return this.value;
  }
  set visible(value) {
    this.$emit("input", value);
  }

  handleOk() {
    this.$emit("ok");
    this.visible = false;
  }

  handleCancel() {
    this.$emit("cancel");
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #b0b0b0 !important;
  border-radius: 12px !important;
  margin: 20px;

  .base-dialog__title {
    justify-content: center;
    font-weight: 600 !important;
  }

  .base-dialog__subtitle {
    font-weight: 600 !important;
    margin-top: 20px;
    font-size: 16px;
  }

  .base-dialog__divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: #ccc;
  }

  .base-dialog__button-container {
    padding: 20px !important;
  }

  .base-dialog__ok-button {
    background-color: var(--base-dark-blue) !important;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }

  .base-dialog__cancel-button {
    color: var(--base-dark-blue) !important;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>

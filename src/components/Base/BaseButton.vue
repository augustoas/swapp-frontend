<template>
  <div class="button-container">
    <button
      class="custom-button"
      :style="{ backgroundColor: getButtonColor(), color: getTextColor() }"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop({ required: true }) readonly text!: string;
  @Prop({ default: "var(--button-blue)" }) readonly color!: string;
  @Prop({ default: "white" }) readonly textColor!: string;
  @Prop({ default: "var(--mid-purple)" })
  readonly hoverColor!: string;
  @Prop({ default: false }) readonly secondary!: boolean;

  getButtonColor() {
    const color = this.secondary ? "var(--grey)" : "var(--purple)";
    const hoverColor = this.secondary
      ? "var(--light-purple)"
      : "var(--mid-purple)";
    return this.isHovered ? hoverColor : color;
  }

  getTextColor() {
    const textColor = this.secondary ? "var(--purple)" : "white";
    return textColor;
  }

  public isHovered = false;
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
</style>

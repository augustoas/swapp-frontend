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
  @Prop({ default: "#0056b3" }) readonly hoverColor!: string;
  @Prop({ default: false }) readonly secondary!: boolean;

  getButtonColor() {
    const color = this.secondary
      ? "rgba(51, 108, 251, 0.15)"
      : "var(--button-blue)";
    const hoverColor = this.secondary ? "rgba(52, 108, 251, 0.21)" : "#0056b3";
    return this.isHovered ? hoverColor : color;
  }

  getTextColor() {
    const textColor = this.secondary ? "var(--button-blue)" : "white";
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

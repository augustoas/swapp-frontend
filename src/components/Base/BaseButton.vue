<template>
  <div class="button-container">
    <button
      :class="{
        'custom-button': !isCircle,
        'rounded-button': isCircle,
        'square-button': isSquare,
      }"
      :style="{ backgroundColor: getButtonColor(), color: getTextColor() }"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      @click="$emit('click')"
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
  @Prop({ default: "var(--purple)" }) readonly color!: string;
  @Prop({ default: "white" }) readonly textColor!: string;
  @Prop({ default: "var(--mid-purple)" }) readonly hoverColor!: string;
  @Prop({ default: false }) readonly secondary!: boolean;
  @Prop({ default: false }) readonly isCircle!: boolean;
  @Prop({ default: false }) readonly isSquare!: boolean;

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

.rounded-button {
  padding: 0; /* Padding set to 0 so width and height define the full size of the button */
  border: none;
  font-weight: bold;
  border-radius: 50%; /* Makes it a circle */
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center; /* To center the "+" text */
}

.square-button {
  border-radius: 4px !important;
}
</style>

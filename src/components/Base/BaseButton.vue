<template>
  <div class="button-container">
    <button
      :class="{
        'custom-button': !isCircle,
        'rounded-button': isCircle,
        'square-button': isSquare,
        'disabled-button': isDisabled,
      }"
      :style="buttonStyle"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      @click="handleClick"
    >
      {{ text }}
      <BaseIcon
        v-if="type === types.DATE"
        class="date-picker-icon"
        :icon="globalIcons.menuDown"
        :width="15"
        :height="15"
        :viewBox="'0 0 20 20'"
        :color="secondary && !isHovered ? 'var(--purple)' : 'white'"
        :fill="true"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { globalIcons } from "@/assets/icons/icons";

const BaseIcon = () => import("@/components/Base/BaseIcon.vue");

@Component({
  components: {
    BaseIcon,
  },
})
export default class BaseButton extends Vue {
  @Prop({ required: true }) readonly text!: string;
  @Prop({ default: "var(--purple)" }) readonly color!: string;
  @Prop({ default: "white" }) readonly textColor!: string;
  @Prop({ default: "input" }) readonly type!: string;
  @Prop({ default: "white" }) readonly hoverText!: string;
  @Prop({ default: false }) readonly secondary!: boolean;
  @Prop({ default: false }) readonly isCircle!: boolean;
  @Prop({ default: false }) readonly isSquare!: boolean;
  @Prop() readonly minWidth!: boolean;
  @Prop({ default: false }) readonly isDisabled!: boolean;

  public types = {
    INPUT: "input",
    DATE: "date",
  };

  public globalIcons = globalIcons;

  public isHovered = false;

  getButtonColor() {
    const color = this.secondary ? "var(--grey)" : "var(--purple)";
    const hoverColor = this.secondary
      ? "var(--mid-purple)"
      : "var(--mid-purple)";
    return this.isHovered ? hoverColor : color;
  }

  getTextColor() {
    const textColor = this.secondary ? "var(--purple)" : "white";
    const hoverTextColor = this.secondary ? "white" : "white";
    return this.isHovered ? hoverTextColor : textColor;
  }

  get buttonStyle() {
    return {
      backgroundColor: this.isDisabled ? "var(--grey)" : this.getButtonColor(),
      color: this.isDisabled ? "var(--dark-grey)" : this.getTextColor(),
      minWidth: this.minWidth,
      cursor: this.isDisabled ? "default" : "pointer",
    };
  }

  public handleClick() {
    if (!this.isDisabled) {
      this.$emit("click");
    } else {
      this.$emit("click-disabled");
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  display: flex;
  padding: 10px 20px;
  border: 1px solid var(--purple);
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  justify-content: center;
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

.date-picker-icon {
  position: relative;
  width: 25px;
  right: -5px;
}

.disabled-button {
  opacity: 0.5; /* Or any other style to indicate it's disabled */
  cursor: not-allowed;
  border: 2px solid var(--disable-grey) !important;
}
</style>

<template>
  <div class="button-container">
    <button
      :class="{
        'base-button': !isCircle,
        'base-button-hover': !isHoverDisabled && !isDisabled,
        'secondary-button': secondary && !isDisabled,
        'secondary-button-hover': secondary && !isHoverDisabled && !isDisabled,
        'tertiary-button': tertiary && !isDisabled,
        'tertiary-button-hover': tertiary && !isHoverDisabled && !isDisabled,
        'rounded-button': isCircle,
        'square-button': isSquare,
        'disabled-button': isDisabled,
        'date-picker-button': type === types.DATE,
      }"
      :style="buttonStyle"
      @click="handleClick"
    >
      {{ text }}
      <div class="date-picker-icon-container">
        <BaseIcon
          v-if="type === types.DATE"
          :icon="globalIcons.menuDown"
          :width="15"
          :height="15"
          :viewBox="'0 0 20 20'"
          :color="secondary && !isHovered ? 'var(--base-dark-blue)' : 'white'"
          :fill="true"
        />
      </div>
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
  @Prop({ default: "var(--base-dark-blue)" }) readonly color!: string;
  @Prop({ default: "white" }) readonly textColor!: string;
  @Prop({ default: "input" }) readonly type!: string;
  @Prop({ default: false }) readonly secondary!: boolean;
  @Prop({ default: false }) readonly tertiary!: boolean;
  @Prop({ default: false }) readonly isCircle!: boolean;
  @Prop({ default: false }) readonly isSquare!: boolean;
  @Prop() readonly minWidth!: boolean;
  @Prop({ default: false }) readonly isDisabled!: boolean;
  @Prop({ default: false }) readonly isHoverDisabled!: boolean;

  public types = {
    INPUT: "input",
    DATE: "date",
  };

  public globalIcons = globalIcons;

  public isHovered = false;

  get buttonStyle() {
    return {
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

.base-button {
  display: flex;
  padding: 10px 20px;
  border: 1px solid var(--base-dark-blue);
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  justify-content: center;
  transition: background-color 0.3s ease;
  background-color: var(--base-dark-blue);
  color: white;
}

.base-button-hover:hover {
  background-color: white !important;
  color: var(--base-dark-blue) !important;
}

.secondary-button {
  background-color: white !important;
  color: var(--base-dark-blue) !important;
  border: 1px solid var(--base-dark-blue);
}

.secondary-button-hover:hover {
  background-color: var(--base-dark-blue) !important;
  color: white !important;
  font-weight: bold;
}

.tertiary-button {
  background-color: var(--base-light-blue) !important;
  color: white !important;
  border: none;
}

.tertiary-button-hover:hover {
  background-color: var(--base-dark-blue) !important;
  color: white !important;
  font-weight: bold
}

.date-picker-button {
  justify-content: left;
  place-content: space-between !important;
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

.date-picker-icon-container {
  position: relative;
}

.disabled-button {
  opacity: 0.5; /* Or any other style to indicate it's disabled */
  cursor: not-allowed;
  border: 2px solid var(--disable-grey) !important;
}
</style>

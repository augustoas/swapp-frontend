<template>
  <div class="date-picker-container">
    <BaseButton
      class="date-picker__input"
      :text="dateLabel"
      :type="'date'"
      :secondary="secondary"
      :isHoverDisabled="!secondary"
      @click="toggleDatePicker"
    />
    <div v-if="menu && show" class="date-picker-overlay">
      <v-date-picker
        v-model="date"
        @input="updateDate"
        no-title
        :value="value"
        color="var(--base-light-blue)"
        class="custom-date-picker"
      ></v-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

const BaseButton = () => import("@/components/Base/BaseButton.vue");

@Component({
  components: {
    BaseButton,
  },
})
export default class BaseDatePicker extends Vue {
  @Prop() value: string;
  @Prop() text: string;
  @Prop({ default: "180px" }) readonly minWidth!: string;
  @Prop({ default: false }) secondary!: boolean;
  @Prop({ default: false }) readonly show!: boolean;
  @Prop({ default: false }) isHoverDisabled!: boolean;

  public date = dayjs().format("YYYY-MM-DD");
  public menu = false;

  get formattedDate() {
    return dayjs(this.date).format("MMM D");
  }

  get dateLabel() {
    return this.value !== null
      ? `${this.text} ${this.formattedDate}`
      : `${this.text} ---`;
  }

  public toggleDatePicker() {
    if (this.show) {
      this.menu = !this.menu;
    }
  }

  public updateDate(newValue) {
    this.$emit("input", newValue);
    this.date = newValue;
    this.menu = false;
  }

  @Watch("show")
  onShowChanged(newVal: boolean) {
    this.menu = newVal;
  }
}
</script>

<style lang="scss">
/* SCSS Styles */

.date-picker-container {
  position: relative;
}

.date-picker__input {
  font-size: 14px;
  margin-right: 5px;
}

.date-picker-overlay {
  position: absolute;
  z-index: 100; /* Adjust z-index as needed */
  /* Add more styles for positioning and size */
  top: 43px;

  &::before {
    content: "";
    position: absolute;
    top: -10px; // Adjust as necessary to position the arrow correctly
    left: 12%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white; // Use the same color as the modal background
  }
}

.custom-date-picker {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.vdp-datepicker__navigation button {
  color: var(--base-dark-blue);
}
</style>

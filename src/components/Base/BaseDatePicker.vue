<template>
  <div class="date-picker-container">
    <BaseButton
      class="date-picker__input"
      :text="dateLabel"
      :type="'date'"
      :secondary="secondary"
      @click="toggleDatePicker"
    />
    <div v-if="menu" class="date-picker-overlay">
      <v-date-picker
        v-model="date"
        @input="updateDate"
        no-title
        :value="value"
      ></v-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";

import { Component, Vue, Prop } from "vue-property-decorator";
import BaseButton from "@/components/Base/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class BaseDatePicker extends Vue {
  @Prop() value: string;
  @Prop() text: string;
  @Prop({ default: "180px" }) readonly minWidth!: string;
  @Prop({ default: false }) readonly secondary!: boolean;

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
    this.menu = !this.menu;
  }

  public updateDate(newValue) {
    this.$emit("input", newValue);
    this.date = newValue;
    this.menu = false;
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
</style>

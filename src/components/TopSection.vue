<template>
  <div class="boxes-container">
    <div class="box-container__box" v-for="item in items" :key="item.name">
      <BaseIcon
        class="box-container__box-icon"
        :fill="true"
        :icon="item.icon"
        :width="60"
        :height="55"
        :viewBox="'0 0 60 55'"
        :color="'var(--blue)'"
      />
      <div class="box-container__right-box">
        <span class="subtitle2">{{ item.name }}</span>
        <h6 class="box-container__box-number">{{ item.number }}</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TopSectionItem } from "@/types/types";
import { topSectionIcons } from "@/assets/icons/icons";

import BaseIcon from "./Base/BaseIcon.vue";

@Component({
  components: {
    BaseIcon,
  },
})
export default class TopSection extends Vue {
  public name = "TopSection";
  public topSectionIcons = topSectionIcons;

  public items: TopSectionItem[] = [
    {
      name: "Appointments",
      icon: this.topSectionIcons.medicineIcon,
      number: 213,
    },
    {
      name: "New Patients",
      icon: this.topSectionIcons.newPatientIcon,
      number: 104,
    },
    {
      name: "Operations",
      icon: this.topSectionIcons.operationsIcon,
      number: 24,
    },
    {
      name: "Hospital Earnings",
      icon: this.topSectionIcons.hospitalIcon,
      number: "$ 12,174",
    },
  ];
}
</script>
<style lang="scss">
.boxes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 25px;
}

.box-container__box {
  display: flex;
  background-color: #ffffff;
  width: 255px;
  height: 88px;
  border: solid 1px #ffffff;
  box-shadow: 0px 12px 26px rgba(16, 30, 115, 0.06);
  border-radius: 8px;
}

.box-container__box-icon {
  padding: 26px;
}

.box-container__right-box {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-right: 25px;
}

.box-container__box-number {
  color: var(--navbar-icon-blue);
}
</style>

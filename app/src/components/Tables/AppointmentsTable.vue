<template>
  <BaseTable
    :title="title"
    :headers="headers"
    :items="appointments"
    :items-per-page="5"
    :hide-footer="true"
  >
    <template #[`item.name`]="{ item }">
      <div class="name-cell">
        <img class="name-cell__img" src="@/assets/circle.png" alt="Circle" />
        <span class="name-cell__name">
          {{ item.name }}
        </span>
      </div>
    </template>
    <template #[`item.condition`]="{ item }">
      <div class="condition-cell">
        <span class="condition-cell__name">
          {{ item.condition }}
        </span>
        <div class="condition-cell__buttons">
          <v-btn small icon>
            <BaseIcon
              :fill="true"
              :color="'var(--grey)'"
              :icon="globalIcons['editIcon']"
            />
          </v-btn>
          <v-btn small icon>
            <BaseIcon
              :fill="true"
              :color="'#FF6760'"
              :icon="globalIcons['deleteIcon']"
            />
          </v-btn>
        </div>
      </div>
    </template>
  </BaseTable>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { appointments } from "@/mocks/mocks";
import BaseIcon from "../Base/BaseIcon.vue";
import BaseTable from "../Base/BaseTable.vue";
import { globalIcons } from "@/assets/icons/icons";
import { Appointment } from "@/types/types";

@Component({
  components: { BaseIcon, BaseTable },
})
export default class AppointmentsTable extends Vue {
  public title = "Appointment Activity";
  public globalIcons = globalIcons;
  public appointments: Appointment[] = [];

  created() {
    this.appointments = appointments;
  }

  public headers = [
    {
      text: "Name",
      value: "name",
      class: "header-style",
    },
    {
      text: "Email",
      value: "email",
      class: "header-style",
    },
    {
      text: "Date",
      value: "date",
      class: "header-style",
    },
    {
      text: "Visit Time",
      value: "visit_time",
      class: "header-style",
    },
    {
      text: "Doctor",
      value: "doctor",
      class: "header-style",
    },
    {
      text: "Condition",
      value: "condition",
      class: "header-style",
    },
  ];
}
</script>

<style lang="scss">
.header-style {
  color: #25282b !important;
  font-size: 14px;
  font-weight: 700;
  background-color: rgba(232, 232, 232, 0.2);
}

.condition-cell {
  display: flex;
}

.condition-cell__name {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 0 0 75%;
  max-width: 75%;
}
.condition-cell__buttons {
  gap: 10px;
  display: inherit;
  text-align: end !important;
  max-width: 25%;
  justify-content: flex-end !important;
}

.name-cell {
  display: flex;
}
.name-cell__name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-self: center;
}
.name-cell__img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
</style>

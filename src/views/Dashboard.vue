<template>
  <div class="dashboard">
    <TopSection />
    <HospitalSurveyChart />
    <div class="sm-highcharts-container">
      <v-col cols="12" md="6">
        <CurrentMonthChart />
      </v-col>
      <v-col cols="12" md="6">
        <CurrentWeekChart />
      </v-col>
    </div>
    <AppointmentsTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import TopSection from "@/components/TopSection.vue";
import HospitalSurveyChart from "@/components/Highcharts/HospitalSurveyChart.vue";
import CurrentMonthChart from "@/components/Highcharts/CurrentMonthChart.vue";
import CurrentWeekChart from "@/components/Highcharts/CurrentWeekChart.vue";
import AppointmentsTable from "@/components/Tables/AppointmentsTable.vue";

const auth = namespace("auth");

@Component({
  components: {
    TopSection,
    HospitalSurveyChart,
    CurrentMonthChart,
    CurrentWeekChart,
    AppointmentsTable,
  },
})
export default class Dashboard extends Vue {
  @auth.State("authenticated")
  public authenticated!: boolean;
}
</script>

<style lang="scss">
.dashboard {
  padding: 36px;
}

.col-md-6 {
  max-width: 49% !important;
  padding: 0px !important;
}

.sm-highcharts-container {
  display: flex;
  justify-content: space-between;
}
</style>

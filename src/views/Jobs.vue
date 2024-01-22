<template>
  <div class="job-list-container">
    <!-- Desktop version -->
    <div v-if="!isMobile">
      <div>DESKTOP JOBS LIST PAGE</div>
    </div>
    <!-- Mobile version -->
    <div v-if="isMobile">
      <div class="job-card" v-for="job in jobList" :key="job.id">
        <div class="job-header">
          <h3 class="job-description">{{ job.description }}</h3>
          <img class="job-owner-img" src="@/assets/circle.png" alt="Bell" />
        </div>
        <div class="job-body">
          <div class="job-body-item">{{ job.date }}</div>
          <div class="job-body-item">{{ job.location }}</div>
          <div class="job-body-item">{{ job.online }}</div>
        </div>
        <div class="job-footer">
          <span>{{ job.status }}</span>
          <!-- <p>{{ job.offers }}</p> -->
          <span class="job-budget">{{ job.originalBudget }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ActionsSignatures, State } from "@/store/auth";
import { Component, Mixins } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ResponsiveMixin from "@/mixins/responsiveMixin";
// import { jobIcons } from "@/assets/icons/icons";

const BaseButton = () => import("@/components/Base/BaseButton.vue");

import { jobsMocks } from "./jobsMock";

const auth = namespace("auth");

@Component({
  components: {
    BaseButton,
  },
})
export default class Jobs extends Mixins(ResponsiveMixin) {
  //public jobIcons = jobIcons;
  public jobList = jobsMocks;

  @auth.State("auth")
  public auth!: State["auth"];

  @auth.Action
  public signIn!: ActionsSignatures["signIn"];
}
</script>

<style lang="scss">
/* Common styles for both versions */
.job-list-container {
  padding: 0px 25px 0px 25px;
}
.jobs-list {
  display: flex;
  flex-direction: column;
}

.job-card {
  padding: 15px;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 12px !important;
  cursor: pointer;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .job-description {
    font-size: 18px;
    margin-right: 20px;
    text-align: start;
  }
}

.job-body {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 12px;

  .job-body-item {
    color: #666;
    font-size: 14px;
    margin-bottom: 3px;
  }
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-budget {
  color: var(--base-dark-blue);
  font-weight: bold;
}
/* MOBILE */
</style>

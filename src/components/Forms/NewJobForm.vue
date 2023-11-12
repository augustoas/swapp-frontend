<template>
  <div :class="{ 'new-job-form': true, 'new-job-form--mobile': isMobile }">
    <div v-if="!isMobile" class="new-job-form__step-list">
      <span class="new-job-form__step-list-title">Post a task</span>
      <span
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: currentStep.index === index, step: true }"
        @click="setStep(step)"
      >
        {{ step.title }}
      </span>
    </div>
    <div v-else class="new-job-form__stepper">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="new-job-form__step-item"
        @click="setStep(step)"
      >
        <div
          class="new-job-form__step-item-circle"
          :class="{ active: currentStep.index === index }"
        >
          <span>{{ index + 1 }}</span>
        </div>
        <div
          class="new-job-form__step-list-title"
          :class="{ active: currentStep.index === index }"
        >
          {{ step.title }}
        </div>
      </div>
    </div>
    <BaseForm :title="title" :subtitle="subtitle">
      <template v-slot:content>
        {{ currentStep.title }}
      </template>
    </BaseForm>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";
import BaseForm from "@/components/Base/BaseForm.vue";
import BaseButton from "@/components/Base/BaseButton.vue";

@Component({
  components: {
    BaseForm,
    BaseButton,
  },
})
export default class NewJobForm extends Mixins(ResponsiveMixin) {
  public title = "Create new Job";
  public subtitle = "Create new Job";
  public steps = [
    { title: "Title & Date", index: 0 },
    { title: "Location", index: 1 },
    { title: "Details", index: 2 },
    { title: "Budget", index: 3 },
  ];
  public currentStep = this.steps[0];

  public setStep(step) {
    console.log("setStep step", step);
    this.currentStep = step;
  }
}
</script>

<style lang="scss">
/* SCSS Styles */
.new-job-form {
  display: flex;

  .new-job-form__step-list {
    margin: 40px 0px 40px 40px;
    display: flex;
    flex-direction: column;
    text-align: left;

    .step {
      padding: 8px;
      position: relative;
      font-size: 14px;
      cursor: pointer;

      &::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 20%;
        bottom: 20%;
        width: 3px;
        background: transparent;
      }

      &.active::before {
        background-color: var(--purple); // Use the same blue as in your design
      }
    }
  }

  .new-job-form__step-list-title {
    font-size: 16px;
    margin-bottom: 32px;
    font-weight: bold;
  }
}

/* MOBILE */

.new-job-form--mobile {
  display: block;
  align-items: center;
  justify-content: space-between;

  .new-job-form__step-list-title {
    font-size: 12px;
    margin-bottom: 15px;
    margin-top: 5px;
    font-weight: bold;

    &.active {
      color: var(--purple);
    }
  }

  .new-job-form__stepper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    max-width: 400px;
    margin: 0 auto;

    .new-job-form__step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      .new-job-form__step-item-circle {
        border: 2px solid grey;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.3s;

        &.active {
          border-color: var(--purple);
          color: var(--purple);
        }

        span {
          user-select: none;
        }
      }
    }
  }

  /* other .new-job-form--mobile styles */
}
</style>

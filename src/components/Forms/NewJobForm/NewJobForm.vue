<template>
  <div :class="{ 'new-job-form': true, 'new-job-form--mobile': isMobile }">
    <div v-if="!isMobile" class="new-job-form__step-list">
      <span class="new-job-form__step-list-title">Nueva publicación</span>
      <span
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: currentStep.index === index, step: true }"
      >
        {{ step.title }}
      </span>
    </div>
    <BaseForm
      :subtitle="currentStep.subtitle"
      :maxWidth="'650px'"
      :showStepNumber="true"
      :steps="steps.length"
      :currentStep="currentStep.index + 1"
    >
      <template v-slot:content>
        <!-- STEP 1 -->
        <div v-if="currentStep.index === 0" class="d-flex">
          <span class="new-job__input-tooltip">
            Elige un título para la tarea.
          </span>
          <textarea
            class="new-job__input new-job-step-1__input-description"
            :class="{
              'base__input-error': validationErrors.description,
            }"
            type="text"
            id="description"
            v-model="description"
            placeholder="Ej: Necesito mover un sillón."
          />
          <span v-if="validationErrors.description" class="base__error-message">
            {{ validationErrors.description[0] }}
          </span>
          <span class="new-job__input-tooltip">
            Detalla lo mejor posible la tarea.
          </span>
          <textarea
            class="new-job__input new-job-step-1__input-details"
            :class="{
              'base__input-error': validationErrors.details,
            }"
            type="text"
            id="details"
            v-model="details"
            placeholder="Mientras más detalles tu tarea, más fácil será encontrar un Swapper."
          />
          <span v-if="validationErrors.details" class="base__error-message">
            {{ validationErrors.details[0] }}
          </span>
          <span class="new-job__input-tooltip">
            Agregar imágen (Opcional)
          </span>
          <v-file-input
            class="new-job__input new-job-step-1__image-input"
            accept="image/*"
            label="Click aquí para agregar imágenes"
            clearable
            variant="outlined"
            prepend-icon="mdi-paperclip"
            color="var(--base-light-blue)"
            multiple
            v-model="images"
          ></v-file-input>
        </div>
        <!-- STEP 2 -->
        <div v-if="currentStep.index === 1" class="d-flex">
          <span class="new-job__input-tooltip">
            ¿Para cuándo lo necesitas?
          </span>
          <div class="new-job-step-2__dates-pickers-container">
            <BaseDatePicker
              class="new-job-step-2__date-input"
              v-model="taskDate"
              :text="'El día '"
              :secondary="
                activeDatePicker !== datesOption.ON_DATE || taskDate === null
              "
              :show="activeDatePicker === datesOption.ON_DATE"
              @click.native="openDatePicker(datesOption.ON_DATE)"
              @setDate="setDate(datesOption.ON_DATE)"
            />
            <BaseDatePicker
              class="new-job-step-2__date-input"
              v-model="taskBeforeDate"
              :text="'Antes del '"
              :secondary="
                activeDatePicker !== datesOption.BEFORE_DATE ||
                taskBeforeDate === null
              "
              :show="activeDatePicker === datesOption.BEFORE_DATE"
              @click.native="openDatePicker(datesOption.BEFORE_DATE)"
              @setDate="setDate(datesOption.BEFORE_DATE)"
            />
          </div>
          <div class="new-job-step-2__checkbox-container">
            <v-checkbox
              color="var(--base-dark-blue)"
              :value="dateType === 3"
              v-model="isFlexible"
            >
            </v-checkbox>
            <span class="new-job__input-tooltip">
              Prefiero coordinar la fecha con el Swapper más adelante
            </span>
          </div>
          <span v-if="validationErrors.date" class="base__error-message">
            {{ validationErrors.date[0] }}
          </span>
          <span class="new-job__input-tooltip">
            Selecciona Remoto si se puede realizar el trabajo de manera remota.
          </span>
          <div class="new-job-step-2__location-buttons-container">
            <BaseButton
              class="new-job-step-2__location-button"
              :text="'En Persona'"
              :secondary="remote"
              :minWidth="'150px'"
              :isHoverDisabled="!remote"
              @click="remote = false"
            />
            <BaseButton
              class="new-job-step-2__location-button"
              :text="'Remoto'"
              :secondary="!remote"
              :minWidth="'150px'"
              :isHoverDisabled="remote"
              @click="remote = true"
            />
          </div>
          <div v-if="!remote">
            <span class="new-job__input-tooltip">
              ¿A qué dirección deberá ir?
            </span>
            <div class="new-job__text-input-container">
              <input
                class="new-job__input new-job-step-2__location-text-input"
                :class="{
                  'base__input-error': validationErrors.location,
                }"
                type="text"
                id="address"
                v-model="location"
                placeholder="Calle y número"
              />
              <div class="new-job-step2__location-icon-container">
                 <BaseIcon
                  class="new-job-step2__location-input-icon"
                  :fill="true"
                  :icon="globalIcons.mapIcon"
                  :width="25"
                  :height="25"
                  :viewBox="'0 0 25 25'"
                  :color="'var(--base-dark-blue)'"
                />
              </div>
            </div>
          </div>
          <span v-if="validationErrors.location" class="base__error-message">
            {{ validationErrors.location[0] }}
          </span>
        </div>
        <!-- STEP 3 -->
        <div v-if="currentStep.index === 2" class="d-flex">
          <span class="new-job__input-tooltip">
            Podrás negociar el precio final más adelante.
          </span>
          <div class="new-job__text-input-container">
            <input
              class="new-job__input new-job-step-3__budget-text-input"
              :class="{
                'base__input-error': validationErrors.budget,
              }"
              id="budget"
              placeholder="Ingrese el monto"
              type="text"
              v-model="formattedBudget"
              @input="formatCurrency($event.target.value)"
            />
            <BaseIcon
              class="new-job__input-prepend-icon"
              :fill="true"
              :icon="globalIcons.currencyIcon"
              :width="25"
              :height="25"
              :viewBox="'0 0 25 25'"
              :color="'var(--base-dark-blue)'"
            />
          </div>
          <span v-if="validationErrors.budget" class="base__error-message">
            {{ validationErrors.budget[0] }}
          </span>
        </div>
      </template>
      <template v-slot:inputs>
        <BaseButton
          v-if="currentStep.index > 0"
          class="new-job__back-button"
          :text="'Volver'"
          :minWidth="'150px'"
          :tertiary="true"
          :isHoverDisabled="true"
          @click="previousStep"
        />
        <BaseButton
          :text="currentStep.index !== 2 ? 'Continuar' : 'Finalizar'"
          :minWidth="'150px'"
          :tertiary="true"
          :isHoverDisabled="true"
          @click="
            currentStep.index < steps.length - 1 ? nextStep() : createJob()
          "
        />
      </template>
    </BaseForm>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { State } from "@/store/auth";

import { Tabs } from "@/utils/consts";

import { Component, Mixins, Watch } from "vue-property-decorator";

import ResponsiveMixin from "@/mixins/responsiveMixin";
import { globalIcons } from "@/assets/icons/icons";

import {
  validateDescription,
  validateDate,
  validateLocation,
  validateDetails,
  validateBudget,
} from "./validations";

const BaseForm = () => import("@/components/Base/BaseForm.vue");
const BaseButton = () => import("@/components/Base/BaseButton.vue");
const BaseIcon = () => import("@/components/Base/BaseIcon.vue");
const BaseDatePicker = () => import("@/components/Base/BaseDatePicker.vue");

const auth = namespace("auth");

@Component({
  components: {
    BaseForm,
    BaseButton,
    BaseIcon,
    BaseDatePicker,
  },
})
export default class NewJobForm extends Mixins(ResponsiveMixin) {
  public globalIcons = globalIcons;
  public tabs = Tabs;

  public validationErrors: Record<string, string[] | boolean> = {};
  public clickedDisabled = false;

  public datesOption = {
    ON_DATE: "ON_DATE",
    BEFORE_DATE: "BEFORE_DATE",
    FLEXIBLE: "FLEXIBLE",
  };
  public datesType = {
    ON_DATE: 1,
    BEFORE_DATE: 2,
    FLEXIBLE: 3,
  };
  public activeDatePicker = null;
  public activeButton = null;

  public title = "Crear nuevo trabajo";
  public steps = [
    {
      id: "title_date",
      title: "Título y detalles",
      subtitle: "¿Qué necesitas?",
      index: 0,
    },
    {
      id: "location",
      title: "Ubicación y Fecha",
      subtitle: "¿Cuándo y dónde?",
      index: 1,
    },
    {
      id: "budget",
      title: "Precio",
      subtitle: "¿Cuánto esperas pagar?",
      index: 2,
    },
  ];
  public currentStep = this.steps[0];

  public description = "";
  public date = null;
  public taskDate = null;
  public taskBeforeDate = null;
  public dateType = null;
  public isFlexible = false;
  public location = "";
  public details = "";
  public rawBudget = null;
  public formattedBudget = null;
  public remote = false;
  public images: File[] = [];

  @auth.State("authenticated")
  public authenticated!: State["authenticated"];

  @auth.Action("jobInProgress")
  public jobInProgress!: State["jobInProgress"];

  public get finalLocation() {
    if (this.remote) {
      return {
        remote: true,
      };
    } else {
      return {
        location: this.location,
        remote: false,
      };
    }
  }

  public validateInputs(): boolean {
    this.validationErrors = {};

    // Validations for STEP 1
    if (this.currentStep.index === 0) {
      this.validationErrors.description = validateDescription(this.description);
      this.validationErrors.details = validateDetails(this.details);
    }

    // Validations for STEP 2
    if (this.currentStep.index === 1) {
      this.validationErrors.date = validateDate(this.dateType, this.date);
      this.validationErrors.location = validateLocation(
        this.remote,
        this.location
      );
    }

    // Validations for STEP 3
    if (this.currentStep.index === 2) {
      this.validationErrors.budget = validateBudget(this.rawBudget);
    }

    return Object.values(this.validationErrors).every(
      (value) => value === false || (Array.isArray(value) && value.length === 0)
    );
  }

  public nextStep() {
    if (!this.validateInputs()) return;
    const currentIndex = this.currentStep.index;
    this.currentStep = this.steps[currentIndex + 1];
  }

  public previousStep() {
    const currentIndex = this.currentStep.index;
    this.currentStep = this.steps[currentIndex - 1];
  }

  public openDatePicker(option) {
    this.activeDatePicker = option;
  }

  public setDate(option) {

    if (option === this.datesOption.ON_DATE) {
      this.date = this.taskDate;
      this.taskBeforeDate = null;
      this.dateType = 1;
    } else if (option === this.datesOption.BEFORE_DATE) {
      this.date = this.taskBeforeDate;
      this.taskDate = null;
      this.dateType = 2;
    } else if (option === this.datesOption.FLEXIBLE) {
      this.date = null;
      this.taskDate = null;
      this.taskBeforeDate = null;
        if (this.isFlexible) {
          this.dateType = 3;
        } else {
          this.dateType = null;
        }
    }
  }

  public formatCurrency(value) {
    let numericValue = value.replace(/\D/g, "");
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    this.formattedBudget = formattedValue;
    this.rawBudget = numericValue;
  }

  public createJob() {
    if (!this.validateInputs()) return;
    const payload = {
      description: this.description,
      dateType: this.dateType,
      date: this.date,
      location: this.finalLocation,
      details: this.details,
      budget: this.rawBudget,
      images: this.images,
    };

    console.log("Create Job", payload);

    // LOGIC FOR CHECKING AUTH OR SAVE THE JOB IN PROGRESS
    // if (!this.authenticated) {
    //   localStorage.setItem("jobInProgress", JSON.stringify(payload));
    //   this.jobInProgress(payload);
    //   this.setCurrentTab(this.tabs.SIGN_IN);
    //   this.$router.push("/signin");
    // } else {
    //   // CREATE JOB ACTION
    //   console.log("Create Job", payload);
    // }
  }

  @Watch("currentStep")
  onStepChange() {
    this.validationErrors = {};
  }

  @Watch("remote")
  onRemote() {
    this.validationErrors = {};
  }

  @Watch("isFlexible")
  onIsFlexibleChange() {
    this.setDate(this.datesOption.FLEXIBLE);
  }
}
</script>

<style lang="scss" scoped>
/* GLOBAL */
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
        background-color: var(--base-dark-blue);
      }
    }
  }

  .new-job-form__step-list-title {
    font-size: 16px;
    margin-bottom: 32px;
    font-weight: bold;
  }

  .new-job__back-button {
    margin-right: 20px;
  }

  .new-job__text-input-container {
    position: relative;
    margin-top: 10px;
  }

  .new-job__input-tooltip {
    font-size: 13px;
    float: left;
    font-weight: 500;
    color: black;
    margin-bottom: 20px;
    margin-top: 18px;
    text-align: start;
  }

  .new-job__input:focus {
    outline: 1px solid var(--base-dark-blue);
  }

  .new-job__input-prepend-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
  }

  // STEP 1

  .new-job-step-1__input-description {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    width: 100%;
    height: 60px;
  }

  .new-job-step-1__input-details {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    width: 100%;
    height: 100px;
  }

  .new-job-step-1__image-input {
    ::v-deep .v-label {
      font-size: 14px;
    }
  }

  // STEP 2

  .new-job-step-2__dates-pickers-container {
    display: flex;
    flex-direction: row;
    align-self: center;
  }

  .new-job-step-2__date-input {
    font-size: 14px;
  }

  .new-job-step-2__location-buttons-container {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .new-job-step-2__location-button {
    margin-right: 10px;
  }

  .new-job-step-2__location-text-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    margin-right: 5px;
    width: 100%;
    margin-bottom: 5px;
  }

  .new-job-step2__location-icon-container {
    position: relative;
  } 

  .new-job-step2__location-input-icon {
    position: absolute;
    top: -40px;
    right: 10px;
  }

  .new-job-step-2__checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  // STEP 3

  .new-job-step-3__budget-text-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    padding-left: 40px;
  }
}
/* MOBILE ONLY*/

.new-job-form--mobile {
  display: block;
  align-items: center;
  justify-content: space-between;

  ::v-deep .base-form__body {
    width: 95% !important;
  }

  .new-job-step-2__dates-pickers-container {
    place-content: center !important;
  }

  .new-job-step-2__location-buttons-container {
    justify-content: center;    
    width: 100%;
  }

  .new-job-step-2__location-button {
    margin-right: 5px;
  }  

  .new-job-step-2__date-input {
    margin-bottom: 10px;
  }
}
</style>

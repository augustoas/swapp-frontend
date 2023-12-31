<template>
  <div :class="{ 'new-job-form': true, 'new-job-form--mobile': isMobile }">
    <div v-if="!isMobile" class="new-job-form__step-list">
      <span class="new-job-form__step-list-title">Nuevo trabajo 2</span>
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
      :validationErrors="validationErrors"
    >
      <template v-slot:content>
        <div v-if="currentStep.index === 0" class="d-flex">
          <span class="new-job__input-tooltip">
            Escribe en breves palabras lo que necesitas.
          </span>
          <textarea
            class="new-job__input new-job-step-1__input-description"
            :class="{
              'base__input-error': validationErrors.description,
            }"
            type="text"
            id="description"
            v-model="description"
            placeholder="Ej: Necesito mover un sillón"
          />
          <div class="new-job-step-1__dates-container">
            <span class="new-job__input-tooltip">
              Debes seleccionar una de las siguientes opciones.
            </span>
            <div class="new-job-step-1__dates-inputs-container">
              <BaseDatePicker
                class="new-job-step-1__date-input"
                v-model="taskDate"
                :text="'El día '"
                :secondary="
                  activeDatePicker !== datesOption.ON_DATE || taskDate === null
                "
                :show="activeDatePicker === datesOption.ON_DATE"
                @click.native="setDate(datesOption.ON_DATE)"
              />
              <BaseDatePicker
                class="new-job-step-1__date-input"
                v-model="taskBeforeDate"
                :text="'Antes del '"
                :secondary="
                  activeDatePicker !== datesOption.BEFORE_DATE ||
                  taskBeforeDate === null
                "
                :show="activeDatePicker === datesOption.BEFORE_DATE"
                @click.native="setDate(datesOption.BEFORE_DATE)"
              />
              <BaseButton
                class="new-job-step-1__date-input"
                :text="'Fecha flexible'"
                :secondary="activeDatePicker !== datesOption.FLEXIBLE"
                @click.native="setDate(datesOption.FLEXIBLE)"
              />
            </div>
            <div
              v-if="activeDatePicker === datesOption.FLEXIBLE"
              class="new-job__input-tooltip"
            >
              *** Flexible: la fecha se acordará con el trabajador
              posteriormente.
            </div>
          </div>
        </div>
        <div v-if="currentStep.index === 1" class="d-flex">
          <div class="new-job-step-2__location-buttons-container">
            <BaseButton
              class="new-job-step-2__location-button"
              :text="'En Persona'"
              :secondary="remote"
              :minWidth="'150px'"
              @click="remote = false"
            />
            <BaseButton
              class="new-job-step-2__location-button"
              :text="'Remoto'"
              :secondary="!remote"
              :minWidth="'150px'"
              @click="remote = true"
            />
          </div>
          <span class="new-job__input-tooltip">
            Selecciona Remoto si se puede realizar el trabajo de manera remota.
          </span>
          <div v-if="!remote">
            <div class="new-job__text-input-container">
              <vue-google-autocomplete
                class="new-job__input new-job-step-2__location-text-input"
                id="map"
                ref="address"
                classname="form-control"
                placeholder="Dirección"
                @placechanged="getAddressData"
                :country="['cl']"
                :types="'geocode'"
              ></vue-google-autocomplete>
              <BaseIcon
                class="new-job__input-icon"
                :fill="true"
                :icon="globalIcons.mapIcon"
                :width="25"
                :height="25"
                :viewBox="'0 0 25 25'"
                :color="'var(--purple)'"
              />
            </div>
            <span class="new-job__input-tooltip">
              Escribe la dirección donde requieres el trabajo (se puede detallar
              más adelante).
            </span>
          </div>
        </div>
        <div v-if="currentStep.index === 2" class="d-flex">
          <span class="new-job__input-tooltip">
            Escribe todos los detalles que haya que considerar.
          </span>
          <textarea
            class="new-job__input new-job-step-3__input-details"
            :class="{
              'base__input-error': validationErrors.details,
            }"
            type="text"
            id="details"
            v-model="details"
            placeholder="Escriba un resumen de los detalles claves"
          />
        </div>
        <div v-if="currentStep.index === 3" class="d-flex">
          <span class="new-job__input-tooltip">
            Podrás negociar el precio final más adelante.
          </span>
          <div class="new-job__text-input-container">
            <input
              class="new-job__input new-job-step-4__budget-text-input"
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
              :color="'var(--purple)'"
            />
          </div>
        </div>
      </template>
      <template v-slot:inputs>
        <BaseButton
          v-if="currentStep.index > 0"
          class="new-job__back-button"
          :text="'Volver'"
          :minWidth="'150px'"
          :secondary="true"
          @click="previousStep"
        />
        <BaseButton
          :text="currentStep.index !== 3 ? 'Continuar' : 'Finalizar'"
          :minWidth="'150px'"
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
import { EventBus } from "@/utils/eventBus";

import { Component, Mixins, Watch } from "vue-property-decorator";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import loadGoogleMapsScript from "@/plugins/googlemaps";

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
    VueGoogleAutocomplete,
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
      title: "Título y Fecha",
      subtitle: "¿Qué necesitas y cuándo?",
      index: 0,
    },
    {
      id: "location",
      title: "Ubicación",
      subtitle: "Dinos dónde,",
      index: 1,
    },
    {
      id: "details",
      title: "Detalles",
      subtitle: "Detalles a considerar",
      index: 2,
    },
    {
      id: "budget",
      title: "Precio",
      subtitle: "¿Cuánto te gustaría pagar?",
      index: 3,
    },
  ];
  public currentStep = this.steps[0];

  public description = "";
  public date = null;
  public taskDate = null;
  public taskBeforeDate = null;
  public dateType = null;
  public location = null;
  public details = "";
  public rawBudget = null;
  public formattedBudget = null;
  public remote = false;

  created() {
    loadGoogleMapsScript(this.$i18n.locale)
      .then(() => {
        // The Google Maps script is loaded, you can use the Google Maps API now
      })
      .catch((error) => {
        // Handle any errors that occurred while loading the Google Maps script
        console.error("An error occurred:", error);
      });
  }

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
        ...this.location,
        remote: false,
      };
    }
  }

  public validateInputs(): boolean {
    this.validationErrors = {};

    // Validations for STEP 1
    if (this.currentStep.index === 0) {
      this.validationErrors.description = validateDescription(this.description);
      this.validationErrors.date = validateDate(this.dateType, this.date);
    }

    // Validations for STEP 2
    if (this.currentStep.index === 1) {
      this.validationErrors.location = validateLocation(
        this.remote,
        this.location
      );
    }

    // Validations for STEP 3
    if (this.currentStep.index === 2) {
      this.validationErrors.details = validateDetails(this.details);
    }

    // Validations for STEP 4
    if (this.currentStep.index === 3) {
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

  public setDate(option) {
    this.activeDatePicker = option;

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
      this.dateType = 3;
    }
  }

  public getAddressData(addressData) {
    this.location = addressData;
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
      date: this.date,
      location: this.finalLocation,
      details: this.details,
      budget: this.rawBudget,
    };

    if (!this.authenticated) {
      console.log(
        "first sign in / sign up... storing payload on the localStorage"
      );
      localStorage.setItem("jobInProgress", JSON.stringify(payload));
      this.jobInProgress(payload);
      EventBus.$emit("updateCurrentTab", this.tabs.SIGN_IN);
      this.$router.push("/signin");
    } else {
      console.log("creating job ...", payload); // CREATE JOB ACTION
    }
  }

  @Watch("currentStep")
  onStepChange() {
    this.validationErrors = {};
  }

  @Watch("remote")
  onRemote() {
    this.validationErrors = {};
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
        background-color: var(--purple);
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
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: start;
  }

  .new-job__input:focus {
    outline: 1px solid var(--purple);
  }

  .new-job__input-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
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
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
  }

  .new-job-step-1__dates-container {
    display: flex;
    flex-direction: column;
  }

  .new-job-step-1__dates-inputs-container {
    display: flex;
    margin-bottom: 20px;
  }

  .new-job-step-1__date-input {
    font-size: 14px;
  }

  // STEP 2

  .new-job-step-2__location-buttons-container {
    display: flex;
  }

  .new-job-step-2__location-button {
    margin-right: 20px;
  }

  .new-job-step-2__location-text-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 5px;
    width: 100%;
  }

  // STEP 3

  .new-job-step-3__input-details {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
  }

  // STEP 4

  .new-job-step-4__budget-text-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    padding-left: 40px;
  }

  .new-job-step-4__budget-icon {
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

  .new-job-step-1__dates-inputs-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .new-job-step-1__date-input {
    margin-bottom: 10px;
  }
}
</style>

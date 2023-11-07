<template>
  <div :class="{ 'auth-form': true, 'auth-form--mobile': isMobile }">
    <div class="auth-form__section">
      <h2 class="auth-form__title">{{ componentMapping[component].title }}</h2>
      <div class="auth-form__divider-line"></div>
      <h2 class="auth-form__subtitle">Te damos la bienvenida a Swapp</h2>
    </div>
    <div class="auth-form__body">
      <div class="auth-form__input-group">
        <input
          class="auth-form__input"
          :class="{ 'auth-form__input-error': validationErrors.email }"
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="auth-form__input-group auth-form__input-group--password">
        <input
          class="auth-form__input"
          :class="{ 'auth-form__input-error': validationErrors.password }"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          :type="showPassword ? 'text' : 'password'"
        />
        <div class="auth-form__password-icon" @click="togglePassword">
          <BaseIcon
            class="auth-form__toggle-password"
            :fill="true"
            :icon="
              showPassword
                ? globalIcons.hidePasswordIcon
                : globalIcons.showPasswordIcon
            "
            :width="25"
            :height="25"
            :viewBox="'0 0 25 25'"
            :color="'var(--purple)'"
          />
        </div>
      </div>
      <div
        v-if="isSignUp"
        class="auth-form__input-group auth-form__input-group--password"
      >
        <input
          class="auth-form__input"
          :class="{
            'auth-form__input-error': validationErrors.confirmPassword,
          }"
          id="confirm-password"
          v-model="confirmPassword"
          placeholder="Repeat your password"
          type="password"
        />
      </div>
      <div
        v-if="!isLoading && error.message && !hasValidationErrors"
        class="auth-form__error-message"
      >
        {{ error.message }}.
      </div>
      <div v-for="(errorList, key) in validationErrors" :key="key">
        <div
          v-for="(error, index) in errorList"
          :key="index"
          class="auth-form__error-message"
        >
          {{ error }}
        </div>
      </div>
      <div class="auth-form__forgot-password" v-if="!isSignUp">
        <a href="#">Forgot password?</a>
      </div>
      <BaseButton
        v-if="!isLoading"
        class="auth-form__button"
        :text="'Continue'"
        :isSquare="true"
        @click="isSignUp ? onSignUp() : onSignIn()"
      ></BaseButton>
      <v-progress-circular
        class="auth-form__circular-progress"
        v-if="isLoading"
        indeterminate
        size="40"
      ></v-progress-circular>
      <p class="auth-form__signup-prompt">
        {{ componentMapping[component].questionText }}
        <a href="#" @click="navigateToPath(isSignUp ? '/signin' : '/signup')">{{
          componentMapping[component].textButton
        }}</a>
      </p>
      <div class="auth-form__alternative-logins">
        <button @click="signInWith('Google')">Login with Google</button>
        <button @click="signInWith('Facebook')">Login with Facebook</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { ActionsSignatures, State } from "@/store/auth";

import { globalIcons } from "@/assets/icons/icons";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validations";

import BaseIcon from "@/components/Base/BaseIcon.vue";
import BaseButton from "@/components/Base/BaseButton.vue";

const auth = namespace("auth");

@Component({
  components: {
    BaseButton,
    BaseIcon,
  },
})
export default class AuthForm extends Mixins(ResponsiveMixin) {
  @Prop({ required: true }) readonly component!: string;

  public isLoading = false;
  public validationErrors: Record<string, string[]> = {};

  public globalIcons = globalIcons;

  public componentMapping = {
    SignIn: {
      title: "Iniciar Sesión",
      questionText: "Don't have an account?",
      textButton: "Sign up",
    },
    SignUp: {
      title: "Registrarse",
      questionText: "Already have an account?",
      textButton: "Sign in",
    },
  };

  public email = "";
  public password = "";
  public confirmPassword = "";
  public showPassword = false;

  @auth.State("error")
  public error!: State["error"];

  @auth.Action
  public signIn!: ActionsSignatures["signIn"];

  @auth.Action
  public signUp!: ActionsSignatures["signUp"];

  get isSignUp(): boolean {
    return this.component === "SignUp";
  }

  get hasValidationErrors(): boolean {
    return Object.keys(this.validationErrors).length > 0;
  }

  public navigateToPath(path) {
    if (this.$route.path !== path) {
      this.$router.push(path);
    }
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  public validateInputs(): boolean {
    this.validationErrors = {};

    const emailResult = validateEmail(this.email);
    if (emailResult.errors.length > 0) {
      this.validationErrors.email = emailResult.errors;
    }

    const passwordResult = validatePassword(this.password);
    if (passwordResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.password = passwordResult.errors;
    }

    const confirmPasswordResult = validateConfirmPassword(
      this.password,
      this.confirmPassword
    );
    if (confirmPasswordResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.confirmPassword = confirmPasswordResult.errors;
    }

    return Object.keys(this.validationErrors).length === 0;
  }

  public async onSignIn() {
    if (!this.validateInputs()) return;

    const payload = {
      email: this.email,
      password: this.password,
    };

    this.isLoading = true;

    await this.signIn(payload);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.isLoading = false;
  }

  public async onSignUp() {
    if (!this.validateInputs()) return;

    const payload = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.isLoading = true;

    await this.signUp(payload);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.isLoading = false;
  }

  public signInWith(platform) {
    console.log("signInWith: ", platform);
    // Handle logic for third-party login
  }

  @Watch("component")
  onComponentChange() {
    this.validationErrors = {};
  }
}
</script>

<style lang="scss">
.auth-form {
  max-width: 568px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px !important;
  margin-bottom: 32px !important;
  border: 1px solid #b0b0b0 !important;
  border-radius: 12px !important;
  padding-bottom: 20px;
}

.auth-form__body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.auth-form__body * {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.auth-form__section {
  width: 100%;
  margin-bottom: 20px;
}

.auth-form__title {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
}

.auth-form__subtitle {
  font-size: 20px;
  color: #222222;
  font-weight: 600;
  margin-top: 25px;
  margin-left: 55px;
  float: left;
}

.auth-form__divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
}

.auth-form__input-group {
  margin-bottom: 20px;
  width: 100%;
  &--password {
    position: relative;
  }
}

.auth-form__input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.auth-form__input-error {
  border: 1px solid red !important;
}
.auth-form__error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-align: left;
}

.auth-form__toggle-password {
  position: absolute;
  top: 10px;
  right: 65px;
  width: 25px;
  cursor: pointer;
}

.auth-form__forgot-password {
  font-size: 14px;
  text-align: right;
}

.auth-form__button {
  background-color: var(--purple);
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.auth-form__circular-progress {
  margin: 20px 0px 20px 0px;
}

.auth-form__signup-prompt {
  font-size: 14px;
  margin-bottom: 20px;
}

.auth-form__alternative-logins button {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 10px;
  font-size: 14px;
  cursor: pointer;
}

/* MOBILE SPECIFIC */

.auth-form--mobile {
  border: none !important;
}
</style>

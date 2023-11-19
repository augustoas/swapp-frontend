<template>
  <BaseForm
    class="auth-form"
    :title="componentMapping[component].title"
    :subtitle="componentMapping[component].subtitle"
    :validationErrors="validationErrors"
  >
    <template v-slot:content>
      <div class="auth-form__input-group">
        <input
          class="auth-form__input"
          :class="{ 'base__input-error': validationErrors.email }"
          type="email"
          id="email"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div v-if="isSignUp" class="auth-form__input-group-names">
        <input
          class="auth-form__input"
          :class="{ 'base__input-error': validationErrors.firstName }"
          type="text"
          id="first-name"
          v-model="firstName"
          placeholder="First name"
        />
        <input
          class="auth-form__input"
          :class="{ 'base__input-error': validationErrors.lastName }"
          type="text"
          id="last-name"
          v-model="lastName"
          placeholder="Last name"
        />
      </div>
      <div class="auth-form__input-group auth-form__input-group--password">
        <input
          class="auth-form__input"
          :class="{ 'base__input-error': validationErrors.password }"
          id="password"
          v-model="password"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
        />
        <div @click="togglePassword">
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
            'base__input-error': validationErrors.confirmPassword,
          }"
          id="confirm-password"
          v-model="confirmPassword"
          placeholder="Confirm password"
          type="password"
        />
      </div>
      <div
        v-if="!isLoading && error.message && !hasValidationErrors"
        class="base__error-message"
      >
        {{ error.message }}.
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
        <a href="#" @click="navigateToPath(isSignUp ? '/signin' : '/signup')">
          {{ componentMapping[component].textButton }}
        </a>
      </p>
      <div class="auth-form__alternative-logins">
        <button @click="signInWith('Google')">Login with Google</button>
        <button @click="signInWith('Facebook')">Login with Facebook</button>
      </div>
    </template>
  </BaseForm>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { ActionsSignatures, State } from "@/store/auth";

import { globalIcons } from "@/assets/icons/icons";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateOnlyText,
} from "@/utils/validations";

import BaseForm from "@/components/Base/BaseForm.vue";
import BaseIcon from "@/components/Base/BaseIcon.vue";
import BaseButton from "@/components/Base/BaseButton.vue";

const auth = namespace("auth");

@Component({
  components: {
    BaseForm,
    BaseButton,
    BaseIcon,
  },
})
export default class AuthForm extends Vue {
  @Prop({ required: true }) readonly component!: string;

  public isLoading = false;
  public validationErrors: Record<string, string[]> = {};

  public globalIcons = globalIcons;

  public componentMapping = {
    SignIn: {
      title: "Iniciar Sesión",
      subtitle: "Te damos la bienvenida a Swapp",
      questionText: "Don't have an account?",
      textButton: "Sign up",
    },
    SignUp: {
      title: "Registrarse",
      subtitle: "Te damos la bienvenida a Swapp",
      questionText: "Already have an account?",
      textButton: "Sign in",
    },
  };

  public email = "";
  public password = "";
  public confirmPassword = "";
  public firstName = "";
  public lastName = "";
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

    const emailResult = validateEmail(this.email, "Email");
    if (emailResult.errors.length > 0) {
      this.validationErrors.email = emailResult.errors;
    }

    const passwordResult = validatePassword(this.password, "Password");
    if (passwordResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.password = passwordResult.errors;
    }

    const confirmPasswordResult = validateConfirmPassword(
      this.password,
      this.confirmPassword,
      "Password"
    );
    if (confirmPasswordResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.confirmPassword = confirmPasswordResult.errors;
    }

    const firstNameResult = validateOnlyText(this.firstName, "First name");
    if (firstNameResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.firstName = firstNameResult.errors;
    }

    const lastNameResult = validateOnlyText(this.lastName, "Last name");
    if (lastNameResult.errors.length > 0 && this.isSignUp) {
      this.validationErrors.lastName = lastNameResult.errors;
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

    const success = await this.signIn(payload);

    this.isLoading = false;

    if (success) {
      this.$router.push({ name: "home" });
    }
  }

  public async onSignUp() {
    if (!this.validateInputs()) return;

    const payload = {
      email: this.email,
      password: this.password,
      firstname: this.firstName,
      lastname: this.lastName,
    };

    this.isLoading = true;

    const success = await this.signUp(payload);

    this.isLoading = false;

    if (success) {
      this.$router.push({ name: "signin" });
    }
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

<style lang="scss" scoped>
.auth-form__input-group {
  margin-bottom: 20px;
  width: 100%;
  &--password {
    position: relative;
  }
}

.auth-form__input-group-names {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
}

.auth-form__input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 5px;
  width: 100%;
}

.auth-form__toggle-password {
  position: absolute;
  top: 10px;
  right: 20px;
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
</style>

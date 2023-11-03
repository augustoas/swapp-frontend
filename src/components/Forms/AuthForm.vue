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
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="auth-form__input-group auth-form__input-group--password">
        <input
          class="auth-form__input"
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
          id="repeat-password"
          v-model="password"
          placeholder="Repeat your password"
          type="password"
        />
      </div>
      <div v-if="error.message">{{ error.message }}.</div>
      <div class="auth-form__forgot-password">
        <a href="#">Forgot password?</a>
      </div>
      <BaseButton
        class="auth-form__button"
        :text="'Continue'"
        :isSquare="true"
        @click="onSignIn"
      ></BaseButton>
      <p class="auth-form__signup-prompt">
        Don't have an account? <a href="#">Sign up</a>
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
import { Component, Mixins, Prop } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";

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

  public globalIcons = globalIcons;

  public componentMapping = {
    SignIn: {
      title: "Iniciar Sesión",
    },
    SignUp: {
      title: "Registrarse",
    },
  };

  public email = "";
  public password = "";
  public showPassword = false;

  @auth.State("error")
  public error!: State["error"];

  @auth.Action
  public signIn!: ActionsSignatures["signIn"];

  get isSignUp(): boolean {
    return this.component === "SignUp";
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  public async onSignIn() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.signIn(payload);
  }

  public signInWith(platform) {
    console.log("signInWith: ", platform);
    // Handle logic for third-party login
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
  margin-bottom: 20px;
}

.auth-form__button {
  background-color: var(--purple);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
}

.auth-form__signup-prompt {
  font-size: 14px;
  margin-bottom: 20px;
}

.auth-form__alternative-logins button {
  width: 100%;
  display: flex;
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

/* MOBILE SPECIFIC */

.auth-form--mobile {
  border: none !important;
}
</style>

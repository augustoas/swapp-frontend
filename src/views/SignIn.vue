<template>
  <div :class="{ 'sign-in': true, 'sign-in--mobile': isMobile }">
    <div class="sign-in__section">
      <h2 class="sign-in__title">{{ componentMapping[component].title }}</h2>
      <div class="sign-in__divider-line"></div>
      <h2 class="sign-in__subtitle">Te damos la bienvenida a Swapp</h2>
    </div>
    <div class="sign-in__body">
      <div class="sign-in__input-group">
        <input
          class="sign-in__input"
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
        />
      </div>
      <div class="sign-in__input-group sign-in__input-group--password">
        <input
          class="sign-in__input"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          :type="showPassword ? 'text' : 'password'"
        />
        <div @click="togglePassword">
          <BaseIcon
            class="sign-in__toggle-password"
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
      <div v-if="error.message">{{ error.message }}.</div>
      <div class="sign-in__forgot-password">
        <a href="#">Forgot password?</a>
      </div>
      <BaseButton
        class="sign-in__button"
        :text="'Continue'"
        :isSquare="true"
        @click="onSignIn"
      ></BaseButton>
      <p class="sign-in__signup-prompt">
        Don't have an account? <a href="#">Sign up</a>
      </p>
      <div class="sign-in__alternative-logins">
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
import { Component, Mixins } from "vue-property-decorator";
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
export default class SignIn extends Mixins(ResponsiveMixin) {
  public globalIcons = globalIcons;

  public email = "";
  public password = "";
  public showPassword = false;
  public component = "SignIn";

  public componentMapping = {
    SignIn: {
      title: "Iniciar Sesión",
    },
    SignUp: {
      title: "Registrarse",
    },
  };

  @auth.State("error")
  public error!: State["error"];

  @auth.Action
  public signIn!: ActionsSignatures["signIn"];

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
.sign-in {
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

.sign-in__body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.sign-in__body * {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.sign-in__section {
  width: 100%;
  margin-bottom: 20px;
}

.sign-in__title {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
}

.sign-in__subtitle {
  font-size: 20px;
  color: #222222;
  font-weight: 600;
  margin-top: 25px;
  margin-left: 55px;
  float: left;
}

.sign-in__divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
}

.sign-in__input-group {
  margin-bottom: 20px;
  width: 100%;
  &--password {
    position: relative;
  }
}

.sign-in__input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.sign-in__toggle-password {
  position: absolute;
  top: 10px;
  right: -140px;
  cursor: pointer;
}

@media (max-width: 540px) {
  .sign-in__toggle-password {
    right: -130px;
  }
}

@media (max-width: 450px) {
  .sign-in__toggle-password {
    right: -100px;
  }
}

.sign-in__forgot-password {
  font-size: 14px;
  text-align: right;
  margin-bottom: 20px;
}

.sign-in__button {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}

.sign-in__signup-prompt {
  font-size: 14px;
  margin-bottom: 20px;
}

.sign-in__alternative-logins button {
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

.sign-in--mobile {
  border: none !important;
}
</style>

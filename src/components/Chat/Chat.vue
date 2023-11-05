<template>
  <div :class="{ 'chat-form': true, 'chat-form--mobile': isMobile }">
    <div class="chat-form__section">
      <h2 class="chat-form__title">Chat</h2>
      <div class="chat-form__divider-line"></div>
      <h2 class="chat-form__subtitle">Send message</h2>
    </div>
    <div class="chat-form__body">
      <div class="chat-form__input-group">
        <input
          class="chat-form__input"
          type="email"
          id="email"
          v-model="inputMessage"
          placeholder="Enter your email"
        />
      </div>
      <BaseButton
        class="chat-form__button"
        :text="'Send'"
        :isSquare="true"
        @click="sendMessage"
      ></BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { State } from "@/store/auth";

import { Component, Mixins } from "vue-property-decorator";
import ResponsiveMixin from "@/mixins/responsiveMixin";
import { io, Socket } from "socket.io-client";

import BaseButton from "@/components/Base/BaseButton.vue";

const auth = namespace("auth");

interface Message {
  sender: string;
  to: string;
  text: string;
  timestamp: number;
}

@Component({
  components: {
    BaseButton,
  },
})
export default class Chat extends Mixins(ResponsiveMixin) {
  @auth.State("auth")
  public auth!: State["auth"];

  readonly messages!: Message[];
  private inputMessage = "";
  private socket: Socket | null = null;

  created() {
    console.log("created: create socket connection");
    // this.socket = io("http://localhost:3000");

    // this.socket.on("receive_message", (message: Message) => {
    //   this.messages.push(message);
    // });
  }

  public sendMessage() {
    if (this.inputMessage.trim()) {
      const message: Message = {
        sender: "user1@gmail.com", // Replace with dynamic username or ID
        to: "user2@gmail.com",
        text: this.inputMessage,
        timestamp: Date.now(), // simple ID based on current time
      };
      console.log("message", message);
      // this.socket?.emit("send_message", message);
      this.inputMessage = "";
    }
  }

  beforeDestroy() {
    // Disconnect socket when component is destroyed
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
</script>

<style lang="scss">
.chat-form {
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

.chat-form__body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.chat-form__body * {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.chat-form__section {
  width: 100%;
  margin-bottom: 20px;
}

.chat-form__title {
  font-size: 16px;
  color: #222222;
  font-weight: 600;
}

.chat-form__subtitle {
  font-size: 20px;
  color: #222222;
  font-weight: 600;
  margin-top: 25px;
  margin-left: 55px;
  float: left;
}

.chat-form__divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
}

.chat-form__input-group {
  margin-bottom: 20px;
  width: 100%;
  &--password {
    position: relative;
  }
}

.chat-form__input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.chat-form__button {
  background-color: var(--purple);
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}

/* MOBILE SPECIFIC */

.chat-form--mobile {
  border: none !important;
}
</style>

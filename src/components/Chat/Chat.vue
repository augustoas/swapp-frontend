<template>
  <div :class="{ 'chat-form': true, 'chat-form--mobile': isMobile }">
    <div class="chat-form__section">
      <h2 class="chat-form__title">Chat</h2>
      <div class="chat-form__divider-line"></div>
      <div class="chat-form__chat-messages">
        <div
          v-for="message in messages"
          :key="message.timestamp"
          :class="{
            'chat-form__message': true,
            'chat-form__message--own': isOwnMessage(message),
          }"
        >
          <p class="chat-form__message__content">{{ message.message }}</p>
          <span class="chat-form__message__timestamp">{{
            formatDate(message.timestamp)
          }}</span>
        </div>
      </div>
    </div>
    <div class="chat-form__body">
      <div class="chat-form__input-group">
        <input
          class="chat-form__input"
          type="text"
          id="text-input"
          v-model="inputMessage"
          placeholder="Send message"
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
  emailJobCreator: string;
  emailJobWorker: string;
  messageOwner: string;
  message: string;
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

  public messages: Message[] = [];
  private inputMessage = "";
  private socket: Socket | null = null;

  created() {
    console.log("created: create socket connection");
    this.socket = io("http://localhost:4000");

    this.socket.on("createChat", (message: Message) => {
      console.log("createChat message", message);
      // this.messages.push(message);
    });

    this.socket.on("findAllChat", (messages: Message[]) => {
      console.log("findAllChat message", messages);
      this.messages = messages;
    });
  }

  public sendMessage() {
    if (this.inputMessage.trim()) {
      const payload: Message = {
        emailJobCreator: "user1@gmail.com", // Replace with dynamic username or ID
        emailJobWorker: "user2@gmail.com",
        messageOwner: "augusto.alvarez.smith@gmail.com",
        message: this.inputMessage,
        timestamp: Date.now(), // simple ID based on current time
      };
      console.log("message", payload);
      console.log("socket", this.socket);
      this.socket?.emit("createChat", payload);
      this.socket?.emit("findAllChat", {
        emailJobCreator: "user1@gmail.com", // Replace with dynamic username or ID
        emailJobWorker: "user2@gmail.com",
      });
      this.inputMessage = "";
    }
  }

  public isOwnMessage(message: Message): boolean {
    return this.auth?.user.email === message.messageOwner; // Assuming this.auth.userEmail contains the email of the current user.
  }

  public formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
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
  background-color: var(--base-dark-blue);
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.chat-form__chat-messages {
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.chat-form__message {
  max-width: 70%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #f0f0f0;

  &--own {
    background-color: #dcf8c6; // Light green background for own messages
    margin-left: auto;
    text-align: right;
  }
}

.chat-form__message__content {
  margin: 0;
}

.chat-form__message__timestamp {
  font-size: 10px;
  opacity: 0.7;
}

/* MOBILE SPECIFIC */

.chat-form--mobile {
  border: none !important;
}
</style>



<template>
  <div>
    <h1>Login</h1>
    <form v-on:submit="login">
      <input type="text" v-model="username" name="username" placeholder="Username">
      <input type="password" v-model="password" name="password" placeholder="Password">

      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script>
import UserClient from "@/clients/user-client.js";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "login",

  data() {
    return {
      user: null,
      token: "",
      username: "",
      password: ""
    };
  },

  methods: {
    login(e) {
      // Sprecavamo default-no ponasanje forme
      e.preventDefault();

      const user = {
        username: this.username,
        password: this.password
      };

      UserClient.login(user, this);
      // this.$emit("login", user);

      this.username = "";
      this.password = "";

      // Sprecavamo default-no ponasanje forme
      return false;
    },
    loginFinished(user) {
      this.$emit("login", user);
    }
  }
};
</script>

<style scoped>
</style>
<!-- Template je HTML parce koda koje ce biti ubaceno u DOM. 
import { try } from 'q';
Posto se ova komponenta renderuje u main.js, ovaj HTML kod ce zavrsiti umetnut u div sa id-jem app.
Template mora da ima samo jedan root HTML element! -->
<template>
  <!-- root element -->
  <div>
    <ul>
      <router-link tag="li" to="/" v-if="user != null">
        <a>Home</a>
      </router-link>
      <!-- <router-link tag="li" to="/shop">
        <a>Shop</a>
      </router-link>-->
      <router-link tag="li" to="/user" v-if="user != null && user.role == 'ADMIN'">
        <a>User</a>
      </router-link>

      <li class="float-right" v-if="user != null">
        <a href="#" @click="logout">Logout</a>
      </li>

      <router-link tag="li" to="/login" v-else>
        <a>Login</a>
      </router-link>

      <li class="float-right" v-if="user != null">
        <p>{{ user.firstName }} {{ user.lastName }}</p>
      </li>
    </ul>

    <router-view v-on:login="login" v-bind:user="user"></router-view>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user:
        window.localStorage.getItem("user") != null
          ? JSON.parse(window.localStorage.getItem("user"))
          : null
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("user");
      this.user = null;
      this.$router.push("login");
    },
    login(user) {
      if (user != null) {
        this.user = user;
        this.$router.push("home");
      } else {
        alert("Wrong credentials!");
      }
    }
  },
  mounted() {
    const now = Date.now().valueOf() / 1000;

    let token = window.localStorage.getItem("token");
    let decoded = VueJwtDecode.decode(token);

    if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
      console.log(`token expired: ${JSON.stringify(decoded)}`);
      this.$router.push({ path: "/login" });
      this.user = null;
    }

    if (this.user == null) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<!-- Style je sekcija namenjena za CSS. Ukoliko style poseduje keyword scoped, to znaci da ce 
CSS biti primenjen iskljucivo na tu komponentu. -->

<style>
body {
  background-color: #fafafa;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  font-size: 1em;
  text-decoration: none;
}

li p {
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  padding: 14px 16px;
  margin: 0;
}

li a:hover {
  background-color: #111;
}

.router-link-exact-active {
  background-color: #4caf50 !important;
}

.float-right {
  float: right;
}
</style>

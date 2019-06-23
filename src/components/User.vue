

<template>
  <div>
    <h1>Add user</h1>
    <form v-on:submit="addUser">
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" v-model="firstName" required>
      </div>

      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" v-model="lastName" required>
      </div>

      <div class="form-group">
        <label>Role:</label>
        <select v-model="role" required>
          <option value="ADMIN">Admin</option>
          <option value="OPERATOR">Operator</option>
        </select>
      </div>

      <div class="form-group">
        <label>Username:</label>
        <input type="text" v-model="username" required>
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" required>
      </div>

      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script>
import UserClient from "@/clients/user-client.js";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      role: "",
      username: "",
      password: ""
    };
  },
  methods: {
    addUser(e) {
      e.preventDefault();

      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        username: this.username,
        password: this.password
      };

      console.log(user);
      UserClient.register(user);

      this.firstName = "";
      this.lastName = "";
      this.role = "";
      this.username = "";
      this.password = "";

      return false;
    }
  }
};
</script>

<style scoped>
label {
  margin-right: 10px;
}

.form-group {
  margin: 12px 0;
}
</style>


<template>
<form
  id="app"
>

  <p v-if="error" :class="{ error }">
    <b>Incorrect information</b>
  </p>

    <p v-if="success" :class="{ success }">
    <b>Correct information</b>
  </p>

  <p>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="user.name"
      type="text"
      name="name"
    >
  </p>

  <p>
    <label for="surname">Surname</label>
    <input
      id="surname"
      v-model="user.surname"
      type="text"
      name="surname"
    >
  </p>

  <p>
    <label for="age">Age</label>
    <input
      id="age"
      v-model="user.age"
      type="number"
      name="age"
      min="0"
    >
  </p>
  <p>
    <input
    type="submit"
        @click.prevent="submit"
    >
  </p>

</form>
</template>

<script lang="ts">
import Vue from 'vue';
import UserModel from './../models/UserModel'

export default Vue.extend({
  name: 'UserForm',
  data() {
     return {
        error: false,
        success: false,
        user: {} as UserModel,
    } 
  },
  methods:{
    submit() {
        this.error = false;
        this.success = false;

        if(!this.user.name || !this.user.surname || !this.user.age) {
            this.error = true;
        } else {
            this.success = true;
        }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .error {
        color: red;
    }

    .success {
        color: green;
    }
</style>

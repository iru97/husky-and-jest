<template>
  <div>
    <user-form/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserForm from "../components/Form.vue";

export default Vue.extend({
  name: 'Users',
  components: {
    UserForm,
  }
})
</script>


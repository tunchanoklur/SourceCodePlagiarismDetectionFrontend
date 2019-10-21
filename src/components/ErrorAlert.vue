<template>
  <div>
    <v-alert
      text
      prominent
      type="error"
    >
      <h3>{{title}}</h3>
      <v-divider
        style="opacity: 0.22"
      ></v-divider>
      <div>{{message}}</div>
    </v-alert>
  </div>
</template>

<script>
  export default {
    props:['title','message'],
    methods:{
    }
  }
</script>
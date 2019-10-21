<template>
  <div>
    <v-alert
      v-model="show_control"
      text
      prominent
      type="error"
      dismissible
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
    props:['show','title','message'],
    data() {
      return {
        show_control: false
      };
    },
    created(){
      this.show_control = this.show
    },
    watch: {
      show: function(){
        this.show_control = this.show
      }
    }
  }
</script>
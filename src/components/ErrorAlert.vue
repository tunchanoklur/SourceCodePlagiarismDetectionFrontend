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
      <div v-if="message.error_type" >
        <div>Type : {{message.error_type}}</div>
        <div>File : {{message.file}}</div>
        <div>Line : {{message.line}}</div>
        <div>Message : {{message.msg}}</div>
        <SourceCodeSheet
          :datas="message.fileinfo.split(
            '\n'
          )"
          :locs="[message.line]"
        />
      </div>
      <div v-else>
        {{message}}
      </div>
    </v-alert>
  </div>
</template>

<script>
import SourceCodeSheet from '@/components/SourceCodeSheet'
  export default {
    props:['show','title','message'],
    components:{SourceCodeSheet},
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
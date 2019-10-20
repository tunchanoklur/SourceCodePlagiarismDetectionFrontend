<template>
  <div>
    <v-card>
      <v-card-title class="headline font-weight-regular black white--text">
        <span style="font-size:32px">
          <b>Home</b>
        </span>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap align-center>
          <v-flex xs12 md12 lg12>
            <br>
            <MultifileInput filetype=".c" label="Select source code files" v-model="filelist"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MultifileInput from "@/components/MultifileInput"
export default {
  name: 'Home',
  components: {
    MultifileInput
  },
  data:function(){
    return{
      filelist:[]
    }
  },
  watch:{
    filelist: function(){
      /* eslint-disable no-console */
      console.log(this.filelist);
      /* eslint-enable no-console */
    }
  }
};
</script>

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
            <MultifileInput filetype=".c" label="Select source code files" :value="filelist" v-model="filelist"/>
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
      filelist:[],
      filelist_processed:[]
    }
  },
  watch:{
    filelist: function(){
      this.filelist_processed = this.processFile(this.filelist)
    }
  },
  methods:{
    processFile(files) {
      let result = []
      result = []
      Array.from(files).forEach((file,key) => {
        const fileReader = new FileReader();
        const getResult = new Promise(() => {
          fileReader.onload = e => {
            result.push({
              id: key,
              filename: file.name,
              fileinfo: e.target.result
            });
            /* eslint-disable no-console */
            //console.log("INFO", typeof(e.target.result));
            /* eslint-enable no-console */
          };
        });

        fileReader.readAsText(file);
        return getResult.then(file => {
          return file;
        });
      });
      return result
    },
  }
};
</script>

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
            <br>
            <div class="text-center">
              <v-btn rounded color="rgba(0,0,0,.87)" dark @click="submit()">Submit</v-btn>
            </div>
            <div>{{result}}</div>
            <div>{{error}}</div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import MultifileInput from "@/components/MultifileInput"
import axios from "axios"
export default {
  name: 'Home',
  components: {
    MultifileInput
  },
  data:function(){
    return{
      filelist:[],
      filelist_processed:[],
      result:null,
      error:null
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
              fileinfo: e.target.result.replace(/\\n/gim,`\\\\n`)
            });
          };
        });

        fileReader.readAsText(file);
        return getResult.then(file => {
          return file;
        });
      });
      return result
    },
    async submit(){
      await axios.post('/getsimscore',{filelist:this.filelist_processed})
      .then((result) => {
        this.result = result
      })
      .catch((err) => {
        this.error = err
      })
    }
  },
};
</script>

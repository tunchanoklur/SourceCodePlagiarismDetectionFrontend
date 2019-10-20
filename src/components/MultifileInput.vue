<template>
    <div>
        <v-file-input small-chips multiple
            :accept="filetype"
            :label="label"
            :value="local"
            @input="updateFilelist()"
        ></v-file-input>
    </div>
</template>

<script>
export default {
  name: 'MultifileInput',
  props: [
    'filetype','label','value'
  ],
  data:function(){
    return{
      local:[]
    }
  },
  methods:{
      updateFilelist(){
        /* eslint-disable no-console */
        console.log(this.local);
        /* eslint-enable no-console */
      }
  }
}
</script>

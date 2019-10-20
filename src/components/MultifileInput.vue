<template>
    <div>
        <v-file-input small-chips multiple
            :accept="filetype"
            :label="label"
            :value="value"
            @change="updateValue"
        ></v-file-input>
    </div>
</template>

<script>
export default {
  name: 'MultifileInput',
  props: [
    'filetype','label','value'
  ],
  methods:{
    updateValue(files){
        this.$emit('input',files)
    }
  }
}
</script>

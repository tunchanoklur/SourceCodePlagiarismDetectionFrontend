<template>
  <v-simple-table :fixed-header="true" height="400px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" v-for="header in headers" :key="header">{{header}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data,i) in datas" :key="i" @click="$emit('row_clicked',data)">
          <td class="text-left" v-for="(field,j) in fields" :key="j">{{ data[field] }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    props:['headers','datas','fields'],
    data () {
      return {
      }
    },
  }
</script>
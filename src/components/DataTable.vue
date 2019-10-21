<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :fixed-header="true"
      :headers="headers"
      :items="datas"
      :search="search"
      height="400px"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item,i) in items" :key="i" @click="$emit('row_clicked',item)">
            <td
              v-for="(key,j) in headers.map(el=>el.value)"
              class="text-left"
              :key="j"
            >{{ item[key] }}</td>
          </tr>
        </tbody>
      </template>
      <template slot="no-data">
        No data found
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["headers", "datas"],
  data() {
    return {
      search: ""
    };
  }
};
</script>
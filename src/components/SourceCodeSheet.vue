<template>
  <v-card class="mx-auto" tile>
    <v-list>
      <v-list-item v-if="title">
        <v-list-item-content>
            <v-list-item-title style="font-size: x-large;"><b>{{ title }}</b></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <hr v-if="title">
      <v-container
        style="max-height: 700px;position: relative;"
        class="overflow-y-auto"
      >
      <v-list-item-group
        color="primary"
      >
        <v-list-item dense
          v-for="(data, i) in datas"
          :key="i"
          :style="
            locs.indexOf(i + 1) !== -1
              ? 'background-color:rgba(255, 0, 0, 0.4);pointer-event:none;'
              : 'pointer-event:none;'
          "
        >
          <v-list-item-icon>
            {{ i + 1 }}
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="data.replace('\\\\n', '\\n')"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-container>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["title", "datas", "locs"],
};
</script>

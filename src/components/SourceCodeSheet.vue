<template>
  <v-card class="mx-auto" tile>
    <v-list disabled>
      <v-list-item v-if="title">
        <v-list-item-content>
            <v-list-item-title style="font-size: x-large;"><b>{{ title }}</b></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <hr v-if="title">
      <v-container
        id="target"
        style="max-height: 700px;position: relative;"
        class="overflow-y-auto"
        
        v-scroll="{arg: target, value: onScroll}"
      >
      <v-list-item-group
        color="primary"
        v-scroll="onScroll2"
        style="height: 1000px;"
      >
        <v-list-item dense
          v-for="(data, i) in datas"
          :key="i"
          :style="
            locs.indexOf(i + 1) !== -1
              ? 'background-color:rgba(255, 0, 0, 0.4);'
              : ''
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
  data: () => ({
    target: "#target",
  }),
  methods: {
    onScroll (e) {
      // eslint-disable-next-line
      console.log("1", e)
    },
    onScroll2 (e) {
      // eslint-disable-next-line
      console.log("2",e)
    },
    target_(){
      return this.target
    }
    
  },
};
</script>

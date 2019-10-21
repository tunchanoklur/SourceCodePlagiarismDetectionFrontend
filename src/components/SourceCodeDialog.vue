<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="black">
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="$emit('close_dialog')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col xs="12" md="6" lg="6">
              <SourceCodeSheet
                :title="refer.filename"
                :datas="refer.fileinfo"
                :locs="refer.locs"
              />
            </v-col>
            <v-col xs="12" md="6" lg="6">
              <SourceCodeSheet
                :title="comp.filename"
                :datas="comp.fileinfo"
                :locs="comp.locs"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SourceCodeSheet from '@/components/SourceCodeSheet'
  export default {
    components: {
      SourceCodeSheet
    },
    props:['title','dialog','refer','comp']
  }
</script>
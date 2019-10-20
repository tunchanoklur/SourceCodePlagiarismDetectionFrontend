<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span>
          <v-icon x-large left color="rgba(0,0,0,.87)">code</v-icon>
          Source Code Plagiarism Detection
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$route.path!=='/'" text @click="$router.push('/')">Home</v-btn>
      <v-btn v-if="$route.path!=='/about'" text @click="$router.push('/about')">About</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

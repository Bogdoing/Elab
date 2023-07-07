<template>
  <v-card>
    <v-layout>

      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
      <!--https://randomuser.me/api/portraits/men/85.jpg-->
        <v-list-item
          prepend-avatar="../src/assets/user512.png"
          title="John Leider"
          nav
        >
          <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>              
          </template>
        </v-list-item>
      

        <v-divider></v-divider>
        <v-list density="compact" nav>

          <router-link style="text-decoration: none; color: inherit;" to="/account">
            <v-list-item prepend-icon="mdi-home" title="Account" value="account"></v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/">
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/about">
            <v-list-item prepend-icon="mdi-account" title="Translation" value="about"></v-list-item>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/course">
            <v-list-item prepend-icon="mdi-clock" title="Course" value="course"></v-list-item>
          </router-link>

          <!-- <router-link style="text-decoration: none; color: inherit;" to="/">
            <v-list-item prepend-icon="" title="" value="">{{ width }}</v-list-item>
          </router-link> -->
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100%">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>

</template>

<script>


  export default{
    data(){
      return {
        width: 0,


        drawer: true,
        rail: true,
      }
    },
    created(){
      this.width = window.innerWidth
    },
    mounted() {
      window.addEventListener("resize", this.updateWidth);
    },
    unmounted() {
      window.removeEventListener("resize", this.updateWidth);
    },
    methods:{
      updateWidth() {
        this.width = window.innerWidth;
        if (this.width > 768) {
          this.rail = false;
        }
        else {
          this.rail = true;
        }
      },
    }
  };
</script>

<style>
  #fix-adress{
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>

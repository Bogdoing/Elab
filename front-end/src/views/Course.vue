<template>

  <div class="d-flex justify-center mb-8 mt-8">    
    <p class="text-h3"> Курсы валют </p>
  </div>

</template>

<script>
  import { useCounterStore } from '../store/app.js'
  const store = useCounterStore()

  export default{
    data(){
      return {
      }
    },
    created(){
      
    },
    activated(){
      
    },
    mounted() {
    },
    unmounted() {
    },
    methods:{
    }
  };
</script>


<!-- <template>
  <CourseComponent />
</template>

<script setup>
  import CourseComponent from '@/components/CourseComponent.vue'
</script> -->
<template>
  <!--Link to compiled style.css-->
  <link rel="stylesheet" href="/quiz_widgets/variant-1/style.css">

  <Main
    :api-url="apiUrl"
  />
</template>


<script setup>
import { defineProps } from 'vue';
import Main from "@/components/Main.vue";
defineProps({
  apiUrl: {
    type: String,
  }
});
</script>

<template>
  <Main
    :apiUrl="apiUrl"
  />
</template>

<script setup>
import { defineProps } from 'vue';
import Main from "@/components/Main.vue";
defineProps({
  apiUrl: {
    type: String
  }
});

</script>

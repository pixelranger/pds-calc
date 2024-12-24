<template>
  <Suspense>
    <Main :api-url="apiUrl"/>
  </Suspense>

  <!--  Encapsulating all css rules for shadow-dom-->
  <component :is="'style'">{{styles}}</component>
  <component :is="'style'">{{widgetStyles}}</component>
</template>



<script setup>
import { defineProps } from 'vue';
import widgetStyles from '../pds-calculator/widget.css?inline';
import styles from '../pds-calculator/style.css?inline';
import Main from '@/components/Main.vue';

defineProps({
  apiUrl: {
    type: String,
  }
});
</script>

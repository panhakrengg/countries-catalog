<template lang="">
  <div>
    <label class="font-bold text-black">{{ props.name }}:&nbsp;</label>
    {{ value }}
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
})
</script>
<style lang=""></style>

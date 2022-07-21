<template>
  <Content />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Content: defineAsyncComponent(() => import("./components/Content")),
  },
};
</script>

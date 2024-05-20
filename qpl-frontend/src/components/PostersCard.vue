<template>
  <div class="card-container">
    <a-card hoverable>
      <template #cover>
        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </template>
      <a-card-meta title="Europe Street beat">
        <template #description>www.instagram.com</template>
      </a-card-meta>
    </a-card>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
</script>
<style lang="scss" scoped>
.card-container {
  width: 240px;
  padding: 0 5px;
  margin-bottom: 5px;
  display: inline-block;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>

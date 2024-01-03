<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <NuxtPage />
  </div>
</template>
<script setup>
const onClickLeft = () => history.back();
const active = ref("search");
</script>
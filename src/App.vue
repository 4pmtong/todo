<!--
  -- --------------------------------------------------------
  -- @file App.vue
  -- @author WenKang Lin <wenkanglin0910@gmail.com>
  -- @date 2018-04-12 15:03:39
  -- @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
  -- @last_modified_date 2018-04-12 15:03:41
  -- @copyright (c) 2018-present, WenKang Lin
  -- --------------------------------------------------------
 -->

<template>
  <main id="app">
    <router-link :to="{ name: 'home' }">go to home page</router-link>
    <router-link :to="{ name: '404' }">go to 404 page</router-link>
    <transition name="fade" mode="out-in">
      <keep-alive :include="/alive$/i">
        <router-view/>
      </keep-alive>
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style src="styles/reset.css"></style>
<style src="styles/common.css"></style>
<style src="styles/animation.css"></style>

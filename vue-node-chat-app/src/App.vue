<template>
  <div>
    <transition name="fade" mode="out-in" appear>
    <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  export default {
      name: 'app',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },

}
</script>

<style>

</style>

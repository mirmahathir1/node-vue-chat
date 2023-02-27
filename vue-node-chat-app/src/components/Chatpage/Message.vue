<template>
<div style="padding: 10px">
      <li class="message w3-container w3-animate-right" style="background-color: lightgray; width: 50%">
        <div class="message__title">
          <h4>{{text.from}}</h4>


        </div>
        <div style="color: gray">{{text.createdAt}}</div>
        <div class="message__body">
          <p>{{text.message}}</p>
        </div>
      </li>
</div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style scoped>

</style>

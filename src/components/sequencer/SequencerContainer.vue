
<template>
  <q-card dark class="my-card" bordered >
    <sequencer-module number-of-rows="5"></sequencer-module>
  </q-card>
</template>
<script setup>

import SequencerModule from "components/sequencer/Sequencer.vue";
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 370px
</style>

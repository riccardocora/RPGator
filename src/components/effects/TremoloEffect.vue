<template>
    <div class="q-py-sm inline">
      <Knob id="frequency" :color="color" :min="50" :max="10000" :inner-max="10000" :value="tremolo.frequency" :step="1" :thickness="0.1" @updateValue="update" />

<!--      <q-knob-->
<!--        v-model="tremolo.frequency"-->
<!--        :min="100"-->
<!--        :max="22000"-->
<!--        :step="100"-->
<!--        size="md"-->
<!--        show-value-->
<!--        :color="color"-->
<!--        @update:model-value="update"-->
<!--      />-->
      <q-badge outline :color="color" label="freq." class="q-ma-xs"/>
    </div>

    <div class="q-py-sm inline">
      <Knob id="depth" :color="color" :min="0" :max="1" :inner-max="1" :value="tremolo.depth" :step="0.01" :thickness="0.1" @updateValue="update" />
<!--      <q-knob-->
<!--        v-model="tremolo.depth"-->
<!--        :step="0.01"-->
<!--        :min="0"-->
<!--        :max="1"-->
<!--        show-value-->
<!--        size="md"-->
<!--        :color="color"-->
<!--        @update:model-value="update"-->
<!--      />-->
      <q-badge outline :color="color" label="depth" class="q-ma-xs"/>
    </div>





  </template>
<script>
import {ref,defineComponent} from "vue";
import AudioContextHandler from "../AudioContextHandler.js";
import Knob from "../controls/Knob.vue";

export default defineComponent({
  components: {Knob},
  props: {
    color: {
      type: String,
      default: "primary"
    }
  },
  setup() {

    const tremolo = ref({
      frequency: AudioContextHandler.effectChain.getEffect("tremolo").frequency.value,
      depth: AudioContextHandler.effectChain.getEffect("tremolo").depth.value,
    });
    const update = () => {
      AudioContextHandler.effectChain.setEffect("tremolo", tremolo.value)



    }

    return {
      update,
      tremolo
    }
  }
})

</script>
<style scoped>

</style>

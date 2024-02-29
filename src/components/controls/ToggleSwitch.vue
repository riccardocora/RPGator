<template>
  <q-btn-toggle v-model="toggleState" :options="toggleOptions">
    <template v-slot:default>
      <q-icon size="lg">
        <img v-if="toggleState" src="~@/assets/images/Switch_On.svg" alt="" style="width: 30px; height: 30px; transform: rotate(90deg);" />
        <img v-else src="~@/assets/images/Switch_off.svg" alt="" style="width: 30px; height: 30px; transform: rotate(90deg);" />
      </q-icon>
    </template>
  </q-btn-toggle>
</template>

<script>
import {defineComponent } from "vue";
export default defineComponent({
  name: "ToggleSwitch",
  setup() {
    return {
      toggleState: false,
      toggleOptions: [
        { label: "On", value: true },
        { label: "Off", value: false },
      ],
    };
  },
});
</script>

<style scoped>
</style>

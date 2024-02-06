
<template>
  <div class="container">
      <oscillator-comp :id="id" :color="color"></oscillator-comp>
<!--    <div>-->
<!--      <q-slider-->
<!--        v-model="synth.portamento"-->
<!--        label-->
<!--        class="q-py-md"-->
<!--        :min="0"-->
<!--        :max="5"-->
<!--        :step="0.05"-->
<!--        :color="color"-->
<!--        @update:model-value="update"-->
<!--        :thumb-color="color"-->
<!--        label-color="black"-->
<!--        :label-text-color="color"-->
<!--        selection-color="transparent"-->
<!--        switch-label-side-->
<!--      >-->
<!--      </q-slider>-->
<!--      <q-slider-->
<!--        v-model="synth.detune"-->
<!--        label-->
<!--        class="q-py-md"-->
<!--        :min="0"-->
<!--        :max="5"-->
<!--        :step="0.05"-->
<!--        :color="color"-->
<!--        @update:model-value="update"-->
<!--        :thumb-color="color"-->
<!--        label-color="black"-->
<!--        :label-text-color="color"-->
<!--        selection-color="transparent"-->
<!--        switch-label-side-->
<!--      >-->
<!--      </q-slider>-->

<!--    </div>-->
  </div>




</template>

<script>
import {onMounted, reactive, ref} from "vue";
import EnvelopeComp from "../envelope/EnvelopeControl.vue";
import OscillatorComp from "../oscillator/OscillatorComp.vue";
import AudioContextHandler from "../AudioContextHandler.js";

export default {
  props: ['id','color'],
  name: "SynthComp",
  components: {OscillatorComp, EnvelopeComp},
  setup(props){
    const synth = reactive({
      portamento: 0,
      detune: 0,
    })
    const update = () =>{
      console.log("synth", synth)
      AudioContextHandler.voices.setSynth(props.id,synth)
    }
    return{
      synth,
      update
    }
  }
}

</script>

<style lang="scss" scoped>
//.container{
//  background-image: url("assets/images/metal.png");
//  border-radius: 3%;
//}
.container{
  height: 100%;
  width: 100%;
}


</style>

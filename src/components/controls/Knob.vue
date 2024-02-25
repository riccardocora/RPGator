<script>

import MIDIAccess from "@/components/controls/MIDIAccess.js";
import {ref, defineComponent, computed} from "vue";

export default defineComponent({
  name: "Knob",
  props: {
    id: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "xl",
    },
    color :{
      type: String,
      default: "accent",
    },
    min :{
      type: Number,
      default: 0,
    },
    max :{
      type: Number,
      default: 100,
    },
    innerMax:{
      type: Number,
      default: 100,
    },
    thickness:{
      type: Number,
      default: 0.2,
    },
    value:{
      type: Number,
      default: 0,
    },
    step:{
      type: Number,
      default: 1,
    },
    update:{
      type: Function,
      required: true,
    },
    midi: {
      type: Number,
      required: false,
    }
  },
  setup(props){
    const knobValue = ref(props.value);
    const rotation = computed(() => knobValue.value * 360/props.max); // Assuming the knob's value is between 0 and 100, this will give a rotation angle between 0 and 360 degrees

    if(props.midi && props.midi >= 70 && props.midi <= 76 ){
      const midi = new MIDIAccess({ onDeviceInput });
      midi.start().then(() => {
        console.log('STARTED!');
      }).catch(console.error);
    }
    const updateValue = (newValue) => {
      props.update({id: props.id,value:newValue})
    }

    function onDeviceInput({ type,input, value }) {
      // console.log('MIDI event',type, input, value);
      if(type!==176)return;
      if(props.midi === input){
        const newValue = (value/ 127) *(props.max - props.min) + props.min;
        knobValue.value = newValue;
        updateValue(newValue);
      }
    }
    // const handleMouseDown = (event) => {
    //   if (value.value === props.min) {
    //   }
    // };
    return {knobValue, updateValue,rotation,}
  }
})

</script>

<template>
  <div class="knobContainer">
    <!--    <input type="range" min="1" max="100" value="50" class="slider" id="myRange">-->
    <q-knob :color="color" size="40px" class="knob" :min="min" :angle="225" :inner-max="max" :max="max *360/270" :step="step"  :thickness="thickness" show-value v-model="knobValue" @update:model-value="updateValue">
      <template v-slot:default>
<!--        <div class="knob">-->
<!--          <div class="knob__indicator" >-->
          <div class="q-pa-md">

          <q-icon size="md" :style="{ transform: `rotate(${rotation*(270/360) - 135}deg)` }">
            <img src="@/assets/images/knob_vector_1.svg" alt="" style="width: 80px; height: 80px"/>
          </q-icon>
        </div>

<!--          </div>-->
<!--        </div>-->


<!--          <div class="knob__value">{{ value }}</div>-->
      </template>
    </q-knob>
  </div>
<!--  <p>Value: {{value}}</p>-->

</template>

<style>
.q-icon img {
  pointer-events: none;
}

.knob-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}



</style>


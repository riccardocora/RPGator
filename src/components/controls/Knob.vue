<script>
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
      default: 50,
    },
    step:{
      type: Number,
      default: 1,
    }
  },
  setup(props, {emit}){
    const value = ref(props.value);
    const rotation = computed(() => value.value * 360/props.max); // Assuming the knob's value is between 0 and 100, this will give a rotation angle between 0 and 360 degrees

    const updateValue = (newValue) => {

      emit('updateValue', { id: props.id, value: newValue });
    }
    return {value, updateValue,rotation}
  }
})

</script>

<template>
  <div class="knobContainer">
    <!--    <input type="range" min="1" max="100" value="50" class="slider" id="myRange">-->
    <q-knob :color="color" size="40px" class="knob" :min="min" :angle="225" :inner-max="max" :max="max *360/270" :step="step" :thickness="thickness" show-value  v-model="value" @update:model-value="updateValue" >
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


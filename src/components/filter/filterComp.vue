<template>
  <div class="button-row">
    Filter {{chained}}
    <q-checkbox v-model="chained" @update:model-value="toggleChain" >

      <template v-slot:default>
          <q-btn size=40% round :class="chained ?'light_on':'button_light'" />
      </template>
    </q-checkbox>



  </div>
  <div class="parent selector">
    <div class="button-toggles-top">
        <q-btn-toggle
          v-model="rolloff"
          color="dark"
          text-color="white"
          :toggle-color="color"
          size="sm"
          unelevated
          stretch
          spread
          flat
          @update:model-value="updateRolloff"
          :options="[{
                   label: '-12',
                   value: -12,
                  },
                  {
                  label: '-24',
                  value: -24,
                  },
                  {
                  label: '-48',
                  value: -48,
                  }]"

      />
    </div>
    <div class="curve-row">
      <div class="button-toggles-side">
        <q-btn-toggle
            v-model="filter.type"
            color="dark"
            no-caps
            text-color="white"
            :toggle-color="color"
            size="sm"
            stretch
            style="flex-direction: column"
            unelevated
            flat
            :options="[
          {label: 'lp', value: 'lowpass'},
          {label: 'hp', value: 'highpass'},
          {label: 'bp', value: 'bandpass'},]"
        />
      </div>
      <div class="curve-container">
        <filter-curve :id="id" :filter="filter" :color="color"></filter-curve>
      </div>
    </div>
    <div class="screen">
      <div class="screen-frame"></div>

      <div class="screen-inset"></div>
    </div>
  </div>

  <div class="knob-container">
    <div class="knob-wrapper">

      <Knob id="cutoff" :color="color" :min="1" :max="4" :value="filterLogfreq" :step="0.01" :thickness="0.1" :update="update" />
      Cutoff
    </div>
    <div class="knob-wrapper">
      <Knob v-model="filter.Q" id="Q" :color="color" :min="0.01" :max="18" :inner-max="18" :step="0.1" :thickness="0.1" :update="update" />
      Q{{filter.Q.value}}
    </div>
  </div>

</template>

<script>
import FilterCurve from "../filter/FilterCurve.vue"
import {reactive, ref, toRaw} from "vue";
import Knob from "../controls/Knob.vue";
import Button_Toggle from "../controls/Button_Toggle.vue";
import * as Tone from "tone";

export default {
  name: 'FilterComp',
  components: {Button_Toggle, Knob, FilterCurve},
  props: {
    id: {
      type: String,
      required: true
    },
    color:{
      type: String,
      required: true
    },
    input : {
      type: Tone.Gain,
      required: true
    },
    output : {
      type: Tone.Gain,
      required: true
    }
  },


  setup (props) {
    //console.log("props",   props.output)
    props.input.connect(props.output);
    const frequency = ref(200);
    const type = ref("lowpass");
    const rolloff = ref(-12);
    const Q = ref(1);
    const filter = reactive(new Tone.Filter({
      frequency : frequency.value,
      type :type.value,
      rolloff : rolloff.value,
      Q : Q.value
    }));

    let chained = ref(false);
    const filterLogfreq = ref(1);

    function toggleChain(){
      //console.log("toggleChain")
      //console.log("chained", chained.value)
      if(!chained.value){
        toRaw(filter).disconnect();
        props.input.disconnect();
        props.input.connect(props.output);
        //console.log("unchained")


      }else{
        props.input.disconnect();

        toRaw(filter).connect(props.output);
        props.input.connect(toRaw(filter));
        //console.log("chained")

      }
    }
    return{
      filter,
      chained,
      toggleChain,
      rolloff,
      filterLogfreq,
      updateRolloff (newValue) {
        //console.log("updateRolloff", newValue);
        //console.log("filter.value.rolloff", toRaw(filter).rolloff)
        toRaw(filter).rolloff=newValue;
        //console.log("filter.value.rolloff", filter.rolloff)
      },
      update (newValue) {
        if(newValue.id === "cutoff") {
          filterLogfreq.value = newValue.value;
          filter.frequency.value = Math.trunc(2* Math.pow(10,filterLogfreq.value))
          //console.log("filter.value.frequency.value", filter.frequency.value)
        } else if(newValue.id === "Q") {
          filter.Q.value = newValue.value;
        }
      }
    }

  }
}

</script>

<style scoped lang="scss">
.parent {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 97%;
  max-height: 63.75%;
  min-width: 100%;
  min-height: 63.75%;
  height: 63.75%;
  padding: 5px;
}
.button-toggles-top {
  position: relative;
  width: 100%;
  height: 16%;
  align-items: start;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: black;
}
.button-toggles-side {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  width: 11%;
  height: 100%;
  background-color: black;
}

.button-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 15%;
  padding: 10px;
}
.curve-row{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.curve-container{
  height: 100%;
  width: 100%;
}

.knob-container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 21.25%;
  font-size: 11px;

}


.selector {

  border: #030303 1px solid;
  /* Add multiple inset box shadows to create an inner "screen" effect */
  box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  inset 0 0 15px 1px var(--select-shadow-color), /* inner shadow */
  0 0 0 2px inset var(--select-border-color); /* inner shadow */

  ///* Add a radial gradient to simulate inner light */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--text-color-on);

}



.screen, .screen-inset, .screen-frame, canvas, img {
  position: absolute
}
.screen, .screen-inset {
  top: 3%;
  width: 95%;
  height: 95%;
}
.screen {
  background-image:
      radial-gradient(50% 5% at 50% 1%, rgba(255, 255, 255, 0.29) 0.5%,#fff0),
      radial-gradient(110% 65% at 60% 150%, rgba(255, 255, 255, 0.71) 1%,#fff0),
      //radial-gradient(100% 100% at 50% 50%,#0000 25%,#000 50%),
      radial-gradient(100% 100% at 50% 50%,#0000 20%,#000 80%);
  z-index: -1;
}
.screen-inset {
  //box-shadow: 0 0.1em 0.1em 0.6em rgba(35, 34, 34, 0.42) inset;
}
</style>

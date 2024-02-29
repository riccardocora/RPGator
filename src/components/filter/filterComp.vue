<template>
  <div class="column full-height text-info">
    <div class="button-row col-2">
      <div style="display: flex; flex-direction: column; justify-content: center" class="q-px-md">Filter</div>

      <q-checkbox v-model="chained" @update:model-value="toggleChain" >

        <template v-slot:default>
          <q-btn size=40% round :class="chained ?'light_on':'button_light'" />
        </template>
      </q-checkbox>



    </div>
    <div class="q-px-md q-pt-sm col-10 ">
      <div class="parent selector shadow-1">
      <div class="button-toggles-top">
        <q-btn-toggle
            v-model="rolloff"
            color="dark"
            :toggle-color="color"
            text-color="info"
            size="sm"
            unelevated
            stretch
            spread
            dense
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
              :toggle-color="color"
              size="sm"
              dense
              text-color="info"
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
<!--      <div class="screen">-->
<!--        <div class="screen-frame"></div>-->

<!--        <div class="screen-inset"></div>-->
<!--      </div>-->
    </div>
      <div class="knob-container q-pt-sm q-px-md">
        <div class="knob-wrapper">

          <Knob :id="'cutoff'+id" :color="color" :min="1" :max="4" :value="filterLogfreq" :step="0.01" :thickness="0.1" :update="update" :midi="74"/>
          Cutoff
        </div>
        <div class="knob-wrapper">
          <Knob v-model="filter.Q" :id="'Q'+id" :color="color" :min="0.01" :max="18" :inner-max="18" :step="0.1" :thickness="0.1" :update="update" :midi="75"/>
          Q
        </div>
      </div>
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
      if(!chained.value){
        toRaw(filter).disconnect();
        props.input.disconnect();
        props.input.connect(props.output);
      }else{
        props.input.disconnect();

        toRaw(filter).connect(props.output);
        props.input.connect(toRaw(filter));
      }
    }
    return{
      filter,
      chained,
      toggleChain,
      rolloff,
      filterLogfreq,
      updateRolloff (newValue) {

        toRaw(filter).rolloff=newValue;
      },
      update (newValue) {
        if(newValue.id === "cutoff"+props.id) {
          filterLogfreq.value = newValue.value;
          filter.frequency.value = Math.trunc(2* Math.pow(10,filterLogfreq.value))
        } else if(newValue.id === "Q"+props.id) {
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
  width: 100%;
  aspect-ratio: 14/9;
  padding: 2%;
  border-radius: 3%;
}
.button-toggles-top {
  position: relative;
  width: 100%;
  height: 10%;
  align-items: start;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
}
.button-toggles-side {
  position: relative;
  display: flex;
  width: 14%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  background-color: transparent;
}

.button-row{
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  //height: 15%;
}
.curve-row{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.curve-container{

}

.knob-container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  //height: 21.25%;
  font-size: 11px;

}


.selector {

  border: #030303 1px solid;
  box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  inset 0 0 15px 1px var(--select-shadow-color),
  0 0 0 2px inset var(--select-border-color);

  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-3deg, transparent 85%, rgb(255, 255, 255) 150%),
      linear-gradient(5deg, transparent 85%, rgb(255, 255, 255) 150%),
      linear-gradient(90deg, transparent 90%, rgb(255, 255, 255) 180%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--textlor-on-co);

}



.screen, .screen-inset, .screen-frame, canvas, img {
  position: absolute
}
.screen, .screen-inset {
  //top: %;
  width: 100%;
  height: 100%;
}
.screen {
  background-image:
      radial-gradient(50% 5% at 50% 1%, rgba(255, 255, 255, 0.29) 0.5%,#fff0),
      radial-gradient(110% 65% at 60% 150%, rgba(255, 255, 255, 0.71) 1%,#fff0),
      //radial-gradient(100% 100% at 50% 50%,#0000 25%,#000 50%),
      radial-gradient(100% 100% at 50% 50%,#0000 20%,#000 80%);
  z-index: 1;
}
.screen-inset {
  //box-shadow: 0 0.1em 0.1em 0.6em rgba(35, 34, 34, 0.42) inset;
}
</style>

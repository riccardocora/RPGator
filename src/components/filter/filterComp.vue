<template>
  <div class="button-row">
    Filter
    <q-checkbox v-model="chain" @update:model-value="toggleChain" >
<!--      <template v-slot:default>
        <q-badge outline  label="chain" :color="chain?'yellow':'primary'" />
      </template>-->
      <template v-slot:default>
          <q-btn size=40% round :class="chain?'light_on':'button_light'" />
      </template>
    </q-checkbox>



  </div>
  <div class="parent selector">
    <div class="button-toggles-top">
      <q-btn-toggle
          v-model="filter.rolloff"
          color="dark"
          text-color="white"
          :toggle-color="color"
          size="sm"
          unelevated
          stretch
          spread
          flat
          :options="rolloffValues"
          @update:model-value="updateFilter"
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
          {label: 'hp', value: 'highpass'}]"
            @update:model-value="updateFilter"
        />
      </div>
      <div class="curve-container">
        <filter-curve :id="id" :cutoff="filterLogFreq" :rolloff="filter.rolloff" :type="filter.type" :color="color"></filter-curve>
      </div>
    </div>
    <div class="screen">
      <div class="screen-frame"></div>

      <div class="screen-inset"></div>
    </div>
  </div>

  <div class="knob-container">
    <div class="knob-wrapper">
      <Knob id="cutoff" :color="color" :min="1" :max="4" :value="filterLogFreq" :step="0.01" :thickness="0.1" @updateValue="updateFilter" />
      Cutoff
    </div>
    <div class="knob-wrapper">
      <Knob id="q" :color="color" :min="0.01" :max="18" :inner-max="18" :value="filter.Q" :step="0.1" :thickness="0.1" @updateValue="updateFilter" />
      Q
    </div>
  </div>


<!--      <div class="row justify-center">-->
<!--        <div class="q-px-md">-->
<!--          <q-badge outline :color="color" label="Q" class="justify-center"/>-->

<!--        </div>-->

<!--          <div class="q-px-md">-->
<!--            <q-badge outline :color="color" label="cutoff" class="justify-center"/>-->

<!--          </div>-->
<!--      </div>-->

<!--      </q-card-section>-->
<!--      <q-card-section class="column q-pa-none">-->
<!--        &lt;!&ndash;    <q-card-actions class="justify-between q-pa-none">&ndash;&gt;-->
<!--        <div>-->


<!--        </div>-->
<!--      </q-card-section>-->
<!--  </q-card-section>-->

<!--  </div>-->
</template>

<script>
import FilterCurve from "../filter/FilterCurve.vue"
import {computed, ref} from "vue";
import AudioContextHandler from "../AudioContextHandler";
import Knob from "../controls/Knob.vue";
import Button_Toggle from "../controls/Button_Toggle.vue";

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
    }
  },


  setup (props) {
    const filter= ref(AudioContextHandler.filters.getFilter(props.id).filter.get())
    let chain = ref(AudioContextHandler.filters.getFilter(props.id).chained);
    const filterLogFreq = ref(Math.log10(filter.value.frequency/2))
    const rolloffValues = ref([
      {
        label: "-12",
        value: -12,
      },
      {
        label: "-24",
        value: -24,
      },
      {
        label: "-48",
        value: -48,
      },

    ]);


    const updateFilter = (event) => {
      if(event.id==="q"){
        filter.value.Q = event.value
      }
      else if(event.id==="cutoff"){
        filterLogFreq.value = event.value;
      }
      filter.value.frequency = Math.trunc(2* Math.pow(10,filterLogFreq.value))

      AudioContextHandler.filters.setFilter(props.id,filter.value)
    }

    const toggleChain = () => {

      if(chain) {
        AudioContextHandler.filters.chainFilter(props.id);
      }else{
        AudioContextHandler.filters.unchainFilter(props.id);
      }
    }

    return {
      id: props.id,
      rolloffValues,
      updateFilter,
      filter,
      toggleChain,
      chain,
      filterLogFreq,
      cutoffLabel : computed(()=>`${filter.value.frequency}`)
    };
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
//.slide
//  //max-height: 9em;
//
//.container{
//  //background-image: url("assets/images/metal.png");
//  //border-radius: 0.5em;
//  //max-height: 12em;
//}


.selector {

  border: #030303 1px solid;


  /* your existing styles */

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

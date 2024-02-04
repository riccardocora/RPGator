<template>
  <div class="button-row">
    <q-checkbox v-model="chain" @update:model-value="toggleChain" >

      <template v-slot:default>
        <q-badge outline  label="chain" :color="chain?'yellow':'primary'" />
      </template>
    </q-checkbox>
  </div>
  <div class="curve-container">
    <filter-curve :id="id" :cutoff="filterLogFreq" :rolloff="filter.rolloff" :type="filter.type" :color="color"></filter-curve>

  </div>
  <div class="knob-container">
    <Knob id="cutoff" :color="color" :min="1" :max="4" :value="filterLogFreq" :step="0.01" :thickness="0.1" @updateValue="updateFilter" />

    <Knob id="q" :color="color" :min="0.01" :max="18" :inner-max="18" :value="filter.Q" :step="0.1" :thickness="0.1" @updateValue="updateFilter" />


  </div>
<!--    <div class="parent">-->
<!--      <div class="row button-toggles-top justify-center">-->
<!--        <q-btn-toggle-->
<!--          v-model="filter.rolloff"-->
<!--          color="dark"-->
<!--          text-color="white"-->
<!--          :toggle-color="color"-->
<!--          size="sm"-->
<!--          unelevated-->
<!--          stretch-->
<!--          flat-->
<!--          :options="rolloffValues"-->
<!--          @update:model-value="updateFilter"-->
<!--        />-->
<!--      </div>-->
<!--        <div class="column button-toggles-side">-->
<!--          <q-btn-toggle-->
<!--            v-model="filter.type"-->
<!--            color="dark"-->
<!--            no-caps-->
<!--            text-color="white"-->
<!--            :toggle-color="color"-->
<!--            size="sm"-->
<!--            class="checkbox-container q-py-sm q-px-none border full-height"-->
<!--            style="flex-direction: column"-->
<!--            unelevated-->
<!--            flat-->
<!--            :options="[-->
<!--            {label: 'lp', value: 'lowpass'},-->
<!--            {label: 'hp', value: 'highpass'},-->
<!--            {label: 'bp', value: 'bandpass'},]"-->
<!--            @update:model-value="updateFilter"-->
<!--          />-->
<!--        </div>-->

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
      {
        label: "-96",
        value: -96,
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
}
.button-toggles-top {
  position: absolute;
  top: 5%; // adjust as needed
}
.button-toggles-side {
  position: absolute;
  top: 15%; // adjust as needed
}

.button-row{
  height: 15%;
  background-color: #2e7d32;
}
.curve-container{
  height: 63.75%;
  padding: 10px;
}

.knob-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 25%;

}
//.slide
//  //max-height: 9em;
//
//.container{
//  //background-image: url("assets/images/metal.png");
//  //border-radius: 0.5em;
//  //max-height: 12em;
//}

</style>

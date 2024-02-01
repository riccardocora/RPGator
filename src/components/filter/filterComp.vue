<template>
  <div class="rounded-borders full-height">
    <div class="parent">
      <div class="row button-toggles-top justify-center">
        <q-btn-toggle
          v-model="filter.rolloff"
          color="dark"
          text-color="white"
          :toggle-color="color"
          size="sm"
          unelevated
          stretch
          flat
          :options="rolloffValues"
          @update:model-value="updateFilter"
        />
      </div>
      <div class="row">
        <div class="column button-toggles-side">
          <q-btn-toggle
            v-model="filter.type"
            color="dark"
            no-caps
            text-color="white"
            :toggle-color="color"
            ripple='false'
            size="sm"
            class="checkbox-container q-py-sm q-px-none border full-height"
            style="flex-direction: column"
            unelevated
            flat
            :options="[
            {label: 'lp', value: 'lowpass'},
            {label: 'hp', value: 'highpass'},
            {label: 'bp', value: 'bandpass'},]"
            @update:model-value="updateFilter"
          />
        </div>
        <div class="column filter-curve q-pa-sm">
          <filter-curve :id="id" :cutoff="filterLogFreq" :rolloff="filter.rolloff" :type="filter.type" :color="color"></filter-curve>
        </div>
      </div>
      <div class="row justify-center">
        <div class="q-px-md">
          <Knob id="q" :color="color" :min="0.01" :max="18" :inner-max="18" :value="filter.Q" :step="0.1" :thickness="0.1" @updateValue="updateFilter" />
          <q-badge outline :color="color" label="Q" class="justify-center"/>

        </div>

          <div class="q-px-md">
            <Knob id="cutoff" :color="color" :min="1" :max="4" :inner-max="4" :value="filterLogFreq" :step="0.01" :thickness="0.1" @updateValue="updateFilter" />
            <q-badge outline :color="color" label="cutoff" class="justify-center"/>

          </div>
      </div>
    </div>

<!--      </q-card-section>-->
<!--      <q-card-section class="column q-pa-none">-->
<!--        &lt;!&ndash;    <q-card-actions class="justify-between q-pa-none">&ndash;&gt;-->
<!--        <div>-->
<!--          <q-checkbox v-model="chain" @update:model-value="toggleChain" >-->

<!--            <template v-slot:default>-->
<!--              <q-badge outline  label="chain" :color="chain?'yellow':'primary'" />-->
<!--            </template>-->
<!--          </q-checkbox>-->

<!--        </div>-->
<!--      </q-card-section>-->
<!--  </q-card-section>-->

  </div>
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
    console.log("filter setup",filter.value)

    console.log("chain setup",chain)
    const filterLogFreq = ref(Math.log10(filter.value.frequency/2))
    console.log("filter "+props.id,filter, chain  )
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
      console.log("updateFilter",event.value)
      console.log("filterLogFreq",filterLogFreq.value)
      filter.value.frequency = Math.trunc(2* Math.pow(10,filterLogFreq.value))
      console.log("filter",filter.value)

      AudioContextHandler.filters.setFilter(props.id,filter.value)
      console.log("filter final",AudioContextHandler.filters.getFilter(props.id))
    }

    const toggleChain = () => {
      console.log("toggleChain",props.id)
      console.log("isChained",chain.value)

      if(chain) {
        AudioContextHandler.filters.chainFilter(props.id);
      }else{
        AudioContextHandler.filters.unchainFilter(props.id);
      }
      console.log("isChained 2",chain)


      console.log("isChained 3",AudioContextHandler.filters.getFilter(props.id).chained)

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
  top: 5px; // adjust as needed
  left: 40px; // adjust as needed
}
.button-toggles-side {
  position: absolute;
  top: 15px; // adjust as needed
  left: 0; // adjust as needed
}
.filter-curve {
  //position: absolute;
  top: 0; // adjust as needed
  left: 0; // adjust as needed
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

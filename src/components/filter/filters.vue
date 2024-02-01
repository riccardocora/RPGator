<template>
  <div class="q-pa-md">
<!--    <div class="q-gutter-y-md" style="max-width: 600px">-->


<!--      <q-carousel-->
<!--        v-model="slide"-->
<!--        swipeable-->
<!--        animated-->
<!--        keep-alive-->
<!--        control-color="orange"-->
<!--        navigation-position="left"-->
<!--        navigation-icon="radio_button_unchecked"-->
<!--        navigation-active-icon="radio_button_checked"-->
<!--        navigation-->
<!--        padding-->
<!--        height="min-content"-->

<!--        class="text-white rounded-borders"-->
<!--      >-->
<!--        <template v-slot:navigation-icon="{ active, btnProps, onClick }">-->
<!--          <q-btn no-caps v-if="active" icon="radio_button_checked" flat :color=getSlideColor(slide) ense @click="onClick" >-->
<!--          </q-btn>-->
<!--          <q-btn v-else icon="radio_button_unchecked" size="sm" :color=getSlideColor(slide) flat round dense @click="onClick" />-->
<!--        </template>-->

<!--        <q-carousel-slide name="f0" class="column flex-center q-px-sm q-py-none">-->
<!--<q-card-section>-->
<!--  {{selFilter}}-->

<!--  <q-tab-panels v-model="selFilter" animated>-->
<!--        {{selFilter}}-->
<!--&lt;!&ndash;        <div v-for="filter in filters" :key="filter.toString()">&ndash;&gt;-->
<!--        <q-card-section>-->

<!--        <q-tab-panel name="f0">-->

<!--            <filter-comp id="0" color="primary"></filter-comp>-->
<!--        </q-tab-panel>-->
<!--        <q-tab-panel name="f1">-->
<!--            <filter-comp id="1" color="secondary"></filter-comp>-->
<!--        </q-tab-panel>-->
<!--        </q-card-section>-->
<!--      </q-tab-panels>-->
<!--    </q-card-section>-->

<!--      <q-separator />-->

<!--      <q-tabs-->
<!--        v-model="selFilter"-->
<!--        dense-->
<!--        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"-->
<!--        align="justify"-->
<!--        narrow-indicator-->
<!--        >-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <div v-for="filter in filters" :key="filter.toString()">&ndash;&gt;-->
<!--&lt;!&ndash;          {{filter.toString()}}&ndash;&gt;-->
<!--        <q-tab name="f0" label="flt.1" />-->
<!--        <q-tab name="f1" label="flt.2" />-->
<!--      </q-tabs>-->
<!--        </q-carousel-slide>-->
<!--        <q-carousel-slide name="f1" class="column no-wrap flex-center q-px-sm q-py-none">-->
<!--        </q-carousel-slide>-->
<!--      </q-carousel>-->

          <filter-comp id="f0" color="primary"></filter-comp>

          <filter-comp id="f1" color="primary"></filter-comp>

<!--      <q-tabs-->
<!--        v-model="tab"-->
<!--        dense-->
<!--        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"-->
<!--        align="justify"-->
<!--        narrow-indicator-->
<!--      >-->
<!--        <q-tab name="f0" label="f0" />-->
<!--        <q-tab name="f1" label="f1" />-->
<!--      </q-tabs>-->
<!--    </q-card>-->
  </div>
<!--  </div>-->

</template>

<script>
import { defineComponent, ref } from 'vue'
import VoiceModule from "../voices/voiceComp.vue";
import FilterComp from "../filter/filterComp.vue";
import AudioContextHandler from "@/components/AudioContextHandler.js";

export default defineComponent({
  components: {FilterComp, VoiceModule},
  setup () {
    // const filters = [...AudioContextHandler.filters.getFilters().keys()];
    // console.log("filters",filters)
    // console.log("filters",filters[0])
    const selFilter = ref('f0');

    return {
      // filters,
      selFilter,
      tab: ref('f0')
    }
  },
  computed: {
    getSlideColor() {
      return (slideName) => {
        switch (slideName) {
          case 'f0':
            return 'primary';
          case 'f1':
            return 'secondary';
          // Add more cases if you have more slides
          default:
            return 'white'; // Default color if no match is found
        }
      };
    },
  },
})

</script>
<style lang="sass" scoped>
//.card
  //background: transparent

</style>

<template>
  <div class="r2d-container shadow">
    <div class="r2d ">
      <div class="top-row row ">
        <div class="voices ">
          <voices></voices>
        </div>
        <div class="visual shadow" >
          <visual-trip></visual-trip>
        </div>
      </div>
      <div class="row bottom-row" >
        <div class="arp ">
          <arpeggiator ></arpeggiator>
        </div>
        <div class="effects shadow">
          <effects></effects>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Voices from "../components/voices/voices.vue";
import FilterComp from "../components/filter/filterComp.vue";
import Filters from "../components/filter/filters.vue";
import Effects from "../components/effects/effects.vue";
import Arpeggiator from "../components/arpeggio/Arpeggiator.vue";
import VisualTrip from "../components/visualUnit/visual.vue";

export default {
  name: 'RPGator',
  components: {
    VisualTrip,
    Arpeggiator,
    Effects,
    Filters,
    FilterComp,
    Voices,
  }
}
</script>
<style lang="scss" scoped>


.r2d-container{
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line */
  border: 10px solid $r2d-container;
  border-radius: 2%;
  aspect-ratio: 2/1 ;
  min-width: 85vw;
}

.r2d{
  height: 100%;
  width: 100%;


}
.top-row{
  height: 50%;
    max-height: 50%;
  justify-content: space-between;
  background-color: $r2d-container;
  padding: 1% 1% 1% 1%

}
.bottom-row{
  height: 50%;
  max-height: 50%;
  justify-content: space-between;
  background-color: $r2d-container;
  padding: 1% 1% 1% 1%
}
.voices{
  width: 75%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  background-color: $r2d-container;
  justify-content: space-between;
}

.visual{
  width: 23.5%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
}

.arp{
  width: 70%;
  height: 100%;
  max-height: 110%;
  display: flex;
  flex-direction: row;
  align-items: start;

}

.effects{
  width: 30%;
  height: 100%;
  max-height: 100%;
  background-color: $r2d-inner;
  border-radius: 3%;
  border: 3px solid rgba(255, 255, 255, 0.04);
}
</style>

<template>
  <div class="r2d-container">
    <div class="r2d">
      <div class="top-row row">
        <div class="voices">
          <voices></voices>
        </div>
        <div class="visual" >
          <visual-trip></visual-trip>
        </div>
      </div>
      <div class="row bottom-row" >
        <div class="arp">
          <arpeggiator ></arpeggiator>
        </div>
        <div class="effects">
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
  height: 90vh;
  width: 90vw;
  background-color: #6DBCDB;
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line */
  padding: 1%;
}

.r2d{
  height: 100%;
  max-height: 100%;
  width: 100%;
  background-color: #1e88e5;
}
.top-row{
  height: 50%;
  max-height: 50%;
  background-color: #4e342e;
  justify-content: space-between;
}
.bottom-row{
  height: 50%;
  max-height: 50%;

  background-color: #4e356e;
  justify-content: space-between;
}
.voices{
  background-color: yellow;
  width: 75%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
}

.visual{
  background-color: orange;
  width: 25%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.arp{
  width: 70%;
  background-color: blue;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
}

.effects{
  width: 30%;
  height: 100%;
  max-height: 100%;
  background-color: green;
}
</style>
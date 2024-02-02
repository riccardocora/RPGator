<template>
  <q-page>
    <div class="q-pa-none ">
      <div v-if="started">
        <div class="wood q-px-lg q-py-none">
          <div class="q-pa-md background_metal" style="display: flex; flex-direction: column;">
            <div class="row q-px-lg justify-between" style="flex: 1;">
              <div class="column border_all" style="flex: 1;">
                <voices></voices>
              </div>
              <div class="column border_right_top_bottom" >
                <visual-trip></visual-trip>
              </div>
            </div>
            <div class="row q-px-lg justify-between" style="flex: 1;">
              <div class="column border_side_bottom" style="flex: 1;">
<!--                <arpeggiator ></arpeggiator>-->
              </div>
              <div class="column border_right_bottom">
                <effects></effects>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-btn v-else color="white" text-color="black" label="Start" @click="start"></q-btn>
    </div>


  </q-page>
</template>

<script>
import {ref} from "vue";
import AudioContextHandler from "../components/AudioContextHandler";
import Voices from "../components/voices/voices.vue";
import FilterComp from "../components/filter/filterComp.vue";
import Filters from "../components/filter/filters.vue";
import Effects from "../components/effects/effects.vue";
// import Arpeggiator from "../components/arpeggio/Arpeggiator.vue";
// import Visual from "../components/visual.vue";
import VisualTrip from "../components/visualUnit/visual.vue";

export default{
  name: 'MainHost',
  components: {
    VisualTrip,
    // Visual,
    // Arpeggiator,
    Effects,
    Filters,
    FilterComp,
    Voices,
  },
  setup(){
    return{
      started : ref(false)
    }
  },
  methods: {
    async start() {
      AudioContextHandler.initializeAudioContext().then(() => {
        this.started = true;
        // The audio context has been initialized
      }).catch(error => {
        console.error('Error initializing the audio context:', error);
      });
    },
  }


}
</script>
<style>
:root{
  --border_color: rgba(255, 255, 255, 0.45);
}
.main{
  background-image: url("@/assets/images/dark-leather.png");
  background-color: #151515;
  border-radius: 30px;

}

.background_metal{
/*  background-image: url("assets/images/metal.png");*/
  background:
    /*url("assets/images/grid-noise.png"),*/
    linear-gradient(to right, transparent 0%, transparent 1.6%, rgb(40, 40, 40) 1.6%, rgb(45, 45, 45) 98.4%, transparent 98.4%, transparent 100%);
}

/*.background_metal::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, transparent 0%, transparent 1.6%, rgba(0, 0, 0, 0.8) 1.6%, rgba(0, 0, 0, 0.8) 98.4%, transparent 98.4%, transparent 100%);
  border-radius: inherit;
}*/


.wood{
  background: url("@/assets/images/wood-pattern.png"), rgba(164, 90, 19, 0.51);
  border-radius: 10px;
}


.border_all{
  background: transparent;
  /*
  border applies outside contour
  box-shadow inset applies inside contour
  */
  border : 3px solid var(--border_color);
  box-shadow: inset 0 0 5px rgb(0, 0, 0);
}

.border_sides{
  background: transparent;
  /*
  border applies outside contour
  box-shadow inset applies inside contour
  */
  border-right : 3px solid var(--border_color);
  border-left : 3px solid var(--border_color);
  box-shadow: inset 0 0 4px rgb(0, 0, 0);
}

.border_right_bottom{
  background: transparent;
  /*
  border applies outside contour
  box-shadow inset applies inside contour
  */
  border-right : 3px solid var(--border_color);
  border-bottom : 3px solid var(--border_color);
  box-shadow: inset 0 0 4px rgb(0, 0, 0);
}

.border_side_bottom{
  background: transparent;
  /*
  border applies outside contour
  box-shadow inset applies inside contour
  */
  border-right : 3px solid var(--border_color);
  border-left : 3px solid var(--border_color);
  border-bottom : 3px solid var(--border_color);
  box-shadow: inset 0 0 4px rgb(0, 0, 0);
}

.border_right_top_bottom{
  background: transparent;
  /*
  border applies outside contour
  box-shadow inset applies inside contour
  */
  border-right : 3px solid var(--border_color);
  border-top : 3px solid var(--border_color);
  border-bottom : 3px solid var(--border_color);
  box-shadow: inset 0 0 4px rgb(0, 0, 0);
}

 /*wood-pattern.png*/
.metal {
  position: relative;
  //margin: 40px auto;
  //outline: none;
  //font: bold 6em/2em "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
  //text-align: center;
  //color: hsla(0,0%,20%,1);
  //text-shadow: hsla(0,0%,40%,.5) 0 -1px 0, hsla(0,0%,100%,.6) 0 2px 1px;
  //background-color: hsl(0,0%,90%);
  //box-shadow: inset hsla(0,0%,15%,  1) 0  0 0 4px, /* border */
  //inset hsla(0,0%,15%, .8) 0 -1px 5px 4px, /* soft SD */
  //inset hsla(0,0%,0%, .25) 0 -1px 0 7px, /* bottom SD */
  //inset hsla(0,0%,100%,.7) 0  2px 1px 7px, /* top HL */
  //hsla(0,0%, 0%,.15) 0 -5px 6px 4px, /* outer SD */
  //hsla(0,0%,100%,.5) 0  5px 6px 4px; /* outer HL */
  //transition: color .2s;
}

.radial.metal {
  //width: 160px;
  //height: 160px;
  //line-height: 160px;
  border-radius: 80px;
  background-image: radial-gradient(circle at 50% 0%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),
  radial-gradient(circle at 50% 100%, hsla(0,0%,100%,.6) 0%, hsla(0,0%,100%,0) 100%),
  radial-gradient(circle at 0% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),
  radial-gradient(circle at 100% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%),

  repeating-radial-gradient(circle at 50% 50%, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   3%, hsla(0,0%,  0%,.1) 3.5%),
  repeating-radial-gradient(circle at 50% 50%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%,.1) 7.5%),
  repeating-radial-gradient(circle at 50% 50%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.2) 2.2%),

  radial-gradient(circle at 50% 50%, hsla(0,0%,90%,1) 5%, hsla(0,0%,85%,1) 30%, hsla(0,0%,60%,1) 100%);
}

.metal.radial:before, .metal.radial:after {
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  /* fake conical gradients */
  background-image: radial-gradient(circle at 50% 0%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  radial-gradient(circle at 50% 100%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  radial-gradient(circle at 0% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  radial-gradient(circle at 100% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%);
}
.metal.radial:before { transform: rotate( 65deg); }
.metal.radial:after { transform: rotate(-65deg); }

.metal.linear {
  //width: 100px;
  font-size: 4em;
  //height: 80px;
  border-radius: .5em;
  background-image: repeating-linear-gradient(to right, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%),
  repeating-linear-gradient(to right, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%),
  repeating-linear-gradient(to right, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%),

  linear-gradient(180deg, hsl(0,0%,78%)  0%,
    hsl(0,0%,90%) 47%,
    hsl(0,0%,78%) 53%,
    hsl(0,0%,70%)100%);
}

.metal.linear.oval {
  margin-top: 100px;
  width: 70px;
  height: 60px;
  line-height: 60px !important;
  border-radius: 50%;
  font: italic bold 3em/50px Georgia, "Times New Roman", Times, serif;
}

.metal:active {
  color: hsl(210, 100%, 40%);
  text-shadow: hsla(210,100%,20%,.3) 0 -1px 0, hsl(210,100%,85%) 0 2px 1px, hsla(200,100%,80%,1) 0 0 5px, hsla(210,100%,50%,.6) 0 0 20px;
  box-shadow:
    inset hsla(210,100%,30%,  1) 0  0px 0px 4px, /* border */
    inset hsla(210,100%,15%, .4) 0 -1px 5px 4px, /* soft SD */
    inset hsla(210,100%,20%,.25) 0 -1px 0px 7px, /* bottom SD */
    inset hsla(210,100%,100%,.7) 0  2px 1px 7px, /* top HL */

    hsla(210,100%,75%, .8) 0  0px 3px 2px, /* outer SD */
    hsla(210,50%,40%, .25) 0 -5px 6px 4px, /* outer SD */
    hsla(210,80%,95%,   1) 0  5px 6px 4px; /* outer HL */
}
.transparent{
  background: transparent;
}

.evidence{
  background-color: yellow;
}




</style>

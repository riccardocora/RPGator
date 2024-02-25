<template>
  <q-page >
    <div class="main-container">
      <div v-if="started">

            <RPGator></RPGator>
      </div>
      <q-btn v-else class="light_on"  text-color="white" label="Start" @click="start">
      </q-btn>


    </div>



  </q-page>
</template>

<script>
import {ref} from "vue";
import RPGator from "@/components/RPGator.vue";
import * as Tone from "tone";

export default{
  name: 'MainHost',
  components: {
    RPGator

  },
  setup(){
    return{
      started : ref(false)
    }
  },
  methods: {
    async start() {
      await Tone.start();
      this.started = true;

    },
  }


}
</script>
<style lang="scss">
:root{
  /*SELECT*/
  --select-border-color: rgba(49, 49, 49, 0.58);
  --select-color: rgba(19, 25, 33, 0.89);
  --select-shadow-color: rgba(0, 0, 0, 0.483);
  --select--text-color-off: rgb(136, 136, 136);
  --select--text-color-on: rgba(255, 255, 255, 0.824);

/*LIGHTS*/
  --border_color: rgba(255, 255, 255, 0.45);
  --on-color: rgb(213, 0, 0);
  --border-color_1: rgb(57, 56, 56);
  --off-color: rgb(30, 30, 30);
  --on-color-bright: rgb(255, 0, 0);
  --selected-color: rgb(161,161, 161);

  /*BUTTON*/
  --btn-border-color: rgb(57, 56, 56);
  --btn-color: rgb(30, 30, 30);
  --btn-color-off: rgb(49, 49, 49);
  --btn-shadow-color: rgba(35, 35, 35, 0.87);

  /*WRITINGS*/
  --text-color-off: rgb(108, 108, 108);
  --text-color-on: rgb(225, 225, 225);


  /*SLIDER*/
  --thumb-color: rgb(68, 68, 68);
  --thumb-color-shading: rgb(58, 57, 57);
  --thumb-darkshade: rgb(40, 40, 40);
  --thumb-brightshade:rgb(31, 31, 31);
  --thumb-lines: rgb(20, 20, 20);
  --thumb-centerline:  rgb(234, 234, 234);

  --slider-color: rgb(194, 193, 193);
  --slider-dashes: rgb(139, 138, 138);
  --slider-line: rgb(0,0,0);
}





.main-container{
  background-color: $background;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.q-checkbox__icon-container{
  display:none;
}
.q-checkbox__inner{
  display:none;
}

.button_light{
  background:
    radial-gradient(ellipse, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0.15)),
    var(--off-color) !important;
    box-shadow: 0 0 0 1px var(--border_color);
}

.shade{
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0));
  box-shadow: inset 0 0 15px 3px rgba(0, 0, 0, 0.49);
}




.background_metal{
/*  background-image: url("assets/images/metal.png");*/
  background:
    /*url("assets/images/grid-noise.png"),*/
    linear-gradient(to right, transparent 0%, transparent 1.6%, rgb(40, 40, 40) 1.6%, rgb(45, 45, 45) 98.4%, transparent 98.4%, transparent 100%);

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
    inset hsla(210,100%,30%,  1) 0  0 0 4px, /* border */
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


.q-carousel--navigation-left.q-carousel {
  padding-left: 2vw;
}


.light_on{
  background:
  radial-gradient(circle, rgba(255, 255, 255, 0.2),rgba(0, 0, 0, 0.05)),
  linear-gradient(to right,rgba(0, 0, 0, 0.05) 0%, rgba(203, 203, 203, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%),
  #cc0000 !important;
  box-shadow: 0 0 15px 5px rgb(224, 84, 84), 0 0 0 2px var(--border_color);
}


.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.column{
  width: min-content;
  height: min-content;

}

.q-carousel__slide{
  padding: 0 !important;
}



.q-slider__thumb {

}

.q-slider__thumb.q-slider__thumb--v.q-slider__thumb--v-rtl{
  width:280% !important;
  height:25% !important;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.25),  rgba(255, 255, 255, 0.25) 100%),
    linear-gradient(to top,var(--thumb-darkshade) 18%,
      transparent 20%,transparent 48.5%,
      var(--thumb-centerline) 48.5%, var(--thumb-centerline) 51.5%,
      transparent 51.5%, transparent 78%,var(--thumb-brightshade) 80%),
      /*SHADES BETWEEN LINES*/
      /*repeating-linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2),  rgba(255, 255, 255, 0.2) 10%),   */
      repeating-linear-gradient(to top, var(--thumb-color), var(--thumb-color-shading) 4.25%, var(--thumb-color) 8%,var(--thumb-lines) 8%, var(--thumb-lines) 10%);

  border: 0.1px inset rgba(0, 0, 0, 0.446);
  border-radius: 5%;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  outline: none;
}


.q-slider__thumb.q-slider__thumb--h.q-slider__thumb--h-ltr {
  width: 25% !important;
  height: 280% !important;
  background:
    linear-gradient(to right, rgba(0, 0, 0, 0.25),  rgba(255, 255, 255, 0.25) 100%),
    linear-gradient(to right,var(--thumb-darkshade) 18%,
      transparent 20%,transparent 48.5%,
      var(--thumb-centerline) 48.5%, var(--thumb-centerline) 51.5%,
      transparent 51.5%, transparent 78%,var(--thumb-brightshade) 80%),
      /*SHADES BETWEEN LINES*/
      /*repeating-linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2),  rgba(255, 255, 255, 0.2) 10%),   */
      repeating-linear-gradient(to right, var(--thumb-color), var(--thumb-color-shading) 4.25%, var(--thumb-color) 8%,var(--thumb-lines) 8%, var(--thumb-lines) 10%);

  border: 0.1px inset rgba(0, 0, 0, 0.446);
  border-radius: 5%;
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  outline: none;
}

.q-slider__focus-ring {
  display: none;
}
</style>



<template>
<!--  <div class="sliderContainer">-->
<!--&lt;!&ndash;    <input type="range" min="1" max="100" value="50" class="slider" id="myRange">&ndash;&gt;-->
<!--      <q-slider class="slider" thumb-size="20px" thumb-path="~assets/images/knob.png" track-color="black" selection-color="grey-10" :min="1" :max="100" v-model="value" @update:model-value="updateValue" />-->
<!--  </div>-->
<!--  <p>Value: {{value}}</p>-->

</template>
<script>
import {ref,defineComponent} from "vue";

export default defineComponent({
  name: "Slider",

  setup(){
    const value = ref(50);
    const updateValue = () => {
      console.log("value", value.value)
    }
    return {value, updateValue}
  }
})

</script>

<style lang="scss" >
////:root {
////  --thumb-color: rgb(68, 68, 68);
////  --thumb-color-shading: rgb(58, 57, 57);
////  --thumb-darkshade: rgb(0, 0, 0);
////  --thumb-brightshade:rgb(31, 31, 31);
////  --thumb-lines: rgb(20, 20, 20);
////  --thumb-centerline:  rgb(234, 234, 234);
////
////  --slider-color: rgb(194, 193, 193);
////  --slider-dashes: rgb(139, 138, 138);
////  --slider-line: rgb(0,0,0);
////}
//
.sliderContainer{
  width: 50%;
  height: 70px;
  //background:
    //linear-gradient(to right, var(--slider-color) 5%, transparent 5%, transparent 94%, var(--slider-color) 94%, var(--slider-color) 100%),
    //linear-gradient(to top, var(--slider-color) 30%, transparent 30%,transparent 70%, var(--slider-color) 70%, var(--slider-color) 100%),
    //linear-gradient(to right,transparent 0%,  transparent 49.85%, black 49.85%, black 50.15%, transparent 50.15%, transparent 100%),
    //repeating-linear-gradient(to right, var(--slider-color), var(--slider-color) 2.3%,  var(--slider-dashes) 2.3%, var(--slider-dashes) 2.5%);
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}
//
.q-slider__track-container{
  //background:
  //  //radial-gradient(circle, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0.15));
  //  //linear-gradient(to right, $slider-color, $slider-color 5%, transparent 5%, transparent 94%, $slider-color 94%, $slider-color 100%);
  //  //linear-gradient(to top, $slider-color 30%, transparent 30%,transparent 70%, $slider-color 70%, $slider-color 100%);
  //  //linear-gradient(to right,transparent 0%,  transparent 49.85%, black 49.85%, black 50.15%, transparent 50.15%, transparent 100%),
  //  repeating-linear-gradient(to right, transparent, $slider-color 5%,  $slider-dashes 1%, $slider-dashes 1%);
  //background-image: url("assets/images/metal.png");
  //display: flex;
  //border-radius: 3px;
  //align-items: center;
  //justify-content: center;
  //padding: 10px;
  //box-sizing: border-box;
}
//
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background: var(--slider-line);

  outline: none;
  opacity: 1;
  border: 1px solid rgb(0, 0, 0);
  -webkit-transition: .2s;
  transition: opacity .2s;
}


.q-slider__thumb--h {
  //height: 50px; /* 30 */
  //width: 20px; /* 55 */
  //height: 20px;
  //width: 10px; /* 55 */

  //-webkit-appearance: none;
  border: 0.1px inset rgba(0, 0, 0, 0.446);
  border-radius: 5%;
  background-image: url("@/assets/images/knob.png");
    //linear-gradient(to right, rgba(0, 0, 0, 0.25),  rgba(255, 255, 255, 0.25) 100%),
    //linear-gradient(to right,$slider-thumb-darkshade 18%,
    //  transparent 20%,transparent 48.5%,
    //  $slider-thumb-centerline 40%, $slider-thumb-centerline 60%,
    //
    //  transparent 51.5%, transparent 78%,$slider-thumb-brightshade 80%),
    //  /*SHADES BETWEEN LINES*/
    //  /*repeating-linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2),  rgba(255, 255, 255, 0.2) 10%),   */
    //repeating-linear-gradient(to right,$slider-thumb-color, $slider-thumb-color-shading 4.25%,$slider-thumb-color 8%,$slider-thumb-lines 8%, $slider-thumb-lines 10%);
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  outline: none;

}






</style>

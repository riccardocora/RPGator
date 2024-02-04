<template>
  <div class="octaves-container">
    <div v-for="octave in octaves" class="octave" :key="octave">
      <div class="woctave">
        <div v-for="note in ['C', 'D', 'E', 'F', 'G', 'A', 'B']" :id="`${note}${octave}`" ref="note" class="key w">
            <q-btn push class="fit key w" @click="handleMouseDown" @mouseleave="handleMouseLeave"/>
        </div>
      </div>
      <div class="boctave">
        <div id="C#" ref="Cs" @mouseleave="handleMouseLeave" class=" b" style="grid-column: 3 / 5;">
          <q-btn push class="fit key b" @click="handleMouseDown" @mouseleave="handleMouseLeave" />
        </div>
        <div id="D#" ref="Ds" @mouseleave="handleMouseLeave" class="  b" style="grid-column: 6 / 8; ">
          <q-btn push  class="fit key b" @click="handleMouseDown"/>

        </div>
        <div id="F#" ref="Fs" @mouseleave="handleMouseLeave" class=" b" style="grid-column: 12 / 14;">
          <q-btn push class="fit key b" @click="handleMouseDown"/>

        </div>
        <div id="G#" ref="Gs" @mouseleave="handleMouseLeave" class=" b" style="grid-column: 15 / 17; ">
          <q-btn  push  class="fit key b" @click="handleMouseDown"/>

        </div>
        <div id="A#" ref="As" @mouseleave="handleMouseLeave" class="b" style="grid-column: 18 / 20;">
          <q-btn  push class="fit key b"  @click="handleMouseDown"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {
    octave : Number,
  },
  setup(){
    const octaves = [1,2];
    const handleMouseDown = (evt)=>{
      console.log(evt)
    }
    const handleMouseLeave = ()=>{

    }
    return {
      octaves,
      handleMouseDown,
      handleMouseLeave
    }
  }

}
</script>

<style scoped lang="scss">
.octaves-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  background-color: #7c4dff;
  width: 100%;
}
.octave{
  width: 100%;
  height: 100%;
  display: flex;
  position:relative;
}
.woctave{
  position: relative;
  display: flex;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.boctave{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(21, 1fr);
  grid-template-rows: 100%;
}

.key{
  width: 100%;


}

.b{
  height: 60%;
  background-color: #0c0c0c;
  z-index: 2;
}
.w{
  height: 100%;
  width: 100%;
  background-color: rgb(238, 238, 238);

  z-index: 1;
}

.span {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}
</style>
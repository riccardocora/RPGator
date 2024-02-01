<template>
  <div class="octave" @mousedown="handleMouseDown" @mouseup="handleMouseUp"  @mouseover="handleMouseOver">
    <div class="row woctave">
      <div id="C" ref="C" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn push  class="fit w" @click="handleMouseDown"/>
      </div>

      <div id="D" ref="D" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn   push class="fit w" @click="handleMouseDown"/>

      </div>
      <div id="E" ref="E" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn  push  class="fit w" @click="handleMouseDown"/>

      </div>
      <div id="F" ref="F" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn push class="fit w" @click="handleMouseDown"/>

      </div>
      <div id="G" ref="G" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn  push class="fit w" @click="handleMouseDown"/>
      </div>
      <div id="A" ref="A" @mouseleave="handleMouseLeave" class=" q-mx-xs key w" >
        <q-btn push class="fit w" @click="handleMouseDown"/>
      </div>
      <div id="B" ref="B" @mouseleave="handleMouseLeave" class=" q-mx-xs key w">
        <q-btn  push class="fit w" click="handleMouseDown"/>

      </div>
    </div>
    <div class="row boctave">
      <div id="C#" ref="Cs" @mouseleave="handleMouseLeave" class="col q-mx-xs key b" style="grid-column: 3 / 5;">
          <q-btn push class="fit b" @click="handleMouseDown" />
      </div>

      <div id="D#" ref="Ds" @mouseleave="handleMouseLeave" class="col q-mx-xs key b" style="grid-column: 6 / 8; ">
        <q-btn  push  class="fit b" @click="handleMouseDown"/>

      </div>
      <div id="F#" ref="Fs" @mouseleave="handleMouseLeave" class="col q-mx-xs key b" style="grid-column: 12 / 14;">
        <q-btn push class="fit b" @click="handleMouseDown"/>

      </div>
      <div id="G#" ref="Gs" @mouseleave="handleMouseLeave" class="col q-mx-xs key b" style="grid-column: 15 / 17; ">
        <q-btn  push  class="fit b" @click="handleMouseDown"/>

      </div>
      <div id="A#" ref="As" @mouseleave="handleMouseLeave" class="col q-mx-xs key b" style="grid-column: 18 / 20;">
        <q-btn  push class="fit b"  @click="handleMouseDown"/>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Octave",
  props: {
    octaveNumber: Number,
  },
  data() {
    return {
    }
  },
  methods: {
    handleMouseLeave(e){
      if(this.$parent.mouseDown){
        this.notifyUp(e.currentTarget)
      }
    },
    handleMouseUp(e) {
      this.$parent.mouseDown= false;
      this.notifyUp(e.target)
      //console.log("mouse is now up")
    },
    handleMouseDown(e) {
      // this.$parent.mouseDown= true;
      // this.notifyDown(e.target)
      //console.log("mouse is now down")
    },
    handleMouseOver(e){
      if(this.$parent.mouseDown){
        //console.log(e.target)
        this.notifyDown(e.target)

      }
      //console.log("mouseDown is "+this.$parent.mouseDown+" and is moving")
    },
    notifyDown(key){
      //emitting cusom event "keyDown"
      this.$emit("virtualKeyDown",key.id,this.octaveNumber)
      this.switchColorPress(key.id)
    },
    switchColorPress(note){
      if(note.includes("#")){
        note = note.replace("#","s")
      }
      let key = this.$refs[note];
      //change color of key when pressed
      if (key.classList.contains('wkey')){
        key.classList.remove("wUnpressed")
        key.classList.add("pressed")
      }else{
        key.classList.remove("bUnpressed")
        key.classList.add("pressed")
      }
    },
    notifyUp(key){
      //emitting cusom event "keyUp"
      this.$emit("virtualKeyUp",key.id,this.octaveNumber)
      this.switchColorRelease(key.id)
      //not needed, called in PianoKeyboard (when clicking with the mouse on keyboard all keys are released (color))
    },
    switchColorRelease(note){
      if(note === "all"){
        for (const ref of Object.values(this.$refs)) {
          if (ref.classList.contains('wkey')){
            ref.classList.add("wUnpressed")
            ref.classList.remove("pressed")
          }else{
            ref.classList.add("bUnpressed")
            ref.classList.remove("pressed")
          }
        }
      }else{
        if(note.includes("#")){
          note = note.replace("#","s")
        }
        let key = this.$refs[note];
        //change color of key when released
        if (key.classList.contains('wkey')){
          key.classList.add("wUnpressed")
          key.classList.remove("pressed")
        }else{
          key.classList.add("bUnpressed")
          key.classList.remove("pressed")
        }
      }

    }
  }
}
</script>

<style>

.octave{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  position:relative;
}
.woctave{
  position: relative;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
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
  z-index: 2;
  pointer-events: none;
}

.key{
  border-radius: 6px;
  //border-color: red;
  //border-width: 0.1vw;
  //border-style: solid;
  //box-shadow: 4px 1px 10px 2px rgba(255, 255, 255, 0.08);;

}

.wUnpressed{
  background-color:#f8e7e6;
  opacity: 40%;
}
.bUnpressed{
  //background-color:#645352;
}
.pressed{
  background-color:#f3a59a;
}
.b{
  height: 9rem;
  width: 2rem;
  //background-image: url("assets/images/green-dust-and-scratches.png");

  background-color: rgb(210, 190, 190);

  //background: #000;
  //color: #eee;
  //top: 0;

  //box-shadow: 1px 2px 2px 2px rgba(117, 8, 21, 0.69);;

}
.w{
  height: 15rem;
  width: 2.5rem;
  background-image: url("assets/images/green-dust-and-scratches.png");

  background-color: rgba(2, 80, 101, 0.89);

  //box-shadow: 1px 2px 2px 2px rgba(45, 224, 255, 0.42);;

}


</style>

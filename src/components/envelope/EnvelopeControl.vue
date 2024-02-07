  <template>
      <div class="screen-container selector">
        <canvas class="curve" ref="visualCanvas"></canvas>
          <div class="screen">
            <div class="screen-frame"></div>

            <div class="screen-inset"></div>
          </div>
      </div>
      <div class="knob-container">
        <div class="knob-wrapper">
          <Knob id="attack" :color="color" :min="-0.1" :max="2" :inner-max="2" :value="envelope.attack" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />
          A{{envelope.attack.toFixed(2)}}
        </div>
        <div class="knob-wrapper">
          <Knob id="decay" :color="color" :min="0" :max="2" :inner-max="2" :value="envelope.decay" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />
          D
        </div>
        <div class="knob-wrapper">
          <Knob id="sustain" :color="color" :min="0" :max="1" :inner-max="1" :value="envelope.sustain" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />
          S
        </div>
        <div class="knob-wrapper">
          <Knob id="release" :color="color" ::min="0" :max="5" :inner-max="5" :value="envelope.sustain" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />
          R
        </div>
      </div>
<!--      <div class="row justify-between q-pa-sm" >-->
<!--          <div class="column inline q-pr-sm" >-->

<!--          <div>-->
<!--            <q-badge outline color="accent" label="A"/>-->

<!--          </div>-->
<!--        </div>-->
<!--        <div class="column inline q-px-sm">-->

<!--          <div>-->
<!--            <q-badge outline :color="color" label="D"/>-->

<!--          </div>-->

<!--        </div>-->
<!--        <div class="column inline q-px-sm">-->

<!--          <div>-->
<!--            <q-badge outline color="accent" label="S"/>-->

<!--          </div>-->

<!--        </div>-->
<!--        <div class="column inline q-pl-sm">-->

<!--          <div>-->
<!--            <q-badge outline color="accent" label="R"/>-->

<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
  </template>

  <script>

  import {ref, onMounted, defineComponent, reactive} from "vue";
  import AudioContextHandler from "../AudioContextHandler.js";
  import {getCssVar} from "quasar";
  import Knob from "../controls/Knob.vue";

  export default defineComponent({
    name: "EnvelopeComp",
    components: {Knob},
    props: {
      id: {
        type: String,
        required: true
      },
      envType: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },

    setup(props){
      const envelope = reactive({
        attack : 1.0,
        decay : 1.0,
        sustain : 0.5,
        release : 2.5
      })
      const visualCanvas = ref(null);
      onMounted(() => {
        // Logic that initializes the canvas and draws the envelope

        // Logic to create the Tone.js envelope and oscillator
        draw();
      });

      const draw = () => {
        const canvas = visualCanvas.value;
        const ctx = canvas.getContext("2d");
        let current = 0;
        const currentAttack = envelope.attack
        const currentDecay = envelope.decay
        const currentRelease = envelope.release

        // Reset variables
        const total = (currentAttack + currentDecay + currentRelease).toFixed(2)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 2;
        // // Stroke
        ctx.lineWidth = 3;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // const gradient = ctx.createLinearGradient(0, 0, 170, 0);
        // gradient.addColorStop("0", "gold");
        // gradient.addColorStop("0.5", "blue");
        // gradient.addColorStop("1.0", "purple");
        ctx.strokeStyle = getCssVar(props.color);



        // Attack
        ctx.beginPath();
        ctx.moveTo(current, canvas.height); // Start from the origin on the vertical axis
        ctx.lineTo(
          (currentAttack / total) * (canvas.width-100) + current,
          50
        );
        current += (currentAttack / total) * (canvas.width-100); // Update current position


        // Decay
        ctx.lineTo(currentDecay / total * (canvas.width-100) + current, canvas.height - envelope.sustain * (canvas.height-50));
        current += currentDecay / total * (canvas.width-100);
        console.log("current",current)

        // Sustain
        ctx.lineTo(current +100, canvas.height - envelope.sustain * (canvas.height-50));
        console.log("current",current)
        //current+=100;
        // Release
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle= getCssVar(props.color);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

      }
      const updateEnvelope = (newValue) => {
        console.log("updateEnvelope", newValue)
        // console.log("this[newValue.id]", this[newValue.id].value)
        envelope[newValue.id] = newValue.value;
        console.log("envelope", envelope)

        // this[newValue.id].value = newValue.value;
        // const envelope = {
        //   attack: attack.value,
        //   decay: decay.value,
        //   sustain: sustain.value,
        //   release: release.value
        // };
        draw();

        AudioContextHandler.voices.setSynthEnvelope(props.id,props.envType,envelope)

        // // Emit the envelope values to the parent
        // context.emit("update:envelope", envelope);
      }

      return {
        envelope,
        visualCanvas,
        updateEnvelope
      };
    },

  });
  </script>

<style lang="scss" scoped>


.screen-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 75%;
  align-self: center;
  padding: 5px;
}

.knob-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 25%;
  font-size: 11px;
}


.curve{
  width: 100%;
  height: 100%;
  align-self: center;
}


.selector {

  border: #030303 1px solid;


  /* your existing styles */

  /* Add multiple inset box shadows to create an inner "screen" effect */
  //box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  //inset 0 0 15px 1px var(--select-shadow-color), /* inner shadow */
  //0 0 0 2px inset var(--select-border-color); /* inner shadow */

  ///* Add a radial gradient to simulate inner light */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-45deg, transparent 65%, rgb(255, 255, 255) 135%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--text-color-on);

}


.screen, .screen-inset {
  top: 2%;
  left: 2%;
  width: 98%;
  height: 98%;
}
.screen {
  background-image:
      radial-gradient(50% 5% at 50% 1%, rgba(255, 255, 255, 0.29) 0.5%,#fff0),
      radial-gradient(110% 65% at 60% 150%, rgba(255, 255, 255, 0.71) 1%,#fff0),
      radial-gradient(100% 100% at 50% 50%,#0000 25%,#000 50%),
      radial-gradient(100% 100% at 50% 50%,#0000 20%,#000 80%);
}
.screen-inset {
  box-shadow: 0 -0.1em 0.1em 0.6em rgba(35, 34, 34, 0.42) inset;
}
//.screen-frame {
//  border-top: 2em solid #7b807d;
//  border-right: 2em solid #9da28f;
//  border-bottom: 2em solid #b0b5a0;
//  border-left: 2em solid #8c917e;
//  border-radius: 3em;
//  box-shadow: 0 0.1em 0.2em 0.2em #0007 inset;
//  top: 50%;
//  left: 50%;
//  width: calc(110%);
//  height: calc(130%);
//  transform: translate(-50%,-50%);
//}
</style>


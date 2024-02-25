  <template>
    <div class="q-px-md q-pt-sm ">
      <div class="screen-container selector shadow-1">
        <canvas class="curve" ref="visualCanvas"></canvas>
          <div class="screen">
            <div class="screen-frame"></div>

            <div class="screen-inset"></div>
          </div>
      </div>
      <div class="knob-container q-mt-sm q-px-md">
        <div class="knob-wrapper">
          <Knob v-model="envelope.attack" :value="envelope.decay" :id="'attack'+id" :color="color" :min="0" :max="2"   :step="0.01" :thickness="0.1" :update="updateEnvelope" :midi="70"/>
          A
        </div>
        <div class="knob-wrapper">
          <Knob v-model="envelope.decay" :value="envelope.decay" :id="'decay'+id" :color="color" :min="0" :max="2"  :step="0.01" :thickness="0.1" :update="updateEnvelope"  :midi="71"/>
          D
        </div>
        <div class="knob-wrapper">
          <Knob v-model="envelope.sustain" :value="envelope.sustain" :id="'sustain'+id" :color="color" :min="0" :max="1"   :step="0.01" :thickness="0.1" :update="updateEnvelope"  :midi="72"/>
          S
        </div>
        <div class="knob-wrapper">
          <Knob v-model="envelope.release" :value="envelope.release"  :id="'release'+id" :color="color" ::min="0" :max="5" :step="0.01" :thickness="0.1" :update="updateEnvelope"  :midi="73"/>
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

    </div>
  </template>

  <script>

  import {ref, onMounted, defineComponent} from "vue";
  import {getCssVar} from "quasar";
  import Knob from "../controls/Knob.vue";
import * as Tone from "tone";
  export default defineComponent({
    name: "EnvelopeComp",
    components: {Knob},
    props: {
      id: {
        type: String,
        required: true
      },

      color: {
        type: String,
        required: false,
        default : "accent"
      },
      input : {
        type: Tone.Gain,
        required: false
      },
      output : {
        type: Tone.Gain,
        required: false
      },
      update : {
        type: Function,
        required: true
      }
    },

    setup(props){
      const attack = ref(0.1)
      const decay = ref(0.2)
      const sustain = ref(0.5)
      const release = ref(0.8)
      const envelope = new Tone.AmplitudeEnvelope({
        attack: attack.value,
        decay: decay.value,
        sustain: sustain.value,
        release: release.value
      });

      if(props.input){
        props.input.connect(envelope);
      }
      if(props.output){
        envelope.connect(props.output);
      }
      const visualCanvas = ref(null);
      onMounted(() => {
        // Logic that initializes the canvas and draws the envelope

        // Logic to create the Tone.js envelope and oscillator
        draw();
      });

      const draw = () => {
        const canvas = visualCanvas.value;
        if(canvas === null) return;
        const ctx = canvas.getContext("2d");
        let current = 0;
        const currentAttack = envelope.attack
        const currentDecay = envelope.decay
        const currentRelease = envelope.release
        // Reset variables
        const total = (currentAttack + currentDecay + currentRelease).toFixed(2)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = getCssVar(props.color);
        ctx.shadowColor = getCssVar(props.color);
        ctx.shadowBlur = 2;
        // // Stroke
        ctx.lineWidth = 3;
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
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


        // Sustain
        ctx.lineTo(current +100, canvas.height - envelope.sustain * (canvas.height-50));

        //current+=100;
        // Release
        ctx.lineTo(canvas.width, canvas.height);
        // ctx.fillStyle= getCssVar(props.color);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

      }
      const updateEnvelope = (newValue) => {

        const attributeId = newValue.id.match(/[a-zA-Z]+/)[0]; // Extracts the literal part
        const idNumber = newValue.id.match(/\d+/)[0]; // Extracts the numerical par
        console.log("idNumber",idNumber)
        console.log("props.id",props.id)
        console.log("attributeId",attributeId)
        if (idNumber !== props.id) {
          return; // If the numerical part does not match props.id, exit the function
        }
        envelope[attributeId] = newValue.value;



        draw();
        props.update(envelope);

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
  width: 100%;
  max-height: 10em;
  aspect-ratio: 14/9;
  align-self: center;
  padding: 2%;
  border-radius: 3%;

  //padding: 5px;
}

.knob-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  //height: 25%;
  font-size: 11px;
}


.curve{
  width: 100%;
  height: 100%;
  align-self: center;
}

.selector {

  border: #030303 1px solid;
  /* Add multiple inset box shadows to create an inner "screen" effect */
  box-shadow: inset 0 0 8px 1px var(--select-shadow-color),
  inset 0 0 15px 1px var(--select-shadow-color), /* inner shadow */
  0 0 0 2px inset var(--select-border-color); /* inner shadow */

  ///* Add a radial gradient to simulate inner light */
  background:
      radial-gradient(ellipse at center, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.404)),
      linear-gradient(-3deg, transparent 85%, rgb(255, 255, 255) 150%),
      linear-gradient(5deg, transparent 85%, rgb(255, 255, 255) 150%),
      linear-gradient(-90deg, transparent 90%, rgb(255, 255, 255) 180%),
      var(--select-color);
  justify-content: flex-end;
  align-items: center;
  color: var(--select--text-color-on);

}


.screen, .screen-inset {
  width: 100%;
  height: 100%;
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


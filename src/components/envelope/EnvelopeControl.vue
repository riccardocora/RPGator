  <template>
    <div class="full-height rounded-borders">

    <q-card-section class="row q-pa-sm">
      <div class="screen-container">
        <canvas class="curve" ref="visualCanvas"></canvas>
        <div class="screen">
          <div class="screen-frame"></div>

          <div class="screen-inset"></div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row justify-between q-pa-xs" >
        <div class="column inline q-pr-sm" >
          <Knob id="attack" :color="color" :min="0" :max="2" :inner-max="2" :value="envelope.attack" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />
<!--          <q-slider-->
<!--            label-->
<!--            dense-->
<!--            vertical-->
<!--            reverse-->
<!--            class="q-py-md adsr-slider"-->
<!--            track-size="2px"-->
<!--            thumb-size="15px"-->
<!--            :min="0"-->
<!--            :max="2"-->
<!--            :step="0.05"-->
<!--            v-model="attack"-->
<!--            track-color="transparent"-->
<!--            :thumb-color="color"-->
<!--            label-color="black"-->
<!--            :label-text-color="color"-->
<!--            selection-color="transparent"-->
<!--            :color="color"-->
<!--            @update:model-value="updateEnvelope"-->
<!--          >-->
<!--            {{ attack }}%-->
<!--          </q-slider>-->
          <div>
            <q-badge outline color="accent" label="A"/>

          </div>
        </div>

        <div class="column inline q-px-sm">
          <Knob id="decay" :color="color" :min="0" :max="2" :inner-max="2" :value="envelope.decay" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />

<!--          <q-slider-->
<!--            label-->
<!--            dense-->
<!--            vertical-->
<!--            reverse-->
<!--            class="q-py-md adsr-slider"-->
<!--            track-size="2px"-->
<!--            thumb-size="15px"-->
<!--            :min="0"-->
<!--            :max="2"-->
<!--            :step="0.05"-->
<!--            v-model="decay"-->
<!--            :color="color"-->
<!--            @update:model-value="updateEnvelope"-->
<!--            track-color="transparent"-->
<!--            color="color"-->
<!--            :thumb-color="color"-->
<!--            label-color="black"-->
<!--            :label-text-color="color"-->
<!--            switch-label-side-->
<!--            selection-color="transparent"-->
<!--          >-->
<!--            {{ decay }}%-->
<!--          </q-slider>-->
          <div>
            <q-badge outline :color="color" label="D"/>

          </div>

        </div>
        <div class="column inline q-px-sm">
          <Knob id="sustain" :color="color" :min="0" :max="1" :inner-max="1" :value="envelope.sustain" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />


          <!--          <q-slider-->
<!--            label-->
<!--            reverse-->
<!--            :min="0"-->
<!--            :max="1"-->
<!--            :step="0.05"-->
<!--            class="q-py-md adsr-slider"-->
<!--            v-model="sustain"-->
<!--            track-color="transparent"-->
<!--            :color="color"-->
<!--            dense-->
<!--            vertical-->
<!--            track-size="2px"-->
<!--            thumb-size="15px"-->
<!--            @update:model-value="updateEnvelope"-->
<!--            :thumb-color="color"-->
<!--            label-color="black"-->
<!--            :label-text-color="color"-->
<!--            selection-color="transparent"-->
<!--          >-->
<!--            {{ sustain }}%-->
<!--          </q-slider>-->
          <div>
            <q-badge outline color="accent" label="S"/>

          </div>

        </div>
        <div class="column inline q-pl-sm">
          <Knob id="release" :min="0" :max="5" :inner-max="5" :value="envelope.sustain" :step="0.01" :thickness="0.1" @updateValue="updateEnvelope" />

          <!--          <q-slider-->
<!--            label-->
<!--            dense-->
<!--            vertical-->
<!--            reverse-->
<!--            class="q-py-md adsr-slider"-->
<!--            track-size="2px"-->
<!--            thumb-size="15px"-->
<!--            :min="0"-->
<!--            :max="5"-->
<!--            :step="0.05"-->
<!--            v-model="release"-->
<!--            track-color="transparent"-->
<!--            :color="color"-->
<!--            @update:model-value="updateEnvelope"-->
<!--            :thumb-color="color"-->
<!--            label-color="black"-->
<!--            :label-text-color="color"-->
<!--            selection-color="transparent"-->
<!--            switch-label-side-->
<!--          >-->
<!--            {{ release }}%-->
<!--          </q-slider>-->
          <div>
            <q-badge outline color="accent" label="R"/>

          </div>

        </div>
    </q-card-section>
    </div>


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
        const currentAttack = parseFloat(envelope.attack)
        const currentDecay = parseFloat(envelope.decay)
        const currentRelease = parseFloat(envelope.release)

        // Reset variables
        const total = parseFloat(currentAttack + currentDecay + currentRelease).toFixed(2)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 15;
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
.adsr-slider{
  max-height: 150px
  }
.curve{
  width: 240px;
  display: block;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);

//border-radius: 5px
//border: solid 1px black
}
.screen-container, .controls {
  width: 8em;
}
.screen-container {
  background-color: black;
  margin: 0.2em 0 0 0;
  overflow: hidden;
  border-radius: 0.5em;
  position: relative;
  height: 150px;
  width: 250px;
}
.screen, .screen-inset, .screen-frame, canvas, img {
  position: absolute
}
.screen, .screen-inset {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.screen {
  background-image:
//radial-gradient(1em at 3% 4%,#fff 4%,#fff0),
//radial-gradient(9em 1em at 7% 10%,#fff 30%,#fff0),
radial-gradient(100% 175% at 50% 50%,#0000 32%, rgba(201, 201, 201, 0.11) 60%),
radial-gradient(175% 100% at 50% 53%,#0000 32%, rgba(203, 203, 203, 0.09) 60%);
}
.screen-inset {
  box-shadow: 0 0 1px 7px rgb(150, 150, 150) inset;
}
  .container{
    background-image: url("~@/assets/images/metal.png");
    border-radius: 3%;
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


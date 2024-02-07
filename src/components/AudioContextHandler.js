
import * as Tone from 'tone'
import EffectChain from "@/components/effects/effectChain.js";
import FilterChain from "@/components/filter/filterChain.js";
import VoiceHandler from "@/voiceHandler.js";

 class AudioContextHandler {


  static synths;
  static filters;
  static effectChain
  static outputGain;
  static destination;
  static duoSynth;

  static voices;

  // static getSynth(synthId){
  //   return this.synths.get(synthId)
  // }

  // static getDuoSynthVoice(voiceId){
  //   return this.duoSynth[`voice${voiceId}`]
  // }


  static initAudioNodes(){

    this.outputGain = new Tone.Gain();
    this.destination= Tone.getDestination()
    this.voices = new VoiceHandler()
    this.voices.addVoice("0");
    this.voices.addVoice("1");
    // this.synths = new Map([
    //
    //   ['0', { 'synth': new Tone.MonoSynth(),
    //           'gain': new Tone.Gain(0.5),
    //           'chained': false
    //   }],
    //   ['1', { 'synth' : new Tone.MonoSynth(),
    //           'gain' : new Tone.Gain(0.5),
    //           'chained': false
    //   }],
    // ]);
    this.filters = new FilterChain();
    this.filters.addFilter("0");
    this.filters.addFilter("1");

    // this.voices.connectVoice("0",Tone.getDestination());
    // this.voices.connectVoice("1", Tone.getDestination());

    this.voices.connectVoice("0", this.filters.getFilter("0").input);
    this.voices.connectVoice("1", this.filters.getFilter("1").input);




    // this.duoSynth = new Tone.DuoSynth();
    // this.duoSynth.set({
    //   voice0: this.synths.get('0').synth.get(),
    //   voice1: this.synths.get('1').synth.get(),
    // });
    // this.filters.connectToFilter("0", this.synths.get('0').gain);
    // this.filters.connectToFilter("1", this.synths.get('1').gain);
    // this.duoSynth.voice0.connect(this.synths.get('0').gain);
    // this.duoSynth.voice1.connect(this.synths.get('1').gain);


    this.effectChain = new EffectChain();
    this.effectChain.addEffect("chorus");
    this.effectChain.addEffect("delay");
    /*this.effectChain.addEffect("vibrato");*/
    this.effectChain.addEffect("dist");
    this.effectChain.addEffect("reverb");




    this.filters.connect(this.effectChain.input)



    this.effectChain.connect(this.outputGain)

    const limiter = new Tone.Limiter(-5).toDestination();

   /* const vol = new Tone.Volume(-12).toDestination();*/


    this.outputGain.connect(limiter);
    limiter.toDestination();


  }







  static async initializeAudioContext() {
    await Tone.start();
    this.initAudioNodes()

  }

  // static setSamplerInstrument(samplerId, instrument){
  //   this.synths.get(samplerId).synth.set(instrument)
  // }


 }



export default AudioContextHandler;

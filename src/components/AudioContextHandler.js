//
// import * as Tone from 'tone'
// import filterChain from "@/components/filter/filterChain.js";
// import voices from "@/components/voices/voiceHandler.js";
// import effectChain from "@/components/effects/effectChain.js";
//
// const R2Darp = {
//     outputGain : new Tone.Gain(0.5),
//
//     startTone : async function () {
//
//     },
//     init : function(){
//         const voice0 = voices.get('0');
//         //console.log('filterChain madonna',filterChain)
//         const filter0 = filterChain.filters.get('0');
//         voice0.gain.connect(filter0.input);
//         const voice1 = voices.get('1');
//         const filter1 = filterChain.filters.get('1');
//         voice1.gain.connect(filter1.input);
//
//         const effects = effectChain;
//         //console.log('filter0',filter0)
//
//         filterChain.outputGain.connect(effects.input);
//
//         effects.output.connect(this.outputGain);
//         this.outputGain.toDestination();
//     }
// }
//
//
// export default R2Darp;
//
//
//
//
//
//
//
//
//
//
// //
// //  class AudioContextHandler {
// //
// //
// //   static synths;
// //   static filters;
// //   static effectChain
// //   static outputGain;
// //   static destination;
// //   static duoSynth;
// //
// //   static voices;
// //
// //   // static getSynth(synthId){
// //   //   return this.synths.get(synthId)
// //   // }
// //
// //   // static getDuoSynthVoice(voiceId){
// //   //   return this.duoSynth[`voice${voiceId}`]
// //   // }
// //
// //
// //   static initAudioNodes(){
// //     //console.log("initAudioNodes")
// //     this.outputGain = new Tone.Gain();
// //     this.destination= Tone.getDestination()
// //     this.voices = new VoiceHandler()
// //     this.voices.addVoice("0");
// //     this.voices.addVoice("1");
// //     // this.synths = new Map([
// //     //
// //     //   ['0', { 'synth': new Tone.MonoSynth(),
// //     //           'gain': new Tone.Gain(0.5),
// //     //           'chained': false
// //     //   }],
// //     //   ['1', { 'synth' : new Tone.MonoSynth(),
// //     //           'gain' : new Tone.Gain(0.5),
// //     //           'chained': false
// //     //   }],
// //     // ]);
// //     this.filters = new FilterChain();
// //     this.filters.addFilter("0");
// //     this.filters.addFilter("1");
// //
// //     // this.voices.connectVoice("0",Tone.getDestination());
// //     // this.voices.connectVoice("1", Tone.getDestination());
// //
// //     this.voices.connectVoice("0", this.filters.getFilter("0").input);
// //     this.voices.connectVoice("1", this.filters.getFilter("1").input);
// //
// //
// //
// //
// //     // this.duoSynth = new Tone.DuoSynth();
// //     // this.duoSynth.set({
// //     //   voice0: this.synths.get('0').synth.get(),
// //     //   voice1: this.synths.get('1').synth.get(),
// //     // });
// //     // this.filters.connectToFilter("0", this.synths.get('0').gain);
// //     // this.filters.connectToFilter("1", this.synths.get('1').gain);
// //     // this.duoSynth.voice0.connect(this.synths.get('0').gain);
// //     // this.duoSynth.voice1.connect(this.synths.get('1').gain);
// //
// //
// //     this.effectChain = new EffectChain();
// //     this.effectChain.addEffect("chorus");
// //     this.effectChain.addEffect("delay");
// //     /*this.effectChain.addEffect("vibrato");*/
// //     this.effectChain.addEffect("dist");
// //     this.effectChain.addEffect("reverb");
// //
// //
// //
// //
// //     this.filters.connect(this.effectChain.input)
// //     //console.log(`Connected filter chain out to eff chain input gain.`);
// //
// //
// //
// //     this.effectChain.connect(this.outputGain)
// //     //console.log(`Connected effects chain to output gain.`);
// //
// //     const limiter = new Tone.Limiter(-10).toDestination();
// //     this.outputGain.connect(limiter);
// //     limiter.toDestination();
// //     //console.log(`Connected effects chain to destination`);
// //
// //
// //   }
// //
// //
// //
// //
// //
// //
// //
// //   static async initializeAudioContext() {
// //
// //     this.initAudioNodes()
// //
// //   }
// //
// //   // static setSamplerInstrument(samplerId, instrument){
// //   //   this.synths.get(samplerId).synth.set(instrument)
// //   // }
// //
// //
// //  }
// //
// //
// //
// // export default AudioContextHandler;

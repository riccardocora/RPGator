// import * as Tone from 'tone'
// import SoundLoader from "../../SoundLoader.js";
//
// class Voice {
//     constructor() {
//         this.synth = new Tone.PolySynth(Tone.MonoSynth, {
//             volume: -10,
//         });
//         this.sampler = SoundLoader.load({instruments: 'piano'});
//         this.gain = new Tone.Gain(0.5);
//         this.pan = new Tone.Panner();
//         this.chained = true;
//         this.octave = 0;
//         this.voiceType = 'synth';
//
//         this.sampler.connect(this.pan);
//         this.synth.connect(this.pan);
//         this.pan.connect(this.gain);
//     }
//
//     toggleChain() {
//         if (this.chained) {
//             this.disconnect();
//         } else {
//             this.connect(this.gain);
//         }
//         this.chained = !this.chained;
//     }
//
//     playActiveVoices(note, duration) {
//         if (this.voiceType === 'sampler' && this.sampler.loaded === false) {
//             return;
//         }
//         this[this.voiceType].triggerAttackRelease(Tone.Frequency(note).transpose(this.octave * 12), duration,"4n");
//     }
//
//     setSamplerInstrument(instrument) {
//         this.sampler = SoundLoader.load({
//             instruments: instrument,
//             onload: () => {
//                 //console.log('loaded');
//             }
//         });
//         this.sampler.connect(this.pan);
//     }
//
//     noteDown(note, velToGain) {
//         let noteFreq = note.hasOwnProperty('frequency') ? note.frequency : note;
//         this[this.voiceType].triggerAttack(noteFreq, Tone.now(), velToGain);
//     }
//
//     noteUp(note) {
//         let noteFreq = note.hasOwnProperty('frequency') ? note.frequency : note;
//         this[this.voiceType].triggerRelease(noteFreq, Tone.now());
//     }
// }
//
// const voice0 = new Voice();
// const voice1 = new Voice();
//
// const voices = new Map();
// voices.set('0', voice0);
// voices.set('1', voice1);
//
// export default voices;
import * as Tone from 'tone'
import SoundLoader from "./SoundLoader";
import AudioKeys from "audiokeys";

class VoiceHandler {
    constructor() {
        this.voices= new Map();
        this.output = new Tone.Gain()
        this.keyboard = new AudioKeys({polyphony: 4});
    }
    addVoice(id){
      const voiceObj = {
        voice: {synth: new Tone.PolySynth(Tone.MonoSynth),
                sampler: SoundLoader.load({instruments: 'piano'})},
        gain: new Tone.Gain(0.5),
        pan: new Tone.Panner(),
        chained: true,
        octave: 0,
        voiceType: 'synth'
      }
      voiceObj.voice.synth.connect(voiceObj.gain);
      voiceObj.voice.sampler.connect(voiceObj.gain);
      voiceObj.gain.connect(voiceObj.pan)
      this.voices.set(id,voiceObj)
      this.connectKeyboard()
    }

    getVoice(id){
      return this.voices.get(id)
    }
    connectKeyboard(){
      function map(value, sourceMin, sourceMax, targetMin, targetMax) {
        // Scale the input value from the source range to the target range
        return (value - sourceMin) / (sourceMax - sourceMin) * (targetMax - targetMin) + targetMin;
      }
      this.keyboard.down(note => {
        const velToGain = map(note.velocity, 0, 127, 0, 1);
        this.voices.forEach(voiceObj => {
          voiceObj.voice[voiceObj.voiceType].triggerAttack(note.frequency, Tone.now(), velToGain);
        });
      })
      this.keyboard.up(note => {
        this.voices.forEach(voiceObj => {
          voiceObj.voice[voiceObj.voiceType].triggerRelease(note.frequency, Tone.now())
        })
      });
    }


    toggleChain(id){
      const voice = this.voices.get(id).voice[this.voices.get(id).voiceType]
      if(this.voices.get(id).chained) {
         voice.disconnect()

      }else{
        voice.connect(this.voices.get(id).gain)

      }
      this.voices.get(id).chained = !this.voices.get(id).chained

    }

    switchType(id){
      if(this.voices.get(id).voiceType === 'synth'){
        this.voices.get(id).voiceType = 'sampler'
      }else{
        this.voices.get(id).voiceType = 'synth'
      }
    }
    getVoiceType(id){
      return this.voices.get(id).voiceType
    }

    setVoiceOctave(id,oct){
      this.voices.get(id).octave = oct
    }

    setVoiceVolume(id,vol){
      this.voices.get(id).gain.set({gain: vol});
      // this.voices.get(id).voice.sampler.volume = vol;
    }

    setVoicePan(id,pan){
      this.voices.get(id).pan.set({pan: pan});
    }
    playVoice(id){
      // const octave = Tone.Frequency('C4').transpose(this.voices.get(id).octave).toNote()
      // console.log('note',octave)
      const note = Tone.Frequency('C' +(4+ this.voices.get(id).octave).toString())
      this.voices.get(id).voice[this.voices.get(id).voiceType].triggerAttack(note);
    }
    playActiveVoices(note,octave,duration){

      //let filteredVoices = Array.from(this.voices.values()).filter(voiceObj => voiceObj.chained);
      this.voices.forEach(voiceObj => {
        if (voiceObj.voiceType === 'sampler' && voiceObj.voice.sampler.loaded === false){
          return
        }
        voiceObj.voice[voiceObj.voiceType].triggerAttackRelease(note+(octave+voiceObj.octave).toString(),duration)
      });

    }

    stopVoice(id){

      const note = Tone.Frequency('C' +(4+ this.voices.get(id).octave).toString())

      this.voices.get(id).voice[this.voices.get(id).voiceType].triggerRelease(note);
    }

    connectVoice(id,node){
      this.voices.get(id).gain.connect(node)
    }
    setSynthEnvelope(id,envType,env) {
      switch (envType) {
          case 'amp':
            this.voices.get(id).voice.synth.set({envelope: env})
            break;
          case 'freq':
            this.voices.get(id).voice.synth.set({filterEnvelope: env})
            break;
          default:
            return
        }
    }
    setSamplerInstrument(id,instrument){
      this.voices.get(id).voice.sampler = SoundLoader.load({instruments: instrument,
                                                                onload: () => {
                                                                  console.log('loaded')
                                                                }})
      this.voices.get(id).voice.sampler.connect(this.voices.get(id).gain)
    }

    setOscillator(id,osc){
      this.voices.get(id).voice.synth.set({oscillator : { modulationType: osc.modulationType,
                                                          baseType: osc.baseType,
                                                          sourceType: osc.sourceType,
                                                                  }})
    }
    setSynth(id,synth) {
      this.voices.get(id).voice.synth.set({
        portamento: synth.portamento,
        detune: synth.detune,
      })

    }


}
export default VoiceHandler

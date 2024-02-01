import * as Tone from 'tone'

class EffectChain {
    constructor() {
        this.effects = new Map();
        this.order = [];
        this.input = new Tone.Gain()
        this.output = new Tone.Gain()
        //this.input.connect(this.output)
      return this
    }

    getEffect(effect){
      return this.effects.get(effect).effect
    }
    setEffect(name,eff){
      this.effects.get(name).effect.set(eff)
    }

    getOrder(){
      return this.order
    }
    addEffect(effect) {
        let newEffect;
        switch (effect) {
          case 'reverb':
            newEffect = new Tone.Reverb()
            break
          case 'chorus':
            newEffect = new Tone.Chorus()
            break
          case 'tremolo':
            newEffect = new Tone.Tremolo()
            break
          case 'delay':
            newEffect = new Tone.FeedbackDelay()
            break
          case 'vibrato':
            newEffect = new Tone.Vibrato()
            break
          case 'distortion':
            newEffect = new Tone.Distortion()
            break
          default:
            console.log('no effect')
            return
        }

        //each effect has a gain in and out to allow for chaining
        const effObj= {
          effect: newEffect,
          gainIn: new Tone.Gain(),
          gainOut: new Tone.Gain(),
          chained: true
        }
        this.input.disconnect()
        if(this.effects.size>0){
          console.log("this.effects.get(this.order[0])",this.effects.get(this.order[0]))
          effObj.gainOut.connect(this.effects.get(this.order[0]).gainIn)
        }else{
         effObj.gainOut.connect(this.output)
        }
        this.input.connect(effObj.gainIn)

      // put on top of list, so it is first in chain
        this.effects.set(effect,effObj)
        this.order.unshift(effect)
        this.unchainEffect(effect)

    }


    chainEffect(effect) {
        const eff = this.effects.get(effect)
        if(!eff.chained){console.log("chaining effect",eff)
          // eff.effect.disconnect()
          // eff.gainIn.disconnect()
          eff.gainIn.chain(eff.effect,eff.gainOut)
          eff.chained = true
        }
    }
    //each effect is independent, so we can turn them on and off
    unchainEffect(effect) {
        const eff = this.effects.get(effect)
        if(eff.chained){console.log("unchaining effect",eff)
          eff.effect.disconnect()
          eff.gainIn.disconnect()
          eff.chained=false
          eff.gainIn.connect(eff.gainOut)
        }
    }

    removeEffect(effect) {

    }

    moveEffectRight(effect) {
      console.log("moveEffectRight START")
      console.log("this.effects.size",this.effects.size)
      console.log("this.order.length",this.order.length)

      if(this.effects.size > 1 && this.order.length === this.effects.size) {
        const index = this.order.indexOf(effect)
        console.log("index",index)
        const eff = this.effects.get(effect)
        if (index < this.order.length - 1) {
          const nextEffect = this.effects.get(this.order[index + 1])
          console.log("nextEffect",nextEffect )

          console.log("eff.gainIn.input",eff.gainIn.input)
          const input = index>0?this.effects.get(this.order[index - 1]).gainOut: this.input;
          const output = index<this.order.length-2?this.effects.get(this.order[index + 2]).gainIn: this.output;
          input.disconnect();
          input.connect(nextEffect.gainIn);
          console.log("input",input)

          eff.gainOut.disconnect();
          eff.gainOut.connect(output)

          nextEffect.gainOut.disconnect()
          nextEffect.gainOut.connect(eff.gainIn)

          this.order[index] = this.order[index + 1]
          this.order[index + 1] = effect
          console.log("final order",this.order)
          console.log("moveEffectRight END")


        }
      }
    }
    moveEffectLeft(effect) {
      if(this.effects.size>1 && this.order.length === this.effects.size) {
        const index = this.order.indexOf(effect)
        const eff = this.effects.get(effect)
        if (index >0) {
          const prevEffect = this.effects.get(this.order[index -1]);
          const input = index>1?this.effects.get(this.order[index - 2]).gainOut: this.input;
          const output = index<this.order.length-1?this.effects.get(this.order[index + 1]).gainIn: this.output;

          input.disconnect();
          input.connect(eff.gainIn);
          eff.gainOut.disconnect();
          eff.gainOut.connect(prevEffect.gainIn);
          prevEffect.gainOut.disconnect();
          prevEffect.gainOut.connect(output);

            // prevEffect.gainIn.disconnect()
          // prevEffect.gainIn.connect(eff.gainIn.input)
          // eff.gainIn.disconnect()
          // eff.gainOut.connect(prevEffect.gainOut.output)
          // prevEffect.gainOut.disconnect()
          // prevEffect.gainOut.connect(eff.gainIn)
          this.order[index] = this.order[index -1]
          this.order[index -1] = effect
        }
      }
    }


    connect(node) {
      console.log("connecting effect chain to node",node)
      this.output.connect(node)
    }

    disconnect() {
        this.output.disconnect()
    }

    isChained(effect){
      return this.effects.get(effect).chained
    }

    getInput(){
      return this.input
    }
}
export default EffectChain

import * as Tone from 'tone'

const createEffect = (effect) => {
    const eff = effect;
    const gainIn = new Tone.Gain();
    const gainOut = new Tone.Gain();
    const chained = false;
    // const toggleChain = () => {
    //     //console.log(this)
    //     if (!this.chained) {
    //         this.gainIn.disconnect()
    //         this.gainIn.connect(this.effect)
    //         this.effect.connect(this.gainOut)
    //         this.chained = true
    //     } else {
    //         this.gainIn.disconnect()
    //         this.effect.disconnect()
    //         this.gainIn.connect(this.gainOut)
    //         this.chained = false
    //     }
    // }
    return {
        effect: eff,
        gainIn :gainIn,
        gainOut: gainOut,
        chained : chained,
        toggleChain : toggleChain
    }
}

// Rest of the code remains the same...

const effectChain = {
    order : ['chorus','delay','dist','reverb'],
    effects: new Map(),
    input: new Tone.Gain(),
    output: new Tone.Gain(),
    moveEffectRight: function(effect){
        if(this.effects.size > 1 && this.order.length === this.effects.size) {
            const index = this.order.indexOf(effect)
            const eff = this.effects.get(effect)
            if (index < this.order.length - 1) {
                const nextEffect = this.effects.get(this.order[index + 1])

                const input = index>0?this.effects.get(this.order[index - 1]).gainOut: this.input;
                const output = index<this.order.length-2?this.effects.get(this.order[index + 2]).gainIn: this.output;
                input.disconnect();
                input.connect(nextEffect.gainIn);

                eff.gainOut.disconnect();
                eff.gainOut.connect(output)

                nextEffect.gainOut.disconnect()
                nextEffect.gainOut.connect(eff.gainIn)

                this.order[index] = this.order[index + 1]
                this.order[index + 1] = effect
            }
        }
    },
    moveEffectLeft : function(effect){
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
                this.order[index] = this.order[index -1]
                this.order[index -1] = effect
            }
        }
    }
}


// effectChain.effects.set('chorus', createEffect(new Tone.Chorus()))
// effectChain.effects.set('delay', createEffect(new Tone.FeedbackDelay()))
// effectChain.effects.set('dist', createEffect(new Tone.Distortion()))
// effectChain.effects.set('reverb', createEffect(new Tone.Reverb()))
// //console.log("fjdhfksjdfhk",effectChain.effects)
//
// // Get the first and last effects from the order array
// let firstEffect = effectChain.effects.get(effectChain.order[0]);
// let lastEffect = effectChain.effects.get(effectChain.order[effectChain.order.length - 1]);
//
// // Disconnect the effectChain's input from its current connection
// effectChain.input.disconnect();
//
// // Disconnect the last effect's gain out from its current connection
// lastEffect.gainOut.disconnect();
//
// // Connect the effectChain's input directly to the first effect's gain in
// effectChain.input.connect(firstEffect.gainIn);
//
// // Connect the last effect's gain out directly to the effectChain's output
// lastEffect.gainOut.connect(effectChain.output);
//
// // effectChain.effects.forEach((effect) => {
// //     effect.toggleChain()
// })
export default {effectChain,createEffect}

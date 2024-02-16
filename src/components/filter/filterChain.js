// import * as Tone from 'tone'
//
// const createFilter = (id, frequency, type, rolloff, Q) => {
//     const filter = new Tone.Filter({ frequency, type, rolloff, Q });
//     const input = new Tone.Gain(0.5);
//     const output = new Tone.Gain(0.5);
//     let chained = false;
//     input.connect(output);
//
//
//     function toggleChain() {
//         //console.log('toggling chain');
//         if (!chained) {
//             input.disconnect();
//             input.connect(filter);
//             chained = true;
//         } else {
//             input.disconnect();
//             filter.disconnect();
//             input.connect(output);
//             chained = false;
//         }
//     }
//
//     return {
//         filter,
//         input,
//         output,
//         get chained() {
//             return chained;
//         },
//         toggleChain
//     };
// };
//
// const filters = new Map();
// filters.set('0', createFilter('0', 200, 'lowpass', -12, 1));
// filters.set('1', createFilter('1', 200, 'lowpass', -12, 1));
//
//
//
// const outputGain = new Tone.Gain();
// const compressor = new Tone.Compressor({
//     threshold: -10,
//     ratio: 5,
//     attack: 0,
//     release: 0.3,
//     knee: 40
// });
//
// filters.get('0').output.connect(compressor);
// filters.get('1').output.connect(compressor);
//
// compressor.connect(outputGain);
//
//
//
// const filterChain = {
//     filters : filters,
//     outputGain : outputGain,
//     compressor : compressor,
//     toggleChain : function(id) {
//         if (this.filters.has(id)) {
//             this.filters.get(id).toggleChain();
//         }
//     }
//
// }
// //console.log('filters diocan ', filterChain);
// export default filterChain;
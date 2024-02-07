# R2D ARP

[R2D ARP](https://riccardocora.github.io/RPGator/) is an innovative polyphonic synthesizer and arpeggiator powered by the JavaScript library for audio synthesis and composition "Tone.js" and implemented using the framework "Vue". <br>
R2D is thought as a playful yet powerful tool to discover sound synthesis and generate creative sound patterns. Its lighthearted intuitive-based interface encourages the user to discover its functionalities by trying himself all features and routing options combining various effects with each other. This versatile instrument offers a wide range of options for creating and manipulating unique and rich sounds, combining the flexibility of a synthesizer with the dynamism of an arpeggiator.


<br>

<p align="center">
    <img width="80%" src="https://github.com/FurioColombo/zenyth-polisint/blob/main/assets/zenith_polisint.png" alt="Splash Image">
</p>

<br>

<p align="center">
    <a href="https://www.youtube.com/watch?v=3jTYMbAtMqI">Presentation Video</a>
    <br>
    <a href="https://www.youtube.com/watch?v=cjMXcdHnGRU">Demo</a>
</p>
<br>


## How to use it
  - Online Version [here](https://riccardocora.github.io/RPGator/)
  - Locally: Clone git repo and run the following command in the project terminal:
  1. `npm install`
  2. `npm update`
  3. `npm run serve` to run development build
  OR
  3. `npm run build`, `npm install -g serve`, `serve -s dist` to run release build

<br>

Click the START button and play the arpeggiator with your computer keyboard: `[a,w,s,e,d,f,t,g,y,h,u,j,k,o,l,p,ò,à]` 

  
<br>

## Features
R2D ARP is a dual-voice arpeggiator featuring selectable components in each voice: either an oscillator driven by three different synthesis engines or a sampler containing 15 unique instrument sounds. Both voices can be modulated using an ADSR Envelope and two filters. Additionally, there's a chain of four customizable effects for further sound shaping and the creation of wild noises.

<br>

### Arpeggiator
The arpeggiator is a versatile tool designed for creating arpeggios with ease. It features a keyboard with two octaves, allowing users to play individual notes or select multiple notes simultaneously to define the arpeggio. Additionally, it includes various control buttons for selecting arpeggio patterns, note length, rate, octave range, and starting octave. Tempo can be adjusted from 40 to 200 BPM, and a play/stop button initiates or halts the arpeggio sequence. Finally, a button is provided to release selected notes and reset the sequence.


|   |   |
|---|---|
| <img src='res/ADSR.png'  padding='5%' > | “Keyboard” - Two octaves for playing individual notes or selecting multiple notes for the arpeggio pattern. |
| <img src='res/LFO.png'  > | Selection Buttons: 1. Patterns: “Pattern Selector” - Selects the arpeggio pattern. 2. Note Length: "Length Selector” - Sets the duration of each note. 3. Rate: "Rate Selector” - Adjusts the interval between notes.  |
| <img src='res/Drag.png'  > | Octave Controls: 1. “Starting Octave Control” - Determines the initial octave for the keyboard and it refers to the first key button. 2. “Octave Repeat Control” - Sets the number of octaves each note repeats. 
| <img src='res/Drop.png' > | Tempo Control: “BPM Adjuster” - Adjusts tempo from 40 to 200 BPM. |
|<img src='res/ModAmount.png'  > | “Play/Stop Button” - Initiates or halts the arpeggio sequence. 
| <img src='res/Id.png' > | “Reset Button” - Releases selected notes and resets the sequence. |

<br>

### Voices
The synthesizer features two selectable voices running in parallel. Within each voice, you can choose between:
|                                                     |   |  |  |
|-----------------------------------------------------|---|---|---|
| <img src='res/osc.png'  margin='10%' width='90%' >  | Oscillator: where you can select the primary waveform, and a synthesis type among FM (Frequency Modulation), FAT (Frequency Amplitude Modulation), and AM (Amplitude Modulation) with the option to choose the waveform of the modulating signal. |   <img src='res/FM.png'  height='100vw' padding='5%'> | Sampler: where you can choose one of the fifteen available instruments. |  Waveform Selector (change clicking) 

In addition to these voice options, the synthesizer includes a comprehensive mixer section for each voice, offering precise control over various parameters:
|   |   |
|---|---|
| <img src='res/Filters.png'  padding='5%' >|  Volume: Adjusts the volume level of the selected voice, allowing you to balance its prominence within the mix; 2. Transposition: Enables transposing the pitch of the voice by up to two octaves in either direction, providing flexibility in creating melodies and harmonies; 3. Panning: Controls the spatial placement of the voice within the stereo field, allowing you to position it anywhere between the left and right channels for a dynamic stereo image. | 

<br>
    
### Modulators and filters
It is possible to shape the envelope of the selected synthesizer by mapping its form using dedicated knobs arranged in the following sequence: 

|   |   |
|---|---|
| <img src='res/Filters.png'  padding='5%' >|  1. "A" for Attack, controlling the time taken for the sound to reach its maximum level after a note is triggered; 2. "D" for Decay, managing the time taken for the sound to decrease from its maximum level to the sustain level; 3. "S" for Sustain, determining the level of the sound while the note is held down; and 4. "R" for Release, governing the time taken for the sound to fade out after the note is released. | 


Additionally, you can integrate either a Low Pass Filter or a High Pass Filter into the chain, each equipped with:

|   |   |
|---|---|
| <img src='res/ADSR.png'  padding='5%' > | A Cutoff knob, regulating the frequency at which the filter begins to attenuate the input signal. |
| <img src='res/LFO.png'  > | A Resonance knob, controlling the emphasis or peak of frequencies near the cutoff point, enhancing the filter's character and tonal shaping capabilities.  |
                                                                     

  
<br>

### Effects
At the end of the audio chain, there are four sequential effects that can be rearranged using the down arrow keys to suit your preference:


|   |   |                                     |  |
|---|---|-------------------------------------|---|
| <img src='res/Filters.png'  padding='5%' >|  •	Distortion: This effect introduces a gritty, distorted texture to the sound. The knob adjusts the level or intensity of distortion applied.   | <img src='res/FilterCutoff.png'  >  | •	Reverb: Reverb adds a sense of spaciousness or ambiance to the sound by simulating the reflections of sound waves in a physical space. The three knobs control different aspects of the reverb effect:                                                                            1.	Predelay: Adjusts the time between the original sound and the onset of the reverb effect.                                                2.	Decay: Determines how quickly the reverb trails off after the sound stops.                                                               3.	Wet: Controls the balance between the dry (original) signal and the reverberated signal.        |  
| <img src='res/Resonance.png'  >|  •	Delay: This effect produces echoes or repetitions of the sound. The three knobs control various parameters of the delay effect:          1.	Delay: Adjusts the time between each repetition of the sound.                                                                            2.	Feedback: Determines how many repetitions occur and how quickly they decay.                                                              3.	Wet: Controls the balance between the dry (original) signal and the delayed signal.  | <img src='res/Filter Routes.png'  > |   F•	Chorus: Chorus creates a rich, shimmering effect by combining multiple copies of the sound with slight variations in pitch and timing. The three knobs control different aspects of the chorus effect:                                                                            1.	Frequency: Adjusts the rate at which the pitch of the copied signals varies.                                                             2.	Depth: Determines the intensity or strength of the chorus effect.                                                                        3.	Delay: Controls the timing offset between the original sound and the chorus effect.|

<br>

___ 

  
<br>

## Implementation
  
<br>

### Framework and Visuals:

- The framework of choice is [Vue](https://vuejs.org/)
- Visual effects are realized in plain CSS, using some elements from [Quasar](https://quasar.dev/).
- User Interface is responsive, with a fixed aspect ratio and dimensions relative to the window's width.

  
<br>

### Audio Core:
We utilized Tone.js exclusively for our arpeggiator's audio functionality, benefiting from its robust features. With growing complexity, we found stock Tone objects lacking, prompting the need for additional functionality. This led to the creation of custom wrappers for core audio processes, facilitating modulation of synth parameters using both LFOs and envelopes. Future updates aim to transition to plain WebAudioAPI for improved latency and code optimization

    &rarr; _[Audio Core Detailed Scheme](./res/Zenyth_Audio_Core.pdf)_

  
<br>

## Dependencies
- [Tone.js](https://tonejs.github.io) - Web Audio Framework
- [Vue.js](https://vuejs.org) and [Quasar](https://quasar.dev/) - Web UI Frameworks
- [npm](https://www.npmjs.com/) - Package Manager

<br>

## Team
- Riccardo Corà - Routing, MyFx, Animated Graphics - `riccardo.cora@mail.polimi.it`
- Riccardo Moschen - Front End Developement and UI Design - `riccardo.moschen@mail.polimi.it`
- Dario Sorce - Audio Core Coding and Project Management - `dario.sorce@mail.polimi.it`

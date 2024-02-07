# R2D ARP

[R2D ARP](https://riccardocora.github.io/RPGator/) is an innovative polyphonic synthesizer and arpeggiator powered by the JavaScript library for audio synthesis and composition "Tone.js" and implemented using the framework "Vue". <br>
R2D is thought as a playful yet powerful tool to discover sound synthesis and generate creative sound patterns. Its lighthearted intuitive-based interface encourages the user to discover its functionalities by trying himself all features and routing options combining various effects with each other. This versatile instrument offers a wide range of options for creating and manipulating unique and rich sounds, combining the flexibility of a synthesizer with the dynamism of an arpeggiator.


<br>

<p align="center">
    <img width="90%" src="public/images/project images/UI.png" alt="Splash Image">
</p>

<br>

<p align="center">
    <a href="https://www.youtube.com/watch?v=3jTYMbAtMqI">Play Demo Video</a>
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
|<p align="center"> <img src="public/images/project images/Keyboard.png"  padding='5%' width='70%' > | “Keyboard” - Two octaves for playing individual notes or selecting multiple notes for the arpeggio pattern. |
| <p align="center"><img src="public/images/project images/Selection buttons arp.png" width='50%' > | Selection Buttons: 1. Patterns: “Pattern Selector” - Selects the arpeggio pattern. 2. Note Length: "Length Selector” - Sets the duration of each note. 3. Rate: "Rate Selector” - Adjusts the interval between notes.  |
| <p align="center"><img src="public/images/project images/Octave selector.png" width='50%' > | Octave Controls: 1. “Octave Repeat Control” - Sets the number of octaves each note repeats. 2. “Starting Octave Control” - Determines the initial octave for the keyboard and it refers to the first key button. Tempo Control: “BPM Adjuster” - Adjusts tempo from 40 to 200 BPM. |
|<p align="center"><img src="public/images/project images/Play:reset.png" width='50%' > | “Play/Stop Button” - Initiates or halts the arpeggio sequence. “Reset Button” - Releases selected notes and resets the sequence. |

<br>

### Voices
The synthesizer features two selectable voices running in parallel. Within each voice, you can choose between:
|   |   |
|---|---|
| <img src="public/images/project images/Oscillator.png"  margin='10%' width='1500%' >  | Oscillator: where you can select the primary waveform, and a synthesis type among FM (Frequency Modulation), FAT (Frequency Amplitude Modulation), and AM (Amplitude Modulation) with the option to choose the waveform of the modulating signal. |
|   <img src="public/images/project images/Sampler.png" margin='10%' width='150%' padding='5%'> | Sampler: where you can choose one of the fifteen available instruments. |

In addition to these voice options, the synthesizer includes a comprehensive mixer section for each voice, offering precise control over various parameters:

|   |   |
|---|---|
| <img src="public/images/project images/Mixer.png" width = "200%" >|  Volume: Adjusts the volume level of the selected voice, allowing you to balance its prominence within the mix; 2. Transposition: Enables transposing the pitch of the voice by up to two octaves in either direction, providing flexibility in creating melodies and harmonies; 3. Panning: Controls the spatial placement of the voice within the stereo field, allowing you to position it anywhere between the left and right channels for a dynamic stereo image. | 

<br>
    
### Modulators and filters
It is possible to shape the envelope of the selected synthesizer by mapping its form using dedicated knobs arranged in the following sequence: 

|   |   |
|---|---|
| <img src="public/images/project images/ADSR Envelope.png" height = "200%"  >|  1. "A" for Attack, controlling the time taken for the sound to reach its maximum level after a note is triggered; 2. "D" for Decay, managing the time taken for the sound to decrease from its maximum level to the sustain level; 3. "S" for Sustain, determining the level of the sound while the note is held down; and 4. "R" for Release, governing the time taken for the sound to fade out after the note is released. | 


Additionally, you can integrate either a Low Pass Filter or a High Pass Filter into the chain, each equipped with:

|   |   |
|---|---|
| <img src="public/images/project images/Filters.png"  height='200%' > | A Cutoff knob, regulating the frequency at which the filter begins to attenuate the input signal. A Resonance knob, controlling the emphasis or peak of frequencies near the cutoff point, enhancing the filter's character and tonal shaping capabilities.  |
                                                                     

  
<br>

### Effects
At the end of the audio chain, there are four sequential effects that can be rearranged using the down arrow keys to suit your preference:


|   |   |                                     |  |
|---|---|-------------------------------------|---|
| <img src="public/images/project images/Distortion.png">|  •	Distortion: This effect introduces a gritty, distorted texture to the sound. The knob adjusts the level or intensity of distortion applied.   | <img src="public/images/project images/Reverb.png" width = "200%" >  | •	Reverb: Reverb adds a sense of spaciousness or ambiance to the sound by simulating the reflections of sound waves in a physical space. The three knobs control different aspects of the reverb effect:                                                                            1.	Predelay: Adjusts the time between the original sound and the onset of the reverb effect.                                                2.	Decay: Determines how quickly the reverb trails off after the sound stops.                                                               3.	Wet: Controls the balance between the dry (original) signal and the reverberated signal.        |  
| <img src="public/images/project images/DElay.png" height = "100%" >|  •	Delay: This effect produces echoes or repetitions of the sound. The three knobs control various parameters of the delay effect:          1.	Delay: Adjusts the time between each repetition of the sound.                                                                            2.	Feedback: Determines how many repetitions occur and how quickly they decay.                                                              3.	Wet: Controls the balance between the dry (original) signal and the delayed signal.  | <img src="public/images/project images/Chorus.png" height = "200%" > |   F•	Chorus: Chorus creates a rich, shimmering effect by combining multiple copies of the sound with slight variations in pitch and timing. The three knobs control different aspects of the chorus effect:                                                                            1.	Frequency: Adjusts the rate at which the pitch of the copied signals varies.                                                             2.	Depth: Determines the intensity or strength of the chorus effect.                                                                        3.	Delay: Controls the timing offset between the original sound and the chorus effect.|

<br>

___ 

  
<br>

## Implementation
  
<br>

### Framework and Visuals:

- The framework of choice is [Vue](https://vuejs.org/)
- Visual effects are realized in plain CSS, using some elements from [Quasar](https://quasar.dev/).

  
<br>


<br>

## Dependencies
- [Tone.js](https://tonejs.github.io) - Web Audio Framework
- [Vue.js](https://vuejs.org) and [Quasar](https://quasar.dev/) - Web UI Frameworks
- [npm](https://www.npmjs.com/) - Package Manager

<br>

## Team
- Riccardo Corà - Project Management, Back End Developement, Audio Core Coding and Animated Graphics - `riccardo.cora@mail.polimi.it`
- Riccardo Moschen - Front End Developement, UI Design, Routing and Synth Expert - `riccardo.moschen@mail.polimi.it`
- Dario Sorce - Front End Developement, UI Design, Routing and Synth Expert - `dario.sorce@mail.polimi.it`

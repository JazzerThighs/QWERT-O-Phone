# QWERT-O-Phone

🎵🎶🎸🎹🎻🎷🎺🎤🎧🥁🪘📯🎙️🎚️🎛️🪕🪗♪♫♬♭♮♯

"Because who needs real instruments when you have a keyboard and too much free time?"

The QWERT-O-Phone is a musical instrument emulator which aims to bring forth a new paradigm of MIDI controllers, by providing a fast prototyping-engine for designing Human Control Schemes for as many conceivable musical-instrument-related parameters as possible.

The section entitled "Chapter I" contains the <b>About</b> blurb, which explains my reasons for building this engine.

# Roadmap 🛣

Being stuck in my basement has given me a lot of time to think (perhaps too much). Here's what's cooking in the QWERT-O-Phone lab:

Stuff I Actually Did (Go me!):

- Guts, Frets, Valves, and Fingering Charts: Sounds complicated, but it's not...okay, maybe a little.<br />
- In-browser Oscillators: For when you want that sweet, sweet Woodshed Mode experience.

To Be Implemented:

- UserData Editor UI: User Interface for creating QWERT-O-Phones.<br />
- Woodshed Mode UI: So you can actually see what it is you have built and are playing on.<br />
- Dedicated URL: So you can show your grandma what you've been up to.<br />
- Server for Your QWERT-O-Phones: Because storing them on post-its isn't efficient.<br />
- MIDI: In, Out, all around.<br />
- Analog Control Support: For extra flavor.<br />
- Fancy In-browser Synths: For those of us with a taste for something more than basic.<br />
- NPM: Not sure what it would be used for, but I'm down.<br />



```
  /$$$$$$  /$$                             /$$                               /$$$$$$    
 /$$__  $$| $$                            | $$                              |_  $$_/    
| $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$         | $$   /$$
| $$      | $$__  $$ |____  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$__  $$        | $$  |__/
| $$      | $$  \ $$  /$$$$$$$| $$  \ $$  | $$    | $$$$$$$$| $$  \__/        | $$      
| $$    $$| $$  | $$ /$$__  $$| $$  | $$  | $$ /$$| $$_____/| $$              | $$   /$$
|  $$$$$$/| $$  | $$|  $$$$$$$| $$$$$$$/  |  $$$$/|  $$$$$$$| $$             /$$$$$$|__/
 \______/ |__/  |__/ \_______/| $$____/    \___/   \_______/|__/            |______/    
                              | $$                                                      
                              | $$                                                      
                              |__/                                                      
  ______                                  __                         ______          
 /      \                                |  \                       /      \         
|  $$$$$$\  ______    ______    ______  _| $$_     ______          |  $$$$$$\        
| $$   \$$ /      \  /      \  |      \|   $$ \   /      \  ______ | $$__| $$ ______ 
| $$      |  $$$$$$\|  $$$$$$\  \$$$$$$\\$$$$$$  |  $$$$$$\|      \| $$    $$|      \
| $$   __ | $$   \$$| $$    $$ /      $$ | $$ __ | $$    $$ \$$$$$$| $$$$$$$$ \$$$$$$|
| $$__/  \| $$      | $$$$$$$$|  $$$$$$$ | $$|  \| $$$$$$$$        | $$  | $$        
 \$$    $$| $$       \$$     \ \$$    $$  \$$  $$ \$$     \        | $$  | $$        
  \$$$$$$  \$$        \$$$$$$$  \$$$$$$$   \$$$$   \$$$$$$$         \$$   \$$        
  ______   __       __  ________  _______  ________        ______           _______   __                                     
 /      \ |  \  _  |  \|        \|       \|        \      /      \         |       \ |  \                                    
|  $$$$$$\| $$ / \ | $$| $$$$$$$$| $$$$$$$\\$$$$$$$$     |  $$$$$$\        | $$$$$$$\| $$____    ______   _______    ______  
| $$  | $$| $$/  $\| $$| $$__    | $$__| $$  | $$ ______ | $$  | $$ ______ | $$__/ $$| $$    \  /      \ |       \  /      \ 
| $$  | $$| $$  $$$\ $$| $$  \   | $$    $$  | $$|      \| $$  | $$|      \| $$    $$| $$$$$$$\|  $$$$$$\| $$$$$$$\|  $$$$$$\
| $$ _| $$| $$ $$\$$\$$| $$$$$   | $$$$$$$\  | $$ \$$$$$$| $$  | $$ \$$$$$$| $$$$$$$ | $$  | $$| $$  | $$| $$  | $$| $$    $$
| $$/ \ $$| $$$$  \$$$$| $$_____ | $$  | $$  | $$        | $$__/ $$        | $$      | $$  | $$| $$__/ $$| $$  | $$| $$$$$$$$
 \$$ $$ $$| $$$    \$$$| $$     \| $$  | $$  | $$         \$$    $$        | $$      | $$  | $$ \$$    $$| $$  | $$ \$$     \
  \$$$$$$\ \$$      \$$ \$$$$$$$$ \$$   \$$   \$$          \$$$$$$          \$$       \$$   \$$  \$$$$$$  \$$   \$$  \$$$$$$$
      \$$$                                                                                                                   
```

# Chapter I: Create-A-QWERT-O-Phone 🎶<br /><br />
## About 🎺
* "Why does this program exist?"<br /><br />

People make music.<br />
We do that by using Musical Instruments. Instrument, in this context, refers to an object that produces sound based on the physical interaction of its various elements in order to vibrate in such a way that is expressive to the user's specifications.

Ergo, the goal is to produce Music, but the method is through the use of an instrument. This has its ups and downs.

As time marched onward, and the Electronic Music age came about, a very small number of Musical Instrument Control Schemes took precedent when manufacturers decided to mass produce MIDI controllers, capable of letting as many musicians express themselves as possible using the most common interfaces: The piano keyboard, and the modern woodwind instrument.

Most MIDI controllers involve piano keyboards; Wind controllers mostly fall into the clarinet-shaped Electronic Wind Instruments (EWIs). And while there are some variations, like alternate key arrangements for piano-like interfaces, and the Electronic Valve Instrument (EVI), the result is clear: Only keyboardists and select-woodwind players have widespread options when finding the right MIDI controller for them.

I aim to enable people to quickly build, practice on, and play MIDI controller interfaces that suit their preferred idiomatic method of mono/polyphonic expression.
<br />
~~~~~~~~~~~
<br />
Here is a list of nagging thoughts I had as a prospective teacher of music:

* _"[...] Gee, there are sure a lot of piano keyboards and saxophone-looking MIDI controllers in the market. But I, as someone who solely plays trumpet to any high degree, I wish I could procure a MIDI controller that would let me do what those mass-produced doohickeys do. There is something called an [Electronic Valve Instrument (EVI)](https://www.patchmanmusic.com/NyleMIDIEVI.html), and there are people producing an upgraded, modernized version of this called the [NuEVI](https://berglundinstruments.com/nuevi-trumpet-horn-tuba-fingering-instrument/), using programmable microcontrollers... But I'm not sure I have 4 Dollar Signs to throw at it [...]"_<br />

* _"[...] I mean, really, if I'm going to teach music to entire bands worth of pupils, I should actually be able to hold my own on... wow... a really wide variety of instruments. Brass, single reed, double reed, keyboard, symphonic percussion, drum set... I absolutely do not have the funds for all of the expensive MIDI controllers out there that are simply shaped differently but apply all of the same principles as each other [...]"_<br />

At this point in the story, I'm starting to suspect that DIY MIDI controllers are the wave. The long short of my experience with hardware mods is a few homebrewed "Big N" consoles, loosely assisting in the construction of a "Phob..." Nothing really stands out as reason I should get into the manufacturing business... So, I kept musing:<br />

* _"[...] You know, there's no foolproof way I've seen to just set up a simple keyboard to be able to demonstrate to someone what different temperaments sound like. If I want to have two keyboards, one assigned to the A=440 12-Tone Equal Temperament Scale as used by MIDI, and one keyboard assigned to the same scale of notes, just transposed down to 432... It would take some elbow grease, even for an experienced DAW user. It takes even longer to set up any other temperament system It would make so much sense to build that. It doesn't seem that hard to go through the motions one time in JavaScript (and indeed, with the infamous ChatGPT's help, any trash solution to a problem is just a proompt away), and I'm not about to pay 3 Dollar Signs for [Pianoteq](https://www.modartt.com/pianoteq) [...]"_<br />

Here, I had come to understand the fundamentals of the end product that the QWERT-O-Phone eventually came to be. I started proompting, just to get some instant results. The long short of this is that I spent dozens of hours, days, weeks, just coaxing the AI with increasingly stricter parameters to improve the state of my code. I have to say that my good friend's decision to create this in TypeScript has been largely helpful, even if I have to maintain a cobbled-together [Single-File CodePen Fork](https://codepen.io/JazzerThighs/pen/mdQqzBR) to consistently test runtime usage.<br />

After a large amount of deliberation, a heap of back-and-forth, deciding where certain interactive features make sense, balancing feature coverage and maintainability, I've narrowed the core of the instrument engine to a small number of categories for method of sound production. I've boiled down the tendencies of most musical instruments to a small set of simple functions, and we will go through the process of building a QWERT-O-Phone in the next subsection.<br />

## Walkthrough 👷<br />

It starts with an object declared in the code called "QOPUserData." This is a JSON object which contains all of the parameters that pertain to the musical instrument that you want to be able to actually play. Here is a list of the properties, and their intended functions:

### QOPUserData Properties

A **Scale** is simply a collection of notes, in any order, arranged in such a way to be pointed to by the musical instrument interface. Inside of each scale, you have your custom name and description (as with most parameters), and also some descriptive parameters...

- **ScaleType**: The tuning system for the scale.
- **NoteSet**[]: Contains all of the listed notes in that scale, each with their own independent PitchHz and ColorHex.
- **OctaveDivisions**: How many divisions in the octave, if one was using an Equal Temperament Scale.
- **TuningHz**: The pitch of the "tuning" note.
- **ReferenceNote**: The index of the "tuning" note within the NoteSet[].

A **Gut** is the singular property that allows you to produce sound. The real-life counterpart, a string on a stringed instrument, is the best fitting analogy for what it is that I've built. It's at its core a vibrating object which has a fundamental pointer to determine the note it produces. Every other property after this one influences the note produced by these Guts. Here are the parameters and their meaning...

- **OpenGutNoteID**: The ordered index of the note inside each Scale's NoteSet to set the fundamental tone of each Gut.
- **OpenGutWaveType**: A sine, triangle, sawtooth, or square wave can be selected for each Scale, per Gut.
- **RequireFret**: If true, one of this Gut's Frets must be in the pressed state in order for this Gut to make sound.
- **RequireValve**: If true, any Valve must be in the pressed state in order for this Gut to make sound.
- **RequireCombo**: If true, any of the Charts' set of Pads must be in a valid Combo of pressed states (i.e., a valid Macro must be held down) in order for this Gut to make sound.

Each Gut has its own set of **Frets** in their respective FretSet[] property. These Frets alter the resulting NoteID to set the note of the Gut's Pitch to other notes than the "Open" one. Actually, this is the principle of the Valves and the Charts as well; However, Frets are unique here because a Gut can only be affected by its own Frets. They also have the logic of only passing their NoteID changes if there isn't a Fret with a higher index being held. Just like a real string, only the highest fret being used matters.

**Valves** and **Charts** achieve quite similar tasks, however the distinction is quite notable; Valves and Charts both have the capabilities to change the notes that all existing Guts will play, so they both act as multi-fret solutions. Here's the difference: Valves are independent; All of the Valves that exist can pass their note changes to the Guts, regardless of the state of the other Valves. Charts refer to "Fingering Charts," otherwise known in the computer science world as a "Keyboard Shortcut." Charts have Pads in the PadSet[] property, and those Pads are pressed in certain combinations set by the user in the ComboSet[] property.

At the heart of it all, combining the use of Scales, Guts, Frets, Valves, and Charts, one can make a virtually infinite amount of unique musical interfaces, even if one chooses to omit several features altogether in their setup.

```
  /$$$$$$  /$$                             /$$                               /$$$$$$ /$$$$$$    
 /$$__  $$| $$                            | $$                              |_  $$_/|_  $$_/    
| $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$         | $$    | $$   /$$
| $$      | $$__  $$ |____  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$__  $$        | $$    | $$  |__/
| $$      | $$  \ $$  /$$$$$$$| $$  \ $$  | $$    | $$$$$$$$| $$  \__/        | $$    | $$      
| $$    $$| $$  | $$ /$$__  $$| $$  | $$  | $$ /$$| $$_____/| $$              | $$    | $$   /$$
|  $$$$$$/| $$  | $$|  $$$$$$$| $$$$$$$/  |  $$$$/|  $$$$$$$| $$             /$$$$$$ /$$$$$$|__/
 \______/ |__/  |__/ \_______/| $$____/    \___/   \_______/|__/            |______/|______/    
                              | $$                                                              
                              | $$                                                              
                              |__/                                                              
 ________  __                         ______             __                  __ 
|        \|  \                       /      \           |  \                |  \
 \$$$$$$$$| $$____    ______        |  $$$$$$\  ______   \$$ _______    ____| $$
   | $$   | $$    \  /      \       | $$ __\$$ /      \ |  \|       \  /      $$
   | $$   | $$$$$$$\|  $$$$$$\      | $$|    \|  $$$$$$\| $$| $$$$$$$\|  $$$$$$$
   | $$   | $$  | $$| $$    $$      | $$ \$$$$| $$   \$$| $$| $$  | $$| $$  | $$
   | $$   | $$  | $$| $$$$$$$$      | $$__| $$| $$      | $$| $$  | $$| $$__| $$
   | $$   | $$  | $$ \$$     \       \$$    $$| $$      | $$| $$  | $$ \$$    $$
    \$$    \$$   \$$  \$$$$$$$        \$$$$$$  \$$       \$$ \$$   \$$  \$$$$$$$
```
# Chapter II: The Grind



```
  /$$$$$$  /$$                             /$$                               /$$$$$$ /$$$$$$ /$$$$$$    
 /$$__  $$| $$                            | $$                              |_  $$_/|_  $$_/|_  $$_/    
| $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$         | $$    | $$    | $$   /$$
| $$      | $$__  $$ |____  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$__  $$        | $$    | $$    | $$  |__/
| $$      | $$  \ $$  /$$$$$$$| $$  \ $$  | $$    | $$$$$$$$| $$  \__/        | $$    | $$    | $$      
| $$    $$| $$  | $$ /$$__  $$| $$  | $$  | $$ /$$| $$_____/| $$              | $$    | $$    | $$   /$$
|  $$$$$$/| $$  | $$|  $$$$$$$| $$$$$$$/  |  $$$$/|  $$$$$$$| $$             /$$$$$$ /$$$$$$ /$$$$$$|__/
 \______/ |__/  |__/ \_______/| $$____/    \___/   \_______/|__/            |______/|______/|______/    
                              | $$                                                                      
                              | $$                                                                      
                              |__/                                                                      
  ____    ____    ____    ____  
 /    \  /    \  /    \  /    \ 
|  $$$$\|  $$$$\|  $$$$\|  $$$$\
 \$$| $$ \$$| $$ \$$| $$ \$$| $$
   /  $$   /  $$   /  $$   /  $$
  |  $$   |  $$   |  $$   |  $$ 
   \$$     \$$     \$$     \$$  
  |  \    |  \    |  \    |  \  
   \$$     \$$     \$$     \$$  
```
# Chapter III: ????


In this section, we describe what MIDI is in a bit further detail, and describe the use cases I've considered when designing the QWERT-O-Phone.

# [MIDI Integration 🎹 <small>(Click Me!)</small>](https://www.midi.org/specifications)

MIDI, or **Musical Instrument Digital Interface**, is a protocol used for exchanging musical information between computers, synthesizers, and other electronic musical instruments. At its core, it's the language of electronic music creation and performance.

In the context of the QWERT-O-Phone:
- **Live Performances**: With MIDI, you can leverage the QWERT-O-Phone's customizable interface to control virtual instruments seamlessly, bringing your unique sounds to the stage.
- **Recording MIDI Data**: Record your performances and compositions, then easily export them to notation or sequencer applications for further refinement or collaboration.
- **Diverse Control**: Whether you're looking to compose, arrange, or just jam out, the app's MIDI capabilities enhance your creative workflow, connecting with a vast ecosystem of digital music tools.



```
  /$$$$$$  /$$                             /$$                               /$$$$$$ /$$    /$$    
 /$$__  $$| $$                            | $$                              |_  $$_/| $$   | $$    
| $$  \__/| $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$         | $$  | $$   | $$ /$$
| $$      | $$__  $$ |____  $$ /$$__  $$|_  $$_/   /$$__  $$ /$$__  $$        | $$  |  $$ / $$/|__/
| $$      | $$  \ $$  /$$$$$$$| $$  \ $$  | $$    | $$$$$$$$| $$  \__/        | $$   \  $$ $$/     
| $$    $$| $$  | $$ /$$__  $$| $$  | $$  | $$ /$$| $$_____/| $$              | $$    \  $$$/   /$$
|  $$$$$$/| $$  | $$|  $$$$$$$| $$$$$$$/  |  $$$$/|  $$$$$$$| $$             /$$$$$$   \  $/   |__/
 \______/ |__/  |__/ \_______/| $$____/    \___/   \_______/|__/            |______/    \_/        
                              | $$                                                                 
                              | $$                                                                 
                              |__/                                                                 
 _______   _______    ______   ________  ______  ________  __  __  __ 
|       \ |       \  /      \ |        \|      \|        \|  \|  \|  \
| $$$$$$$\| $$$$$$$\|  $$$$$$\| $$$$$$$$ \$$$$$$ \$$$$$$$$| $$| $$| $$
| $$__/ $$| $$__| $$| $$  | $$| $$__      | $$     | $$   | $$| $$| $$
| $$    $$| $$    $$| $$  | $$| $$  \     | $$     | $$   | $$| $$| $$
| $$$$$$$ | $$$$$$$\| $$  | $$| $$$$$     | $$     | $$    \$$ \$$ \$$
| $$      | $$  | $$| $$__/ $$| $$       _| $$_    | $$    __  __  __ 
| $$      | $$  | $$ \$$    $$| $$      |   $$ \   | $$   |  \|  \|  \
 \$$       \$$   \$$  \$$$$$$  \$$       \$$$$$$    \$$    \$$ \$$ \$$
```
# Chapter IV: PROFIT!!! 💰

# 📜 [License: Copyleft 🔄 (Click Me!)](https://www.gnu.org/licenses/gpl-3.0.en.html) 
The QWERT-O-Phone is wrapped in the protective embrace of the [GNU General Public License v3.0 (GPL-3.0)](https://www.gnu.org/licenses/gpl-3.0.en.html).
In less cryptic terms:

* 📖 Freedom to Use — You're free to use this software in any way you see fit.<br />
* 🔄 Freedom to Modify — If you're feeling adventurous, dive in and tweak things around.<br />
* 🤝 Freedom to Share — Spread the love, share this software with anyone and everyone.<br />
* 💡 Freedom to Share Modifications — If you make changes (hopefully, to make it better), you're free to share those too.<br /><br />

However, the soul of Copyleft resides in one key principle:<br /><br />

* 🔄 The Same Freedoms Must Remain — Any derivative work must be open-source and free, under the same GPL-3.0 license.
<br /><br />
```
____________________/\\\\\\\\\\\__________________________________________________________________________/\\\\\\\\\\\\\\\__/\\\_____________________________/\\\______________________        
 ___________________\/////\\\///__________________________________________________________________________\///////\\\/////__\/\\\____________________________\/\\\______________________       
  _______________________\/\\\___________________________________________________________________________________\/\\\_______\/\\\__________/\\\___/\\\\\\\\__\/\\\______________________      
   __/\\\\\\\\\\\_________\/\\\______/\\\\\\\\\_____/\\\\\\\\\\\__/\\\\\\\\\\\_____/\\\\\\\\___/\\/\\\\\\\________\/\\\_______\/\\\_________\///___/\\\////\\\_\/\\\__________/\\\\\\\\\\_     
    _\///////////__________\/\\\_____\////////\\\___\///////\\\/__\///////\\\/____/\\\/////\\\_\/\\\/////\\\_______\/\\\_______\/\\\\\\\\\\___/\\\_\//\\\\\\\\\_\/\\\\\\\\\\__\/\\\//////__    
     _______________________\/\\\_______/\\\\\\\\\\_______/\\\/_________/\\\/_____/\\\\\\\\\\\__\/\\\___\///________\/\\\_______\/\\\/////\\\_\/\\\__\///////\\\_\/\\\/////\\\_\/\\\\\\\\\\_   
      ________________/\\\___\/\\\______/\\\/////\\\_____/\\\/_________/\\\/______\//\\///////___\/\\\_______________\/\\\_______\/\\\___\/\\\_\/\\\__/\\_____\\\_\/\\\___\/\\\_\////////\\\_  
       _______________\//\\\\\\\\\______\//\\\\\\\\/\\__/\\\\\\\\\\\__/\\\\\\\\\\\__\//\\\\\\\\\\_\/\\\_______________\/\\\_______\/\\\___\/\\\_\/\\\_\//\\\\\\\\__\/\\\___\/\\\__/\\\\\\\\\\_ 
        ________________\/////////________\////////\//__\///////////__\///////////____\//////////__\///________________\///________\///____\///__\///___\////////___\///____\///__\//////////__

```

**-JazzerThighs**

/*Boiler Plate*/
//qopProfile stores all of the variables and settings on the app.
const qopProfile = {
    scaleList: [],
    synthList: [],
    clavierList: [],
    chordophoneList: [],
    aeroWWList: [],
    aeroBRList: [],
    qwertyAssignmentsList: [],
};

class scaleTemplate {
    name = `Scale${qopProfile.scaleList.length + 1}`;
    meta = {
        type: "Equal Temperament",
        members: 128,
        referenceNote : 81,
        tuningHz : 440,
        XTET : {
            divisions: 12,
            noteClassSet: ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"]
            },
            noteList: [
            {
                MIDINote: "C-2",
                Pitch: 4.087
            },
            {
                MIDINote: "C♯/D♭-2",
                Pitch: 4.33
            },
            {
                MIDINote: "D-2",
                Pitch: 4.588
            },
            {
                MIDINote: "D♯/E♭-2",
                Pitch: 4.861
            },
            {
                MIDINote: "E-2",
                Pitch: 5.15
            },
            {
                MIDINote: "F-2",
                Pitch: 5.456
            },
            {
                MIDINote: "F♯/G♭-2",
                Pitch: 5.781
            },
            {
                MIDINote: "G-2",
                Pitch: 6.124
            },
            {
                MIDINote: "G♯/A♭-2",
                Pitch: 6.489
            },
            {
                MIDINote: "A-2",
                Pitch: 6.875
            },
            {
                MIDINote: "A♯/B♭-2",
                Pitch: 7.283
            },
            {
                MIDINote: "B-2",
                Pitch: 7.716
            },
            {
                MIDINote: "C-1",
                Pitch: 8.175
            },
            {
                MIDINote: "C♯/D♭-1",
                Pitch: 8.661
            },
            {
                MIDINote: "D-1",
                Pitch: 9.177
            },
            {
                MIDINote: "D♯/E♭-1",
                Pitch: 9.722
            },
            {
                MIDINote: "E-1",
                Pitch: 10.3
            },
            {
                MIDINote: "F-1",
                Pitch: 10.913
            },
            {
                MIDINote: "F♯/G♭-1",
                Pitch: 11.562
            },
            {
                MIDINote: "G-1",
                Pitch: 12.249
            },
            {
                MIDINote: "G♯/A♭-1",
                Pitch: 12.978
            },
            {
                MIDINote: "A-1",
                Pitch: 13.75
            },
            {
                MIDINote: "A♯/B♭-1",
                Pitch: 14.567
            },
            {
                MIDINote: "B-1",
                Pitch: 15.433
            },
            {
                MIDINote: "C0",
                Pitch: 16.351
            },
            {
                MIDINote: "C♯/D♭0",
                Pitch: 17.323
            },
            {
                MIDINote: "D0",
                Pitch: 18.354
            },
            {
                MIDINote: "D♯/E♭0",
                Pitch: 19.445
            },
            {
                MIDINote: "E0",
                Pitch: 20.601
            },
            {
                MIDINote: "F0",
                Pitch: 21.826
            },
            {
                MIDINote: "F♯/G♭0",
                Pitch: 23.124
            },
            {
                MIDINote: "G0",
                Pitch: 24.499
            },
            {
                MIDINote: "G♯/A♭0",
                Pitch: 25.956
            },
            {
                MIDINote: "A0",
                Pitch: 27.5
            },
            {
                MIDINote: "A♯/B♭0",
                Pitch: 29.135
            },
            {
                MIDINote: "B0",
                Pitch: 30.867
            },
            {
                MIDINote: "C1",
                Pitch: 32.703
            },
            {
                MIDINote: "C♯/D♭1",
                Pitch: 34.647
            },
            {
                MIDINote: "D1",
                Pitch: 36.708
            },
            {
                MIDINote: "D♯/E♭1",
                Pitch: 38.89
            },
            {
                MIDINote: "E1",
                Pitch: 41.203
            },
            {
                MIDINote: "F1",
                Pitch: 43.653
            },
            {
                MIDINote: "F♯/G♭1",
                Pitch: 46.249
            },
            {
                MIDINote: "G1",
                Pitch: 48.999
            },
            {
                MIDINote: "G♯/A♭1",
                Pitch: 51.913
            },
            {
                MIDINote: "A1",
                Pitch: 55
            },
            {
                MIDINote: "A♯/B♭1",
                Pitch: 58.27
            },
            {
                MIDINote: "B1",
                Pitch: 61.735
            },
            {
                MIDINote: "C2",
                Pitch: 65.406
            },
            {
                MIDINote: "C♯/D♭2",
                Pitch: 69.295
            },
            {
                MIDINote: "D2",
                Pitch: 73.416
            },
            {
                MIDINote: "D♯/E♭2",
                Pitch: 77.781
            },
            {
                MIDINote: "E2",
                Pitch: 82.406
            },
            {
                MIDINote: "F2",
                Pitch: 87.307
            },
            {
                MIDINote: "F♯/G♭2",
                Pitch: 92.498
            },
            {
                MIDINote: "G2",
                Pitch: 97.998
            },
            {
                MIDINote: "G♯/A♭2",
                Pitch: 103.826
            },
            {
                MIDINote: "A2",
                Pitch: 110
            },
            {
                MIDINote: "A♯/B♭2",
                Pitch: 116.54
            },
            {
                MIDINote: "B2",
                Pitch: 123.47
            },
            {
                MIDINote: "C3",
                Pitch: 130.812
            },
            {
                MIDINote: "C♯/D♭3",
                Pitch: 138.591
            },
            {
                MIDINote: "D3",
                Pitch: 146.832
            },
            {
                MIDINote: "D♯/E♭3",
                Pitch: 155.563
            },
            {
                MIDINote: "E3",
                Pitch: 164.813
            },
            {
                MIDINote: "F3",
                Pitch: 174.614
            },
            {
                MIDINote: "F♯/G♭3",
                Pitch: 184.997
            },
            {
                MIDINote: "G3",
                Pitch: 195.997
            },
            {
                MIDINote: "G♯/A♭3",
                Pitch: 207.652
            },
            {
                MIDINote: "A3",
                Pitch: 220
            },
            {
                MIDINote: "A♯/B♭3",
                Pitch: 233.081
            },
            {
                MIDINote: "B3",
                Pitch: 246.941
            },
            {
                MIDINote: "C4",
                Pitch: 261.625
            },
            {
                MIDINote: "C♯/D♭4",
                Pitch: 277.182
            },
            {
                MIDINote: "D4",
                Pitch: 293.664
            },
            {
                MIDINote: "D♯/E♭4",
                Pitch: 311.126
            },
            {
                MIDINote: "E4",
                Pitch: 329.627
            },
            {
                MIDINote: "F4",
                Pitch: 349.228
            },
            {
                MIDINote: "F♯/G♭4",
                Pitch: 369.994
            },
            {
                MIDINote: "G4",
                Pitch: 391.995
            },
            {
                MIDINote: "G♯/A♭4",
                Pitch: 415.304
            },
            {
                MIDINote: "A4",
                Pitch: 440
            },
            {
                MIDINote: "A♯/B♭4",
                Pitch: 466.163
            },
            {
                MIDINote: "B4",
                Pitch: 493.883
            },
            {
                MIDINote: "C5",
                Pitch: 523.251
            },
            {
                MIDINote: "C♯/D♭5",
                Pitch: 554.365
            },
            {
                MIDINote: "D5",
                Pitch: 587.329
            },
            {
                MIDINote: "D♯/E♭5",
                Pitch: 622.253
            },
            {
                MIDINote: "E5",
                Pitch: 659.255
            },
            {
                MIDINote: "F5",
                Pitch: 698.456
            },
            {
                MIDINote: "F♯/G♭5",
                Pitch: 739.988
            },
            {
                MIDINote: "G5",
                Pitch: 783.99
            },
            {
                MIDINote: "G♯/A♭5",
                Pitch: 830.609
            },
            {
                MIDINote: "A5",
                Pitch: 880
            },
            {
                MIDINote: "A♯/B♭5",
                Pitch: 932.327
            },
            {
                MIDINote: "B5",
                Pitch: 987.766
            },
            {
                MIDINote: "C6",
                Pitch: 1046.502
            },
            {
                MIDINote: "C♯/D♭6",
                Pitch: 1108.73
            },
            {
                MIDINote: "D6",
                Pitch: 1174.659
            },
            {
                MIDINote: "D♯/E♭6",
                Pitch: 1244.507
            },
            {
                MIDINote: "E6",
                Pitch: 1318.51
            },
            {
                MIDINote: "F6",
                Pitch: 1396.912
            },
            {
                MIDINote: "F♯/G♭6",
                Pitch: 1479.977
            },
            {
                MIDINote: "G6",
                Pitch: 1567.981
            },
            {
                MIDINote: "G♯/A♭6",
                Pitch: 1661.218
            },
            {
                MIDINote: "A6",
                Pitch: 1760
            },
            {
                MIDINote: "A♯/B♭6",
                Pitch: 1864.655
            },
            {
                MIDINote: "B6",
                Pitch: 1975.533
            },
            {
                MIDINote: "C7",
                Pitch: 2093.004
            },
            {
                MIDINote: "C♯/D♭7",
                Pitch: 2217.461
            },
            {
                MIDINote: "D7",
                Pitch: 2349.318
            },
            {
                MIDINote: "D♯/E♭7",
                Pitch: 2489.015
            },
            {
                MIDINote: "E7",
                Pitch: 2637.02
            },
            {
                MIDINote: "F7",
                Pitch: 2793.825
            },
            {
                MIDINote: "F♯/G♭7",
                Pitch: 2959.955
            },
            {
                MIDINote: "G7",
                Pitch: 3135.963
            },
            {
                MIDINote: "G♯/A♭7",
                Pitch: 3322.437
            },
            {
                MIDINote: "A7",
                Pitch: 3520
            },
            {
                MIDINote: "A♯/B♭7",
                Pitch: 3729.31
            },
            {
                MIDINote: "B7",
                Pitch: 3951.066
            },
            {
                MIDINote: "C8",
                Pitch: 4186.009
            },
            {
                MIDINote: "C♯/D♭8",
                Pitch: 4434.922
            },
            {
                MIDINote: "D8",
                Pitch: 4698.636
            },
            {
                MIDINote: "D♯/E♭8",
                Pitch: 4978.031
            },
            {
                MIDINote: "E8",
                Pitch: 5274.04
            },
            {
                MIDINote: "F8",
                Pitch: 5587.651
            },
            {
                MIDINote: "F♯/G♭8",
                Pitch: 5919.91
            },
            {
                MIDINote: "G8",
                Pitch: 6271.926
            }
        ]
    }
};
class synthTemplate {
    name = `Synth${qopProfile.synthList.length + 1}`;
};
class clavierTemplate {
    name = `Clavier${qopProfile.aeroWWList.length + 1}`;
};
class chordophoneTemplate {
    name = `Chordophone${qopProfile.aeroWWList.length + 1}`;
};
class aeroWWTemplate {
    name = `AeroWW${qopProfile.aeroWWList.length + 1}`;
    transposition = {
        delta: 0,
        keyCodes: []
    };
    octave = {
        delta: 0,
        keyCodes: []
    };
    outputNote = 0;
    lastNote = 0;
    outputPartial = 0;
    lastPartial = 0;
    fingerSet = {
        pads: [
            {
                name: "LightPunch",
                keyCodes: []
            },
            {
                name: "MediumPunch",
                keyCodes: []
            },
            {
                name: "HeavyPunch",
                keyCodes: []
            },
            {
                name: "LightKick",
                keyCodes: []
            },
            {
                name: "MediumKick",
                keyCodes: []
            },
            {
                name: "HeavyKick",
                keyCodes: []
            }
        ],
        partials: [
            {
                noteValue: 60,
                keyCodes: []
            },
            {
                noteValue: 72,
                keyCodes: []
            },
            {
                noteValue: 84,
                keyCodes: []
            }
        ],
        listTF: [
            {
                name: "C4",
                combo: [FALSE, FALSE, TRUE, FALSE, FALSE, FALSE]
            },
            {
                name: "C♯/D♭4",
                combo: [TRUE, TRUE, TRUE, FALSE, FALSE, FALSE]
            },
            {
                name: "D4",
                combo: [TRUE, FALSE, TRUE, FALSE, FALSE, FALSE]
            },
            {
                name: "D♯/E♭4",
                combo: [FALSE, TRUE, TRUE, FALSE, FALSE, FALSE]
            },
            {
                name: "E4",
                combo: [TRUE, TRUE, FALSE, FALSE, FALSE, FALSE]
            },
            {
                name: "F4",
                combo: [TRUE, FALSE, FALSE, FALSE, FALSE, FALSE]
            },
            {
                name: "F♯/G♭4",
                combo: [FALSE, TRUE, FALSE, FALSE, FALSE, FALSE]
            },
            {
                name: "G4",
                combo: [FALSE, FALSE, FALSE, FALSE, FALSE, TRUE]
            },
            {
                name: "G♯/A♭4",
                combo: [FALSE, FALSE, FALSE, FALSE, TRUE, TRUE]
            },
            {
                name: "A4",
                combo: [FALSE, FALSE, FALSE, TRUE, TRUE, FALSE]
            },
            {
                name: "A♯/B♭4",
                combo: [FALSE, FALSE, FALSE, TRUE, FALSE, FALSE]
            },
            {
                name: "B4",
                combo: [FALSE, FALSE, FALSE, FALSE, TRUE, FALSE]
            }
        ]
    }
};
class aeroBRTemplate {
    name = `AeroBR${qopProfile.aeroBRList.length + 1}`;
    transposition = {
        delta: 0,
        keyCodes: []
    };
    octave = {
        delta: 0,
        keyCodes: []
    };
    outputNote = 0;
    lastNote = 0;
    outputPartial = 0;
    lastPartial = 0;
    fingerSet = {
        valves: [
            {
                deltaValue: -2,
                keyCodes: []
            },
            {
                deltaValue: -1,
                keyCodes: []
            },
            {
                deltaValue: -3,
                keyCodes: []
            },
            {
                deltaValue: -5,
                keyCodes: []
            }
        ],
        partials: [
            {
                noteValue: 60,
                keyCodes: []
            },
            {
                noteValue: 67,
                keyCodes: []
            },
            {
                noteValue: 72,
                keyCodes: []
            }
        ]
    }
};
class qwertyAssignmentsTemplate {
    name = `QWERTY${qopProfile.aeroWWList.length + 1}`;
};

function addScale() { qopProfile.scaleList.push(new scaleTemplate()) };
function addSynth() { qopProfile.synthList.push(new synthTemplate()) };
function addClavier() { qopProfile.clavierList.push(new clavierTemplate()) };
function addChordophone() { qopProfile.chordophoneList.push(new chordophoneTemplate()) };
function addAeroWW() { qopProfile.aeroWWList.push(new aeroWWTemplate()) };
function addAeroBR() { qopProfile.aeroBRList.push(new aeroWWTemplate()) };
function addQWERTYAssignments() { qopProfile.qwertyAssignmentsList.push(new qwertyAssignmentsTemplate()) };

if (qopProfile.scaleList.length === 0) { addScale() };
if (qopProfile.synthList.length === 0) { addSynth() };
if (qopProfile.clavierList.length === 0) { addClavier() };
if (qopProfile.chordophoneList.length === 0) { addChordophone() };
if (qopProfile.aeroWWList.length === 0) { addAeroWW() };
if (qopProfile.aeroBRList.length === 0) { addAeroBR() };
if (qopProfile.qwertyAssignmentsList.length === 0) { addQWERTYAssignments() };

function downloadQOPProfile() {
    // Convert qopProfile array to JSON string
    const jsonQOPProfile = JSON.stringify(qopProfile);
    // Create a blob with the JSON data
    const blob = new Blob([jsonQOPProfile], { type: 'application/json' });
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = url;
    // Add the link to the DOM and click it
    link.download = 'qopProfile.json';
    document.body.appendChild(link);
    link.click();
    // Remove the link from the DOM
    document.body.removeChild(link);
};

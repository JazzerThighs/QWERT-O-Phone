import { c as create_ssr_component, a as validate_store, b as subscribe, e as escape, d as add_attribute, f as each, v as validate_component } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
const Banner_svelte_svelte_type_style_lang = "";
const css$c = {
  code: `.animate-gradient.s-XllbjHUhvin8{background-size:200% 100%;background-image:linear-gradient(to right, #6ee7b7, #3b82f6, #9333ea, #f59e0b);animation:s-XllbjHUhvin8-gradient 8s linear infinite}h1.s-XllbjHUhvin8{font-family:"Comic Sans MS", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}@keyframes s-XllbjHUhvin8-gradient{0%{background-position:200% 0}100%{background-position:-200% 0}}`,
  map: null
};
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$c);
  return `<div class="animate-gradient text-white py-6 s-XllbjHUhvin8"><div class="container mx-auto text-center"><h1 class="text-4xl font-bold tracking-wider mb-2 s-XllbjHUhvin8">QWERT-O-Phone</h1>
		<p class="text-lg font-semibold tracking-wide">Create a Custom MIDI Controller</p></div>
</div>`;
});
const standardMIDINoteNames = [
  "C",
  "C♯ / D♭",
  "D",
  "D♯ / E♭",
  "E",
  "F",
  "F♯ / G♭",
  "G",
  "G♯ / A♭",
  "A",
  "A♯ / B♭",
  "B"
];
const MIDILUT = {
  0: 8.18,
  1: 8.66,
  2: 9.18,
  3: 9.72,
  4: 10.3,
  5: 10.91,
  6: 11.56,
  7: 12.25,
  8: 12.98,
  9: 13.75,
  10: 14.57,
  11: 15.43,
  12: 16.35,
  13: 17.32,
  14: 18.35,
  15: 19.45,
  16: 20.6,
  17: 21.83,
  18: 23.12,
  19: 24.5,
  20: 25.96,
  21: 27.5,
  22: 29.14,
  23: 30.87,
  24: 32.7,
  25: 34.65,
  26: 36.71,
  27: 38.89,
  28: 41.2,
  29: 43.65,
  30: 46.25,
  31: 49,
  32: 51.91,
  33: 55,
  34: 58.27,
  35: 61.74,
  36: 65.41,
  37: 69.3,
  38: 73.42,
  39: 77.78,
  40: 82.41,
  41: 87.31,
  42: 92.5,
  43: 98,
  44: 103.83,
  45: 110,
  46: 116.54,
  47: 123.47,
  48: 130.81,
  49: 138.59,
  50: 146.83,
  51: 155.56,
  52: 164.81,
  53: 174.61,
  54: 185,
  55: 196,
  56: 207.65,
  57: 220,
  58: 233.08,
  59: 246.94,
  60: 261.63,
  61: 277.18,
  62: 293.66,
  63: 311.13,
  64: 329.63,
  65: 349.23,
  66: 369.99,
  67: 392,
  68: 415.3,
  69: 440,
  70: 466.16,
  71: 493.88,
  72: 523.25,
  73: 554.37,
  74: 587.33,
  75: 622.25,
  76: 659.26,
  77: 698.46,
  78: 739.99,
  79: 783.99,
  80: 830.61,
  81: 880,
  82: 932.33,
  83: 987.77,
  84: 1046.5,
  85: 1108.73,
  86: 1174.66,
  87: 1244.51,
  88: 1318.51,
  89: 1396.91,
  90: 1479.98,
  91: 1567.98,
  92: 1661.22,
  93: 1760,
  94: 1864.66,
  95: 1975.53,
  96: 2093,
  97: 2217.46,
  98: 2349.32,
  99: 2489.02,
  100: 2637.02,
  101: 2793.83,
  102: 2959.96,
  103: 3135.96,
  104: 3322.44,
  105: 3520,
  106: 3729.31,
  107: 3951.07,
  108: 4186.01,
  109: 4434.92,
  110: 4698.64,
  111: 4978.03,
  112: 5274.04,
  113: 5587.65,
  114: 5919.91,
  115: 6271.93,
  116: 6644.88,
  117: 7040,
  118: 7458.62,
  119: 7902.13,
  120: 8372.02,
  121: 8869.84,
  122: 9397.27,
  123: 9956.06,
  124: 10548.08,
  125: 11175.3,
  126: 11839.82,
  127: 12543.85
};
const CurrentQOPVersion = "qop0.sk.69";
class QOPUserDataTemplate {
  Name;
  Version;
  Timestamp;
  Deprecated;
  Description;
  OscModeToggle;
  MIDIOutputModeToggle;
  DebounceTimer;
  ScaleList;
  GutList;
  ValveList;
  ChartList;
  constructor() {
    this.Name = "QWERT-O-Phone";
    this.Version = CurrentQOPVersion;
    this.Timestamp = QOPUDTimestamp();
    this.Deprecated = false;
    this.Description = "Create-A-QWERT-O-Phone";
    this.OscModeToggle = true;
    this.MIDIOutputModeToggle = false;
    this.DebounceTimer = 10;
    this.ScaleList = [new ScaleUDTemplate()];
    this.GutList = [new GutUDTemplate()];
    this.ValveList = [new ValveUDTemplate()];
    this.ChartList = [new ChartUDTemplate()];
  }
}
function QOPUDTimestamp() {
  const now = /* @__PURE__ */ new Date();
  const formattedDateTime = now.toISOString().slice(0, 16).replace("T", "_").replace(/:/g, "-");
  return formattedDateTime;
}
const ButtonString = "ButtonEventCodes";
const SustainString = "SustainEventCodes";
const AntiSustainString = "AntiSustainEventCodes";
const SostenutoString = "SostenutoEventCodes";
const AntiSostenutoString = "AntiSostenutoEventCodes";
class NoteUDTemplate {
  ScaleID;
  NoteID;
  Name;
  Description;
  PitchHz;
  ColorHex;
  constructor() {
    this.ScaleID = 0;
    this.NoteID = 0;
    this.Name = "";
    this.Description = "";
    this.PitchHz = 0;
    this.ColorHex = "#afafaf";
  }
}
class ActionTypeUDTemplate {
  Name;
  Description;
  ButtonEventCodes;
  SustainEventCodes;
  AntiSustainEventCodes;
  SostenutoEventCodes;
  AntiSostenutoEventCodes;
  constructor() {
    this.Name = "";
    this.Description = "";
    this.ButtonEventCodes = {};
    this.SustainEventCodes = {};
    this.AntiSustainEventCodes = {};
    this.SostenutoEventCodes = {};
    this.AntiSostenutoEventCodes = {};
  }
}
class DeltaUDTemplate {
  DeltaType;
  NoteIDDelta;
  CentsDelta;
  constructor() {
    this.DeltaType = "NoteID";
    this.NoteIDDelta = 0;
    this.CentsDelta = 0;
  }
}
class ScaleUDTemplate {
  ScaleID;
  Name;
  Description;
  ScaleType;
  ReferenceNote;
  TuningHz;
  OctaveDivisions;
  NoteClassSet;
  NoteSet;
  constructor() {
    this.ScaleID = 0;
    this.Name = "MIDI";
    this.Description = "(Default MIDI Note Bindings)";
    this.ScaleType = "Equal Temperament";
    this.ReferenceNote = 69;
    this.TuningHz = 440;
    this.OctaveDivisions = 12;
    this.NoteClassSet = [
      "C",
      "C♯ / D♭",
      "D",
      "D♯ / E♭",
      "E",
      "F",
      "F♯ / G♭",
      "G",
      "G♯ / A♭",
      "A",
      "A♯ / B♭",
      "B"
    ];
    this.NoteSet = [];
    let octave = -2;
    for (let noteIndex = 0; noteIndex < 128; noteIndex++) {
      this.NoteSet = [...this.NoteSet, new NoteUDTemplate()];
      this.NoteSet[noteIndex].NoteID = noteIndex;
      this.NoteSet[noteIndex].PitchHz = MIDILUT[noteIndex];
      switch (standardMIDINoteNames[noteIndex % 12]) {
        case "C":
        case "C♯ / D♭":
        case "D":
        case "D♯ / E♭":
        case "E":
        case "F":
        case "F♯ / G♭":
        case "G":
        case "G♯ / A♭":
        case "A":
        case "A♯ / B♭":
          this.NoteSet[noteIndex].Name = standardMIDINoteNames[noteIndex % 12] + [octave];
          continue;
        case "B":
          this.NoteSet[noteIndex].Name = standardMIDINoteNames[noteIndex % 12] + [octave];
          octave++;
          continue;
      }
    }
  }
}
class FretUDTemplate extends ActionTypeUDTemplate {
  GutID;
  FretID;
  TranspositionEventCodes;
  DeltaType;
  NoteIDDelta;
  CentsDelta;
  constructor() {
    super();
    this.GutID = 0;
    this.FretID = 0;
    this.TranspositionEventCodes = {};
    this.DeltaType = "NoteID";
    this.NoteIDDelta = 0;
    this.CentsDelta = 0;
  }
}
class GutUDTemplate extends ActionTypeUDTemplate {
  GutID;
  OpenGutNoteID;
  GutOscToggle;
  OscWaveType;
  OscGain;
  GutMIDIOutputToggle;
  TranspositionEventCodes;
  RequireFret;
  RequireValve;
  RequireCombo;
  FretSet;
  constructor() {
    super();
    this.GutID = 0;
    this.OpenGutNoteID = [69];
    this.GutOscToggle = true;
    this.OscWaveType = ["sine"];
    this.OscGain = [0.25];
    this.GutMIDIOutputToggle = false;
    this.TranspositionEventCodes = {};
    this.RequireFret = false;
    this.RequireValve = false;
    this.RequireCombo = false;
    this.FretSet = [new FretUDTemplate()];
  }
}
class ValveUDTemplate extends ActionTypeUDTemplate {
  ValveID;
  TranspositionEventCodes;
  DeltaSet;
  constructor() {
    super();
    this.ValveID = 0;
    this.TranspositionEventCodes = {};
    this.DeltaSet = [new DeltaUDTemplate()];
  }
}
class PadUDTemplate extends ActionTypeUDTemplate {
  ChartID;
  PadID;
  constructor() {
    super();
    this.ChartID = 0;
    this.PadID = 0;
  }
}
class ComboUDTemplate {
  ChartID;
  ComboID;
  Name;
  Description;
  Combo;
  TranspositionEventCodes;
  DeltaSet;
  constructor() {
    this.ChartID = 0;
    this.ComboID = 0;
    this.Name = "";
    this.Description = "";
    this.TranspositionEventCodes = {};
    this.Combo = [true];
    this.DeltaSet = [new DeltaUDTemplate()];
  }
}
class ChartUDTemplate {
  ChartID;
  Name;
  Description;
  TranspositionEventCodes;
  PadSet;
  ComboSet;
  constructor() {
    this.ChartID = 0;
    this.Name = "";
    this.Description = "";
    this.TranspositionEventCodes = {};
    this.PadSet = [new PadUDTemplate()];
    this.ComboSet = [new ComboUDTemplate()];
  }
}
const QOPUserData = CreateQOPUserData();
function CreateQOPUserData() {
  const { subscribe: subscribe2, set, update } = writable(new QOPUserDataTemplate());
  return {
    subscribe: subscribe2,
    set: () => {
      update((userData) => {
        return userData;
      });
    },
    reset: () => set(new QOPUserDataTemplate()),
    downloadQOPUD: () => {
      update((currentData) => {
        const jsonStr = JSON.stringify(currentData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timeStamp = QOPUDTimestamp();
        a.download = "QOPUD" + timeStamp + currentData.Name + ".json";
        a.click();
        URL.revokeObjectURL(url);
        return currentData;
      });
    },
    downloadScale: (scaleIndex) => {
      update((currentData) => {
        const jsonStr = JSON.stringify(currentData.ScaleList[scaleIndex], null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timeStamp = QOPUDTimestamp();
        a.download = "QOPScale" + timeStamp + currentData.ScaleList[scaleIndex].Name + ".json";
        a.click();
        URL.revokeObjectURL(url);
        return currentData;
      });
    },
    downloadGut: (gutIndex) => {
      update((currentData) => {
        const jsonStr = JSON.stringify(currentData.GutList[gutIndex], null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timeStamp = QOPUDTimestamp();
        a.download = "QOPGut" + timeStamp + currentData.GutList[gutIndex].Name + ".json";
        a.click();
        URL.revokeObjectURL(url);
        return currentData;
      });
    },
    downloadValve: (valveIndex) => {
      update((currentData) => {
        const jsonStr = JSON.stringify(currentData.ValveList[valveIndex], null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timeStamp = QOPUDTimestamp();
        a.download = "QOPValve" + timeStamp + currentData.ValveList[valveIndex].Name + ".json";
        a.click();
        URL.revokeObjectURL(url);
        return currentData;
      });
    },
    downloadChart: (chartIndex) => {
      update((currentData) => {
        const jsonStr = JSON.stringify(currentData.ChartList[chartIndex], null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timeStamp = QOPUDTimestamp();
        a.download = "QOPChart" + timeStamp + currentData.ChartList[chartIndex].Name + ".json";
        a.click();
        URL.revokeObjectURL(url);
        return currentData;
      });
    },
    addScale: (newScale = new ScaleUDTemplate()) => {
      update((userData) => {
        userData.ScaleList = [...userData.ScaleList, newScale];
        for (let scaleIndex = 0; scaleIndex < userData.ScaleList.length; scaleIndex++) {
          userData.ScaleList[scaleIndex].ScaleID = scaleIndex;
          for (let noteIndex = 0; noteIndex < userData.ScaleList[scaleIndex].NoteSet.length; noteIndex++) {
            userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
            userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
          }
        }
        for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
          userData.GutList[gutIndex].OpenGutNoteID.push(69);
          userData.GutList[gutIndex].OscWaveType.push("sine");
          userData.GutList[gutIndex].OscGain.push(0.25);
        }
        return userData;
      });
    },
    removeScale: (scaleIndex) => {
      update((userData) => {
        if (userData.ScaleList.length - 1 !== 0) {
          userData.ScaleList = userData.ScaleList.filter((_, index) => index !== scaleIndex);
          for (let scaleIndex2 = 0; scaleIndex2 < userData.ScaleList.length; scaleIndex2++) {
            userData.ScaleList[scaleIndex2].ScaleID = scaleIndex2;
            for (let noteIndex = 0; noteIndex < userData.ScaleList[scaleIndex2].NoteSet.length; noteIndex++) {
              userData.ScaleList[scaleIndex2].NoteSet[noteIndex].ScaleID = scaleIndex2;
              userData.ScaleList[scaleIndex2].NoteSet[noteIndex].NoteID = noteIndex;
            }
          }
          for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
            userData.GutList[gutIndex].OpenGutNoteID.splice(scaleIndex, 1);
            userData.GutList[gutIndex].OscWaveType.splice(scaleIndex, 1);
            userData.GutList[gutIndex].OscGain.splice(scaleIndex, 1);
          }
        }
        return userData;
      });
    },
    addNoteClass: (scaleIndex) => {
      update((userData) => {
        userData.ScaleList[scaleIndex].NoteClassSet = [
          ...userData.ScaleList[scaleIndex].NoteClassSet,
          ""
        ];
        return userData;
      });
    },
    removeNoteClass: (scaleIndex, noteClassIndex) => {
      update((userData) => {
        userData.ScaleList[scaleIndex].NoteClassSet.splice(noteClassIndex, 1);
        return userData;
      });
    },
    addNote: (scaleIndex, newNote = new NoteUDTemplate()) => {
      update((userData) => {
        userData.ScaleList[scaleIndex].NoteSet = [
          ...userData.ScaleList[scaleIndex].NoteSet,
          newNote
        ];
        for (let noteIndex = 0; noteIndex < userData.ScaleList[scaleIndex].NoteSet.length; noteIndex++) {
          userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
          userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
        }
        return userData;
      });
    },
    removeNote: (scaleIndex, noteIndex) => {
      update((userData) => {
        if (userData.ScaleList[scaleIndex].NoteSet.length - 1 !== 0) {
          userData.ScaleList[scaleIndex].NoteSet.splice(noteIndex, 1);
          for (let noteIndex2 = 0; noteIndex2 < userData.ScaleList[scaleIndex].NoteSet.length; noteIndex2++) {
            userData.ScaleList[scaleIndex].NoteSet[noteIndex2].ScaleID = scaleIndex;
            userData.ScaleList[scaleIndex].NoteSet[noteIndex2].NoteID = noteIndex2;
          }
        }
        return userData;
      });
    },
    addGut: (newGut = new GutUDTemplate(), newDelta = new DeltaUDTemplate()) => {
      update((userData) => {
        userData.GutList = [...userData.GutList, newGut];
        for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
          userData.GutList[gutIndex].GutID = gutIndex;
          while (userData.GutList[gutIndex].OpenGutNoteID.length < userData.ScaleList.length) {
            userData.GutList[gutIndex].OpenGutNoteID.push(69);
          }
          while (userData.GutList[gutIndex].OpenGutNoteID.length > userData.ScaleList.length) {
            userData.GutList[gutIndex].OpenGutNoteID.splice(
              userData.GutList[gutIndex].OpenGutNoteID.length - 1,
              1
            );
          }
          while (userData.GutList[gutIndex].OscWaveType.length < userData.ScaleList.length) {
            userData.GutList[gutIndex].OscWaveType.push("sine");
          }
          while (userData.GutList[gutIndex].OscWaveType.length > userData.ScaleList.length) {
            userData.GutList[gutIndex].OscWaveType.splice(
              userData.GutList[gutIndex].OscWaveType.length - 1,
              1
            );
          }
          while (userData.GutList[gutIndex].OscGain.length < userData.ScaleList.length) {
            userData.GutList[gutIndex].OscGain.push(0.25);
          }
          while (userData.GutList[gutIndex].OscGain.length > userData.ScaleList.length) {
            userData.GutList[gutIndex].OscGain.splice(
              userData.GutList[gutIndex].OscGain.length - 1,
              1
            );
          }
          for (let fretIndex = 0; fretIndex < userData.GutList[gutIndex].FretSet.length; fretIndex++) {
            userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
            userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
          }
        }
        for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
          userData.ValveList[valveIndex].DeltaSet.push(newDelta);
        }
        for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
          for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
            userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.push(newDelta);
          }
        }
        return userData;
      });
    },
    removeGut: (gutIndex) => {
      update((userData) => {
        if (userData.GutList.length - 1 !== 0) {
          userData.GutList = userData.GutList.filter((_, index) => index !== gutIndex);
          for (let gutIndex2 = 0; gutIndex2 < userData.GutList.length; gutIndex2++) {
            userData.GutList[gutIndex2].GutID = gutIndex2;
            for (let fretIndex = 0; fretIndex < userData.GutList[gutIndex2].FretSet.length; fretIndex++) {
              userData.GutList[gutIndex2].FretSet[fretIndex].GutID = gutIndex2;
              userData.GutList[gutIndex2].FretSet[fretIndex].FretID = fretIndex;
            }
          }
          for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
            userData.ValveList[valveIndex].DeltaSet.splice(gutIndex, 1);
          }
          for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
            for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
              userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.splice(gutIndex, 1);
            }
          }
        }
        return userData;
      });
    },
    addFret: (gutIndex, newFret = new FretUDTemplate()) => {
      update((userData) => {
        userData.GutList[gutIndex].FretSet = [...userData.GutList[gutIndex].FretSet, newFret];
        for (let fretIndex = 0; fretIndex < userData.GutList[gutIndex].FretSet.length; fretIndex++) {
          userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
          userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
        }
        return userData;
      });
    },
    removeFret: (gutIndex, fretIndex) => {
      update((userData) => {
        if (userData.GutList[gutIndex].FretSet.length - 1 !== 0) {
          userData.GutList[gutIndex].FretSet.splice(fretIndex, 1);
          for (let fretIndex2 = 0; fretIndex2 < userData.GutList[gutIndex].FretSet.length; fretIndex2++) {
            userData.GutList[gutIndex].FretSet[fretIndex2].GutID = gutIndex;
            userData.GutList[gutIndex].FretSet[fretIndex2].FretID = fretIndex2;
          }
        }
        return userData;
      });
    },
    addValve: (newValve = new ValveUDTemplate(), newDelta = new DeltaUDTemplate()) => {
      update((userData) => {
        userData.ValveList = [...userData.ValveList, newValve];
        for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
          userData.ValveList[valveIndex].ValveID = valveIndex;
          while (userData.ValveList[valveIndex].DeltaSet.length < userData.GutList.length) {
            userData.ValveList[valveIndex].DeltaSet.push(newDelta);
          }
          while (userData.ValveList[valveIndex].DeltaSet.length > userData.GutList.length) {
            userData.ValveList[valveIndex].DeltaSet.splice(
              userData.ValveList[valveIndex].DeltaSet.length - 1,
              1
            );
          }
        }
        return userData;
      });
    },
    removeValve: (valveIndex) => {
      update((userData) => {
        if (userData.ValveList.length - 1 !== 0) {
          userData.ValveList.splice(valveIndex, 1);
          for (let valveIndex2 = 0; valveIndex2 < userData.ValveList.length; valveIndex2++) {
            userData.ValveList[valveIndex2].ValveID = valveIndex2;
          }
        }
        return userData;
      });
    },
    addChart: (newChart = new ChartUDTemplate()) => {
      update((userData) => {
        userData.ChartList = [...userData.ChartList, newChart];
        for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
          userData.ChartList[chartIndex].ChartID = chartIndex;
          for (let padIndex = 0; padIndex < userData.ChartList[chartIndex].PadSet.length; padIndex++) {
            userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
            userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
          }
          for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
            userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
            userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
          }
        }
        return userData;
      });
    },
    removeChart: (chartIndex) => {
      update((userData) => {
        if (userData.ChartList.length - 1 !== 0) {
          userData.ChartList = userData.ChartList.splice(chartIndex, 1);
          for (let chartIndex2 = 0; chartIndex2 < userData.ChartList.length; chartIndex2++) {
            userData.ChartList[chartIndex2].ChartID = chartIndex2;
            for (let padIndex = 0; padIndex < userData.ChartList[chartIndex2].PadSet.length; padIndex++) {
              userData.ChartList[chartIndex2].PadSet[padIndex].ChartID = chartIndex2;
              userData.ChartList[chartIndex2].PadSet[padIndex].PadID = padIndex;
            }
            for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex2].ComboSet.length; comboIndex++) {
              userData.ChartList[chartIndex2].ComboSet[comboIndex].ChartID = chartIndex2;
              userData.ChartList[chartIndex2].ComboSet[comboIndex].ComboID = comboIndex;
            }
          }
        }
        return userData;
      });
    },
    addPad: (chartIndex, newPad = new PadUDTemplate()) => {
      update((userData) => {
        userData.ChartList[chartIndex].PadSet = [...userData.ChartList[chartIndex].PadSet, newPad];
        for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
          userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.push(false);
        }
        for (let padIndex = 0; padIndex < userData.ChartList[chartIndex].PadSet.length; padIndex++) {
          userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
          userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
        }
        return userData;
      });
    },
    removePad: (chartIndex, padIndex) => {
      update((userData) => {
        if (userData.ChartList[chartIndex].PadSet.length - 1 !== 0) {
          userData.ChartList[chartIndex].PadSet.splice(padIndex, 1);
          for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
            userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.splice(padIndex, 1);
          }
          for (let padIndex2 = 0; padIndex2 < userData.ChartList[chartIndex].PadSet.length; padIndex2++) {
            userData.ChartList[chartIndex].PadSet[padIndex2].ChartID = chartIndex;
            userData.ChartList[chartIndex].PadSet[padIndex2].PadID = padIndex2;
          }
          for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
            while (userData.ChartList[chartIndex].ComboSet.length > Math.pow(2, userData.ChartList[chartIndex].PadSet.length)) {
              userData.ChartList[chartIndex].ComboSet.splice(
                userData.ChartList[chartIndex].ComboSet.length - 1,
                1
              );
            }
          }
        }
        return userData;
      });
    },
    addCombo: (chartIndex, newCombo = new ComboUDTemplate(), newDelta = new DeltaUDTemplate()) => {
      update((userData) => {
        if (userData.ChartList[chartIndex].ComboSet.length < Math.pow(2, userData.ChartList[chartIndex].PadSet.length)) {
          userData.ChartList[chartIndex].ComboSet = [
            ...userData.ChartList[chartIndex].ComboSet,
            newCombo
          ];
          for (let comboIndex = 0; comboIndex < userData.ChartList[chartIndex].ComboSet.length; comboIndex++) {
            userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
            userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
            while (userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length < userData.GutList.length) {
              userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.push(newDelta);
            }
            while (userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length > userData.GutList.length) {
              userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.splice(
                userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length - 1,
                1
              );
            }
            while (userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.length < userData.ChartList[chartIndex].PadSet.length) {
              userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.push(false);
            }
            while (userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.length > userData.ChartList[chartIndex].PadSet.length) {
              userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.splice(
                userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.length - 1,
                1
              );
            }
          }
        }
        return userData;
      });
    },
    removeCombo: (chartIndex, comboIndex) => {
      update((userData) => {
        if (userData.ChartList[chartIndex].ComboSet.length - 1 !== 0) {
          userData.ChartList[chartIndex].ComboSet.splice(comboIndex, 1);
          for (let comboIndex2 = 0; comboIndex2 < userData.ChartList[chartIndex].ComboSet.length; comboIndex2++) {
            userData.ChartList[chartIndex].ComboSet[comboIndex2].ChartID = chartIndex;
            userData.ChartList[chartIndex].ComboSet[comboIndex2].ComboID = comboIndex2;
          }
        }
        return userData;
      });
    },
    addActionCode: (eventCode, propString, listString, listIndex, setString = null, setIndex = null) => {
      update((userData) => {
        if (setString === null && listString !== "ChartList") {
          userData[listString][listIndex][propString][eventCode] = [1, 1];
        } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
          userData[listString][listIndex][setString][setIndex][propString][eventCode] = [1, 1];
        } else if (listString === "ChartList" && setString === "PadSet" && setIndex !== null) {
          userData[listString][listIndex][setString][setIndex][propString][eventCode] = [1, 1];
        }
        return userData;
      });
    },
    removeActionCode: (eventCode, propString, listString, listIndex, setString = null, setIndex = null) => {
      update((userData) => {
        if (setString === null && listString !== "ChartList") {
          delete userData[listString][listIndex][propString][eventCode];
        } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
          delete userData[listString][listIndex][setString][setIndex][propString][eventCode];
        } else if (listString === "ChartList" && setString === "PadSet" && setIndex !== null) {
          delete userData[listString][listIndex][setString][setIndex][propString][eventCode];
        }
        return userData;
      });
    },
    addTranspositionCode: (eventCode, listString, listIndex, setString = null, setIndex = null) => {
      update((userData) => {
        if (setString === null) {
          userData[listString][listIndex].TranspositionEventCodes[eventCode] = [
            [0, 0],
            [0, 0]
          ];
        } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
          userData[listString][listIndex][setString][setIndex].TranspositionEventCodes[eventCode] = [
            [0, 0],
            [0, 0]
          ];
        } else if (listString === "ChartList" && setString === "ComboSet" && setIndex !== null) {
          userData[listString][listIndex][setString][setIndex].TranspositionEventCodes[eventCode] = [
            [0, 0],
            [0, 0]
          ];
        }
        return userData;
      });
    },
    removeTranspositionCode: (eventCode, listString, listIndex, setString = null, setIndex = null) => {
      update((userData) => {
        if (setString === null) {
          delete userData[listString][listIndex].TranspositionEventCodes[eventCode];
        } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
          delete userData[listString][listIndex][setString][setIndex].TranspositionEventCodes[eventCode];
        } else if (listString === "ChartList" && setString === "ComboSet" && setIndex !== null) {
          delete userData[listString][listIndex][setString][setIndex].TranspositionEventCodes[eventCode];
        }
        return userData;
      });
    }
  };
}
const Note_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".class_note.s-v9CObooVVafw{display:inline-block;padding:15px;border:solid}.s-v9CObooVVafw{color:white;text-shadow:-1px -1px 0 black,\r\n    1px -1px 0 black,\r\n    -1px 1px 0 black,\r\n    1px 1px 0 black}",
  map: null
};
const Note = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { noteData = new NoteUDTemplate() } = $$props;
  if ($$props.noteData === void 0 && $$bindings.noteData && noteData !== void 0)
    $$bindings.noteData(noteData);
  $$result.css.add(css$b);
  noteData = $QOPUserData.ScaleList[noteData.ScaleID].NoteSet[noteData.NoteID];
  $$unsubscribe_QOPUserData();
  return `<div class="class_note s-v9CObooVVafw" style="${"background-color: " + escape(noteData.ColorHex, true)}"><div class="s-v9CObooVVafw">NoteID: ${escape(noteData.NoteID)} ScaleID: ${escape(noteData.ScaleID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div class="s-v9CObooVVafw">Note Name:
		<input type="text" class="s-v9CObooVVafw"${add_attribute("value", noteData.Name, 0)}>
		</div>
	<div class="s-v9CObooVVafw">Pitch:
		<input type="number" class="s-v9CObooVVafw"${add_attribute("value", noteData.PitchHz, 0)}>Hz
	</div>
	<div class="s-v9CObooVVafw">Color:
		<input type="color" class="s-v9CObooVVafw"${add_attribute("value", noteData.ColorHex, 0)}>${escape(noteData.ColorHex)}</div>
</div>`;
});
const Scale_svelte_svelte_type_style_lang = "";
const css$a = {
  code: "input.s-vRcL9QM3jNmY,select.s-vRcL9QM3jNmY{color:black}",
  map: null
};
const Scale = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { scaleData = new ScaleUDTemplate() } = $$props;
  const scaleTypeOptions = [
    "Equal Temperament",
    "Just Intonation",
    "Pythagorean Tuning (5-Limit)",
    "Werckmeister Temperament (Baroque German Music)",
    "Meantone Temperament (Renaissance and Baroque Music)",
    "Kirnberger Temperament (Baroque German Music)",
    "Maqam (Arabic Music)",
    "Ndebele Tuning (Southern African Music)",
    "Gagaku (Japanese Court Music)",
    "Pelog and Slendro (Indonesian Gamelan Music)",
    "Hijaz (Turkish Music)",
    "Shona Mbira Tuning (Zimbabwean Music)",
    "Hexany System (Native American Music)",
    "Bohlen-Pierce Scale (microtonal Music)"
  ];
  if ($$props.scaleData === void 0 && $$bindings.scaleData && scaleData !== void 0)
    $$bindings.scaleData(scaleData);
  $$result.css.add(css$a);
  scaleData = $QOPUserData.ScaleList[scaleData.ScaleID];
  $$unsubscribe_QOPUserData();
  return `<div class="scale"><div>Scale ID: ${escape(scaleData.ScaleID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div>Scale Name:
		<input type="text" class="s-vRcL9QM3jNmY"${add_attribute("value", scaleData.Name, 0)}></div>
	<div>Description:
		<input type="text" class="s-vRcL9QM3jNmY"${add_attribute("value", scaleData.Description, 0)}></div>
	<div>Scale Type:
		<select class="s-vRcL9QM3jNmY">${each(scaleTypeOptions, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select></div>
	<div>Reference Note ID:
		<input type="number" min="0"${add_attribute("max", scaleData.NoteSet.length - 1, 0)} step="1" class="s-vRcL9QM3jNmY"${add_attribute("value", scaleData.ReferenceNote, 0)}></div>
	<div>Tuning:
		<input type="number" class="s-vRcL9QM3jNmY"${add_attribute("value", scaleData.TuningHz, 0)}>Hz
	</div>
	<div>Octave Divisions:
		<input type="number" min="1" step="1" class="s-vRcL9QM3jNmY"${add_attribute("value", scaleData.OctaveDivisions, 0)}></div>
	<div>Note Class Set:
		<button>Add Note Class</button>
		${each(scaleData.NoteClassSet, (noteClass, noteClassIndex) => {
    return `<div class="note-class"><input type="text" class="s-vRcL9QM3jNmY"${add_attribute("value", noteClass, 0)}>
				<button>Remove ${escape(noteClass)}</button>
			</div>`;
  })}</div>
	<div>Note Set:
		<div><button>Add Note</button>
			<div class="note">${each($QOPUserData.ScaleList[scaleData.ScaleID].NoteSet, (note, noteIndex) => {
    return `${validate_component(Note, "Note").$$render($$result, { noteData: note }, {}, {
      default: () => {
        return `<button>Remove Note ${escape(noteIndex)}</button>
					`;
      }
    })}`;
  })}</div></div></div>
</div>`;
});
const Action_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".overlay.s-cl1AUpdZc1oa{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.6);display:flex;justify-content:center;align-items:center;z-index:9999;color:white;text-shadow:-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black}.actionEventCodes.s-cl1AUpdZc1oa{border:solid black;padding:2vh}.eventCode.s-cl1AUpdZc1oa{border:dotted black;padding:1vh}",
  map: null
};
const Action = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { actionData = {} } = $$props;
  let { propString = "ButtonEventCodes" } = $$props;
  let { listString = "GutList" } = $$props;
  let { listIndex = 0 } = $$props;
  let { setString = null } = $$props;
  let { setIndex = null } = $$props;
  if ($$props.actionData === void 0 && $$bindings.actionData && actionData !== void 0)
    $$bindings.actionData(actionData);
  if ($$props.propString === void 0 && $$bindings.propString && propString !== void 0)
    $$bindings.propString(propString);
  if ($$props.listString === void 0 && $$bindings.listString && listString !== void 0)
    $$bindings.listString(listString);
  if ($$props.listIndex === void 0 && $$bindings.listIndex && listIndex !== void 0)
    $$bindings.listIndex(listIndex);
  if ($$props.setString === void 0 && $$bindings.setString && setString !== void 0)
    $$bindings.setString(setString);
  if ($$props.setIndex === void 0 && $$bindings.setIndex && setIndex !== void 0)
    $$bindings.setIndex(setIndex);
  $$result.css.add(css$9);
  {
    {
      if (setString === null && listString !== "ChartList") {
        actionData = $QOPUserData[listString][listIndex][propString];
      } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
        actionData = $QOPUserData[listString][listIndex][setString][setIndex][propString];
      } else if (listString === "ChartList" && setString === "PadSet" && setIndex !== null) {
        actionData = $QOPUserData[listString][listIndex][setString][setIndex][propString];
      }
    }
  }
  $$unsubscribe_QOPUserData();
  return `${``}

<div class="actionEventCodes s-cl1AUpdZc1oa">${escape(propString.substring(0, propString.length - 10))} Keys:
	<button>Add Key</button>
	${each(Object.entries(actionData), ([eventCode, value]) => {
    return `<div class="eventCode s-cl1AUpdZc1oa">${escape([eventCode])}:
			<button>Remove Key ${escape(eventCode)}</button>
			<div>↓:
				<select><option value="1">True</option><option value="0">False</option></select></div>
			<div>↑:
				<select><option value="1">True</option><option value="0">False</option></select></div>
		</div>`;
  })}
</div>`;
});
const Transposition_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".overlay.s-eHTQXc72uvM9{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.6);display:flex;justify-content:center;align-items:center;z-index:9999;color:white;text-shadow:-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black}.transpositionEventCodes.s-eHTQXc72uvM9{border:solid black;padding:2vh}.eventCode.s-eHTQXc72uvM9{border:dashed;padding:1vh}.transposition-keydown.s-eHTQXc72uvM9,.transposition-keyup.s-eHTQXc72uvM9{border:dotted black;padding:1vh}",
  map: null
};
const Transposition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { transpositionData = {} } = $$props;
  let { listString = "GutList" } = $$props;
  let { listIndex = 0 } = $$props;
  let { setString = null } = $$props;
  let { setIndex = null } = $$props;
  if ($$props.transpositionData === void 0 && $$bindings.transpositionData && transpositionData !== void 0)
    $$bindings.transpositionData(transpositionData);
  if ($$props.listString === void 0 && $$bindings.listString && listString !== void 0)
    $$bindings.listString(listString);
  if ($$props.listIndex === void 0 && $$bindings.listIndex && listIndex !== void 0)
    $$bindings.listIndex(listIndex);
  if ($$props.setString === void 0 && $$bindings.setString && setString !== void 0)
    $$bindings.setString(setString);
  if ($$props.setIndex === void 0 && $$bindings.setIndex && setIndex !== void 0)
    $$bindings.setIndex(setIndex);
  $$result.css.add(css$8);
  {
    {
      if (setString === null) {
        transpositionData = $QOPUserData[listString][listIndex].TranspositionEventCodes;
      } else if (listString === "GutList" && setString === "FretSet" && setIndex !== null) {
        transpositionData = $QOPUserData[listString][listIndex][setString][setIndex].TranspositionEventCodes;
      } else if (listString === "ChartList" && setString === "ComboSet" && setIndex !== null) {
        transpositionData = $QOPUserData[listString][listIndex][setString][setIndex].TranspositionEventCodes;
      }
    }
  }
  $$unsubscribe_QOPUserData();
  return `${``}

<div class="transpositionEventCodes s-eHTQXc72uvM9">Transposition Keys:
	<button>Add Key</button>
	${each(Object.entries(transpositionData), ([eventCode, value]) => {
    return `<div class="eventCode s-eHTQXc72uvM9">${escape(eventCode)}:
			<button>Remove Key ${escape(eventCode)}</button>
			<div class="transposition-keydown s-eHTQXc72uvM9">↓: Note ID:<input type="number"${add_attribute("value", value[0][0], 0)}>, Cents:<input type="number"${add_attribute("value", value[0][1], 0)}></div>
			<div class="transposition-keyup s-eHTQXc72uvM9">↑: Note ID:<input type="number"${add_attribute("value", value[1][0], 0)}>, Cents:<input type="number"${add_attribute("value", value[1][1], 0)}></div>
		</div>`;
  })}
</div>`;
});
const Fret_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".class_fret.s-3pVocGxSRNkX{display:inline-block;padding:15px;border:solid}.s-3pVocGxSRNkX{color:black}",
  map: null
};
const ListString$5 = "GutList";
const SetString$2 = "FretSet";
const Fret = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { fretData = new FretUDTemplate() } = $$props;
  if ($$props.fretData === void 0 && $$bindings.fretData && fretData !== void 0)
    $$bindings.fretData(fretData);
  $$result.css.add(css$7);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    fretData = $QOPUserData.GutList[fretData.GutID].FretSet[fretData.FretID];
    $$rendered = `<div class="class_fret s-3pVocGxSRNkX"><div class="s-3pVocGxSRNkX">FretID: ${escape(fretData.FretID)} ScaleID: ${escape(fretData.GutID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div class="s-3pVocGxSRNkX">Fret Name:
		<input type="text" class="s-3pVocGxSRNkX"${add_attribute("value", fretData.Name, 0)}>
		</div>

	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: ButtonString,
        listString: ListString$5,
        setString: SetString$2,
        actionData: fretData.ButtonEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        actionData: ($$value) => {
          fretData.ButtonEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SustainString,
        listString: ListString$5,
        setString: SetString$2,
        actionData: fretData.SustainEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        actionData: ($$value) => {
          fretData.SustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSustainString,
        listString: ListString$5,
        setString: SetString$2,
        actionData: fretData.AntiSustainEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        actionData: ($$value) => {
          fretData.AntiSustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SostenutoString,
        listString: ListString$5,
        setString: SetString$2,
        actionData: fretData.SostenutoEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        actionData: ($$value) => {
          fretData.SostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSostenutoString,
        listString: ListString$5,
        setString: SetString$2,
        actionData: fretData.AntiSostenutoEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        actionData: ($$value) => {
          fretData.AntiSostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Transposition, "Transposition").$$render(
      $$result,
      {
        listString: ListString$5,
        setString: SetString$2,
        transpositionData: fretData.TranspositionEventCodes,
        listIndex: fretData.GutID,
        setIndex: fretData.FretID
      },
      {
        transpositionData: ($$value) => {
          fretData.TranspositionEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          fretData.GutID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          fretData.FretID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	<div class="s-3pVocGxSRNkX">Delta Type:
		<select class="s-3pVocGxSRNkX"><option value="NoteID" class="s-3pVocGxSRNkX">Note ID</option><option value="Cents" class="s-3pVocGxSRNkX">Cents</option><option value="Both" class="s-3pVocGxSRNkX">Both Note ID &amp; Cents</option></select></div>
	<div class="s-3pVocGxSRNkX">Note ID Delta:
		<input type="number" class="s-3pVocGxSRNkX"${add_attribute("value", fretData.NoteIDDelta, 0)}></div>
	<div class="s-3pVocGxSRNkX">Cents Delta:
		<input type="number" class="s-3pVocGxSRNkX"${add_attribute("value", fretData.CentsDelta, 0)}></div>
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const Gut_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".gut.s-qYWQG1NtPKLK{color:black;background-color:rgb(255, 214, 137)}input.s-qYWQG1NtPKLK,select.s-qYWQG1NtPKLK{color:black}",
  map: null
};
const ListString$4 = "GutList";
const Gut = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { gutData = new GutUDTemplate() } = $$props;
  const oscWaveTypeOptions = ["sine", "square", "triangle", "sawtooth"];
  if ($$props.gutData === void 0 && $$bindings.gutData && gutData !== void 0)
    $$bindings.gutData(gutData);
  $$result.css.add(css$6);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    gutData = $QOPUserData.GutList[gutData.GutID];
    $$rendered = `<div class="gut s-qYWQG1NtPKLK"><div>Gut ID: ${escape(gutData.GutID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div>Gut Name:
		<input type="text" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.Name, 0)}></div>
	<div>Description:
		<input type="text" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.Description, 0)}></div>
	<div>Gut MIDI Output Toggle:
		<input type="checkbox" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.GutMIDIOutputToggle, 0)}></div>

	<div>Gut Osc Toggle:
		<input type="checkbox" checked class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.GutOscToggle, 0)}></div>
	<div>Osc Wave Type:
		${each($QOPUserData.ScaleList, (scale, scaleIndex) => {
      return `${escape(scaleIndex)}:
		<select class="s-qYWQG1NtPKLK">${each(oscWaveTypeOptions, (option) => {
        return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
      })}</select>`;
    })}</div>
	<div>Osc Gain:
		${each($QOPUserData.ScaleList, (scale, scaleIndex) => {
      return `${escape(scaleIndex)}:
		<input type="number" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.OscGain[scaleIndex], 0)}>`;
    })}</div>
	
	<div>Open Gut Note ID:
		${each($QOPUserData.ScaleList, (scale, scaleIndex) => {
      return `${escape(scaleIndex)}:
		<input type="number" step="1" min="0" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.OpenGutNoteID[scaleIndex], 0)}>`;
    })}</div>
	<div>Require Fret:
		<input type="checkbox" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.RequireFret, 0)}></div>
	<div>Require Valve:
		<input type="checkbox" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.RequireValve, 0)}></div>
	<div>Require Combo:
		<input type="checkbox" class="s-qYWQG1NtPKLK"${add_attribute("value", gutData.RequireCombo, 0)}></div>

	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: ButtonString,
        listString: ListString$4,
        actionData: gutData.ButtonEventCodes,
        listIndex: gutData.GutID
      },
      {
        actionData: ($$value) => {
          gutData.ButtonEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SustainString,
        listString: ListString$4,
        actionData: gutData.SustainEventCodes,
        listIndex: gutData.GutID
      },
      {
        actionData: ($$value) => {
          gutData.SustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSustainString,
        listString: ListString$4,
        actionData: gutData.AntiSustainEventCodes,
        listIndex: gutData.GutID
      },
      {
        actionData: ($$value) => {
          gutData.AntiSustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SostenutoString,
        listString: ListString$4,
        actionData: gutData.SostenutoEventCodes,
        listIndex: gutData.GutID
      },
      {
        actionData: ($$value) => {
          gutData.SostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSostenutoString,
        listString: ListString$4,
        actionData: gutData.AntiSostenutoEventCodes,
        listIndex: gutData.GutID
      },
      {
        actionData: ($$value) => {
          gutData.AntiSostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Transposition, "Transposition").$$render(
      $$result,
      {
        listString: ListString$4,
        transpositionData: gutData.TranspositionEventCodes,
        listIndex: gutData.GutID
      },
      {
        transpositionData: ($$value) => {
          gutData.TranspositionEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          gutData.GutID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	<div>Fret Set:
		<div><button>Add Fret</button>
			<div class="fret">${each($QOPUserData.GutList[gutData.GutID].FretSet, (fret, fretIndex) => {
      return `${validate_component(Fret, "Fret").$$render($$result, { fretData: fret }, {}, {
        default: () => {
          return `<button>Remove Fret ${escape(fretIndex)}</button>
					`;
        }
      })}`;
    })}</div></div></div>
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const Valve_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".valve.s-Q0Lu5DwGpDE8{color:black;background-color:rgb(173, 229, 173)}input.s-Q0Lu5DwGpDE8{color:black}.deltaObj.s-Q0Lu5DwGpDE8{border:dashed}",
  map: null
};
const ListString$3 = "ValveList";
const Valve = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { valveData = new ValveUDTemplate() } = $$props;
  if ($$props.valveData === void 0 && $$bindings.valveData && valveData !== void 0)
    $$bindings.valveData(valveData);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    valveData = $QOPUserData.ValveList[valveData.ValveID];
    $$rendered = `<div class="valve s-Q0Lu5DwGpDE8"><div>Valve ID: ${escape(valveData.ValveID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div>Valve Name:
		<input type="text" class="s-Q0Lu5DwGpDE8"${add_attribute("value", valveData.Name, 0)}></div>
	<div>Description:
		<input type="text" class="s-Q0Lu5DwGpDE8"${add_attribute("value", valveData.Description, 0)}></div>

	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: ButtonString,
        listString: ListString$3,
        actionData: valveData.ButtonEventCodes,
        listIndex: valveData.ValveID
      },
      {
        actionData: ($$value) => {
          valveData.ButtonEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SustainString,
        listString: ListString$3,
        actionData: valveData.SustainEventCodes,
        listIndex: valveData.ValveID
      },
      {
        actionData: ($$value) => {
          valveData.SustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSustainString,
        listString: ListString$3,
        actionData: valveData.AntiSustainEventCodes,
        listIndex: valveData.ValveID
      },
      {
        actionData: ($$value) => {
          valveData.AntiSustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SostenutoString,
        listString: ListString$3,
        actionData: valveData.SostenutoEventCodes,
        listIndex: valveData.ValveID
      },
      {
        actionData: ($$value) => {
          valveData.SostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSostenutoString,
        listString: ListString$3,
        actionData: valveData.AntiSostenutoEventCodes,
        listIndex: valveData.ValveID
      },
      {
        actionData: ($$value) => {
          valveData.AntiSostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Transposition, "Transposition").$$render(
      $$result,
      {
        listString: ListString$3,
        transpositionData: valveData.TranspositionEventCodes,
        listIndex: valveData.ValveID
      },
      {
        transpositionData: ($$value) => {
          valveData.TranspositionEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          valveData.ValveID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	${each(valveData.DeltaSet, (deltaData, deltaDataIndex) => {
      return `<div class="deltaObj s-Q0Lu5DwGpDE8">${escape(deltaDataIndex)}:
			<div>Delta Type:
				<select><option value="NoteID">Note ID</option><option value="Cents">Cents</option><option value="Both">Both Note ID &amp; Cents</option></select></div>
			<div>Note ID Delta:
				<input type="number" class="s-Q0Lu5DwGpDE8"${add_attribute("value", deltaData.NoteIDDelta, 0)}></div>
			<div>Cents Delta:
				<input type="number" class="s-Q0Lu5DwGpDE8"${add_attribute("value", deltaData.CentsDelta, 0)}></div>
		</div>`;
    })}
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const Pad_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".class_pad.s-Zr6Ozpo_GQaM{display:inline-block;padding:15px;border:solid}.s-Zr6Ozpo_GQaM{color:black}",
  map: null
};
const ListString$2 = "ChartList";
const SetString$1 = "PadSet";
const Pad = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { padData = new PadUDTemplate() } = $$props;
  if ($$props.padData === void 0 && $$bindings.padData && padData !== void 0)
    $$bindings.padData(padData);
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    padData = $QOPUserData.ChartList[padData.ChartID].PadSet[padData.PadID];
    $$rendered = `<div class="class_pad s-Zr6Ozpo_GQaM"><div class="s-Zr6Ozpo_GQaM">PadID: ${escape(padData.PadID)} ScaleID: ${escape(padData.ChartID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div class="s-Zr6Ozpo_GQaM">Pad Name:
		<input type="text" class="s-Zr6Ozpo_GQaM"${add_attribute("value", padData.Name, 0)}>
		</div>

	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: ButtonString,
        listString: ListString$2,
        setString: SetString$1,
        actionData: padData.ButtonEventCodes,
        listIndex: padData.ChartID,
        setIndex: padData.PadID
      },
      {
        actionData: ($$value) => {
          padData.ButtonEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          padData.ChartID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          padData.PadID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SustainString,
        listString: ListString$2,
        setString: SetString$1,
        actionData: padData.SustainEventCodes,
        listIndex: padData.ChartID,
        setIndex: padData.PadID
      },
      {
        actionData: ($$value) => {
          padData.SustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          padData.ChartID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          padData.PadID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSustainString,
        listString: ListString$2,
        setString: SetString$1,
        actionData: padData.AntiSustainEventCodes,
        listIndex: padData.ChartID,
        setIndex: padData.PadID
      },
      {
        actionData: ($$value) => {
          padData.AntiSustainEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          padData.ChartID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          padData.PadID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: SostenutoString,
        listString: ListString$2,
        setString: SetString$1,
        actionData: padData.SostenutoEventCodes,
        listIndex: padData.ChartID,
        setIndex: padData.PadID
      },
      {
        actionData: ($$value) => {
          padData.SostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          padData.ChartID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          padData.PadID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(Action, "Action").$$render(
      $$result,
      {
        propString: AntiSostenutoString,
        listString: ListString$2,
        setString: SetString$1,
        actionData: padData.AntiSostenutoEventCodes,
        listIndex: padData.ChartID,
        setIndex: padData.PadID
      },
      {
        actionData: ($$value) => {
          padData.AntiSostenutoEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          padData.ChartID = $$value;
          $$settled = false;
        },
        setIndex: ($$value) => {
          padData.PadID = $$value;
          $$settled = false;
        }
      },
      {}
    )}
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const Combo_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".class_combo.s-i69sQmdpa3Ry{display:inline-block;padding:15px;border:solid}.combination.s-i69sQmdpa3Ry,.deltaObj.s-i69sQmdpa3Ry{border:dashed}.comboPad.s-i69sQmdpa3Ry{border:dotted black}.s-i69sQmdpa3Ry{color:black}",
  map: null
};
const ListString$1 = "ChartList";
const SetString = "ComboSet";
const Combo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { comboData = new ComboUDTemplate() } = $$props;
  if ($$props.comboData === void 0 && $$bindings.comboData && comboData !== void 0)
    $$bindings.comboData(comboData);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    comboData = $QOPUserData.ChartList[comboData.ChartID].ComboSet[comboData.ComboID];
    $$rendered = `<div class="class_combo s-i69sQmdpa3Ry"><div class="s-i69sQmdpa3Ry">ComboID: ${escape(comboData.ComboID)} ScaleID: ${escape(comboData.ChartID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div class="s-i69sQmdpa3Ry">Combo Name:
		<input type="text" class="s-i69sQmdpa3Ry"${add_attribute("value", comboData.Name, 0)}>
		</div>

	${validate_component(Transposition, "Transposition").$$render(
      $$result,
      {
        listString: ListString$1,
        setString: SetString,
        setIndex: comboData.ComboID,
        transpositionData: comboData.TranspositionEventCodes,
        listIndex: comboData.ChartID
      },
      {
        transpositionData: ($$value) => {
          comboData.TranspositionEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          comboData.ChartID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	${each(comboData.DeltaSet, (deltaData, deltaDataIndex) => {
      return `<div class="deltaObj s-i69sQmdpa3Ry"><div class="s-i69sQmdpa3Ry">${escape(deltaDataIndex)}:
				Delta Type:
				<select class="s-i69sQmdpa3Ry"><option value="NoteID" class="s-i69sQmdpa3Ry">Note ID</option><option value="Cents" class="s-i69sQmdpa3Ry">Cents</option><option value="Both" class="s-i69sQmdpa3Ry">Both Note ID &amp; Cents</option></select></div>
			<div class="s-i69sQmdpa3Ry">Note ID Delta:
				<input type="number" class="s-i69sQmdpa3Ry"${add_attribute("value", deltaData.NoteIDDelta, 0)}></div>
			<div class="s-i69sQmdpa3Ry">Cents Delta:
				<input type="number" class="s-i69sQmdpa3Ry"${add_attribute("value", deltaData.CentsDelta, 0)}></div>
		</div>`;
    })}

	<div class="combination s-i69sQmdpa3Ry">Combo:
		${each(comboData.Combo, (pad, padIndex) => {
      return `<div class="comboPad s-i69sQmdpa3Ry">Pad ${escape(padIndex)}:
				<input type="checkbox" checked class="s-i69sQmdpa3Ry"${add_attribute("value", pad, 0)}>
			</div>`;
    })}</div>
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const Chart_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".chart.s-FOteZ5ZidF0o{color:black;background-color:rgb(128, 255, 255)}input.s-FOteZ5ZidF0o{color:black}",
  map: null
};
const ListString = "ChartList";
const Chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let { chartData = new ChartUDTemplate() } = $$props;
  if ($$props.chartData === void 0 && $$bindings.chartData && chartData !== void 0)
    $$bindings.chartData(chartData);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    chartData = $QOPUserData.ChartList[chartData.ChartID];
    $$rendered = `<div class="chart s-FOteZ5ZidF0o"><div>Chart ID: ${escape(chartData.ChartID)}</div>
	${slots.default ? slots.default({}) : ``}
	<div>Chart Name:
		<input type="text" class="s-FOteZ5ZidF0o"${add_attribute("value", chartData.Name, 0)}></div>
	<div>Description:
		<input type="text" class="s-FOteZ5ZidF0o"${add_attribute("value", chartData.Description, 0)}></div>

	${validate_component(Transposition, "Transposition").$$render(
      $$result,
      {
        listString: ListString,
        transpositionData: chartData.TranspositionEventCodes,
        listIndex: chartData.ChartID
      },
      {
        transpositionData: ($$value) => {
          chartData.TranspositionEventCodes = $$value;
          $$settled = false;
        },
        listIndex: ($$value) => {
          chartData.ChartID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	<div>Pad Set:
		<div><button>Add Pad</button>
			<div class="pad">${each($QOPUserData.ChartList[chartData.ChartID].PadSet, (pad, padIndex) => {
      return `${validate_component(Pad, "Pad").$$render($$result, { padData: pad }, {}, {
        default: () => {
          return `<button>Remove Pad ${escape(padIndex)}</button>
					`;
        }
      })}`;
    })}</div></div></div>
	<div>Combo Set:
		<div><button>Add Combo</button>
			<div class="combo">${each($QOPUserData.ChartList[chartData.ChartID].ComboSet, (combo, comboIndex) => {
      return `${validate_component(Combo, "Combo").$$render($$result, { comboData: combo }, {}, {
        default: () => {
          return `<button>Remove Combo ${escape(comboIndex)}</button>
					`;
        }
      })}`;
    })}</div></div></div>
</div>`;
  } while (!$$settled);
  $$unsubscribe_QOPUserData();
  return $$rendered;
});
const EditorUI_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".list-container.s-yRTghy9Oc7TC{max-height:85vh;overflow-y:auto;margin:2.5vh 5vh;padding:1vh}.scale-list.s-yRTghy9Oc7TC{border:solid palevioletred}.gut-list.s-yRTghy9Oc7TC{border:solid orange}.valve-list.s-yRTghy9Oc7TC{border:solid lightgreen}.chart-list.s-yRTghy9Oc7TC{border:solid cyan}h1.s-yRTghy9Oc7TC{font-family:'Comic Sans MS'}input.s-yRTghy9Oc7TC{color:rgb(43, 43, 43);background-color:white;margin:3px}.button-container.s-yRTghy9Oc7TC{display:inline;margin:2px;border:black;padding:5px;background-color:lightgray\r\n	}",
  map: null
};
const EditorUI = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $QOPUserData, $$unsubscribe_QOPUserData;
  validate_store(QOPUserData, "QOPUserData");
  $$unsubscribe_QOPUserData = subscribe(QOPUserData, (value) => $QOPUserData = value);
  let userData = $QOPUserData;
  $$result.css.add(css$1);
  userData = $QOPUserData;
  $$unsubscribe_QOPUserData();
  return `<h1 class="s-yRTghy9Oc7TC">Editor Mode</h1>

<div class="qopud-metadata"><button>Download Current QOPUD</button>
	<div>QOP Name:
		<input type="text" class="s-yRTghy9Oc7TC"${add_attribute("value", userData.Name, 0)}></div>
	<div>Description:
		<input type="text" class="s-yRTghy9Oc7TC"${add_attribute("value", userData.Description, 0)}></div>
	<div>Native Sound Toggle:
		<div class="button-container s-yRTghy9Oc7TC"><input type="checkbox" checked class="s-yRTghy9Oc7TC"${add_attribute("value", userData.OscModeToggle, 0)}>\\
		</div></div>
	<div>MIDI Output Toggle:
		<div class="button-container s-yRTghy9Oc7TC"><input type="checkbox" class="s-yRTghy9Oc7TC"${add_attribute("value", userData.MIDIOutputModeToggle, 0)}></div></div>
	<div>Debounce Timer:
		<input type="number" class="s-yRTghy9Oc7TC"${add_attribute("value", userData.DebounceTimer, 0)}>ms
	</div></div>

<button>Add Scale</button>
<div class="list-container scale-list s-yRTghy9Oc7TC">${each(userData.ScaleList, (scale, scaleIndex) => {
    return `<button>Download Scale ${escape(scaleIndex)}</button>
		${validate_component(Scale, "Scale").$$render($$result, { scaleData: scale }, {}, {
      default: () => {
        return `<button>Remove Scale ${escape(scaleIndex)}</button>
		`;
      }
    })}`;
  })}</div>

<button>Add Gut</button>
<div class="list-container gut-list s-yRTghy9Oc7TC">${each(userData.GutList, (gut, gutIndex) => {
    return `<button>Download Gut ${escape(gutIndex)}</button>
		${validate_component(Gut, "Gut").$$render($$result, { gutData: gut }, {}, {
      default: () => {
        return `<button>Remove Gut ${escape(gutIndex)}</button>
		`;
      }
    })}`;
  })}</div>

<button>Add Valve</button>
<div class="list-container valve-list s-yRTghy9Oc7TC">${each($QOPUserData.ValveList, (valve, valveIndex) => {
    return `<button>Download Valve ${escape(valveIndex)}</button>
		${validate_component(Valve, "Valve").$$render($$result, { valveData: valve }, {}, {
      default: () => {
        return `<button>Remove Valve ${escape(valveIndex)}</button>
		`;
      }
    })}`;
  })}</div>

<button>Add Chart</button>
<div class="list-container chart-list s-yRTghy9Oc7TC">${each($QOPUserData.ChartList, (chart, chartIndex) => {
    return `<button>Download Chart ${escape(chartIndex)}</button>
		${validate_component(Chart, "Chart").$$render($$result, { chartData: chart }, {}, {
      default: () => {
        return `<button>Remove Chart ${escape(chartIndex)}</button>
		`;
      }
    })}`;
  })}
</div>`;
});
const WoodshedUI_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "button{padding:10px 15px;border:none;background-color:#007bff;color:white;cursor:pointer;border-radius:5px;margin-bottom:20px}button:hover{background-color:#0056b3}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `


${validate_component(Banner, "Banner").$$render($$result, {}, {}, {})}

<button>Toggle Mode </button>



${`${validate_component(EditorUI, "EditorUI").$$render($$result, {}, {}, {})}`}`;
});
export {
  Page as default
};

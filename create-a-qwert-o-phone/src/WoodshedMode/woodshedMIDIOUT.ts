import type { QOPTemplate } from './initQOP.js';

export function SendMIDIMessages(QOP: QOPTemplate) {
	if (QOP.MIDIOutput.SelectedMIDIOutput === null) {
		console.error('No MIDI output device selected.');
		return;
	}
	MIDIOutputPacket(QOP);
}

function MIDIOutputPacket(QOP: QOPTemplate) {
	const { TotalFrequency, GutSoundState } = QOP.StateMachine;
	const { GutMIDIOutputToggle, SelectedMIDIOutput } = QOP.MIDIOutput;

	if (!SelectedMIDIOutput) {
		console.error('No MIDI output device selected.');
		return;
	}

	for (let i = 0; i < GutSoundState.length; i++) {
		if (GutSoundState[i] && GutMIDIOutputToggle[i]) {
			SendMIDINoteWithPitchBend(TotalFrequency[i][0], SelectedMIDIOutput);
		}
	}
}

function SendMIDINoteWithPitchBend(PitchHz: number, midiOutput: MIDIOutput) {
	const { ClosestMIDINote, closestFrequency } = FindClosestMIDINote(PitchHz);
	midiOutput.send([0x90, ClosestMIDINote, 127]); // Note on message, channel 1, max velocity

	const n = 12 * Math.log2(PitchHz / closestFrequency);
	const pitchBend = Math.round((n / 2) * 0x2000 + 0x2000);
	const PitchBendLSB = pitchBend & 0x7f;
	const PitchBendMSB = (pitchBend >> 7) & 0x7f;
	midiOutput.send([0xe0, PitchBendLSB, PitchBendMSB]); // Pitch bend message, channel 1
}

export function FindClosestMIDINote(targetFrequency: number) {
	let ClosestMIDINote = 0;
	let closestFrequency = 0;

	for (let m = 0; m <= 127; m++) {
		if (Math.abs(MIDILUT[m] - targetFrequency) < Math.abs(closestFrequency - targetFrequency)) {
			ClosestMIDINote = m;
			closestFrequency = MIDILUT[m];
		}
	}

	return { ClosestMIDINote, closestFrequency };
}
export const standardMIDINoteNames = [
	'C',
	'C♯ / D♭',
	'D',
	'D♯ / E♭',
	'E',
	'F',
	'F♯ / G♭',
	'G',
	'G♯ / A♭',
	'A',
	'A♯ / B♭',
	'B'
];

export const MIDILUT: {
	[key: number]: number;
} = {
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

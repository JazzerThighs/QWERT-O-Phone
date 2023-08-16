import { writable } from 'svelte/store';
import { MIDILUT } from '../WoodshedMode/woodshedMIDIOUT';
import {
	QOPUserDataTemplate,
	ScaleUDTemplate,
	NoteUDTemplate,
	GutUDTemplate,
	FretUDTemplate,
	ValveUDTemplate,
	ChartUDTemplate,
	ComboUDTemplate,
	ActionTypeUDTemplate,
	DeltaUDTemplate
} from './initQOPUD';

function CreateQOPUserData() {
	const { subscribe, set, update } = writable<QOPUserDataTemplate>(new QOPUserDataTemplate());

	return {
		subscribe,
		reset: () => set(new QOPUserDataTemplate()),

		addScale: (newScale = HydrateScaleForUD()) => {
			update((userData) => {
				userData.ScaleList.push(newScale);
				return userData;
			});
		},
		removeScale: (scaleIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex]) {
					userData.ScaleList.splice(scaleIndex, 1);
				}
				return userData;
			});
		},
        
        addGut: (newGut = new GutUDTemplate(), newDelta = new DeltaUDTemplate()) => {
            update((userData) => {
                userData.GutList.push(newGut);
                for (let propIndex = 0; propIndex < userData.ValveList.length; propIndex++) {
                    userData.ValveList[propIndex].DeltaSet.push(newDelta);
                    for (
                        let comboIndex = 0;
                        comboIndex < userData.ChartList[propIndex].ComboSet.length;
                        comboIndex++
                    ) {
                        userData.ChartList[propIndex].ComboSet[comboIndex].DeltaSet.push(newDelta);
                    }
                }
                return userData;
            });
        },
		removeGut: (gutIndex: number) => {
			update((userData) => {
				if (userData.GutList[gutIndex]) {
                    userData.GutList.splice(gutIndex, 1);
                    for (let propIndex = 0; propIndex < userData.ValveList.length; propIndex++) {
					    userData.ValveList[propIndex].DeltaSet.splice(
						    userData.ValveList[propIndex].DeltaSet.length - 1,
						    1
					    );
                        for (
                            let comboIndex = 0;
                            comboIndex < userData.ChartList[propIndex].ComboSet.length;
                            comboIndex++
                        ) {
                            userData.ChartList[propIndex].ComboSet[comboIndex].DeltaSet.splice(
                                userData.ChartList[propIndex].ComboSet[comboIndex].DeltaSet.length - 1,
                                1
                            );
                        }
                    }
                }
				return userData;
			});
        },
        
		addNote: (scaleIndex: number, newNote = new NoteUDTemplate()) => {
			update((userData) => {
				userData.ScaleList[scaleIndex].NoteSet.push(newNote);
				return userData;
			});
		},
		removeNote: (scaleIndex: number, noteIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex].NoteSet[noteIndex]) {
					userData.ScaleList[scaleIndex].NoteSet.splice(noteIndex, 1);
				}
				return userData;
			});
		},

		addFret: (gutIndex: number, newFret = new FretUDTemplate()) => {
			update((userData) => {
				userData.GutList[gutIndex].FretSet.push(newFret);
				return userData;
			});
		},
		removeFret: (gutIndex: number, fretIndex: number) => {
			update((userData) => {
				if (userData.GutList[gutIndex].FretSet[fretIndex]) {
					userData.GutList[gutIndex].FretSet.splice(fretIndex, 1);
				}
				return userData;
			});
		},

		addValve: (newValve = new ValveUDTemplate()) => {
			update((userData) => {
				userData.ValveList.push(newValve);
				return userData;
			});
		},
		removeValve: (valveIndex: number) => {
			update((userData) => {
				if (userData.ValveList[valveIndex]) {
					userData.ValveList.splice(valveIndex, 1);
				}
				return userData;
			});
		},

		addChart: (newChart = new ChartUDTemplate()) => {
			update((userData) => {
				userData.ChartList.push(newChart);
				return userData;
			});
		},
		removeChart: (chartIndex: number) => {
			update((userData) => {
				if (userData.ChartList[chartIndex]) {
					userData.ChartList.splice(chartIndex, 1);
				}
				return userData;
			});
		},

		addPad: (chartIndex: number, newPad = new ActionTypeUDTemplate()) => {
			update((userData) => {
				userData.ChartList[chartIndex].PadSet.push(newPad);
				return userData;
			});
		},
		removePad: (chartIndex: number, padIndex: number) => {
			update((userData) => {
				if (userData.ChartList[chartIndex].PadSet[padIndex]) {
					userData.ChartList[chartIndex].PadSet.splice(padIndex, 1);
				}
				return userData;
			});
		},

		addCombo: (chartIndex: number, newCombo = new ComboUDTemplate()) => {
			update((userData) => {
				userData.ChartList[chartIndex].ComboSet.push(newCombo);
				return userData;
			});
		},
		removeCombo: (chartIndex: number, comboIndex: number) => {
			update((userData) => {
				if (userData.ChartList[chartIndex].ComboSet[comboIndex]) {
					userData.ChartList[chartIndex].ComboSet.splice(comboIndex, 1);
				}
				return userData;
			});
		}
	};
}

function HydrateScaleForUD() {
	const passedScale: ScaleUDTemplate = new ScaleUDTemplate();
	let { NoteClassSet } = passedScale;
	const { NoteSet, ScaleType, OctaveDivisions, TuningHz, ReferenceNote } = passedScale;
	const numNotes = (OctaveDivisions / 12) * 128;
	const standardMIDINoteNames = [
		['C', 'B♯'],
		['C♯', 'D♭'],
		['D'],
		['D♯', 'E♭'],
		['E', 'F♭'],
		['F', 'E♯'],
		['F♯', 'G♭'],
		['G'],
		['G♯', 'A♭'],
		['A'],
		['A♯', 'B♭'],
		['B', 'C♭']
	];

	if (ScaleType === 'Equal Temperament' && OctaveDivisions === 12 && TuningHz === 440) {
		passedScale.Description = 'MIDI';
		NoteClassSet = standardMIDINoteNames;
		let octave = -2; // MIDI note 0 corresponds to C-2.
		for (let note = 0; note < 127; note++) {
			NoteSet.push(new NoteUDTemplate());
		}
		for (let note = 0; note < NoteSet.length; note++) {
			NoteSet[note].NoteID = note;
			NoteSet[note].PitchHz = MIDILUT[note];

			for (let noteClass = 0; noteClass < NoteClassSet[note % 12].length; noteClass++) {
				switch (standardMIDINoteNames[note % 12][noteClass]) {
					case 'B♯':
						NoteSet[note].Name = [
							...NoteSet[note].Name,
							standardMIDINoteNames[note % 12][noteClass] + [octave - 1]
						];
						continue;
					case 'C':
					case 'C♯':
					case 'D♭':
					case 'D':
					case 'D♯':
					case 'E♭':
					case 'E':
					case 'E♯':
					case 'F♭':
					case 'F':
					case 'F♯':
					case 'G♭':
					case 'G':
					case 'G♯':
					case 'A♭':
					case 'A':
					case 'A♯':
					case 'B♭':
					case 'B':
						NoteSet[note].Name = [
							...NoteSet[note].Name,
							standardMIDINoteNames[note % 12][noteClass] + [octave]
						];
						continue;
					case 'C♭':
						NoteSet[note].Name = [
							...NoteSet[note].Name,
							standardMIDINoteNames[note % 12][noteClass] + [octave + 1]
						];
						octave++;
				}
			}
		}
	} else {
		switch (ScaleType) {
			case 'Equal Temperament':
				for (let note = 0; note < numNotes; note++) {
					NoteSet.push(new NoteUDTemplate());
				}
				for (let note = 0; note < NoteSet.length; note++) {
					NoteSet[note].NoteID = note;
					NoteSet[note].PitchHz = TuningHz * Math.pow(2, (note - ReferenceNote) / OctaveDivisions);
				}
				break;
		}
	}

	return passedScale;
}

export const QOPUserData = CreateQOPUserData();

import { writable } from 'svelte/store';
import {
	QOPUserDataTemplate,
	ScaleUDTemplate,
	NoteUDTemplate,
	GutUDTemplate,
	FretUDTemplate,
	ValveUDTemplate,
	ChartUDTemplate,
	PadUDTemplate,
	ComboUDTemplate,
	DeltaUDTemplate,
	type QOPValidEventCodesString
} from './initQOPUD';

export const QOPUserData = CreateQOPUserData();

function CreateQOPUserData() {
	const { subscribe, set, update } = writable<QOPUserDataTemplate>(new QOPUserDataTemplate());

	return {
		subscribe,
		reset: () => set(new QOPUserDataTemplate()),

		addScale: (newScale = new ScaleUDTemplate()) => {
			update((userData) => {
				userData.ScaleList = [...userData.ScaleList, newScale];
				for (let scaleIndex = 0; scaleIndex < userData.ScaleList.length; scaleIndex++) {
					userData.ScaleList[scaleIndex].ScaleID = scaleIndex;
					for (
						let noteIndex = 0;
						noteIndex < userData.ScaleList[scaleIndex].NoteSet.length;
						noteIndex++
					) {
						userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
						userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
					}
				}

				for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
					userData.GutList[gutIndex].OpenGutNoteID.push(69);
					userData.GutList[gutIndex].OscWaveType.push('sine');
					userData.GutList[gutIndex].OscGain.push(0.25);
				}
				return userData;
			});
		},
		removeScale: (scaleIndex: number) => {
			update((userData) => {
				if (userData.ScaleList.length - 1 !== 0) {
					userData.ScaleList = userData.ScaleList.filter((_, index) => index !== scaleIndex);
					for (let scaleIndex = 0; scaleIndex < userData.ScaleList.length; scaleIndex++) {
						userData.ScaleList[scaleIndex].ScaleID = scaleIndex;
						for (
							let noteIndex = 0;
							noteIndex < userData.ScaleList[scaleIndex].NoteSet.length;
							noteIndex++
						) {
							userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
							userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
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

		addNoteClass: (scaleIndex: number) => {
			update((userData) => {
				userData.ScaleList[scaleIndex].NoteClassSet = [
					...userData.ScaleList[scaleIndex].NoteClassSet,
					''
				];
				return userData;
			});
		},
		removeNoteClass: (scaleIndex: number, noteClassIndex: number) => {
			update((userData) => {
				userData.ScaleList[scaleIndex].NoteClassSet.splice(noteClassIndex, 1);
				return userData;
			});
		},

		addNote: (scaleIndex: number, newNote = new NoteUDTemplate()) => {
			update((userData) => {
				userData.ScaleList[scaleIndex].NoteSet = [
					...userData.ScaleList[scaleIndex].NoteSet,
					newNote
				];
				for (
					let noteIndex = 0;
					noteIndex < userData.ScaleList[scaleIndex].NoteSet.length;
					noteIndex++
				) {
					userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
					userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
				}
				return userData;
			});
		},
		removeNote: (scaleIndex: number, noteIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex].NoteSet.length - 1 !== 0) {
					userData.ScaleList[scaleIndex].NoteSet.splice(noteIndex, 1);
					for (
						let noteIndex = 0;
						noteIndex < userData.ScaleList[scaleIndex].NoteSet.length;
						noteIndex++
					) {
						userData.ScaleList[scaleIndex].NoteSet[noteIndex].ScaleID = scaleIndex;
						userData.ScaleList[scaleIndex].NoteSet[noteIndex].NoteID = noteIndex;
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
						userData.GutList[gutIndex].OscWaveType.push('sine');
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

					for (
						let fretIndex = 0;
						fretIndex < userData.GutList[gutIndex].FretSet.length;
						fretIndex++
					) {
						userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
						userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
					}
				}

				for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
					userData.ValveList[valveIndex].DeltaSet.push(newDelta);
				}

				for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.push(newDelta);
					}
				}
				return userData;
			});
		},
		removeGut: (gutIndex: number) => {
			update((userData) => {
				if (userData.GutList.length - 1 !== 0) {
					userData.GutList = userData.GutList.filter((_, index) => index !== gutIndex);

					for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
						userData.GutList[gutIndex].GutID = gutIndex;
						for (
							let fretIndex = 0;
							fretIndex < userData.GutList[gutIndex].FretSet.length;
							fretIndex++
						) {
							userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
							userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
						}
					}

					for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
						userData.ValveList[valveIndex].DeltaSet.splice(gutIndex, 1);
					}

					for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
						for (
							let comboIndex = 0;
							comboIndex < userData.ChartList[chartIndex].ComboSet.length;
							comboIndex++
						) {
							userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.splice(gutIndex, 1);
						}
					}
				}
				return userData;
			});
		},

		addFret: (gutIndex: number, newFret = new FretUDTemplate()) => {
			update((userData) => {
				userData.GutList[gutIndex].FretSet = [...userData.GutList[gutIndex].FretSet, newFret];
				for (
					let fretIndex = 0;
					fretIndex < userData.GutList[gutIndex].FretSet.length;
					fretIndex++
				) {
					userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
					userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
				}
				return userData;
			});
		},
		removeFret: (gutIndex: number, fretIndex: number) => {
			update((userData) => {
				if (userData.GutList[gutIndex].FretSet.length - 1 !== 0) {
					userData.GutList[gutIndex].FretSet.splice(fretIndex, 1);
					for (
						let fretIndex = 0;
						fretIndex < userData.GutList[gutIndex].FretSet.length;
						fretIndex++
					) {
						userData.GutList[gutIndex].FretSet[fretIndex].GutID = gutIndex;
						userData.GutList[gutIndex].FretSet[fretIndex].FretID = fretIndex;
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
		removeValve: (valveIndex: number) => {
			update((userData) => {
				if (userData.ValveList.length - 1 !== 0) {
					userData.ValveList.splice(valveIndex, 1);
					for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
						userData.ValveList[valveIndex].ValveID = valveIndex;
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
					for (
						let padIndex = 0;
						padIndex < userData.ChartList[chartIndex].PadSet.length;
						padIndex++
					) {
						userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
						userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
					}
					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
						userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
					}
				}
				return userData;
			});
		},
		removeChart: (chartIndex: number) => {
			update((userData) => {
				if (userData.ChartList.length - 1 !== 0) {
					userData.ChartList = userData.ChartList.splice(chartIndex, 1);
					for (let chartIndex = 0; chartIndex < userData.ChartList.length; chartIndex++) {
						userData.ChartList[chartIndex].ChartID = chartIndex;
						for (
							let padIndex = 0;
							padIndex < userData.ChartList[chartIndex].PadSet.length;
							padIndex++
						) {
							userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
							userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
						}
						for (
							let comboIndex = 0;
							comboIndex < userData.ChartList[chartIndex].ComboSet.length;
							comboIndex++
						) {
							userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
							userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
						}
					}
				}
				return userData;
			});
		},

		addPad: (chartIndex: number, newPad = new PadUDTemplate()) => {
			update((userData) => {
				userData.ChartList[chartIndex].PadSet = [...userData.ChartList[chartIndex].PadSet, newPad];
				for (
					let comboIndex = 0;
					comboIndex < userData.ChartList[chartIndex].ComboSet.length;
					comboIndex++
				) {
					userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.push(false);
				}

				for (
					let padIndex = 0;
					padIndex < userData.ChartList[chartIndex].PadSet.length;
					padIndex++
				) {
					userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
					userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
				}
				return userData;
			});
		},
		removePad: (chartIndex: number, padIndex: number) => {
			update((userData) => {
				if (userData.ChartList[chartIndex].PadSet.length - 1 !== 0) {
					userData.ChartList[chartIndex].PadSet.splice(padIndex, 1);
					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.splice(padIndex, 1);
					}

					for (
						let padIndex = 0;
						padIndex < userData.ChartList[chartIndex].PadSet.length;
						padIndex++
					) {
						userData.ChartList[chartIndex].PadSet[padIndex].ChartID = chartIndex;
						userData.ChartList[chartIndex].PadSet[padIndex].PadID = padIndex;
					}

					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						while (
							userData.ChartList[chartIndex].ComboSet.length >
							Math.pow(2, userData.ChartList[chartIndex].PadSet.length)
						) {
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

		addCombo: (
			chartIndex: number,
			newCombo = new ComboUDTemplate(),
			newDelta = new DeltaUDTemplate()
		) => {
			update((userData) => {
				if (
					userData.ChartList[chartIndex].ComboSet.length <
					Math.pow(2, userData.ChartList[chartIndex].PadSet.length)
				) {
					userData.ChartList[chartIndex].ComboSet = [
						...userData.ChartList[chartIndex].ComboSet,
						newCombo
					];
					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
						userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
						while (
							userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length <
							userData.GutList.length
						) {
							userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.push(newDelta);
						}
						while (
							userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length >
							userData.GutList.length
						) {
							userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.splice(
								userData.ChartList[chartIndex].ComboSet[comboIndex].DeltaSet.length - 1,
								1
							);
						}

						while (
							userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.length <
							userData.ChartList[chartIndex].PadSet.length
						) {
							userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.push(false);
						}
						while (
							userData.ChartList[chartIndex].ComboSet[comboIndex].Combo.length >
							userData.ChartList[chartIndex].PadSet.length
						) {
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
		removeCombo: (chartIndex: number, comboIndex: number) => {
			update((userData) => {
				if (userData.ChartList[chartIndex].ComboSet.length - 1 !== 0) {
					userData.ChartList[chartIndex].ComboSet.splice(comboIndex, 1);
					for (
						let comboIndex = 0;
						comboIndex < userData.ChartList[chartIndex].ComboSet.length;
						comboIndex++
					) {
						userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
						userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
					}
				}
				return userData;
			});
		},

		addActionCode: (
			eventCode: QOPValidEventCodesString,
			propString:
				| 'ButtonEventCodes'
				| 'SustainEventCodes'
				| 'AntiSustainEventCodes'
				| 'SostenutoEventCodes'
				| 'AntiSostenutoEventCodes',
			listString: 'GutList' | 'ValveList' | 'ChartList',
			listIndex: number,
			setString: 'FretSet' | 'PadSet' | null = null,
			setIndex: number | null = null
		) => {
			update((userData) => {
				if (setString === null && listString !== 'ChartList') {
					userData[listString][listIndex][propString][eventCode] = [1, 1];
				} else if (listString === 'GutList' && setString === 'FretSet' && setIndex !== null) {
					userData[listString][listIndex][setString][setIndex][propString][eventCode] = [1, 1];
				} else if (listString === 'ChartList' && setString === 'PadSet' && setIndex !== null) {
					userData[listString][listIndex][setString][setIndex][propString][eventCode] = [1, 1];
				}
				return userData;
			});
		},
		removeActionCode: (
			eventCode: QOPValidEventCodesString,
			propString:
				| 'ButtonEventCodes'
				| 'SustainEventCodes'
				| 'AntiSustainEventCodes'
				| 'SostenutoEventCodes'
				| 'AntiSostenutoEventCodes',
			listString: 'GutList' | 'ValveList' | 'ChartList',
			listIndex: number,
			setString: 'FretSet' | 'PadSet' | null = null,
			setIndex: number | null = null
		) => {
			update((userData) => {
				if (setString === null && listString !== 'ChartList') {
					delete userData[listString][listIndex][propString][eventCode];
				} else if (listString === 'GutList' && setString === 'FretSet' && setIndex !== null) {
					delete userData[listString][listIndex][setString][setIndex][propString][eventCode];
				} else if (listString === 'ChartList' && setString === 'PadSet' && setIndex !== null) {
					delete userData[listString][listIndex][setString][setIndex][propString][eventCode];
				}

				return userData;
			});
		},

		//addTranspositionCode: () => {},
		//removeTranspositionCode: () => {}
	};
}

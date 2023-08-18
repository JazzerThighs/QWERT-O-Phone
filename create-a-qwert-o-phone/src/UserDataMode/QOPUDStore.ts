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
	DeltaUDTemplate
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
					userData.ScaleList[scaleIndex].NoteSet = userData.ScaleList[scaleIndex].NoteSet.splice(
						noteIndex,
						1
					);
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
				}
				return userData;
			});
		},

		addGut: (newGut = new GutUDTemplate(), newDelta = new DeltaUDTemplate()) => {
			update((userData) => {
				userData.GutList = [...userData.GutList, newGut];

				for (let gutIndex = 0; gutIndex < userData.GutList.length; gutIndex++) {
					userData.GutList[gutIndex].GutID = gutIndex;
					if (userData.GutList[gutIndex].OpenGutNoteID.length < userData.ScaleList.length) {
						userData.GutList[gutIndex].OpenGutNoteID.push(69);
					} else if (userData.GutList[gutIndex].OpenGutNoteID.length > userData.ScaleList.length) {
						userData.GutList[gutIndex].OpenGutNoteID.splice(
							userData.GutList[gutIndex].OpenGutNoteID.length - 1,
							1
						);
					}
					if (userData.GutList[gutIndex].OscWaveType.length < userData.ScaleList.length) {
						userData.GutList[gutIndex].OscWaveType.push('sine');
					} else if (userData.GutList[gutIndex].OscWaveType.length > userData.ScaleList.length) {
						userData.GutList[gutIndex].OscWaveType.splice(
							userData.GutList[gutIndex].OscWaveType.length - 1,
							1
						);
					}
					if (userData.GutList[gutIndex].OscGain.length < userData.ScaleList.length) {
						userData.GutList[gutIndex].OscGain.push(0.25);
					} else if (userData.GutList[gutIndex].OscGain.length > userData.ScaleList.length) {
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

				userData.ValveList = userData.ValveList.map((valve) => ({
					...valve,
					DeltaSet: [...valve.DeltaSet, newDelta]
				}));

				userData.ChartList = userData.ChartList.map((chart) => ({
					...chart,
					ComboSet: chart.ComboSet.map((combo) => ({
						...combo,
						DeltaSet: [...combo.DeltaSet, newDelta]
					}))
				}));

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
				userData.GutList[gutIndex].FretSet.splice(fretIndex, 1);
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

		addValve: (newValve = new ValveUDTemplate()) => {
			update((userData) => {
				userData.ValveList = [...userData.ValveList, newValve];
				for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
					userData.ValveList[valveIndex].ValveID = valveIndex;
				}
				return userData;
			});
		},
		removeValve: (valveIndex: number) => {
			update((userData) => {
				userData.ValveList.splice(valveIndex, 1);
				for (let valveIndex = 0; valveIndex < userData.ValveList.length; valveIndex++) {
					userData.ValveList[valveIndex].ValveID = valveIndex;
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
				}
				return userData;
			});
		},
		removeChart: (chartIndex: number) => {
			update((userData) => {
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
				}
				return userData;
			});
		},

		addPad: (chartIndex: number, newPad = new PadUDTemplate()) => {
			update((userData) => {
				userData.ChartList[chartIndex].PadSet = [...userData.ChartList[chartIndex].PadSet, newPad];
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
				userData.ChartList[chartIndex].PadSet.splice(padIndex, 1);
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
		
		addCombo: (chartIndex: number, newCombo = new ComboUDTemplate()) => {
			update((userData) => {
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
				}
				return userData;
			});
		},
		removeCombo: (chartIndex: number, comboIndex: number) => {
			update((userData) => {
				userData.ChartList[chartIndex].ComboSet.splice(comboIndex, 1);
				for (
					let comboIndex = 0;
					comboIndex < userData.ChartList[chartIndex].ComboSet.length;
					comboIndex++
				) {
					userData.ChartList[chartIndex].ComboSet[comboIndex].ChartID = chartIndex;
					userData.ChartList[chartIndex].ComboSet[comboIndex].ComboID = comboIndex;
				}
				return userData;
			});
		}
	};
}

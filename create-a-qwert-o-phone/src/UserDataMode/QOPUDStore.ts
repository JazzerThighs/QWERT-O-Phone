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
				userData.ScaleList = [...userData.ScaleList, newScale];
				return userData;
			});
		},
		removeScale: (scaleIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex]) {
					userData.ScaleList = userData.ScaleList.filter((_, index) => index !== scaleIndex);
				}
				return userData;
			});
		},

		addGut: (newGut = new GutUDTemplate(), newDelta = new DeltaUDTemplate()) => {
			update((userData) => {
				userData.GutList = [...userData.GutList, newGut];

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
				if (userData.GutList[gutIndex]) {
					userData.GutList = userData.GutList.filter((_, index) => index !== gutIndex);

					userData.ValveList = userData.ValveList.map((valve) => ({
						...valve,
						DeltaSet: valve.DeltaSet.slice(0, -1)
					}));

					userData.ChartList = userData.ChartList.map((chart) => ({
						...chart,
						ComboSet: chart.ComboSet.map((combo) => ({
							...combo,
							DeltaSet: combo.DeltaSet.slice(0, -1)
						}))
					}));
				}

				return userData;
			});
		},

		addNote: (scaleIndex: number, newNote = new NoteUDTemplate()) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex]) {
					const updatedNoteSet = [...userData.ScaleList[scaleIndex].NoteSet, newNote];
					userData.ScaleList[scaleIndex] = {
						...userData.ScaleList[scaleIndex],
						NoteSet: updatedNoteSet
					};
				}
				return userData;
			});
		},
		removeNote: (scaleIndex: number, noteIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex] && userData.ScaleList[scaleIndex].NoteSet[noteIndex]) {
					userData.ScaleList[scaleIndex].NoteSet = userData.ScaleList[scaleIndex].NoteSet.filter(
						(_, index) => index !== noteIndex
					);
				}
				return userData;
			});
		},

		addFret: (gutIndex: number, newFret = new FretUDTemplate()) => {
			update((userData) => {
				if (userData.GutList[gutIndex]) {
					const updatedGut = {
						...userData.GutList[gutIndex],
						FretSet: [...userData.GutList[gutIndex].FretSet, newFret]
					};

					userData.GutList = [
						...userData.GutList.slice(0, gutIndex),
						updatedGut,
						...userData.GutList.slice(gutIndex + 1)
					];
				}

				return userData;
			});
		},
		removeFret: (gutIndex: number, fretIndex: number) => {
			update((userData) => {
				if (userData.GutList[gutIndex] && userData.GutList[gutIndex].FretSet[fretIndex]) {
					const updatedGut = {
						...userData.GutList[gutIndex],
						FretSet: userData.GutList[gutIndex].FretSet.filter((_, index) => index !== fretIndex)
					};

					userData.GutList = [
						...userData.GutList.slice(0, gutIndex),
						updatedGut,
						...userData.GutList.slice(gutIndex + 1)
					];
				}

				return userData;
			});
		},

		addValve: (newValve = new ValveUDTemplate()) => {
			update((userData) => {
				return {
					...userData,
					ValveList: [...userData.ValveList, newValve]
				};
			});
		},
		removeValve: (valveIndex: number) => {
			update((userData) => {
				return {
					...userData,
					ValveList: userData.ValveList.filter((_, index) => index !== valveIndex)
				};
			});
		},

		addChart: (newChart = new ChartUDTemplate()) => {
			update((userData) => {
				userData.ChartList = [...userData.ChartList, newChart];
				return userData;
			});
		},
		removeChart: (chartIndex: number) => {
			update((userData) => {
				userData.ChartList = userData.ChartList.filter((_, index) => index !== chartIndex);
				return userData;
			});
		},

		addPad: (chartIndex: number, newPad = new ActionTypeUDTemplate()) => {
			update((userData) => {
				const updatedChartList = [...userData.ChartList];

				if (updatedChartList[chartIndex]) {
					updatedChartList[chartIndex] = {
						...updatedChartList[chartIndex],
						PadSet: [...updatedChartList[chartIndex].PadSet, newPad]
					};
				}

				userData.ChartList = updatedChartList;
				return userData;
			});
		},
		removePad: (chartIndex: number, padIndex: number) => {
			update((userData) => {
				const updatedChartList = [...userData.ChartList];

				if (updatedChartList[chartIndex] && updatedChartList[chartIndex].PadSet[padIndex]) {
					updatedChartList[chartIndex] = {
						...updatedChartList[chartIndex],
						PadSet: updatedChartList[chartIndex].PadSet.filter((_, index) => index !== padIndex)
					};
				}

				userData.ChartList = updatedChartList;
				return userData;
			});
		},

		addCombo: (chartIndex: number, newCombo = new ComboUDTemplate()) => {
			update((userData) => {
				const targetChart = userData.ChartList[chartIndex];
				targetChart.ComboSet = [...targetChart.ComboSet, newCombo];
				userData.ChartList = [
					...userData.ChartList.slice(0, chartIndex),
					targetChart,
					...userData.ChartList.slice(chartIndex + 1)
				];

				return userData;
			});
		},
		removeCombo: (chartIndex: number, comboIndex: number) => {
			update((userData) => {
                const targetChart = userData.ChartList[chartIndex];
                targetChart.ComboSet = targetChart.ComboSet.filter((_, index) => index !== comboIndex);
                userData.ChartList = [
					...userData.ChartList.slice(0, chartIndex),
					targetChart,
					...userData.ChartList.slice(chartIndex + 1)
				];

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

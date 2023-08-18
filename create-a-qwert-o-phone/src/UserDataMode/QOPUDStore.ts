import { writable } from 'svelte/store';
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
				if (userData.ScaleList[scaleIndex]) {
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

		addNote: (scaleIndex: number, newNote = new NoteUDTemplate()) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex]) {
					const updatedNoteSet = [...userData.ScaleList[scaleIndex].NoteSet, newNote];
					userData.ScaleList[scaleIndex] = {
						...userData.ScaleList[scaleIndex],
						NoteSet: updatedNoteSet
					};
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
		removeNote: (scaleIndex: number, noteIndex: number) => {
			update((userData) => {
				if (userData.ScaleList[scaleIndex] && userData.ScaleList[scaleIndex].NoteSet[noteIndex]) {
					userData.ScaleList[scaleIndex].NoteSet = userData.ScaleList[scaleIndex].NoteSet.filter(
						(_, index) => index !== noteIndex
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

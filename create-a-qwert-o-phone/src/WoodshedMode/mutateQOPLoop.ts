import type { QOPValidEventCodesString } from '../UserDataMode/initQOPUD.js';
import type {
	QOPTemplate,
	ActionTypesString,
	ActionTypesTrackerString,
	ActionTypesStateString,
	ActionTypesTreeString
} from './initQOP.js';
import { ActionTypes, QOPActionTypeListsArray } from './initQOP.js';
//import { MIDIOutputPacket } from './woodshedMIDIOUT.js';
import { OscNodesUpdate } from './woodshedOscNodes.js';

type QOPTRListsString = ['GutList', 'FretSetList', 'ValveList', 'ChartList', 'ComboSetList'];
type QOPSingleObjString = 'GutList' | 'ValveList';
type QOPSetObjString = 'FretSetList' | 'PadSetList';

const QOPTRLists: QOPTRListsString = [
	'GutList',
	'FretSetList',
	'ValveList',
	'ChartList',
	'ComboSetList'
];
export function QOPMutator(event: KeyboardEvent, eNumber: 0 | 1, QOP: QOPTemplate, audioContext: AudioContext) {
	if (event.repeat || event.metaKey) {
		return;
	}

	const e = event.type as 'keydown' | 'keyup';
	const code = event.code as QOPValidEventCodesString;
	let { ChangedActionTypes, ChangedLists, ChangedTransposition } = QOP.StateMachine;
	const { DebounceTimer } = QOP.StateMachine;
	const { OscModeToggle } = QOP.Oscillators;
	const { MIDIOutputModeToggle } = QOP.MIDIOutput;

	ChangedActionTypes.length = 0;
	ChangedLists.length = 0;
	ChangedTransposition = false;

	// Update ActionType Trackers
	for (let propNum = 0; propNum < ActionTypes.length; propNum++) {
		const xActionType = ActionTypes[propNum] as ActionTypesString;
		const actionTree = (xActionType + 'Tree') as ActionTypesTreeString;
		const actionTracker = (xActionType + 'Tracker') as ActionTypesTrackerString;

		const actionTypeTree = QOP[actionTree];
		const actionTypeTree_Event = actionTypeTree[e];
		if (actionTypeTree_Event[code] !== undefined) {
			const actionTypeTree_Event_Code = actionTypeTree_Event[code];
			if (actionTypeTree_Event_Code !== undefined) {
				for (const list of QOPActionTypeListsArray) {
					if (actionTypeTree_Event_Code[list] !== undefined) {
						ChangedActionTypes = [...ChangedActionTypes, xActionType];
						ChangedLists = [...ChangedLists, list];
						if (list === 'GutList' || list === 'ValveList') {
							const actionTypeTree_Event_Code_List = actionTypeTree_Event_Code[list];
							for (const q of actionTypeTree_Event_Code_List) {
								QOP[list][actionTracker][q][code] = !QOP[list][actionTracker][q][code];
							}
						} else {
							const actionTypeTree_Event_Code_List = actionTypeTree_Event_Code[list];
							for (const member in actionTypeTree_Event_Code_List) {
								const actionTypeTree_Event_Code_List_Member =
									actionTypeTree_Event_Code_List[member];
								for (const q of actionTypeTree_Event_Code_List_Member) {
									QOP[list][member][actionTracker][q][code] =
										!QOP[list][member][actionTracker][q][code];
								}
							}
						}
					}
				}
			}
		}
	}

	// Update Transposition States
	for (const list of QOPTRLists) {
		const Q_TR_T_e_Code = QOP.TranspositionTree[e][code];
		if (Q_TR_T_e_Code !== undefined) {
			if (Q_TR_T_e_Code[list] !== undefined) {
				ChangedTransposition = true;
				if (list === 'GutList' || list === 'ValveList' || list === 'ChartList') {
					const actionTypeTree_Event_Code_List = Q_TR_T_e_Code[list];
					for (const q of actionTypeTree_Event_Code_List) {
						if (QOP[list]['TranspositionMap'][code][q] !== undefined) {
							QOP[list]['TranspositionState'][q][0] +=
								QOP[list]['TranspositionMap'][code][q][eNumber][0];
							QOP[list]['TranspositionState'][q][1] +=
								QOP[list]['TranspositionMap'][code][q][eNumber][1];
						}
					}
				} else {
					const actionTypeTree_Event_Code_List = Q_TR_T_e_Code[list];
					ChangedTransposition = true;
					for (const member in actionTypeTree_Event_Code_List) {
						const actionTypeTree_Event_Code_List_Set = actionTypeTree_Event_Code_List[member];
						for (let q = 0; q < actionTypeTree_Event_Code_List_Set.length; q++) {
							if (QOP[list][member]['TranspositionMap'][code][q] !== undefined) {
								QOP[list][member]['TranspositionState'][q][0] +=
									QOP[list][member]['TranspositionMap'][code][q][eNumber][0];
								QOP[list][member]['TranspositionState'][q][1] +=
									QOP[list][member]['TranspositionMap'][code][q][eNumber][1];
							}
						}
					}
				}
			}
		}
	}

	if (ChangedLists.length > 0) {
		ChangedLists.sort((a, b) => {
			return QOPActionTypeListsArray.indexOf(a) - QOPActionTypeListsArray.indexOf(b);
		});
		ChangedActionTypes.sort((a, b) => {
			return ActionTypes.indexOf(a) - ActionTypes.indexOf(b);
		});
		const lastChangedActionTypesIndex = ChangedActionTypes[ChangedActionTypes.length - 1];
		if (lastChangedActionTypesIndex !== 'Button') {
			ChangedActionTypes.push('Button');
		}

		// ActionType State Update
		for (const xList of ChangedLists) {
			if (xList === 'GutList' || xList === 'ValveList') {
				const listString = xList as QOPSingleObjString;
				for (const xActionType of ChangedActionTypes) {
					const actionTracker = (xActionType + 'Tracker') as ActionTypesTrackerString;
					if (actionTracker !== undefined) {
						const actionState = (xActionType + 'State') as ActionTypesStateString;
						for (let q = 0; q < actionTracker.length; q++) {
							switch (xActionType) {
								case 'Sostenuto':
									if (!QOP[listString][actionState][q]) {
										if (
											Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											) &&
											QOP[listString]['ButtonState'][q]
										) {
											QOP[listString][actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											)
										) {
											QOP[listString][actionState][q] = false;
										}
									}
									break;
								case 'AntiSostenuto':
									if (!QOP[listString][actionState][q]) {
										if (
											Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											) &&
											!QOP[listString]['ButtonState'][q]
										) {
											QOP[listString][actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											)
										) {
											QOP[listString][actionState][q] = false;
										}
									}
									break;
								case 'Button':
									if (!actionState[q]) {
										if (
											Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											) &&
											!QOP[listString]['AntiSustainState'][q] &&
											!QOP[listString]['AntiSostenutoState'][q]
										) {
											QOP[listString][actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP[listString][actionTracker][q]).some(
												(b: boolean) => b === true
											) &&
											!QOP[listString]['SustainState'][q] &&
											!QOP[listString]['SostenutoState'][q]
										) {
											QOP[listString][actionState][q] = false;
										}
									}
									break;
								case 'Sustain':
								case 'AntiSustain':
									if (
										Object.values(QOP[listString][actionTracker][q]).some(
											(b: boolean) => b === true
										)
									) {
										QOP[listString][actionState][q] = true;
									} else {
										QOP[listString][actionState][q] = false;
									}
									break;
							}
						}
					}
				}
			} else {
				for (let member = 0; member < QOP[xList].length; member++) {
					const listString = xList as QOPSetObjString;
					for (const xActionType of ChangedActionTypes) {
						const actionTracker = (xActionType + 'Tracker') as ActionTypesTrackerString;
						if (actionTracker !== undefined) {
							const actionState = (xActionType + 'State') as ActionTypesStateString;
							for (let q = 0; q < actionTracker.length; q++) {
								switch (xActionType) {
									case 'Sostenuto':
										if (!QOP[listString][member][actionState][q]) {
											if (
												Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												QOP[listString][member]['ButtonState'][q]
											) {
												QOP[listString][member][actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												)
											) {
												QOP[listString][member][actionState][q] = false;
											}
										}
										break;
									case 'AntiSostenuto':
										if (!QOP[listString][member][actionState][q]) {
											if (
												Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP[listString][member]['ButtonState'][q]
											) {
												QOP[listString][member][actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												)
											) {
												QOP[listString][member][actionState][q] = false;
											}
										}
										break;
									case 'Button':
										if (!actionState[q]) {
											if (
												Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP[listString][member]['AntiSustainState'][q] &&
												!QOP[listString][member]['AntiSostenutoState'][q]
											) {
												QOP[listString][member][actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP[listString][member][actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP[listString][member]['SustainState'][q] &&
												!QOP[listString][member]['SostenutoState'][q]
											) {
												QOP[listString][member][actionState][q] = false;
											}
										}
										break;
									case 'Sustain':
									case 'AntiSustain':
										if (
											Object.values(QOP[listString][member][actionTracker][q]).some(
												(b: boolean) => b === true
											)
										) {
											QOP[listString][member][actionState][q] = true;
										} else {
											QOP[listString][member][actionState][q] = false;
										}
										break;
								}
							}
						}
					}
				}
			}
		}

		//Update QOP Calc*Delta Logic
		for (const xList of ChangedLists) {
			switch (xList) {
				case 'ValveList':
					CalculateValveListDeltaChord(QOP);
					break;
				case 'FretSetList':
					CalculateFretDelta(QOP);
					break;
				case 'PadSetList':
					CalculateComboSetListDeltaChord(QOP);
					break;
				case 'GutList':
					// nothing to change here for 'GutList'
					break;
			}
		}

		let debounceTimer = DebounceTimer;
		if (DebounceTimer !== null) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = window.setTimeout(() => {
			CalculateTotalFrequency(QOP);
			// if (MIDIOutputModeToggle) {
			// MIDIOutputPacket(QOP);
			// }
			if (OscModeToggle) {
				OscNodesUpdate(QOP, audioContext);
			}
		}, 10);
	} else {
		if (ChangedTransposition === true) {
			CalculateTotalFrequency(QOP);
			// if (MIDIOutputModeToggle) {
			// MIDIOutputPacket(QOP);
			// }
			if (OscModeToggle) {
				OscNodesUpdate(QOP, audioContext);
			}
		}
	}
}

function CalculateValveListDeltaChord(QOP: QOPTemplate) {
	const { GutList, ValveList } = QOP;
	let { ValveConfirm } = QOP.StateMachine;

	for (let deltaIndex = 0; deltaIndex < GutList.ButtonState.length; deltaIndex++) {
		ValveList.ResultantNoteIDDelta[deltaIndex] = 0;
		ValveList.ResultantCentsDelta[deltaIndex] = 0;
		for (let valve = 0; valve < ValveList.ButtonState.length; valve++) {
			if (ValveList.ButtonState[valve]) {
				ValveConfirm = true;
				if (
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'NoteID' ||
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'Both'
				) {
					ValveList.ResultantNoteIDDelta[deltaIndex] +=
						ValveList.NoteIDDeltaMap[valve][deltaIndex] + ValveList.TranspositionState[valve][0];
				}
				if (
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'Cents' ||
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'Both'
				) {
					ValveList.ResultantCentsDelta[deltaIndex] +=
						ValveList.CentsDeltaMap[valve][deltaIndex] + ValveList.TranspositionState[valve][1];
				}
			}
		}
		if (!ValveList.ButtonState.includes(true)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			ValveConfirm = false;
		}
	}
}
function CalculateFretDelta(QOP: QOPTemplate) {
	const { FretSetList } = QOP;

	for (let fs = 0; fs < FretSetList.length; fs++) {
		FretSetList[fs].ResultantNoteIDDelta = 0;
		FretSetList[fs].ResultantCentsDelta = 0;
		if (FretSetList[fs].ButtonState.includes(true)) {
			QOP.StateMachine.FretConfirm[fs] = true;
			FretSetList[fs].HighestFretPressed = FretSetList[fs].ButtonState.lastIndexOf(true);
			const highFret = FretSetList[fs].HighestFretPressed;
			if (
				FretSetList[fs].DeltaTypeMap[highFret] === 'NoteID' ||
				FretSetList[fs].DeltaTypeMap[highFret] === 'Both'
			) {
				FretSetList[fs].ResultantNoteIDDelta =
					FretSetList[fs].NoteIDDeltaMap[highFret] +
					FretSetList[fs].TranspositionState[highFret][0];
			}
			if (
				FretSetList[fs].DeltaTypeMap[highFret] === 'Cents' ||
				FretSetList[fs].DeltaTypeMap[highFret] === 'Both'
			) {
				FretSetList[fs].ResultantCentsDelta =
					FretSetList[fs].CentsDeltaMap[highFret] + FretSetList[fs].TranspositionState[highFret][1];
			}
		} else {
			QOP.StateMachine.FretConfirm[fs] = false;
			FretSetList[fs].HighestFretPressed = -1;
		}
	}
}
function CalculateComboSetListDeltaChord(QOP: QOPTemplate) {
	const { PadSetList, ComboSetList, GutList } = QOP;
	let { ComboConfirm } = QOP.StateMachine;

	ComboConfirm = false;
	for (let chartIndex = 0; chartIndex < PadSetList.length; chartIndex++) {
		//PressedPads Determination
		PadSetList[chartIndex].PressedPads = [];

		for (let pad = 0; pad < PadSetList[chartIndex].ButtonState.length; pad++) {
			if (PadSetList[chartIndex].ButtonState[pad]) {
				PadSetList[chartIndex].PressedPads.push(pad);
			}
		}

		//Combo Validation
		const searchArray =
			ComboSetList[chartIndex].ComboMap[PadSetList[chartIndex].PressedPads.length];
		let matchedCombo = -1;
		if (searchArray !== null) {
			for (let combo = 0; combo < searchArray.length; combo++) {
				const { TrueIndexes, ComboIndex } = searchArray[combo];
				if (
					PadSetList[chartIndex].PressedPads.every(
						(element, index) => element === TrueIndexes[index]
					)
				) {
					matchedCombo = ComboIndex;
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					ComboConfirm = true;
					break;
				}
			}
		}
		for (let deltaIndex = 0; deltaIndex < GutList.ButtonState.length; deltaIndex++) {
			if (matchedCombo > -1) {
				if (
					ComboSetList[chartIndex].DeltaTypeMap[deltaIndex][matchedCombo] === 'NoteID' ||
					ComboSetList[chartIndex].DeltaTypeMap[deltaIndex][matchedCombo] === 'Both'
				) {
					ComboSetList[chartIndex].ResultantNoteIDDelta[deltaIndex] =
						ComboSetList[chartIndex].NoteIDDeltaMap[deltaIndex][matchedCombo] +
						ComboSetList[chartIndex].TranspositionState[matchedCombo][0];
				} else {
					ComboSetList[chartIndex].ResultantNoteIDDelta[deltaIndex] = 0;
				}
				if (
					ComboSetList[chartIndex].DeltaTypeMap[deltaIndex][matchedCombo] === 'Cents' ||
					ComboSetList[chartIndex].DeltaTypeMap[deltaIndex][matchedCombo] === 'Both'
				) {
					ComboSetList[chartIndex].ResultantCentsDelta[deltaIndex] =
						ComboSetList[chartIndex].CentsDeltaMap[deltaIndex][matchedCombo] +
						ComboSetList[chartIndex].TranspositionState[matchedCombo][1];
				} else {
					ComboSetList[chartIndex].ResultantCentsDelta[deltaIndex] = 0;
				}
			} else {
				ComboSetList[chartIndex].ResultantNoteIDDelta[deltaIndex] = 0;
				ComboSetList[chartIndex].ResultantCentsDelta[deltaIndex] = 0;
			}
		}
	}
}

function CalculateTotalFrequency(QOP: QOPTemplate) {
	const { ScaleList, GutList, FretSetList, ValveList, ChartList, PadSetList, ComboSetList } = QOP;
	const { NoteIDAccumulator, CentsAccumulator, TotalFrequency } = QOP.StateMachine;
	let { PrevTotalFrequency } = QOP.StateMachine;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	PrevTotalFrequency = TotalFrequency.map((innerArray) => [...innerArray]);

	const ComboNoteIDAccumulator: number[] = Array(PadSetList.length).fill(0);
	const ComboCentsAccumulator: number[] = Array(PadSetList.length).fill(0);

	for (let gut = 0; gut < GutList.ButtonState.length; gut++) {
		for (let chart = 0; chart < PadSetList.length; chart++) {
			ComboNoteIDAccumulator[gut] += ComboSetList[chart].ResultantNoteIDDelta[gut];
			ComboCentsAccumulator[gut] += ComboSetList[chart].ResultantCentsDelta[gut];
		}

		CentsAccumulator[gut] =
			GutList.TranspositionState[gut][0] +
			FretSetList[gut].ResultantCentsDelta +
			ValveList.ResultantCentsDelta[gut] +
			ChartList.TranspositionState[gut][0] +
			ComboCentsAccumulator[gut];

		const UnalteredScaleFrequency: number[] = Array(ScaleList.length).fill(0);
		for (let scale = 0; scale < ScaleList.length; scale++) {
			NoteIDAccumulator[gut][scale] =
				GutList.OpenGutNoteIDMap[gut][scale] +
				GutList.TranspositionState[gut][0] +
				FretSetList[gut].ResultantNoteIDDelta +
				ValveList.ResultantNoteIDDelta[gut] +
				ChartList.TranspositionState[gut][0] +
				ComboNoteIDAccumulator[gut];

			UnalteredScaleFrequency[scale] = ScaleList[scale][NoteIDAccumulator[gut][scale]].PitchHz;
			TotalFrequency[gut][scale] =
				UnalteredScaleFrequency[scale] * Math.pow(2, CentsAccumulator[gut] / 1200);
		}
	}
}

import type { QOPValidEventCodesString } from '../UserDataMode/initQOPUD.js';
import type { QOPTemplate, ActionTypesString } from './initQOP.js';
import { ActionTypes, QOPActionTypeListsArray } from './initQOP.js';
//import { MIDIOutputPacket } from './woodshedMIDIOUT.js';
import { OscNodesUpdate } from './woodshedOscNodes.js';

type ActionTypesTrackerString =
	| 'SustainTracker'
	| 'AntiSustainTracker'
	| 'ButtonTracker'
	| 'SostenutoTracker'
	| 'AntiSostenutoTracker';
type ActionTypesStateString =
	| 'SustainState'
	| 'AntiSustainState'
	| 'ButtonState'
	| 'SostenutoState'
	| 'AntiSostenutoState';
type ActionTypesTreeString =
	| 'SustainTree'
	| 'AntiSustainTree'
	| 'ButtonTree'
	| 'SostenutoTree'
	| 'AntiSostenutoTree';
type QOPTRListsString = ['GutList', 'FretSetList', 'ValveList', 'ChartList', 'ComboSetList'];
const QOPTRLists: QOPTRListsString = [
	'GutList',
	'FretSetList',
	'ValveList',
	'ChartList',
	'ComboSetList'
];
type QOPSingleObjString = 'GutList' | 'ValveList';
type QOPSetObjString = 'FretSetList' | 'PadSetList';

export function QOPMutator(event: KeyboardEvent, eNumber: 0 | 1, QOP: QOPTemplate) {
	if (event.repeat || event.metaKey) {
		return;
	}

	const e = event.type as 'keydown' | 'keyup';
	const code = event.code as QOPValidEventCodesString;
	let { ChangedActionTypes, ChangedLists, ChangedTransposition } = QOP.StateMachine;

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
								const bool = QOP[list][actionTracker][q];
								bool[code] = !bool[code];
							}
						} else {
							const actionTypeTree_Event_Code_List = actionTypeTree_Event_Code[list];
							for (const member in actionTypeTree_Event_Code_List) {
								const actionTypeTree_Event_Code_List_Member =
									actionTypeTree_Event_Code_List[member];
								for (const q of actionTypeTree_Event_Code_List_Member) {
									const bool = QOP[list][member][actionTracker][q];
									bool[code] = !bool[code];
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
							const state = QOP[list]['TranspositionState'][q];
							const delta = QOP[list]['TranspositionMap'][code][q][eNumber];
							state[0] += delta[0];
							state[1] += delta[1];
							//state = state.map((value, index) => value + delta[index]);
						}
					}
				} else {
					const actionTypeTree_Event_Code_List = Q_TR_T_e_Code[list];
					ChangedTransposition = true;
					for (const member in actionTypeTree_Event_Code_List) {
						const actionTypeTree_Event_Code_List_Set = actionTypeTree_Event_Code_List[member];
						for (let q = 0; q < actionTypeTree_Event_Code_List_Set.length; q++) {
							if (QOP[list][member]['TranspositionMap'][code][q] !== undefined) {
								const state = QOP[list][member]['TranspositionState'][q];
								const delta = QOP[list][member]['TranspositionMap'][code][q][eNumber];
								state[0] += delta[0];
								state[1] += delta[1];
								// state = state.map((value, index) => value + delta[index]);
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
				const QOP_xObj = QOP[listString];
				for (const xActionType of ChangedActionTypes) {
					const actionTracker = (xActionType + 'Tracker') as ActionTypesTrackerString;
					if (actionTracker !== undefined) {
						const actionState = (xActionType + 'State') as ActionTypesStateString;
						for (let q = 0; q < actionTracker.length; q++) {
							switch (xActionType) {
								case 'Sostenuto':
									if (!QOP_xObj[actionState][q]) {
										if (
											Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true) &&
											QOP_xObj['ButtonState'][q]
										) {
											QOP_xObj[actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)
										) {
											QOP_xObj[actionState][q] = false;
										}
									}
									break;
								case 'AntiSostenuto':
									if (!QOP_xObj[actionState][q]) {
										if (
											Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true) &&
											!QOP_xObj['ButtonState'][q]
										) {
											QOP_xObj[actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)
										) {
											QOP_xObj[actionState][q] = false;
										}
									}
									break;
								case 'Button':
									if (!actionState[q]) {
										if (
											Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true) &&
											!QOP_xObj['AntiSustainState'][q] &&
											!QOP_xObj['AntiSostenutoState'][q]
										) {
											QOP_xObj[actionState][q] = true;
										}
									} else {
										if (
											!Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true) &&
											!QOP_xObj['SustainState'][q] &&
											!QOP_xObj['SostenutoState'][q]
										) {
											QOP_xObj[actionState][q] = false;
										}
									}
									break;
								case 'Sustain':
								case 'AntiSustain':
									if (Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)) {
										QOP_xObj[actionState][q] = true;
									} else {
										QOP_xObj[actionState][q] = false;
									}
									break;
							}
						}
					}
				}
			} else {
				for (let member = 0; member < QOP[xList].length; member++) {
					const listString = xList as QOPSetObjString;
					const QOP_xList = QOP[listString];
					const QOP_xObj = QOP_xList[member];
					for (const xActionType of ChangedActionTypes) {
						const actionTracker = (xActionType + 'Tracker') as ActionTypesTrackerString;
						if (actionTracker !== undefined) {
							const actionState = (xActionType + 'State') as ActionTypesStateString;
							for (let q = 0; q < actionTracker.length; q++) {
								switch (xActionType) {
									case 'Sostenuto':
										if (!QOP_xObj[actionState][q]) {
											if (
												Object.values(QOP_xObj[actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												QOP_xObj['ButtonState'][q]
											) {
												QOP_xObj[actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)
											) {
												QOP_xObj[actionState][q] = false;
											}
										}
										break;
									case 'AntiSostenuto':
										if (!QOP_xObj[actionState][q]) {
											if (
												Object.values(QOP_xObj[actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP_xObj['ButtonState'][q]
											) {
												QOP_xObj[actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)
											) {
												QOP_xObj[actionState][q] = false;
											}
										}
										break;
									case 'Button':
										if (!actionState[q]) {
											if (
												Object.values(QOP_xObj[actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP_xObj['AntiSustainState'][q] &&
												!QOP_xObj['AntiSostenutoState'][q]
											) {
												QOP_xObj[actionState][q] = true;
											}
										} else {
											if (
												!Object.values(QOP_xObj[actionTracker][q]).some(
													(b: boolean) => b === true
												) &&
												!QOP_xObj['SustainState'][q] &&
												!QOP_xObj['SostenutoState'][q]
											) {
												QOP_xObj[actionState][q] = false;
											}
										}
										break;
									case 'Sustain':
									case 'AntiSustain':
										if (
											Object.values(QOP_xObj[actionTracker][q]).some((b: boolean) => b === true)
										) {
											QOP_xObj[actionState][q] = true;
										} else {
											QOP_xObj[actionState][q] = false;
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

		CalculateTotalFrequency(QOP);
		//MIDIOutputPacket(QOP);
		OscNodesUpdate(QOP);
	} else {
		if (ChangedTransposition === true) {
			CalculateTotalFrequency(QOP);
			//MIDIOutputPacket(QOP);
			OscNodesUpdate(QOP);
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
		const fretSet = FretSetList[fs];
		fretSet.ResultantNoteIDDelta = 0;
		fretSet.ResultantCentsDelta = 0;
		if (fretSet.ButtonState.includes(true)) {
			QOP.StateMachine.FretConfirm[fs] = true;
			fretSet.HighestFretPressed = fretSet.ButtonState.lastIndexOf(true);
			const highFret = fretSet.HighestFretPressed;
			if (
				fretSet.DeltaTypeMap[highFret] === 'NoteID' ||
				fretSet.DeltaTypeMap[highFret] === 'Both'
			) {
				fretSet.ResultantNoteIDDelta =
					fretSet.NoteIDDeltaMap[highFret] + fretSet.TranspositionState[highFret][0];
			}
			if (fretSet.DeltaTypeMap[highFret] === 'Cents' || fretSet.DeltaTypeMap[highFret] === 'Both') {
				fretSet.ResultantCentsDelta =
					fretSet.CentsDeltaMap[highFret] + fretSet.TranspositionState[highFret][1];
			}
		} else {
			QOP.StateMachine.FretConfirm[fs] = false;
			fretSet.HighestFretPressed = -1;
		}
	}
}
function CalculateComboSetListDeltaChord(QOP: QOPTemplate) {
	const { PadSetList, ComboSetList, GutList } = QOP;
	let { ComboConfirm } = QOP.StateMachine;

	ComboConfirm = false;
	for (let chartIndex = 0; chartIndex < PadSetList.length; chartIndex++) {
		//PressedPads Determination
		const padSet = PadSetList[chartIndex];
		const comboSet = ComboSetList[chartIndex];
		padSet.PressedPads = [];

		for (let pad = 0; pad < padSet.ButtonState.length; pad++) {
			if (padSet.ButtonState[pad]) {
				padSet.PressedPads.push(pad);
			}
		}
		//Combo Validation
		const searchArray = comboSet.ComboMap[padSet.PressedPads.length];
		let matchedCombo = -1;
		if (searchArray !== null) {
			for (let combo = 0; combo < searchArray.length; combo++) {
				const { TrueIndexes, ComboIndex } = searchArray[combo];
				if (padSet.PressedPads.every((element, index) => element === TrueIndexes[index])) {
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
					comboSet.DeltaTypeMap[deltaIndex][matchedCombo] === 'NoteID' ||
					comboSet.DeltaTypeMap[deltaIndex][matchedCombo] === 'Both'
				) {
					comboSet.ResultantNoteIDDelta[deltaIndex] =
						comboSet.NoteIDDeltaMap[deltaIndex][matchedCombo] +
						comboSet.TranspositionState[matchedCombo][0];
				} else {
					comboSet.ResultantNoteIDDelta[deltaIndex] = 0;
				}
				if (
					comboSet.DeltaTypeMap[deltaIndex][matchedCombo] === 'Cents' ||
					comboSet.DeltaTypeMap[deltaIndex][matchedCombo] === 'Both'
				) {
					comboSet.ResultantCentsDelta[deltaIndex] =
						comboSet.CentsDeltaMap[deltaIndex][matchedCombo] +
						comboSet.TranspositionState[matchedCombo][1];
				} else {
					comboSet.ResultantCentsDelta[deltaIndex] = 0;
				}
			} else {
				comboSet.ResultantNoteIDDelta[deltaIndex] = 0;
				comboSet.ResultantCentsDelta[deltaIndex] = 0;
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



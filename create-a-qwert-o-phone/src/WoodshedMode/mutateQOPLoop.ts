import { QOPTemplate, actionTypes, QOPLists } from './initQOP.js';
//import { MIDIOutputPacket } from './woodshedMIDIOUT.js';
import { OscNodesUpdate } from './woodshedOscNodes.js';
	
function ActionStateFlipper(QOP_xList: object, ChangedActionTypes: string[]) {
	for (const xActionType of ChangedActionTypes) {
		let actionTracker = QOP_xList[xActionType + 'Tracker'];
		if (actionTracker !== undefined) {
			let actionState = QOP_xList[xActionType + 'State'];
			for (let q = 0; q < actionTracker.length; q++) {
				switch (xActionType) {
					case 'Sostenuto':
						if (!actionState[q]) {
							if (
								Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								) &&
								QOP_xList['ButtonState'][q]
							) {
								actionState[q] = true;
							}
						} else {
							if (
								!Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								)
							) {
								actionState[q] = false;
							}
						}
						break;
					case 'AntiSostenuto':
						if (!actionState[q]) {
							if (
								Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								) &&
								!QOP_xList['ButtonState'][q]
							) {
								actionState[q] = true;
							}
						} else {
							if (
								!Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								)
							) {
								actionState[q] = false;
							}
						}
						break;
					case 'Button':
						if (!actionState[q]) {
							if (
								Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								) &&
								!QOP_xList['AntiSustainState'][q] &&
								!QOP_xList['AntiSostenutoState'][q]
							) {
								actionState[q] = true;
							}
						} else {
							if (
								!Object.values(actionTracker[q]).some(
									(b: boolean) => b === true
								) &&
								!QOP_xList['SustainState'][q] &&
								!QOP_xList['SostenutoState'][q]
							) {
								actionState[q] = false;
							}
						}
						break;
					case 'Sustain':
					case 'AntiSustain':
						if (
							Object.values(actionTracker[q]).some((b: boolean) => b === true)
						) {
							actionState[q] = true;
						} else {
							actionState[q] = false;
						}
						break;
				}
			}
		}
	}
}

function CalculateValveListDeltaChord(QOP: QOPTemplate) {
	const { GutList, ValveList } = QOP;
	let { ValveConfirm } = QOP.StateMachine;

	for (
		let deltaIndex = 0;
		deltaIndex < GutList.ButtonState.length;
		deltaIndex++
	) {
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
						ValveList.NoteIDDeltaMap[valve][deltaIndex] +
						ValveList.TranspositionState[valve][0];
				}
				if (
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'Cents' ||
					ValveList.DeltaTypeMap[valve][deltaIndex] === 'Both'
				) {
					ValveList.ResultantCentsDelta[deltaIndex] +=
						ValveList.CentsDeltaMap[valve][deltaIndex] +
						ValveList.TranspositionState[valve][1];
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
					fretSet.NoteIDDeltaMap[highFret] +
					fretSet.TranspositionState[highFret][0];
			}
			if (
				fretSet.DeltaTypeMap[highFret] === 'Cents' ||
				fretSet.DeltaTypeMap[highFret] === 'Both'
			) {
				fretSet.ResultantCentsDelta =
					fretSet.CentsDeltaMap[highFret] +
					fretSet.TranspositionState[highFret][1];
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
				if (
					padSet.PressedPads.every(
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
		for (
			let deltaIndex = 0;
			deltaIndex < GutList.ButtonState.length;
			deltaIndex++
		) {
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
	const {
		ScaleList,
		GutList,
		FretSetList,
		ValveList,
		ChartList,
		PadSetList,
		ComboSetList,
	} = QOP;
	const {
		NoteIDAccumulator,
		CentsAccumulator,
		TotalFrequency,
		
	} = QOP.StateMachine;
	let { PrevTotalFrequency } = QOP.StateMachine;

	PrevTotalFrequency = TotalFrequency.map((innerArray) => [...innerArray]);

	const ComboNoteIDAccumulator: number[] = Array(PadSetList.length).fill(0);
	const ComboCentsAccumulator: number[] = Array(PadSetList.length).fill(0);

	for (let gut = 0; gut < GutList.ButtonState.length; gut++) {
		for (let chart = 0; chart < PadSetList.length; chart++) {
			ComboNoteIDAccumulator[gut] +=
				ComboSetList[chart].ResultantNoteIDDelta[gut];
			ComboCentsAccumulator[gut] +=
				ComboSetList[chart].ResultantCentsDelta[gut];
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
			
			UnalteredScaleFrequency[scale] =
				ScaleList[scale][NoteIDAccumulator[gut][scale]].PitchHz;
			TotalFrequency[gut][scale] =
				UnalteredScaleFrequency[scale] *
				Math.pow(2, CentsAccumulator[gut] / 1200);
		}
	}
}

export function QOPMutator(event: KeyboardEvent, eNumber: number, QOP: QOPTemplate) {
	if (event.repeat || event.metaKey) {
		return;
	}

	const e: string = event.type;
	const code: string = event.code;
	let { ChangedActionTypes, ChangedLists, ChangedTransposition } =
		QOP.StateMachine;

	ChangedActionTypes.length = 0;
	ChangedLists.length = 0;
	ChangedTransposition = false;

	for (const xActionType of actionTypes) {
		let actionTypeTree = QOP[xActionType + 'Tree'];
		const actionTypeTree_Event = actionTypeTree[e];
		if (actionTypeTree_Event[code] !== undefined) {
			const actionTypeTree_Event_Code = actionTypeTree_Event[code];
			for (const list of QOPLists) {
				if (actionTypeTree_Event_Code[list] !== undefined) {
					const actionTypeTree_Event_Code_List = actionTypeTree_Event_Code[list];
					if (xActionType !== 'Transposition') {
						ChangedActionTypes = [...ChangedActionTypes, xActionType];
						ChangedLists = [...ChangedLists, list];
						switch (list) {
							case 'GutList':
							case 'ValveList':
								for (const q of actionTypeTree_Event_Code_List) {
									let bool = QOP[list][xActionType + 'Tracker'][q];
									bool[code] = !bool[code];
								}
								break;
							case 'FretSetList':
							case 'PadSetList':
								for (const member in actionTypeTree_Event_Code_List) {
									const actionTypeTree_Event_Code_List_Member =
										actionTypeTree_Event_Code_List[member];
									for (const q of actionTypeTree_Event_Code_List_Member) {
										let bool = QOP[list][member][xActionType + 'Tracker'][q];
										bool[code] = !bool[code];
									}
								}
								break;
						}
					} else {
						ChangedTransposition = true;
						switch (list) {
							case 'GutList':
							case 'ValveList':
							case 'ChartList':
								for (const q of actionTypeTree_Event_Code_List) {
									if (QOP[list]['TranspositionMap'][code][q] !== undefined) {
										const state = QOP[list]['TranspositionState'][q];
										let delta = QOP[list]['TranspositionMap'][code][q][eNumber];
										state[0] += delta[0];
										state[1] += delta[1];
										//state = state.map((value, index) => value + delta[index]);
									}
								}
								break;
							case 'FretSetList':
							case 'ComboSetList':
								for (const member in actionTypeTree_Event_Code_List) {
									const actionTypeTree_Event_Code_List_Set = actionTypeTree_Event_Code_List[member];
									for (
										let q = 0;
										q < actionTypeTree_Event_Code_List_Set.length;
										q++
									) {
										if (
											QOP[list][member]['TranspositionMap'][code][q] !==
											undefined
										) {
											let state = QOP[list][member]['TranspositionState'][q];
											const delta = QOP[list][member]['TranspositionMap'][code][q];
											state[0] += delta[0];
											state[1] += delta[1];
											// state = state.map((value, index) => value + delta[index]);
										}
									}
								}
								break;
						}
					}
				}
			}
		}
	}

	if (ChangedLists.length > 0) {
		ChangedLists.sort((a, b) => {
			return QOPLists.indexOf(a) - QOPLists.indexOf(b);
		});
		ChangedActionTypes.sort((a, b) => {
			return actionTypes.indexOf(a) - actionTypes.indexOf(b);
		});
		const lastChangedActionTypesIndex = ChangedActionTypes[ChangedActionTypes.length - 1];
		if (lastChangedActionTypesIndex !== 'Button') {
			ChangedActionTypes.push('Button');
		}
		//Toggle State Booleans
		for (const xList of ChangedLists) {
			let QOP_xList = QOP[xList];

			switch (xList) {
				case 'GutList':
				case 'ValveList':
					ActionStateFlipper(QOP_xList, ChangedActionTypes);
					break;
				case 'FretSetList':
				case 'PadSetList':
				case 'ComboSetList':
					for (let member = 0; member < QOP[xList].length; member++) {
						const QOP_xList_Member = QOP_xList[member];
						ActionStateFlipper(QOP_xList_Member, ChangedActionTypes);
					}
					break;
				case 'ChartList':
					break;
			}
		}
		//Update QOP Calc*Delta Logic
		for (const xList of ChangedLists) {
			switch (xList) {
				case 'ValveList':
					CalculateValveListDeltaChord(QOP);
					break;
				case 'ChartList':
					// nothing to change here for 'ChartList'
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

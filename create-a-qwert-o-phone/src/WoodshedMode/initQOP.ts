import { DeltaSetValidator, OpenGutValidator } from '../UserDataMode/validateQOPUD.js';
import type { QOPUserDataTemplate, GutTemplate, SimpleWaveformTypeString } from '../UserDataMode/initQOPUD.js';
import { FindClosestMIDINote } from './woodshedMIDIOUT.js';
import { QOPMutator } from './mutateQOPLoop.js';

export function CreateWoodshedModeButton(QOPUserData: QOPUserDataTemplate) {
	const button = document.createElement('button');
	button.innerText = 'Activate Woodshed Mode';

	// Position the button (I'm placing it slightly below the previous two for clarity, you can adjust as needed)
	button.style.position = 'absolute';
	button.style.top = '80px';
	button.style.left = '0';
	button.style.zIndex = '1000'; // Ensure it's above most other elements

	// Bind the button to the WoodshedMode function
	button.addEventListener('click', () => WoodshedMode(QOPUserData));

	document.body.appendChild(button);
}

export function WoodshedMode(QOPUserData: QOPUserDataTemplate) {
	function WoodshedTriggerKeydown(event: KeyboardEvent) {
		QOPMutator(event, 0, QOP);
	}
	function WoodshedTriggerKeyup(event: KeyboardEvent) {
		QOPMutator(event, 1, QOP);
	}
	DeltaSetValidator(QOPUserData);
	OpenGutValidator(QOPUserData);
	const QOP = HydrateQOP(QOPUserData);
	window.addEventListener('keydown', WoodshedTriggerKeydown);
	window.addEventListener('keyup', WoodshedTriggerKeyup);
}

export const actionTypes = [
	'Sustain',
	'AntiSustain',
	'Button',
	'Sostenuto',
	'AntiSostenuto',
	'Transposition'
];
const deltaTypes = ['DeltaType', 'NoteIDDelta', 'CentsDelta'];
export const QOPLists = [
	'ValveList',
	'ChartList',
	'FretSetList',
	'PadSetList',
	'ComboSetList',
	'GutList'
];
export const audioContext = new (AudioContext || window.AudioContext)();
type QOPScaleObject = {
	PitchHz: number;
	ColorHex: string;
	ClosestMIDINote: number | undefined;
	PitchBendLSB: number;
	PitchBendMSB: number;
};
type QOPGutList = {
	// QOP.GutList
	RequireFretMap: boolean[];
	RequireValveMap: boolean[];
	RequireComboMap: boolean[];
	OpenGutNoteIDMap: number[][];
};
type QOPFretSetList = {
	// QOP.FretSetList[]
	HighestFretPressed: number;

	DeltaTypeMap: string;
	NoteIDDeltaMap: number;
	CentsDeltaMap: number;
	ResultantNoteIDDelta: number;
	ResultantCentsDelta: number;
	
	SustainState: boolean[];
	SustainTracker?: { [key: string]: boolean }[];
	SustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSustainState: boolean[];
	AntiSustainTracker?: { [key: string]: boolean }[];
	AntiSustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	ButtonState: boolean[];
	ButtonTracker?: { [key: string]: boolean }[];
	ButtonMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	SostenutoState: boolean[];
	SostenutoTracker?: { [key: string]: boolean }[];
	SostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker?: { [key: string]: boolean }[];
	AntiSostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	TranspositionState: [number, number][];
	TranspositionMap?: {
		[key: string]: {
			[key: string]: [[number, number], [number, number]];
		};
	};
};
type QOPValveList = {
	DeltaTypeMap: string[];
	NoteIDDeltaMap: number[];
	CentsDeltaMap: number[];
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
	
	SustainState: boolean[];
	SustainTracker?: { [key: string]: boolean }[];
	SustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSustainState: boolean[];
	AntiSustainTracker?: { [key: string]: boolean }[];
	AntiSustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	ButtonState: boolean[];
	ButtonTracker?: { [key: string]: boolean }[];
	ButtonMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	SostenutoState: boolean[];
	SostenutoTracker?: { [key: string]: boolean }[];
	SostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker?: { [key: string]: boolean }[];
	AntiSostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	TranspositionState: [number, number][];
	TranspositionMap?: {
		[key: string]: {
			[key: string]: [[number, number], [number, number]];
		};
	};
};
type QOPChartList = {
	TranspositionState: [number, number][];
	TranspositionMap?: {
		[key: string]: {
			[key: string]: [[number, number], [number, number]];
		};
	};
};
type QOPPadSetList = {
	// QOP.PadSetList[]
	PressedPads: number[];
	
	SustainState: boolean[];
	SustainTracker?: { [key: string]: boolean }[];
	SustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSustainState: boolean[];
	AntiSustainTracker?: { [key: string]: boolean }[];
	AntiSustainMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	ButtonState: boolean[];
	ButtonTracker?: { [key: string]: boolean }[];
	ButtonMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	SostenutoState: boolean[];
	SostenutoTracker?: { [key: string]: boolean }[];
	SostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker?: { [key: string]: boolean }[];
	AntiSostenutoMap?: {
		[key: string]: {
			[key: string]: [number, number];
		};
	};
};
type QOPComboSetList = {
	// QOP.ComboSetList[]
	ComboMap: { [key: string]: number | number[] }[][];
	DeltaTypeMap: { [key: number]: string };
	NoteIDDeltaMap: { [key: number]: number };
	CentsDeltaMap: { [key: number]: number };
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
};
type QOPTreeObject = {
	keydown: { [key: string]: object };
	keyup: { [key: string]: object };
};
type EventCodeKeys =
	| 'ButtonEventCodes'
	| 'SustainEventCodes'
	| 'AntiSustainEventCodes'
	| 'SostenutoEventCodes'
	| 'AntiSostenutoEventCodes'
	| 'TranspositionEventCodes';

export class QOPTemplate {
	public StateMachine: QOPStateMachine;
	public Oscillators: QOPOscillators;
	public MIDIOutput: QOPMIDIOutput;

	public ScaleList: QOPScaleObject[][];
	public GutList: QOPGutList;
	public FretSetList: QOPFretSetList[];
	public ValveList: QOPValveList;
	public ChartList: QOPChartList;
	public PadSetList: QOPPadSetList[];
	public ComboSetList: QOPComboSetList[];

	public ButtonTree: QOPTreeObject;
	public SustainTree: QOPTreeObject;
	public AntiSustainTree: QOPTreeObject;
	public SostenutoTree: QOPTreeObject;
	public AntiSostenutoTree: QOPTreeObject;
	public TranspositionTree: QOPTreeObject;

	constructor() {
		this.StateMachine = new QOPStateMachine();
		this.Oscillators = new QOPOscillators();
		this.MIDIOutput = new QOPMIDIOutput();

		this.ScaleList = [];
		this.GutList = {} as QOPGutList;
		this.FretSetList = [];
		this.ValveList = {} as QOPValveList;
		this.ChartList = {} as QOPChartList;
		this.PadSetList = [];
		this.ComboSetList = [];

		this.ButtonTree = { keydown: {}, keyup: {} };
		this.SustainTree = { keydown: {}, keyup: {} };
		this.AntiSustainTree = { keydown: {}, keyup: {} };
		this.SostenutoTree = { keydown: {}, keyup: {} };
		this.AntiSostenutoTree = { keydown: {}, keyup: {} };
		this.TranspositionTree = { keydown: {}, keyup: {} };
	}
}
class QOPStateMachine {
	public ChangedActionTypes: string[];
	public ChangedLists: string[];
	public ChangedTransposition: boolean;
	public FretConfirm: boolean[];
	public ValveConfirm: boolean;
	public ComboConfirm: boolean;
	public NoteIDAccumulator: number[][];
	public CentsAccumulator: number[];
	public TotalFrequency: number[][];
	public PrevTotalFrequency: number[][];
	public GutSoundState: boolean[];

	constructor() {
		this.ChangedActionTypes = [];
		this.ChangedLists = [];
		this.ChangedTransposition = false;
		this.FretConfirm = [];
		this.ValveConfirm = false;
		this.ComboConfirm = false;
		this.NoteIDAccumulator = [];
		this.CentsAccumulator = [];
		this.TotalFrequency = [];
		this.PrevTotalFrequency = [];
		this.GutSoundState = [];
	}
}
class QOPOscillators {
	public OscNodes: OscillatorNode[][];
	public OscGainNodes: GainNode[][];
	public OscWaveType: SimpleWaveformTypeString[][];
	public OscNodesMute: boolean[];

	constructor() {
		this.OscNodes = [];
		this.OscGainNodes = [];
		this.OscWaveType = [];
		this.OscNodesMute = [];
	}
}
class QOPMIDIOutput {
	public GutMIDIOUTDisabled: boolean[];

	constructor() {
		this.GutMIDIOUTDisabled = [];
	}
}

function HydrateScaleList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate) {
	QOP.ScaleList = QOPUserData.ScaleList.map(
		(
			scale
		): {
			PitchHz: number;
			ColorHex: string;
			ClosestMIDINote: number;
			PitchBendLSB: number;
			PitchBendMSB: number;
		}[] => {
			return scale.NoteSet.map((note) => {
				const { PitchHz, ColorHex } = note;
				const { ClosestMIDINote, closestFrequency } = FindClosestMIDINote(PitchHz);

				// Calculate the pitch bend
				const n = 12 * Math.log2(PitchHz / closestFrequency);
				const pitchBend = Math.round((n / 2) * 0x2000 + 0x2000);
				const PitchBendLSB = pitchBend & 0x7f;
				const PitchBendMSB = (pitchBend >> 7) & 0x7f;

				return { PitchHz, ColorHex, ClosestMIDINote, PitchBendLSB, PitchBendMSB };
			});
		}
	);
}

function HydrateStateTrackerMap(
	objToModify: QOPGutList | QOPFretSetList | QOPValveList | QOPChartList | QOPPadSetList | QOPComboSetList,
	objList: Array<object>,
	currentIndex: number,
	skipActionTypes: Array<string> | null,
	ignoreDummyToggleStates: boolean
) {
	actionTypes.forEach((actionType) => {
		// DummyToggleStates, actionState properties which are inititialized when there are no bindings; makes the logic later much cleaner.
		if (!ignoreDummyToggleStates) {
			objToModify['ButtonState'] = [];
			objToModify['SustainState'] = [];
			objToModify['AntiSustainState'] = [];
			objToModify['SostenutoState'] = [];
			objToModify['AntiSostenutoState'] = [];
			for (let obj = 0; obj < objList.length; obj++) {
				objToModify['ButtonState'].push(false);
				objToModify['SustainState'].push(false);
				objToModify['AntiSustainState'].push(false);
				objToModify['SostenutoState'].push(false);
				objToModify['AntiSostenutoState'].push(false);
			}
		}
		if (skipActionTypes) {
			if (!skipActionTypes.includes('Transposition')) {
				objToModify['TranspositionState'] = [];
				for (let obj = 0; obj < objList.length; obj++) {
					objToModify['TranspositionState'].push([0, 0]);
				}
			}
			if (skipActionTypes.includes(actionType)) {
				return;
			}
		}

		const actionState = actionType + 'State';
		const actionTracker = actionType + 'Tracker';
		const actionMap = actionType + 'Map';

		// Initialize State, Tracker and Map for the actionType.
		if (actionType !== 'Transposition') {
			if (!objToModify[actionState]) {
				for (let obj = 0; obj < objList.length; obj++) {
					objToModify[actionState].push(false);
				}
			}
			if (!objToModify[actionTracker]) {
				for (let obj = 0; obj < objList.length; obj++) {
					objToModify[actionTracker].push({});
				}
			}
		}
		if (!objToModify[actionMap]) {
			objToModify[actionMap] = {};
		}

		// Map actionTypeEventCodes.
		if (actionType + 'EventCodes' in objList[currentIndex]) {
			Object.keys(objList[currentIndex][actionType + 'EventCodes']).forEach((key) => {
				if (!objToModify[actionMap][key]) {
					objToModify[actionMap][key] = {};
				}

				objToModify[actionMap][key][currentIndex] =
					objList[currentIndex][actionType + 'EventCodes'][key];

				// Initialize the Tracker for this eventCode with a boolean.
				if (objToModify[actionTracker]) {
					if (!objToModify[actionTracker][currentIndex]) {
						objToModify[actionTracker][currentIndex] = {};
					}
					objToModify[actionTracker][currentIndex][key] = false;
				}
			});
		}
	});
}
function HydrateGutList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.GutList) return; // If there is no GutList, return early.

	// Initialize the "Require" Maps
	if (!QOP.GutList['RequireFretMap']) {
		QOP.GutList.RequireFretMap = [];
	}
	if (!QOP.GutList['RequireValveMap']) {
		QOP.GutList.RequireValveMap = [];
	}
	if (!QOP.GutList['RequireComboMap']) {
		QOP.GutList.RequireComboMap = [];
	}
	if (!QOP.GutList['OpenGutNoteIDMap']) {
		QOP.GutList.OpenGutNoteIDMap = [];
	}

	for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
		const gut: GutTemplate = QOPUserData.GutList[gutIndex];
		const emptyActionTypes: string[] = [];

		const eventCodeProperties: EventCodeKeys[] = [
			'ButtonEventCodes',
			'SustainEventCodes',
			'AntiSustainEventCodes',
			'SostenutoEventCodes',
			'AntiSostenutoEventCodes',
			'TranspositionEventCodes'
		];

		for (const property of eventCodeProperties) {
			const obj = gut[property];
			if (obj && Object.keys(obj).length === 0) {
				const actionType = property.replace('EventCodes', ''); // Extract the actionType from the property name
				emptyActionTypes.push(actionType);
			}
		}

		HydrateStateTrackerMap(QOP.GutList, QOPUserData.GutList, gutIndex, emptyActionTypes, false);

		// Add RequireFret, RequireValve, RequireCombo, and OpenGutNoteID to their respective Maps.
		QOP.GutList.RequireFretMap.push(gut.RequireFret);
		QOP.GutList.RequireValveMap.push(gut.RequireValve);
		QOP.GutList.RequireComboMap.push(gut.RequireCombo);
		QOP.GutList.OpenGutNoteIDMap.push(gut.OpenGutNoteID);

		QOP.Oscillators.OscWaveType[gutIndex] = [];
		for (let scale = 0; scale < QOPUserData.ScaleList.length; scale++) {
			QOP.Oscillators.OscWaveType[gutIndex][scale] = gut.OpenGutWaveType[scale];
		}
	}
}
function HydrateFretSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.GutList) return; // If there is no GutList, return early.

	QOPUserData.GutList.forEach((gut, gutIndex) => {
		if (!gut.FretSet) return; // If there is no FretSet, return early.

		let fretSetObj = {
			HighestFretPressed: -1,
			ResultantNoteIDDelta: 0,
			ResultantCentsDelta: 0
		};

		gut.FretSet.forEach((fret, fretIndex) => {
			let emptyActionTypes: string[] = [];
			for (let actionType of actionTypes) {
				const EventCodes = actionType + 'EventCodes';
				if (Object.keys(fret[EventCodes] || {}).length === 0) {
					emptyActionTypes = [...emptyActionTypes, actionType];
				}
			}
			HydrateStateTrackerMap(fretSetObj, gut.FretSet, fretIndex, emptyActionTypes, false);

			deltaTypes.forEach((deltaType) => {
				if (!fretSetObj[deltaType + 'Map']) {
					fretSetObj[deltaType + 'Map'] = [];
				}
				fretSetObj[deltaType + 'Map'].push(fret[deltaType]);
			});
		});
		// Push the parsed fretSetObj data into the FretSetList indexed object.
		QOP.FretSetList[gutIndex] = {
			...QOP.FretSetList[gutIndex],
			...fretSetObj
		};
	});
}
function HydrateValveList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.ValveList) return; // If there is no ValveList, return early.

	QOP.ValveList = {
		ResultantNoteIDDelta: [],
		ResultantCentsDelta: []
	};

	for (let gut = 0; gut < QOPUserData.GutList.length; gut++) {
		QOP.ValveList.ResultantNoteIDDelta.push(0);
		QOP.ValveList.ResultantCentsDelta.push(0);
	}

	deltaTypes.forEach((deltaType) => {
		QOP.ValveList[deltaType + 'Map'] = [];
	});

	QOPUserData.ValveList.forEach((valve, valveIndex) => {
		let emptyActionTypes: string[] = [];
		for (let actionType of actionTypes) {
			const EventCodes = actionType + 'EventCodes';
			if (Object.keys(valve[EventCodes] || {}).length === 0) {
				emptyActionTypes = [...emptyActionTypes, actionType];
			}
		}
		HydrateStateTrackerMap(
			QOP.ValveList,
			QOPUserData.ValveList,
			valveIndex,
			emptyActionTypes,
			false
		);

		// Handle DeltaSet.
		valve.DeltaSet.forEach((deltaSet) => {
			deltaTypes.forEach((deltaType) => {
				if (!QOP.ValveList[deltaType + 'Map'][valveIndex]) {
					QOP.ValveList[deltaType + 'Map'][valveIndex] = [];
				}
				QOP.ValveList[deltaType + 'Map'][valveIndex].push(deltaSet[deltaType]);
			});
		});
	});
}
function HydrateChartList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.ChartList) return; // If there is no GutList, return early.
	QOP.ChartList = {};
	QOPUserData.ChartList.forEach((chart, chartIndex) => {
		let emptyActionTypes: string[] = [
			'Button',
			'Sustain',
			'AntiSustain',
			'Sostenuto',
			'AntiSostenuto'
		];
		for (let actionType of actionTypes) {
			const EventCodes = actionType + 'EventCodes';
			if (Object.keys(chart[EventCodes] || {}).length === 0) {
				emptyActionTypes = [...emptyActionTypes, actionType];
			}
		}
		HydrateStateTrackerMap(
			QOP.ChartList,
			QOPUserData.ChartList,
			chartIndex,
			emptyActionTypes,
			true
		);
	});
}
function HydratePadSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.ChartList) return; // If there is no ChartList, return early.

	QOPUserData.ChartList.forEach((chart, chartIndex) => {
		if (!chart.PadSet) return;

		let padSetObj = {
			PressedPads: []
		};

		chart.PadSet.forEach((pad, padIndex) => {
			let emptyActionTypes: string[] = ['Transposition'];
			for (let actionType of actionTypes) {
				const EventCodes = actionType + 'EventCodes';
				if (Object.keys(pad[EventCodes] || {}).length === 0) {
					emptyActionTypes = [...emptyActionTypes, actionType];
				}
			}
			HydrateStateTrackerMap(padSetObj, chart.PadSet, padIndex, emptyActionTypes, false);
		});
		// Push the parsed PadSet data into the PadSetList indexed object.
		QOP.PadSetList[chartIndex] = {
			...QOP.PadSetList[chartIndex],
			...padSetObj
		};
	});
}
function HydrateComboSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	if (!QOPUserData.ChartList) return; // If there is no ChartList, return early.

	QOPUserData.ChartList.forEach((chart, chartIndex) => {
		let comboSetObj: any = {
			ResultantNoteIDDelta: [],
			ResultantCentsDelta: []
		}; // An item to be added to QOP.ComboSetList
		for (let gut = 0; gut < QOP.GutList.length; gut++) {
			comboSetObj.ResultantNoteIDDelta.push(0);
			comboSetObj.ResultantCentsDelta.push(0);
		}
		// Initialize ComboMap with array elements for each pad plus one for zero-true combos
		comboSetObj.ComboMap = Array.from({ length: chart.PadSet.length + 1 }, () => []);

		// Initialize delta maps for the item
		deltaTypes.forEach((deltaType) => {
			comboSetObj[deltaType + 'Map'] = {};
		});

		chart.ComboSet.forEach((combo, comboIndex) => {
			let emptyActionTypes: string[] = [
				'Button',
				'Sustain',
				'AntiSustain',
				'Sostenuto',
				'AntiSostenuto'
			];
			for (let actionType of actionTypes) {
				const EventCodes = actionType + 'EventCodes';
				if (Object.keys(combo[EventCodes] || {}).length === 0) {
					emptyActionTypes = [...emptyActionTypes, actionType];
				}
			}
			HydrateStateTrackerMap(comboSetObj, chart.ComboSet, comboIndex, emptyActionTypes, true);

			let trueIndexes = combo.Combo.reduce((result, value, index) => {
				// Collect the index numbers of the true values
				if (value) result.push(index);
				return result;
			}, []);

			let comboMapPiece = {
				TrueIndexes: [...trueIndexes],
				ComboIndex: comboIndex
			};

			// Add trueIndexes to the appropriate element of ComboMap
			comboSetObj.ComboMap[trueIndexes.length].push(comboMapPiece);

			// Handle DeltaSet
			combo.DeltaSet.forEach((deltaSet, deltaSetIndex) => {
				deltaTypes.forEach((deltaType) => {
					if (!comboSetObj[deltaType + 'Map'][deltaSetIndex]) {
						comboSetObj[deltaType + 'Map'][deltaSetIndex] = [];
					}
					comboSetObj[deltaType + 'Map'][deltaSetIndex].push(deltaSet[deltaType]);
				});
			});
		});

		// Add the comboSetObj to the QOP.ComboSetList
		QOP.ComboSetList[chartIndex] = {
			...QOP.ComboSetList[chartIndex],
			...comboSetObj
		};
	});
}

function HydrateActionTypeTree(QOP: QOPTemplate): void {
	const processListObject = (listObject: any, prop: string, propIndex: number | null) => {
		actionTypes.forEach((actionType: string) => {
			let actionTypeMap = listObject[actionType + 'Map'];
			if (actionTypeMap) {
				for (let code in actionTypeMap) {
					for (let n in actionTypeMap[code]) {
						let value = actionTypeMap[code][n];
						if (QOP[`${actionType}Tree`] === undefined) {
							QOP[`${actionType}Tree`] = { keydown: {}, keyup: {} };
						}

						function PassedTreeTest(downOrUp: string) {
							if (QOP[`${actionType}Tree`][downOrUp][code] === undefined) {
								QOP[`${actionType}Tree`][downOrUp][code] = {};
							}
							let target = QOP[`${actionType}Tree`][downOrUp][code];
							if (Array.isArray(QOP[prop])) {
								if (target[prop] === undefined) {
									target[prop] = {};
								}
								if (target[prop][propIndex] === undefined) {
									target[prop][propIndex] = [];
								}
								target[prop][propIndex].push(parseInt(n));
							} else {
								if (target[prop] === undefined) {
									target[prop] = [];
								}
								target[prop].push(parseInt(n));
							}
						}

						// Test for use keydown
						if (Array.isArray(value[0])) {
							if (value[0].some((num) => num !== 0)) {
								PassedTreeTest('keydown');
							}
						} else {
							if (value[0] !== 0) {
								PassedTreeTest('keydown');
							}
						}

						// Test for use keyup
						if (Array.isArray(value[1])) {
							if (value[1].some((num) => num !== 0)) {
								PassedTreeTest('keyup');
							}
						} else {
							if (value[1] !== 0) {
								PassedTreeTest('keyup');
							}
						}
					}
				}
			}
		});
	};

	for (let prop of QOPLists) {
		if (Array.isArray(QOP[prop])) {
			QOP[prop].forEach((listObject: any, index: number) =>
				processListObject(listObject, prop, index)
			);
		} else {
			processListObject(QOP[prop], prop, null);
		}
	}
}

function HydrateQOP(QOPUserData: QOPUserDataTemplate) {
	const QOP = new QOPTemplate();

	for (let gut = 0; gut < QOPUserData.GutList.length; gut++) {
		QOP.FretSetList.push({});
	}
	for (let chart = 0; chart < QOPUserData.ChartList.length; chart++) {
		QOP.PadSetList.push({});
		QOP.ComboSetList.push({});
	}

	HydrateScaleList(QOPUserData, QOP);
	HydrateGutList(QOPUserData, QOP);
	HydrateFretSetList(QOPUserData, QOP);
	HydrateValveList(QOPUserData, QOP);
	HydrateChartList(QOPUserData, QOP);
	HydratePadSetList(QOPUserData, QOP);
	HydrateComboSetList(QOPUserData, QOP);

	HydrateActionTypeTree(QOP);

	for (let gut = 0; gut < QOP.GutList.ButtonState.length; gut++) {
		QOP.Oscillators.OscNodes.push([]);
		QOP.Oscillators.OscGainNodes.push([]);
		QOP.Oscillators.OscNodesMute.push(false);

		QOP.MIDIOutput.GutMIDIOUTDisabled.push(true);

		QOP.StateMachine.GutSoundState.push(false);
		QOP.StateMachine.NoteIDAccumulator.push([]);
		QOP.StateMachine.CentsAccumulator.push(0);
		QOP.StateMachine.TotalFrequency.push([]);
		QOP.StateMachine.PrevTotalFrequency.push([]);
		QOP.StateMachine.FretConfirm.push(false);

		for (let scale = 0; scale < QOP.ScaleList.length; scale++) {
			const newOscillator = new OscillatorNode(audioContext);
			QOP.Oscillators.OscNodes[gut].push(newOscillator);

			const gainNode = new GainNode(audioContext);
			gainNode.connect(audioContext.destination);
			gainNode.gain.value = 0.3;
			QOP.Oscillators.OscGainNodes[gut].push(gainNode);
			QOP.Oscillators.OscNodes[gut][scale].connect(QOP.Oscillators.OscGainNodes[gut][scale]);

			QOP.StateMachine.NoteIDAccumulator[gut].push(0);
			QOP.StateMachine.TotalFrequency[gut].push(0);
			QOP.StateMachine.PrevTotalFrequency[gut].push(0);
		}
	}
	return QOP;
}

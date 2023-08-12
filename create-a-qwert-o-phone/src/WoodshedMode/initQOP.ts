import { DeltaSetValidator, OpenGutValidator } from '../UserDataMode/validateQOPUD.js';
import type {
	QOPUserDataTemplate,
	GutTemplate,
	SimpleWaveformTypeString
} from '../UserDataMode/initQOPUD.js';
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
interface IQOPTemplate {
	StateMachine: QOPStateMachineTemplate;
	Oscillators: QOPOscillatorsTemplate;
	MIDIOutput: QOPMIDIOutputTemplate;

	ScaleList: QOPScaleTemplate[][];
	GutList: QOPGutTemplate;
	FretSetList: QOPFretSetTemplate[];
	ValveList: QOPValveTemplate;
	ChartList: QOPChartTemplate;
	PadSetList: QOPPadSetTemplate[];
	ComboSetList: QOPComboSetTemplate[];

	ButtonTree: QOPTreeTemplate;
	SustainTree: QOPTreeTemplate;
	AntiSustainTree: QOPTreeTemplate;
	SostenutoTree: QOPTreeTemplate;
	AntiSostenutoTree: QOPTreeTemplate;
	TranspositionTree: QOPTreeTemplate;
}
export class QOPTemplate implements IQOPTemplate {
	public StateMachine: QOPStateMachineTemplate;
	public Oscillators: QOPOscillatorsTemplate;
	public MIDIOutput: QOPMIDIOutputTemplate;

	public ScaleList: QOPScaleTemplate[][];
	public GutList: QOPGutTemplate;
	public FretSetList: QOPFretSetTemplate[];
	public ValveList: QOPValveTemplate;
	public ChartList: QOPChartTemplate;
	public PadSetList: QOPPadSetTemplate[];
	public ComboSetList: QOPComboSetTemplate[];

	public ButtonTree: QOPTreeTemplate;
	public SustainTree: QOPTreeTemplate;
	public AntiSustainTree: QOPTreeTemplate;
	public SostenutoTree: QOPTreeTemplate;
	public AntiSostenutoTree: QOPTreeTemplate;
	public TranspositionTree: QOPTreeTemplate;

	constructor() {
		this.StateMachine = new QOPStateMachineTemplate();
		this.Oscillators = new QOPOscillatorsTemplate();
		this.MIDIOutput = new QOPMIDIOutputTemplate();

		this.ScaleList = [[new QOPScaleTemplate()]];
		this.GutList = new QOPGutTemplate();
		this.FretSetList = [new QOPFretSetTemplate()];
		this.ValveList = new QOPValveTemplate();
		this.ChartList = new QOPChartTemplate();
		this.PadSetList = [new QOPPadSetTemplate()];
		this.ComboSetList = [new QOPComboSetTemplate()];

		this.ButtonTree = new QOPTreeTemplate;
		this.SustainTree = new QOPTreeTemplate;
		this.AntiSustainTree = new QOPTreeTemplate;
		this.SostenutoTree = new QOPTreeTemplate;
		this.AntiSostenutoTree = new QOPTreeTemplate;
		this.TranspositionTree = new QOPTreeTemplate;
	}
}

interface IQOPStateMachineTemplate {
	ChangedActionTypes: string[];
	ChangedLists: string[];
	ChangedTransposition: boolean;
	FretConfirm: boolean[];
	ValveConfirm: boolean;
	ComboConfirm: boolean;
	NoteIDAccumulator: number[][];
	CentsAccumulator: number[];
	TotalFrequency: number[][];
	PrevTotalFrequency: number[][];
	GutSoundState: boolean[];
}
class QOPStateMachineTemplate implements IQOPStateMachineTemplate {
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
interface IQOPOscillatorsTemplate {
	OscNodes: OscillatorNode[][];
	OscGainNodes: GainNode[][];
	OscWaveType: SimpleWaveformTypeString[][];
	OscNodesMute: boolean[];
}
class QOPOscillatorsTemplate implements IQOPOscillatorsTemplate {
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
interface IQOPMIDIOutputTemplate {
	GutMIDIOUTDisabled: boolean[];
}
class QOPMIDIOutputTemplate implements IQOPMIDIOutputTemplate {
	public GutMIDIOUTDisabled: boolean[];

	constructor() {
		this.GutMIDIOUTDisabled = [];
	}
}

interface IQOPScaleTemplate {
	PitchHz: number;
	ColorHex: string;
	ClosestMIDINote: number;
	PitchBendLSB: number;
	PitchBendMSB: number;
}
class QOPScaleTemplate implements IQOPScaleTemplate {
	public PitchHz: number;
	public ColorHex: string;
	public ClosestMIDINote: number;
	public PitchBendLSB: number;
	public PitchBendMSB: number;

	constructor() {
		this.PitchHz = 0;
		this.ColorHex = '#FFFFFFFF';
		this.ClosestMIDINote = 0;
		this.PitchBendLSB = 0;
		this.PitchBendMSB = 64;
	}
}

type QOPActionTrackerType = { [key: string]: boolean };
type QOPActionMapType = {
	[key: string]: {
		[key: string]: [number, number];
	};
};
type QOPTranspositionStateType = [number, number][];
type QOPTranspositionMapType = {
	[key: string]: {
		[key: string]: [[number, number], [number, number]];
	};
};
interface IQOPActionTypes {
	SustainState: boolean[];
	SustainTracker?: QOPActionTrackerType[];
	SustainMap?: QOPActionMapType;
	AntiSustainState: boolean[];
	AntiSustainTracker?: QOPActionTrackerType[][];
	AntiSustainMap?: QOPActionMapType;
	ButtonState: boolean[];
	ButtonTracker?: QOPActionTrackerType[][];
	ButtonMap?: QOPActionMapType;
	SostenutoState: boolean[];
	SostenutoTracker?: QOPActionTrackerType[][];
	SostenutoMap?: QOPActionMapType;
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker?: QOPActionTrackerType[];
	AntiSostenutoMap?: QOPActionMapType;
}
class QOPActionTypes implements IQOPActionTypes {
	SustainState: boolean[];
	SustainTracker?: QOPActionTrackerType[];
	SustainMap?: QOPActionMapType;
	AntiSustainState: boolean[];
	AntiSustainTracker?: QOPActionTrackerType[][];
	AntiSustainMap?: QOPActionMapType;
	ButtonState: boolean[];
	ButtonTracker?: QOPActionTrackerType[][];
	ButtonMap?: QOPActionMapType;
	SostenutoState: boolean[];
	SostenutoTracker?: QOPActionTrackerType[][];
	SostenutoMap?: QOPActionMapType;
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker?: QOPActionTrackerType[];
	AntiSostenutoMap?: QOPActionMapType;

	constructor() {
		this.SustainState = [];
		this.AntiSustainState = [];
		this.ButtonState = [];
		this.SostenutoState = [];
		this.AntiSostenutoState = [];
	}
}
interface IQOPGutTemplate {
	RequireFretMap: boolean[];
	RequireValveMap: boolean[];
	RequireComboMap: boolean[];
	OpenGutNoteIDMap: number[][];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap?: QOPTranspositionMapType;
}
class QOPGutTemplate extends QOPActionTypes implements IQOPGutTemplate {
	public RequireFretMap: boolean[];
	public RequireValveMap: boolean[];
	public RequireComboMap: boolean[];
	public OpenGutNoteIDMap: number[][];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap?: QOPTranspositionMapType;
	constructor() {
		super();
		this.RequireFretMap = [];
		this.RequireValveMap = [];
		this.RequireComboMap = [];
		this.OpenGutNoteIDMap = [];
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}
interface IQOPFretSetTemplate {
	HighestFretPressed: number;
	DeltaTypeMap: string[];
	NoteIDDeltaMap: number[];
	CentsDeltaMap: number[];
	ResultantNoteIDDelta: number;
	ResultantCentsDelta: number;
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap?: QOPTranspositionMapType;
}
class QOPFretSetTemplate extends QOPActionTypes implements IQOPFretSetTemplate {
	public HighestFretPressed: number;
	public DeltaTypeMap: string[];
	public NoteIDDeltaMap: number[];
	public CentsDeltaMap: number[];
	public ResultantNoteIDDelta: number;
	public ResultantCentsDelta: number;
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap?: QOPTranspositionMapType;
	constructor() {
		super();
		this.HighestFretPressed = 0;
		this.DeltaTypeMap = [];
		this.NoteIDDeltaMap = [];
		this.CentsDeltaMap = [];
		this.ResultantNoteIDDelta = 0;
		this.ResultantCentsDelta = 0;
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}
interface IQOPValveTemplate {
	DeltaTypeMap: string[];
	NoteIDDeltaMap: number[];
	CentsDeltaMap: number[];
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap?: QOPTranspositionMapType;
}
class QOPValveTemplate extends QOPActionTypes implements IQOPValveTemplate {
	public DeltaTypeMap: string[];
	public NoteIDDeltaMap: number[];
	public CentsDeltaMap: number[];
	public ResultantNoteIDDelta: number[];
	public ResultantCentsDelta: number[];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap?: QOPTranspositionMapType;
	constructor() {
		super();
		this.DeltaTypeMap = [];
		this.NoteIDDeltaMap = [];
		this.CentsDeltaMap = [];
		this.ResultantNoteIDDelta = [];
		this.ResultantCentsDelta = [];
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}
interface IQOPChartTemplate {
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap?: QOPTranspositionMapType;
}
class QOPChartTemplate implements IQOPChartTemplate {
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap?: QOPTranspositionMapType;
	constructor() {
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}
interface IQOPPadSetTemplate {
	PressedPads: number[];
}
class QOPPadSetTemplate extends QOPActionTypes implements IQOPPadSetTemplate {
	public PressedPads: number[];
	constructor() {
		super();
		this.PressedPads = [];
	}
}
interface IQOPComboSetTemplate {
	ComboMap: { [key: string]: number | number[] }[][];
	DeltaTypeMap: { [key: number]: string };
	NoteIDDeltaMap: { [key: number]: number };
	CentsDeltaMap: { [key: number]: number };
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap?: QOPTranspositionMapType;
}
class QOPComboSetTemplate implements IQOPComboSetTemplate {
	public ComboMap: { [key: string]: number | number[] }[][];
	public DeltaTypeMap: { [key: number]: string };
	public NoteIDDeltaMap: { [key: number]: number };
	public CentsDeltaMap: { [key: number]: number };
	public ResultantNoteIDDelta: number[];
	public ResultantCentsDelta: number[];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap?: QOPTranspositionMapType;
	constructor() {
		this.ComboMap = [];
		this.DeltaTypeMap = {};
		this.NoteIDDeltaMap = {};
		this.CentsDeltaMap = {};
		this.ResultantNoteIDDelta = [];
		this.ResultantCentsDelta = [];
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}

interface IQOPTreeTemplate {
	keydown: { [key: string]: object };
	keyup: { [key: string]: object };
}
class QOPTreeTemplate implements IQOPTreeTemplate {
	public keydown: { [key: string]: object };
	public keyup: { [key: string]: object };
	constructor() {
		this.keydown = {};
		this.keyup = {};
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
	objToModify,
	objList: object[], // Made this `any` since we're dynamically accessing properties.
	currentIndex: number,
	skipActionTypes: Array<string> = [],
	ignoreDummyToggleStates: boolean
) {
	const actionTypes = [
		'Button',
		'Sustain',
		'AntiSustain',
		'Sostenuto',
		'AntiSostenuto',
		'Transposition'
	];

	actionTypes.forEach((actionType) => {
		// ... (rest of your function)

		const actionState = actionType + 'State';
		const actionTracker = actionType + 'Tracker';
		const actionMap: string = actionType + 'Map';

		// DummyToggleStates, actionState properties which are initialized when there are no bindings; makes the logic later much cleaner.
		if (!ignoreDummyToggleStates) {
			// Explicitly initialize each state property if it exists in objToModify
			if ('ButtonState' in objToModify) objToModify.ButtonState = Array(objList.length).fill(false);
			if ('SustainState' in objToModify)
				objToModify.SustainState = Array(objList.length).fill(false);
			if ('AntiSustainState' in objToModify)
				objToModify.AntiSustainState = Array(objList.length).fill(false);
			if ('SostenutoState' in objToModify)
				objToModify.SostenutoState = Array(objList.length).fill(false);
			if ('AntiSostenutoState' in objToModify)
				objToModify.AntiSostenutoState = Array(objList.length).fill(false);
		}
		if (skipActionTypes !== null) {
			if (!skipActionTypes.includes('Transposition')) {
				for (let obj = 0; obj < objList.length; obj++) {
					objToModify['TranspositionState'].push([0, 0]);
				}
			}
		}
		if (skipActionTypes) {
			if (skipActionTypes.includes(actionType)) {
				return;
			}
		}

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

		const eventCodeProperties: string[] = [
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

		const fretSetObj = {
			HighestFretPressed: -1,
			ResultantNoteIDDelta: 0,
			ResultantCentsDelta: 0
		};

		gut.FretSet.forEach((fret, fretIndex) => {
			let emptyActionTypes: string[] = [];
			for (const actionType of actionTypes) {
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
		QOP.FretSetList[gut] = new QOPFretSetList();
	}
	for (let chart = 0; chart < QOPUserData.ChartList.length; chart++) {
		QOP.PadSetList[chart] = new QOPPadSetList();
		QOP.ComboSetList[chart] = new QOPComboSetList();
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

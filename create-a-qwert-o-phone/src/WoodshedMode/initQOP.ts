import { DeltaSetValidator, OpenGutValidator } from '../UserDataMode/validateQOPUD.js';
import type {
	QOPUserDataTemplate,
	SimpleWaveformTypeString,
	QOPValidEventCodesString
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

	ButtonTree: QOPTreeATTemplate;
	SustainTree: QOPTreeATTemplate;
	AntiSustainTree: QOPTreeATTemplate;
	SostenutoTree: QOPTreeATTemplate;
	AntiSostenutoTree: QOPTreeATTemplate;
	TranspositionTree: QOPTreeTRTemplate;
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

	public ButtonTree: QOPTreeATTemplate;
	public SustainTree: QOPTreeATTemplate;
	public AntiSustainTree: QOPTreeATTemplate;
	public SostenutoTree: QOPTreeATTemplate;
	public AntiSostenutoTree: QOPTreeATTemplate;
	public TranspositionTree: QOPTreeTRTemplate;

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

		this.ButtonTree = new QOPTreeATTemplate();
		this.SustainTree = new QOPTreeATTemplate();
		this.AntiSustainTree = new QOPTreeATTemplate();
		this.SostenutoTree = new QOPTreeATTemplate();
		this.AntiSostenutoTree = new QOPTreeATTemplate();
		this.TranspositionTree = new QOPTreeTRTemplate();
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
export class QOPStateMachineTemplate implements IQOPStateMachineTemplate {
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
export class QOPOscillatorsTemplate implements IQOPOscillatorsTemplate {
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
export class QOPMIDIOutputTemplate implements IQOPMIDIOutputTemplate {
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
type QOPListsString = [
	'ValveList',
	'ChartList',
	'FretSetList',
	'PadSetList',
	'ComboSetList',
	'GutList'
];
export const QOPLists: QOPListsString = [
	'ValveList',
	'ChartList',
	'FretSetList',
	'PadSetList',
	'ComboSetList',
	'GutList'
];
type QOPSingleListsString = ['GutList', 'ValveList', 'ChartList'];
export const QOPSingleLists: QOPSingleListsString = ['GutList', 'ValveList', 'ChartList'];
type QOPSetListsString = ['FretSetList', 'PadSetList', 'ComboSetList'];
export const QOPSetLists: QOPSetListsString = ['FretSetList', 'PadSetList', 'ComboSetList'];

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
	SustainTracker: QOPActionTrackerType[];
	SustainMap: QOPActionMapType;
	AntiSustainState: boolean[];
	AntiSustainTracker: QOPActionTrackerType[];
	AntiSustainMap: QOPActionMapType;
	ButtonState: boolean[];
	ButtonTracker: QOPActionTrackerType[];
	ButtonMap: QOPActionMapType;
	SostenutoState: boolean[];
	SostenutoTracker: QOPActionTrackerType[];
	SostenutoMap: QOPActionMapType;
	AntiSostenutoState: boolean[];
	AntiSostenutoTracker: QOPActionTrackerType[];
	AntiSostenutoMap: QOPActionMapType;
}
export class QOPActionTypes implements IQOPActionTypes {
	public SustainState: boolean[];
	public SustainTracker: QOPActionTrackerType[];
	public SustainMap: QOPActionMapType;
	public AntiSustainState: boolean[];
	public AntiSustainTracker: QOPActionTrackerType[];
	public AntiSustainMap: QOPActionMapType;
	public ButtonState: boolean[];
	public ButtonTracker: QOPActionTrackerType[];
	public ButtonMap: QOPActionMapType;
	public SostenutoState: boolean[];
	public SostenutoTracker: QOPActionTrackerType[];
	public SostenutoMap: QOPActionMapType;
	public AntiSostenutoState: boolean[];
	public AntiSostenutoTracker: QOPActionTrackerType[];
	public AntiSostenutoMap: QOPActionMapType;
	constructor() {
		this.SustainState = [];
		this.SustainTracker = [];
		this.SustainMap = {} as QOPActionMapType;
		this.AntiSustainState = [];
		this.AntiSustainTracker = [];
		this.AntiSustainMap = {} as QOPActionMapType;
		this.ButtonState = [];
		this.ButtonTracker = [];
		this.ButtonMap = {} as QOPActionMapType;
		this.SostenutoState = [];
		this.SostenutoTracker = [];
		this.SostenutoMap = {} as QOPActionMapType;
		this.AntiSostenutoState = [];
		this.AntiSostenutoTracker = [];
		this.AntiSostenutoMap = {} as QOPActionMapType;
	}
}
interface IQOPGutTemplate {
	RequireFretMap: boolean[];
	RequireValveMap: boolean[];
	RequireComboMap: boolean[];
	OpenGutNoteIDMap: number[][];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap: QOPTranspositionMapType;
}
export class QOPGutTemplate extends QOPActionTypes implements IQOPGutTemplate {
	public RequireFretMap: boolean[];
	public RequireValveMap: boolean[];
	public RequireComboMap: boolean[];
	public OpenGutNoteIDMap: number[][];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap: QOPTranspositionMapType;
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
	TranspositionMap: QOPTranspositionMapType;
}
export class QOPFretSetTemplate extends QOPActionTypes implements IQOPFretSetTemplate {
	public HighestFretPressed: number;
	public DeltaTypeMap: string[];
	public NoteIDDeltaMap: number[];
	public CentsDeltaMap: number[];
	public ResultantNoteIDDelta: number;
	public ResultantCentsDelta: number;
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap: QOPTranspositionMapType;
	constructor() {
		super();
		this.HighestFretPressed = -1;
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
	DeltaTypeMap: string[][];
	NoteIDDeltaMap: number[][];
	CentsDeltaMap: number[][];
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap: QOPTranspositionMapType;
}
export class QOPValveTemplate extends QOPActionTypes implements IQOPValveTemplate {
	public DeltaTypeMap: string[][];
	public NoteIDDeltaMap: number[][];
	public CentsDeltaMap: number[][];
	public ResultantNoteIDDelta: number[];
	public ResultantCentsDelta: number[];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap: QOPTranspositionMapType;
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
	TranspositionMap: QOPTranspositionMapType;
}
export class QOPChartTemplate implements IQOPChartTemplate {
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap: QOPTranspositionMapType;
	constructor() {
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}
interface IQOPPadSetTemplate {
	PressedPads: number[];
}
export class QOPPadSetTemplate extends QOPActionTypes implements IQOPPadSetTemplate {
	public PressedPads: number[];
	constructor() {
		super();
		this.PressedPads = [];
	}
}
interface IQOPComboSetTemplate {
	ComboMap: { TrueIndexes: number[]; ComboIndex: number }[][];
	DeltaTypeMap: string[][];
	NoteIDDeltaMap: number[][];
	CentsDeltaMap: number[][];
	ResultantNoteIDDelta: number[];
	ResultantCentsDelta: number[];
	TranspositionState: QOPTranspositionStateType;
	TranspositionMap: QOPTranspositionMapType;
}
export class QOPComboSetTemplate implements IQOPComboSetTemplate {
	public ComboMap: { TrueIndexes: number[]; ComboIndex: number }[][];
	public DeltaTypeMap: string[][];
	public NoteIDDeltaMap: number[][];
	public CentsDeltaMap: number[][];
	public ResultantNoteIDDelta: number[];
	public ResultantCentsDelta: number[];
	public TranspositionState: QOPTranspositionStateType;
	public TranspositionMap: QOPTranspositionMapType;
	constructor() {
		this.ComboMap = [];
		this.DeltaTypeMap = [];
		this.NoteIDDeltaMap = [];
		this.CentsDeltaMap = [];
		this.ResultantNoteIDDelta = [];
		this.ResultantCentsDelta = [];
		this.TranspositionState = [];
		this.TranspositionMap = {} as QOPTranspositionMapType;
	}
}

interface ITreeATListsTemplate {
	GutList: number[];
	ValveList: number[];
	FretSetList: { [index: number]: number[] };
	PadSetList: { [index: number]: number[] };
}
class TreeATListsTemplate implements ITreeATListsTemplate {
	public GutList: number[];
	public ValveList: number[];
	public FretSetList: { [index: number]: number[] };
	public PadSetList: { [index: number]: number[] };
	constructor() {
		this.GutList = [];
		this.ValveList = [];
		this.FretSetList = {};
		this.PadSetList = {};
	}
}
type ATTreeKDKUTemplateObj = Partial<{
	[QOPValidEventCode in QOPValidEventCodesString]: TreeATListsTemplate;
}>;
interface IQOPTreeATTemplate {
	keydown: ATTreeKDKUTemplateObj;
	keyup: ATTreeKDKUTemplateObj;
}
export class QOPTreeATTemplate implements IQOPTreeATTemplate {
	public keydown: ATTreeKDKUTemplateObj;
	public keyup: ATTreeKDKUTemplateObj;
	constructor() {
		this.keydown = {} as ATTreeKDKUTemplateObj;
		this.keyup = {} as ATTreeKDKUTemplateObj;
	}
}
interface ITreeTRListsTemplate {
	GutList: number[];
	ValveList: number[];
	ChartList: number[];
	FretSetList: { [index: number]: number[] };
	ComboSetList: { [index: number]: number[] };
}
class TreeTRListsTemplate implements ITreeTRListsTemplate {
	public GutList: number[];
	public ValveList: number[];
	public ChartList: number[];
	public FretSetList: { [index: number]: number[] };
	public ComboSetList: { [index: number]: number[] };
	constructor() {
		this.GutList = [];
		this.ValveList = [];
		this.ChartList = [];
		this.FretSetList = {};
		this.ComboSetList = {};
	}
}
type TRTreeKDKUTemplateObj = Partial<{
	[QOPValidEventCode in QOPValidEventCodesString]: TreeTRListsTemplate;
}>;
interface IQOPTreeTRTemplate {
	keydown: TRTreeKDKUTemplateObj;
	keyup: TRTreeKDKUTemplateObj;
}
export class QOPTreeTRTemplate implements IQOPTreeTRTemplate {
	public keydown: TRTreeKDKUTemplateObj;
	public keyup: TRTreeKDKUTemplateObj;
	constructor() {
		this.keydown = {} as TRTreeKDKUTemplateObj;
		this.keyup = {} as TRTreeKDKUTemplateObj;
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

type DeltaTypesString = ['DeltaType', 'NoteIDDelta', 'CentsDelta'];
export const DeltaTypes: DeltaTypesString = ['DeltaType', 'NoteIDDelta', 'CentsDelta'];
type DeltaTypeMapsString = ['DeltaTypeMap', 'NoteIDDeltaMap', 'CentsDeltaMap'];
export const DeltaTypeMaps: DeltaTypeMapsString = [
	'DeltaTypeMap',
	'NoteIDDeltaMap',
	'CentsDeltaMap'
];
type ActionTypesString = [
	'Sustain',
	'AntiSustain',
	'Button',
	'Sostenuto',
	'AntiSostenuto',
	'Transposition'
];
export const ActionTypes: ActionTypesString = [
	'Sustain',
	'AntiSustain',
	'Button',
	'Sostenuto',
	'AntiSostenuto',
	'Transposition'
];
type QOPActionEventCodesString = [
	'ButtonEventCodes',
	'SustainEventCodes',
	'AntiSustainEventCodes',
	'SostenutoEventCodes',
	'AntiSostenutoEventCodes'
];
export const EventCodeProperties: QOPActionEventCodesString = [
	'ButtonEventCodes',
	'SustainEventCodes',
	'AntiSustainEventCodes',
	'SostenutoEventCodes',
	'AntiSostenutoEventCodes'
];
type ActionTypeStateString = [
	'ButtonState',
	'SustainState',
	'AntiSustainState',
	'SostenutoState',
	'AntiSostenutoState'
];
export const ActionTypeStates: ActionTypeStateString = [
	'ButtonState',
	'SustainState',
	'AntiSustainState',
	'SostenutoState',
	'AntiSostenutoState'
];
type ActionTypeMapString = [
	'ButtonMap',
	'SustainMap',
	'AntiSustainMap',
	'SostenutoMap',
	'AntiSostenutoMap'
];
export const ActionTypeMaps: ActionTypeMapString = [
	'ButtonMap',
	'SustainMap',
	'AntiSustainMap',
	'SostenutoMap',
	'AntiSostenutoMap'
];
type ActionTypeTrackerString = [
	'ButtonTracker',
	'SustainTracker',
	'AntiSustainTracker',
	'SostenutoTracker',
	'AntiSostenutoTracker'
];
export const ActionTypeTrackers: ActionTypeTrackerString = [
	'ButtonTracker',
	'SustainTracker',
	'AntiSustainTracker',
	'SostenutoTracker',
	'AntiSostenutoTracker'
];
type ActionTypeTreesString = [
	'ButtonTree',
	'SustainTree',
	'AntiSustainTree',
	'SostenutoTree',
	'AntiSostenutoTree'
];
const ActionTypeTrees: ActionTypeTreesString = [
	'ButtonTree',
	'SustainTree',
	'AntiSustainTree',
	'SostenutoTree',
	'AntiSostenutoTree'
];

function HydrateGutList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
		QOP.GutList.RequireFretMap.push(QOPUserData.GutList[gutIndex].RequireFret);
		QOP.GutList.RequireValveMap.push(QOPUserData.GutList[gutIndex].RequireValve);
		QOP.GutList.RequireComboMap.push(QOPUserData.GutList[gutIndex].RequireCombo);
		QOP.GutList.OpenGutNoteIDMap.push(QOPUserData.GutList[gutIndex].OpenGutNoteID);

		const emptyArray: SimpleWaveformTypeString[] = [];
		QOP.Oscillators.OscWaveType.push(emptyArray);
		for (let scale = 0; scale < QOPUserData.ScaleList.length; scale++) {
			QOP.Oscillators.OscWaveType[gutIndex][scale] =
				QOPUserData.GutList[gutIndex].OpenGutWaveType[scale];
		}

		for (let propNum = 0; propNum < ActionTypeTrackers.length; propNum++) {
			const eventCodeProp = EventCodeProperties[propNum];
			const actionState = ActionTypeStates[propNum];
			const actionMap = ActionTypeMaps[propNum];
			const actionTracker = ActionTypeTrackers[propNum];
			const actionTree = ActionTypeTrees[propNum];
			QOP.GutList[actionState].push(false);
			QOP.GutList[actionTracker].push({});

			if (Object.keys(QOPUserData.GutList[gutIndex][eventCodeProp]).length > 0) {
				for (const key in QOPUserData.GutList[gutIndex][eventCodeProp]) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = QOPUserData.GutList[gutIndex][eventCodeProp][eventCode];
					if (eventValue !== undefined) {
						QOP.GutList[actionMap][eventCode][gutIndex] = eventValue;
						QOP.GutList[actionTracker][gutIndex][key] = false;

						for (let eNumber = 0; eNumber < 2; eNumber++) {
							let kdku: 'keydown' | 'keyup' = 'keydown';
							if (eNumber === 1) {
								kdku = 'keyup';
							}

							if (eventValue[eNumber] !== 0 || eventValue[eNumber] !== 0) {
								if (QOP[actionTree][kdku][eventCode] === undefined) {
									QOP[actionTree][kdku][eventCode] = new TreeATListsTemplate();
									const KEventCode = QOP[actionTree][kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.GutList.push(gutIndex);
									}
								} else {
									const KEventCode = QOP[actionTree][kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.GutList.push(gutIndex);
									}
								}
							}
						}
					}
				}
			}
		}

		QOP.GutList.TranspositionState.push([0, 0]);
		if (Object.keys(QOPUserData.GutList[gutIndex]['TranspositionEventCodes']).length > 0) {
			for (const key in QOPUserData.GutList[gutIndex]['TranspositionEventCodes']) {
				const eventCode = key as QOPValidEventCodesString;
				const eventValue = QOPUserData.GutList[gutIndex].TranspositionEventCodes[eventCode];
				
				if (eventValue !== undefined) {
					QOP.GutList.TranspositionMap[eventCode][gutIndex] = eventValue;
				
					for (let eNumber = 0; eNumber < 2; eNumber++) {
						let kdku: 'keydown' | 'keyup' = 'keydown';
						if (eNumber === 1) {
							kdku = 'keyup';
						}

						if (eventValue[eNumber][0] !== 0 || eventValue[eNumber][1] !== 0) {
							if (QOP.TranspositionTree[kdku][eventCode] === undefined) {
								QOP.TranspositionTree[kdku][eventCode] = new TreeTRListsTemplate();
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.GutList.push(gutIndex);
								}
							} else {
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.GutList.push(gutIndex);
								}
							}
						}
					}
				}
			}
		}
	}
}
function HydrateFretSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
		QOP.FretSetList[gutIndex] = new QOPFretSetTemplate();
		const fretSetIndex = QOP.FretSetList[gutIndex];
		const UDGut = QOPUserData.GutList[gutIndex];
		
		for (let fretIndex = 0; fretIndex < UDGut.FretSet.length; fretIndex++) {
			for (let propNum = 0; propNum < ActionTypeTrackers.length; propNum++) {
				const eventCodeProp = EventCodeProperties[propNum];
				const actionState = ActionTypeStates[propNum];
				const actionMap = ActionTypeMaps[propNum];
				const actionTracker = ActionTypeTrackers[propNum];
				const actionTree = ActionTypeTrees[propNum];
				fretSetIndex[actionState].push(false);
				fretSetIndex[actionTracker].push({});

				if (Object.keys(UDGut.FretSet[fretIndex][eventCodeProp]).length > 0) {
					for (const key in UDGut.FretSet[fretIndex][eventCodeProp]) {
						const eventCode = key as QOPValidEventCodesString;
						const eventValue = UDGut.FretSet[fretIndex][eventCodeProp][eventCode];
						if (eventValue !== undefined) {
							fretSetIndex[actionMap][eventCode][fretIndex] = eventValue;
							fretSetIndex[actionTracker][fretIndex][key] = false;

							for (let eNumber = 0; eNumber < 2; eNumber++) {
								let kdku: 'keydown' | 'keyup' = 'keydown';
								if (eNumber === 1) {
									kdku = 'keyup';
								}

								if (eventValue[eNumber] !== 0 || eventValue[eNumber] !== 0) {
									if (QOP[actionTree][kdku][eventCode] === undefined) {
										QOP[actionTree][kdku][eventCode] = new TreeATListsTemplate();
										const KEventCode = QOP[actionTree][kdku][eventCode];
										if (KEventCode !== undefined) {
											KEventCode.FretSetList[gutIndex].push(fretIndex);
										}
									} else {
										const KEventCode = QOP[actionTree][kdku][eventCode];
										if (KEventCode !== undefined) {
											KEventCode.FretSetList[gutIndex].push(fretIndex);
										}
									}
								}
							}
						}
					}
				}
			}

			fretSetIndex.TranspositionState.push([0, 0]);
			if (Object.keys(UDGut['TranspositionEventCodes']).length > 0) {
				for (const key in UDGut['TranspositionEventCodes']) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = UDGut.TranspositionEventCodes[eventCode];

					if (eventValue !== undefined) {
						fretSetIndex.TranspositionMap[eventCode][gutIndex] = eventValue;

						for (let eNumber = 0; eNumber < 2; eNumber++) {
							let kdku: 'keydown' | 'keyup' = 'keydown';
							if (eNumber === 1) {
								kdku = 'keyup';
							}

							if (eventValue[eNumber][0] !== 0 || eventValue[eNumber][1] !== 0) {
								if (QOP.TranspositionTree[kdku][eventCode] === undefined) {
									QOP.TranspositionTree[kdku][eventCode] = new TreeTRListsTemplate();
									const KEventCode = QOP.TranspositionTree[kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.FretSetList[gutIndex].push(fretIndex);
									}
								} else {
									const KEventCode = QOP.TranspositionTree[kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.FretSetList[gutIndex].push(fretIndex);
									}
								}
							}
						}
					}
				}
			}

			for (let propNum = 0; propNum < DeltaTypes.length; propNum++) {
				const deltaProp = DeltaTypes[propNum];
				fretSetIndex[DeltaTypeMaps[propNum]][fretIndex] = UDGut.FretSet[fretIndex][deltaProp];
			}
		}
	}
}
function HydrateValveList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let valveIndex = 0; valveIndex < QOPUserData.ValveList.length; valveIndex++) {
		for (let propNum = 0; propNum < ActionTypeTrackers.length; propNum++) {
			const eventCodeProp = EventCodeProperties[propNum];
			const actionState = ActionTypeStates[propNum];
			const actionMap = ActionTypeMaps[propNum];
			const actionTracker = ActionTypeTrackers[propNum];
			const actionTree = ActionTypeTrees[propNum];

			QOP.ValveList[actionState].push(false);
			QOP.ValveList[actionTracker].push({});

			if (Object.keys(QOPUserData.ValveList[valveIndex][eventCodeProp]).length > 0) {
				for (const key in QOPUserData.ValveList[valveIndex][eventCodeProp]) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = QOPUserData.ValveList[valveIndex][eventCodeProp][eventCode];
					if (eventValue !== undefined) {
						QOP.ValveList[actionMap][eventCode][valveIndex] = eventValue;
						QOP.ValveList[actionTracker][valveIndex][key] = false;

						for (let eNumber = 0; eNumber < 2; eNumber++) {
							let kdku: 'keydown' | 'keyup' = 'keydown';
							if (eNumber === 1) {
								kdku = 'keyup';
							}

							if (eventValue[eNumber] !== 0 || eventValue[eNumber] !== 0) {
								if (QOP[actionTree][kdku][eventCode] === undefined) {
									QOP[actionTree][kdku][eventCode] = new TreeATListsTemplate();
									const KEventCode = QOP[actionTree][kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.ValveList.push(valveIndex);
									}
								} else {
									const KEventCode = QOP[actionTree][kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.ValveList.push(valveIndex);
									}
								}
							}
						}
					}
				}
			}
		}

		QOP.ValveList.TranspositionState.push([0, 0]);
		if (Object.keys(QOPUserData.ValveList[valveIndex]['TranspositionEventCodes']).length > 0) {
			for (const key in QOPUserData.ValveList[valveIndex]['TranspositionEventCodes']) {
				const eventCode = key as QOPValidEventCodesString;
				const eventValue = QOPUserData.ValveList[valveIndex].TranspositionEventCodes[eventCode];
				if (eventValue !== undefined) {
					QOP.ValveList.TranspositionMap[eventCode][valveIndex] = eventValue;

					for (let eNumber = 0; eNumber < 2; eNumber++) {
						let kdku: 'keydown' | 'keyup' = 'keydown';
						if (eNumber === 1) {
							kdku = 'keyup';
						}

						if (eventValue[eNumber][0] !== 0 || eventValue[eNumber][1] !== 0) {
							if (QOP.TranspositionTree[kdku][eventCode] === undefined) {
								QOP.TranspositionTree[kdku][eventCode] = new TreeTRListsTemplate();
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.ValveList.push(valveIndex);
								}
							} else {
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.ValveList.push(valveIndex);
								}
							}
						}
					}
				}
			}
		}

		for (let propNum = 0; propNum < DeltaTypes.length; propNum++) {
			const deltaProp = DeltaTypes[propNum];
			for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
				QOP.ValveList[DeltaTypeMaps[propNum]][valveIndex][gutIndex] =
					QOPUserData.ValveList[valveIndex].DeltaSet[gutIndex][deltaProp];
				QOP.ValveList.ResultantNoteIDDelta.push(0);
				QOP.ValveList.ResultantCentsDelta.push(0);
			}
		}
	}
}
function HydrateChartList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let chartIndex = 0; chartIndex < QOPUserData.ChartList.length; chartIndex++) {
		QOP.ChartList.TranspositionState.push([0, 0]);
		if (Object.keys(QOPUserData.ChartList[chartIndex]['TranspositionEventCodes']).length > 0) {
			for (const key in QOPUserData.ChartList[chartIndex]['TranspositionEventCodes']) {
				const eventCode = key as QOPValidEventCodesString;
				const eventValue = QOPUserData.ChartList[chartIndex].TranspositionEventCodes[eventCode];
				
				if (eventValue !== undefined) {
					QOP.ChartList.TranspositionMap[eventCode][chartIndex] = eventValue;
				
					for (let eNumber = 0; eNumber < 2; eNumber++) {
						let kdku: 'keydown' | 'keyup' = 'keydown';
						if (eNumber === 1) {
							kdku = 'keyup';
						}

						if (eventValue[eNumber][0] !== 0 || eventValue[eNumber][1] !== 0) {
							if (QOP.TranspositionTree[kdku][eventCode] === undefined) {
								QOP.TranspositionTree[kdku][eventCode] = new TreeTRListsTemplate();
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.ChartList.push(chartIndex);
								}
							} else {
								const KEventCode = QOP.TranspositionTree[kdku][eventCode];
								if (KEventCode !== undefined) {
									KEventCode.ChartList.push(chartIndex);
								}
							}
						}
					}
				}
			}
		}
	}
}
function HydratePadSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let chartIndex = 0; chartIndex < QOPUserData.ChartList.length; chartIndex++) {
		QOP.PadSetList[chartIndex] = new QOPPadSetTemplate();
		const padSetIndex = QOP.PadSetList[chartIndex];
		const UDChart = QOPUserData.ChartList[chartIndex];
		for (let padIndex = 0; padIndex < UDChart.PadSet.length; padIndex++) {
			for (let propNum = 0; propNum < ActionTypeTrackers.length; propNum++) {
				const eventCodeProp = EventCodeProperties[propNum];
				const actionState = ActionTypeStates[propNum];
				const actionMap = ActionTypeMaps[propNum];
				const actionTracker = ActionTypeTrackers[propNum];
				const actionTree = ActionTypeTrees[propNum];
				padSetIndex[actionState].push(false);
				padSetIndex[actionTracker].push({});

				if (Object.keys(UDChart.PadSet[padIndex][eventCodeProp]).length > 0) {
					for (const key in UDChart.PadSet[padIndex][eventCodeProp]) {
						const eventCode = key as QOPValidEventCodesString;
						const eventValue = UDChart.PadSet[padIndex][eventCodeProp][eventCode];
						if (eventValue !== undefined) {
							padSetIndex[actionMap][eventCode][chartIndex] = eventValue;
							padSetIndex[actionTracker][chartIndex][key] = false;

							for (let eNumber = 0; eNumber < 2; eNumber++) {
								let kdku: 'keydown' | 'keyup' = 'keydown';
								if (eNumber === 1) {
									kdku = 'keyup';
								}

								if (eventValue[eNumber] !== 0 || eventValue[eNumber] !== 0) {
									if (QOP[actionTree][kdku][eventCode] === undefined) {
										QOP[actionTree][kdku][eventCode] = new TreeATListsTemplate();
										const KEventCode = QOP[actionTree][kdku][eventCode];
										if (KEventCode !== undefined) {
											KEventCode.PadSetList[chartIndex].push(padIndex);
										}
									} else {
										const KEventCode = QOP[actionTree][kdku][eventCode];
										if (KEventCode !== undefined) {
											KEventCode.PadSetList[chartIndex].push(padIndex);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
function HydrateComboSetList(QOPUserData: QOPUserDataTemplate, QOP: QOPTemplate): void {
	for (let chartIndex = 0; chartIndex < QOPUserData.ChartList.length; chartIndex++) {
		QOP.ComboSetList[chartIndex] = new QOPComboSetTemplate();
		const comboSetIndex = QOP.ComboSetList[chartIndex];
		const UDChart = QOPUserData.ChartList[chartIndex];

		for (let comboIndex = 0; comboIndex < UDChart.ComboSet.length; comboIndex++) {
			for (let propNum = 0; propNum < DeltaTypes.length; propNum++) {
				const deltaProp = DeltaTypes[propNum];
				for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
					comboSetIndex[DeltaTypeMaps[propNum]][comboIndex][gutIndex] =
						UDChart.ComboSet[comboIndex].DeltaSet[gutIndex][deltaProp];
					comboSetIndex.ResultantNoteIDDelta.push(0);
					comboSetIndex.ResultantCentsDelta.push(0);
				}
			}

			if (Object.keys(UDChart['TranspositionEventCodes']).length > 0) {
				for (const key in UDChart['TranspositionEventCodes']) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = UDChart.TranspositionEventCodes[eventCode];

					if (eventValue !== undefined) {
						comboSetIndex.TranspositionMap[eventCode][chartIndex] = eventValue;

						for (let eNumber = 0; eNumber < 2; eNumber++) {
							let kdku: 'keydown' | 'keyup' = 'keydown';
							if (eNumber === 1) {
								kdku = 'keyup';
							}

							if (eventValue[eNumber][0] !== 0 || eventValue[eNumber][1] !== 0) {
								if (QOP.TranspositionTree[kdku][eventCode] === undefined) {
									QOP.TranspositionTree[kdku][eventCode] = new TreeTRListsTemplate();
									const KEventCode = QOP.TranspositionTree[kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.ComboSetList[chartIndex].push(comboIndex);
									}
								} else {
									const KEventCode = QOP.TranspositionTree[kdku][eventCode];
									if (KEventCode !== undefined) {
										KEventCode.ComboSetList[chartIndex].push(comboIndex);
									}
								}
							}
						}
					}
				}
			}
		}

		comboSetIndex.ComboMap = Array.from({ length: UDChart.PadSet.length + 1 }, () => []); // Initialize ComboMap with array elements for each pad plus one for zero-true combos
		UDChart.ComboSet.forEach((combo, comboIndex) => {
			const trueIndexes = combo.Combo.reduce((result: number[], value, index) => {
				if (value) result.push(index); // Collect the index numbers of the true values
				return result;
			}, []);

			const comboMapPiece = {
				TrueIndexes: [...trueIndexes],
				ComboIndex: comboIndex
			};

			comboSetIndex.ComboMap[trueIndexes.length].push(comboMapPiece); // Add trueIndexes to the appropriate element of ComboMap
		});
	}
}

export const audioContext = new (AudioContext || window.AudioContext)();
function HydrateQOP(QOPUserData: QOPUserDataTemplate) {
	const QOP = new QOPTemplate();

	HydrateScaleList(QOPUserData, QOP);
	HydrateGutList(QOPUserData, QOP);
	HydrateFretSetList(QOPUserData, QOP);
	HydrateValveList(QOPUserData, QOP);
	HydrateChartList(QOPUserData, QOP);
	HydratePadSetList(QOPUserData, QOP);
	HydrateComboSetList(QOPUserData, QOP);

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

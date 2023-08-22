import type {
	QOPUserDataTemplate,
	SimpleWaveformTypeString,
	QOPValidEventCodesString
} from '../UserDataMode/initQOPUD.js';
import { FindClosestMIDINote } from './woodshedMIDIOUT.js';
export function HydrateQOP(QOPUserData: QOPUserDataTemplate, audioContext: AudioContext) {
	const QOP = new QOPTemplate();

	QOP.StateMachine.DebounceTimer = QOPUserData.DebounceTimer;
	QOP.Oscillators.OscModeToggle = QOPUserData.OscModeToggle;
	QOP.MIDIOutput.MIDIOutputModeToggle = QOPUserData.MIDIOutputModeToggle;

	HydrateScaleList(QOPUserData, QOP);

	HydrateGutList(QOPUserData, QOP, audioContext);
	HydrateFretSetList(QOPUserData, QOP);
	HydrateValveList(QOPUserData, QOP);
	HydrateChartList(QOPUserData, QOP);
	HydratePadSetList(QOPUserData, QOP);
	HydrateComboSetList(QOPUserData, QOP);

	return QOP;
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
	ChangedActionTypes: ActionTypesString[];
	ChangedLists: QOPActionTypeLists[];
	ChangedTransposition: boolean;
	FretConfirm: boolean[];
	ValveConfirm: boolean;
	ComboConfirm: boolean;
	NoteIDAccumulator: number[][];
	CentsAccumulator: number[];
	TotalFrequency: number[][];
	PrevTotalFrequency: number[][];
	GutSoundState: boolean[];
	DebounceTimer: number;
}
class QOPStateMachineTemplate implements IQOPStateMachineTemplate {
	public ChangedActionTypes: ActionTypesString[];
	public ChangedLists: QOPActionTypeLists[];
	public ChangedTransposition: boolean;
	public FretConfirm: boolean[];
	public ValveConfirm: boolean;
	public ComboConfirm: boolean;
	public NoteIDAccumulator: number[][];
	public CentsAccumulator: number[];
	public TotalFrequency: number[][];
	public PrevTotalFrequency: number[][];
	public GutSoundState: boolean[];
	public DebounceTimer: number;

	constructor() {
		this.ChangedActionTypes = [] as ActionTypesString[];
		this.ChangedLists = [] as QOPActionTypeLists[];
		this.ChangedTransposition = false;
		this.FretConfirm = [];
		this.ValveConfirm = false;
		this.ComboConfirm = false;
		this.NoteIDAccumulator = [];
		this.CentsAccumulator = [];
		this.TotalFrequency = [];
		this.PrevTotalFrequency = [];
		this.GutSoundState = [];
		this.DebounceTimer = 0;
	}
}
interface IQOPOscillatorsTemplate {
	OscNodes: OscillatorNode[][];
	OscGainNodes: GainNode[][];
	OscWaveform: SimpleWaveformTypeString[][];
	OscNodesMute: boolean[];
}
class QOPOscillatorsTemplate implements IQOPOscillatorsTemplate {
	public OscModeToggle: boolean;
	public OscNodes: OscillatorNode[][];
	public OscGainNodes: GainNode[][];
	public OscWaveform: SimpleWaveformTypeString[][];
	public OscNodesMute: boolean[];

	constructor() {
		this.OscModeToggle = false;
		this.OscNodes = [];
		this.OscGainNodes = [];
		this.OscWaveform = [];
		this.OscNodesMute = [];
	}
}
interface IQOPMIDIOutputTemplate {
	MIDIOutputModeToggle: boolean;
	GutMIDIOUTDisabled: boolean[];
}
class QOPMIDIOutputTemplate implements IQOPMIDIOutputTemplate {
	public MIDIOutputModeToggle: boolean;
	public GutMIDIOUTDisabled: boolean[];

	constructor() {
		this.MIDIOutputModeToggle = false;
		this.GutMIDIOUTDisabled = [];
	}
}

type QOPActionTypeLists = 'GutList' | 'FretSetList' | 'ValveList' | 'PadSetList';
export const QOPActionTypeListsArray: QOPActionTypeLists[] = [
	'GutList',
	'FretSetList',
	'ValveList',
	'PadSetList'
];
type DeltaTypesString = 'DeltaType' | 'NoteIDDelta' | 'CentsDelta';
const DeltaTypes: DeltaTypesString[] = ['DeltaType', 'NoteIDDelta', 'CentsDelta'];
type DeltaTypeMapsString = 'DeltaTypeMap' | 'NoteIDDeltaMap' | 'CentsDeltaMap';
const DeltaTypeMaps: DeltaTypeMapsString[] = ['DeltaTypeMap', 'NoteIDDeltaMap', 'CentsDeltaMap'];
export type ActionTypesString =
	| 'Sustain'
	| 'AntiSustain'
	| 'Button'
	| 'Sostenuto'
	| 'AntiSostenuto';
export const ActionTypes: ActionTypesString[] = [
	'Sustain',
	'AntiSustain',
	'Button',
	'Sostenuto',
	'AntiSostenuto'
];
type ActionTypesEventCodeString =
	| 'SustainEventCodes'
	| 'AntiSustainEventCodes'
	| 'ButtonEventCodes'
	| 'SostenutoEventCodes'
	| 'AntiSostenutoEventCodes';
const ActionTypesEventCode: ActionTypesEventCodeString[] = [
	'SustainEventCodes',
	'AntiSustainEventCodes',
	'ButtonEventCodes',
	'SostenutoEventCodes',
	'AntiSostenutoEventCodes'
];
export type ActionTypesStateString =
	| 'SustainState'
	| 'AntiSustainState'
	| 'ButtonState'
	| 'SostenutoState'
	| 'AntiSostenutoState';
const ActionTypesState: ActionTypesStateString[] = [
	'SustainState',
	'AntiSustainState',
	'ButtonState',
	'SostenutoState',
	'AntiSostenutoState'
];
type ActionTypesMapString =
	| 'ButtonMap'
	| 'SustainMap'
	| 'AntiSustainMap'
	| 'SostenutoMap'
	| 'AntiSostenutoMap';
const ActionTypesMap: ActionTypesMapString[] = [
	'SustainMap',
	'AntiSustainMap',
	'ButtonMap',
	'SostenutoMap',
	'AntiSostenutoMap'
];
export type ActionTypesTrackerString =
	| 'SustainTracker'
	| 'AntiSustainTracker'
	| 'ButtonTracker'
	| 'SostenutoTracker'
	| 'AntiSostenutoTracker';
const ActionTypesTracker: ActionTypesTrackerString[] = [
	'SustainTracker',
	'AntiSustainTracker',
	'ButtonTracker',
	'SostenutoTracker',
	'AntiSostenutoTracker'
];
export type ActionTypesTreeString =
	| 'SustainTree'
	| 'AntiSustainTree'
	| 'ButtonTree'
	| 'SostenutoTree'
	| 'AntiSostenutoTree';
const ActionTypesTree: ActionTypesTreeString[] = [
	'SustainTree',
	'AntiSustainTree',
	'ButtonTree',
	'SostenutoTree',
	'AntiSostenutoTree'
];

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
class QOPActionTypes implements IQOPActionTypes {
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
class QOPGutTemplate extends QOPActionTypes implements IQOPGutTemplate {
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
class QOPFretSetTemplate extends QOPActionTypes implements IQOPFretSetTemplate {
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
class QOPValveTemplate extends QOPActionTypes implements IQOPValveTemplate {
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
class QOPChartTemplate implements IQOPChartTemplate {
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
class QOPPadSetTemplate extends QOPActionTypes implements IQOPPadSetTemplate {
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
class QOPComboSetTemplate implements IQOPComboSetTemplate {
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
class QOPTreeATTemplate implements IQOPTreeATTemplate {
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
class QOPTreeTRTemplate implements IQOPTreeTRTemplate {
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

function HydrateGutList(
	QOPUserData: QOPUserDataTemplate,
	QOP: QOPTemplate,
	audioContext: AudioContext
): void {
	for (let gutIndex = 0; gutIndex < QOPUserData.GutList.length; gutIndex++) {
		QOP.Oscillators.OscNodes.push([]);
		QOP.Oscillators.OscGainNodes.push([]);
		QOP.Oscillators.OscNodesMute.push(false);
		const emptyWaveformArray: SimpleWaveformTypeString[] = [];
		QOP.Oscillators.OscWaveform.push(emptyWaveformArray);

		QOP.MIDIOutput.GutMIDIOUTDisabled.push(true);

		QOP.StateMachine.GutSoundState.push(false);
		QOP.StateMachine.NoteIDAccumulator.push([]);
		QOP.StateMachine.CentsAccumulator.push(0);
		QOP.StateMachine.TotalFrequency.push([]);
		QOP.StateMachine.PrevTotalFrequency.push([]);
		QOP.StateMachine.FretConfirm.push(false);

		QOP.GutList.RequireFretMap.push(QOPUserData.GutList[gutIndex].RequireFret);
		QOP.GutList.RequireValveMap.push(QOPUserData.GutList[gutIndex].RequireValve);
		QOP.GutList.RequireComboMap.push(QOPUserData.GutList[gutIndex].RequireCombo);
		QOP.GutList.OpenGutNoteIDMap.push(QOPUserData.GutList[gutIndex].OpenGutNoteID);

		for (let scaleIndex = 0; scaleIndex < QOPUserData.ScaleList.length; scaleIndex++) {
			QOP.Oscillators.OscWaveform[gutIndex][scaleIndex] =
				QOPUserData.GutList[gutIndex].OscWaveType[scaleIndex];

			const newOscillator = new OscillatorNode(audioContext);
			QOP.Oscillators.OscNodes[gutIndex].push(newOscillator);

			const gainNode = new GainNode(audioContext);
			gainNode.connect(audioContext.destination);
			gainNode.gain.value = 0.3;
			QOP.Oscillators.OscGainNodes[gutIndex].push(gainNode);
			QOP.Oscillators.OscNodes[gutIndex][scaleIndex].connect(
				QOP.Oscillators.OscGainNodes[gutIndex][scaleIndex]
			);

			QOP.StateMachine.NoteIDAccumulator[gutIndex].push(0);
			QOP.StateMachine.TotalFrequency[gutIndex].push(0);
			QOP.StateMachine.PrevTotalFrequency[gutIndex].push(0);
		}

		for (let propNum = 0; propNum < ActionTypesTracker.length; propNum++) {
			const eventCodeProp = ActionTypesEventCode[propNum];
			const actionState = ActionTypesState[propNum];
			const actionMap = ActionTypesMap[propNum];
			const actionTracker = ActionTypesTracker[propNum];
			const actionTree = ActionTypesTree[propNum];
			QOP.GutList[actionState].push(false);
			QOP.GutList[actionTracker].push({});

			if (Object.keys(QOPUserData.GutList[gutIndex][eventCodeProp]).length > 0) {
				for (const key in QOPUserData.GutList[gutIndex][eventCodeProp]) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = QOPUserData.GutList[gutIndex][eventCodeProp][eventCode];
					if (eventValue !== undefined) {
						if (QOP.GutList[actionMap][eventCode] === undefined) {
							QOP.GutList[actionMap][eventCode] = {};
						}
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
					if (QOP.GutList.TranspositionMap[eventCode] === undefined) {
						QOP.GutList.TranspositionMap[eventCode] = {};
					}
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
			for (let propNum = 0; propNum < ActionTypesTracker.length; propNum++) {
				const eventCodeProp = ActionTypesEventCode[propNum];
				const actionState = ActionTypesState[propNum];
				const actionMap = ActionTypesMap[propNum];
				const actionTracker = ActionTypesTracker[propNum];
				const actionTree = ActionTypesTree[propNum];
				fretSetIndex[actionState].push(false);
				fretSetIndex[actionTracker].push({});

				if (Object.keys(UDGut.FretSet[fretIndex][eventCodeProp]).length > 0) {
					for (const key in UDGut.FretSet[fretIndex][eventCodeProp]) {
						const eventCode = key as QOPValidEventCodesString;
						const eventValue = UDGut.FretSet[fretIndex][eventCodeProp][eventCode];
						if (eventValue !== undefined) {
							if (fretSetIndex[actionMap][eventCode] === undefined) {
								fretSetIndex[actionMap][eventCode] = {};
							}
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
						if (fretSetIndex.TranspositionMap[eventCode] === undefined) {
							fretSetIndex.TranspositionMap[eventCode] = {};
						}
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
		for (let propNum = 0; propNum < ActionTypesTracker.length; propNum++) {
			const eventCodeProp = ActionTypesEventCode[propNum];
			const actionState = ActionTypesState[propNum];
			const actionMap = ActionTypesMap[propNum];
			const actionTracker = ActionTypesTracker[propNum];
			const actionTree = ActionTypesTree[propNum];

			QOP.ValveList[actionState].push(false);
			QOP.ValveList[actionTracker].push({});

			if (Object.keys(QOPUserData.ValveList[valveIndex][eventCodeProp]).length > 0) {
				for (const key in QOPUserData.ValveList[valveIndex][eventCodeProp]) {
					const eventCode = key as QOPValidEventCodesString;
					const eventValue = QOPUserData.ValveList[valveIndex][eventCodeProp][eventCode];
					if (eventValue !== undefined) {
						if (QOP.ValveList[actionMap][eventCode] === undefined) {
							QOP.ValveList[actionMap][eventCode] = {};
						}
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
					if (QOP.ValveList.TranspositionMap[eventCode] === undefined) {
						QOP.ValveList.TranspositionMap[eventCode] = {};
					}
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
				if (QOP.ValveList[DeltaTypeMaps[propNum]][valveIndex] === undefined) {
					QOP.ValveList[DeltaTypeMaps[propNum]][valveIndex] = [];
				}
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
					if (QOP.ChartList.TranspositionMap[eventCode] === undefined) {
						QOP.ChartList.TranspositionMap[eventCode] = {};
					}
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
			for (let propNum = 0; propNum < ActionTypesTracker.length; propNum++) {
				const eventCodeProp = ActionTypesEventCode[propNum];
				const actionState = ActionTypesState[propNum];
				const actionMap = ActionTypesMap[propNum];
				const actionTracker = ActionTypesTracker[propNum];
				const actionTree = ActionTypesTree[propNum];
				padSetIndex[actionState].push(false);
				padSetIndex[actionTracker].push({});

				if (Object.keys(UDChart.PadSet[padIndex][eventCodeProp]).length > 0) {
					for (const key in UDChart.PadSet[padIndex][eventCodeProp]) {
						const eventCode = key as QOPValidEventCodesString;
						const eventValue = UDChart.PadSet[padIndex][eventCodeProp][eventCode];
						if (eventValue !== undefined) {
							if (padSetIndex[actionMap][eventCode] === undefined) {
								padSetIndex[actionMap][eventCode] = {};
							}
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
					if (comboSetIndex[DeltaTypeMaps[propNum]][comboIndex] === undefined) {
						comboSetIndex[DeltaTypeMaps[propNum]][comboIndex] = [];
					}
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
						if (comboSetIndex.TranspositionMap[eventCode] === undefined) {
							comboSetIndex.TranspositionMap[eventCode] = {};
						}
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

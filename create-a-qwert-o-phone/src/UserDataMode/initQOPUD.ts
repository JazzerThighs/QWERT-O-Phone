export const CurrentQOPVersion = 'qop0.sk.69';

export interface IQOPUserDataTemplate {
	Name: string;
	Version: string;
	Timestamp: string;
	Deprecated: boolean;
	Description: string;

	OscModeToggle: boolean;
	MIDIOutputModeToggle: boolean;
	DebounceTimer: number;

	ScaleList: ScaleUDTemplate[];
	GutList: GutUDTemplate[];
	ValveList: ValveUDTemplate[];
	ChartList: ChartUDTemplate[];
}
export class QOPUserDataTemplate implements IQOPUserDataTemplate {
	public Name: string;
	public Version: string;
	public Timestamp: string;
	public Deprecated: boolean;
	public Description: string;

	public OscModeToggle: boolean;
	public MIDIOutputModeToggle: boolean;
	public DebounceTimer: number;

	public ScaleList: ScaleUDTemplate[];
	public GutList: GutUDTemplate[];
	public ValveList: ValveUDTemplate[];
	public ChartList: ChartUDTemplate[];

	constructor() {
		this.Name = 'QWERT-O-Phone';
		this.Version = CurrentQOPVersion;
		this.Timestamp = QOPUDTimestamp();
		this.Deprecated = false;
		this.Description = 'Create-A-QWERT-O-Phone';

		this.OscModeToggle = true;
		this.MIDIOutputModeToggle = false;
		this.DebounceTimer = 10;

		this.ScaleList = [new ScaleUDTemplate()];
		this.GutList = [new GutUDTemplate()];
		this.ValveList = [new ValveUDTemplate()];
		this.ChartList = [new ChartUDTemplate()];
	}
}

export function QOPUDTimestamp() {
	const now = new Date();
	const formattedDateTime = now.toISOString().slice(0, 16).replace('T', '_').replace(/:/g, '-');
	return formattedDateTime;
}

type DeltaTypesString = 'NoteID' | 'Cents' | 'Both';
export type SimpleWaveformTypeString = 'sine' | 'triangle' | 'square' | 'sawtooth';
export type ScaleTypeString =
	| 'Equal Temperament'
	| 'Just Intonation'
	| 'Pythagorean Tuning (5-Limit)'
	| 'Werckmeister Temperament (Baroque German Music)'
	| 'Meantone Temperament (Renaissance and Baroque Music)'
	| 'Kirnberger Temperament (Baroque German Music)'
	| 'Maqam (Arabic Music)'
	| 'Ndebele Tuning (Southern African Music)'
	| 'Gagaku (Japanese Court Music)'
	| 'Pelog and Slendro (Indonesian Gamelan Music)'
	| 'Hijaz (Turkish Music)'
	| 'Shona Mbira Tuning (Zimbabwean Music)'
	| 'Hexany System (Native American Music)'
	| 'Bohlen-Pierce Scale (microtonal Music)';
export type QOPValidEventCodesString =
	| 'KeyA'
	| 'KeyB'
	| 'KeyC'
	| 'KeyD'
	| 'KeyE'
	| 'KeyF'
	| 'KeyG'
	| 'KeyH'
	| 'KeyI'
	| 'KeyJ'
	| 'KeyK'
	| 'KeyL'
	| 'KeyM'
	| 'KeyN'
	| 'KeyO'
	| 'KeyP'
	| 'KeyQ'
	| 'KeyR'
	| 'KeyS'
	| 'KeyT'
	| 'KeyU'
	| 'KeyV'
	| 'KeyW'
	| 'KeyX'
	| 'KeyY'
	| 'KeyZ'
	| 'Digit1'
	| 'Digit2'
	| 'Digit3'
	| 'Digit4'
	| 'Digit5'
	| 'Digit6'
	| 'Digit7'
	| 'Digit8'
	| 'Digit9'
	| 'Digit0'
	| 'Numpad0'
	| 'Numpad1'
	| 'Numpad2'
	| 'Numpad3'
	| 'Numpad4'
	| 'Numpad5'
	| 'Numpad6'
	| 'Numpad7'
	| 'Numpad8'
	| 'Numpad9'
	| 'Backquote'
	| 'Minus'
	| 'Equal'
	| 'BracketLeft'
	| 'BracketRight'
	| 'Backslash'
	| 'Semicolon'
	| 'Quote'
	| 'Comma'
	| 'Period'
	| 'Slash'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'NumpadDecimal'
	| 'NumpadAdd'
	| 'NumpadSubtract'
	| 'NumpadMultiply'
	| 'NumpadDivide';
export type ActionEventCodes = Partial<{
	[QOPValidEventCode in QOPValidEventCodesString]: [number, number];
}>;
export type TranspositionObject = Partial<{
	[QOPValidEventCode in QOPValidEventCodesString]: [[number, number], [number, number]];
}>;

export interface INoteUDTemplate {
	NoteID: number;
	Name: string[];
	Description: string;
	PitchHz: number;
	ColorHex: string;
}
export class NoteUDTemplate implements INoteUDTemplate {
	public NoteID: number;
	public Name: string[];
	public Description: string;
	public PitchHz: number;
	public ColorHex: string;
	constructor() {
		this.NoteID = 0;
		this.Name = [];
		this.Description = '';
		this.PitchHz = 0; //FLOAT Frequency in Hz of this note (0 < x)
		this.ColorHex = '#FFFFFF';
	}
}
interface IActionTypeUDTemplate {
	Name: string;
	Description: string;
	ButtonEventCodes: ActionEventCodes;
	SustainEventCodes: ActionEventCodes;
	AntiSustainEventCodes: ActionEventCodes;
	SostenutoEventCodes: ActionEventCodes;
	AntiSostenutoEventCodes: ActionEventCodes;
}
export class ActionTypeUDTemplate implements IActionTypeUDTemplate {
	public Name: string;
	public Description: string;
	public ButtonEventCodes: ActionEventCodes;
	public SustainEventCodes: ActionEventCodes;
	public AntiSustainEventCodes: ActionEventCodes;
	public SostenutoEventCodes: ActionEventCodes;
	public AntiSostenutoEventCodes: ActionEventCodes;
	constructor() {
		this.Name = '';
		this.Description = '';
		this.ButtonEventCodes = {} as ActionEventCodes;
		this.SustainEventCodes = {} as ActionEventCodes;
		this.AntiSustainEventCodes = {} as ActionEventCodes;
		this.SostenutoEventCodes = {} as ActionEventCodes;
		this.AntiSostenutoEventCodes = {} as ActionEventCodes;
	}
}
export interface IDeltaUDTemplate {
	DeltaType: DeltaTypesString;
	NoteIDDelta: number;
	CentsDelta: number;
}
export class DeltaUDTemplate implements IDeltaUDTemplate {
	public DeltaType: DeltaTypesString;
	public NoteIDDelta: number;
	public CentsDelta: number;
	constructor() {
		this.DeltaType = 'NoteID';
		this.NoteIDDelta = 0; // INT (any)
		this.CentsDelta = 0; // FLOAT (any)
	}
}
export interface IScaleUDTemplate {
	ScaleID: number;
	Name: string;
	Description: string;
	ScaleType: ScaleTypeString;
	ReferenceNote: number;
	TuningHz: number;
	OctaveDivisions: number;
	NoteClassSet: string[][];
	NoteSet: NoteUDTemplate[];
}
export class ScaleUDTemplate implements IScaleUDTemplate {
	public ScaleID: number;
	public Name: string;
	public Description: string;
	public ScaleType: ScaleTypeString;
	public ReferenceNote: number;
	public TuningHz: number;
	public OctaveDivisions: number;
	public NoteClassSet: string[][];
	public NoteSet: NoteUDTemplate[];
	constructor() {
		this.ScaleID = 0;
		this.Name = '';
		this.Description = '';
		this.ScaleType = 'Equal Temperament';
		this.ReferenceNote = 0; //INT (0 <= x)
		this.TuningHz = 440; //FLOAT Frequency in Hz of this.referenceNote (0 < x)
		this.OctaveDivisions = 12;
		this.NoteClassSet = [];
		this.NoteSet = [new NoteUDTemplate()];
	}
}
export interface IFretUDTemplate {
	TranspositionEventCodes: TranspositionObject;
	DeltaType: DeltaTypesString;
	NoteIDDelta: number;
	CentsDelta: number;
}
export class FretUDTemplate extends ActionTypeUDTemplate implements IFretUDTemplate {
	public TranspositionEventCodes: TranspositionObject;
	public DeltaType: DeltaTypesString;
	public NoteIDDelta: number;
	public CentsDelta: number;
	constructor() {
		super();
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.DeltaType = 'NoteID';
		this.NoteIDDelta = 0;
		this.CentsDelta = 0;
	}
}
export interface IGutUDTemplate {
	OpenGutNoteID: number[];

	GutOscMute: boolean;
	OscWaveType: SimpleWaveformTypeString[];
	OscGain: number[];

	GutMIDIOutputToggle: boolean;

	TranspositionEventCodes: TranspositionObject;
	RequireFret: boolean;
	RequireValve: boolean;
	RequireCombo: boolean;
	FretSet: FretUDTemplate[];
}
export class GutUDTemplate extends ActionTypeUDTemplate implements IGutUDTemplate {
	public OpenGutNoteID: number[];

	public GutOscMute: boolean;
	public OscWaveType: SimpleWaveformTypeString[];
	public OscGain: number[];

	public GutMIDIOutputToggle: boolean;

	public TranspositionEventCodes: TranspositionObject;
	public RequireFret: boolean;
	public RequireValve: boolean;
	public RequireCombo: boolean;
	public FretSet: FretUDTemplate[];
	constructor() {
		super();
		this.OpenGutNoteID = [69]; // The 69th MIDI note is A4=440Hz

		this.GutOscMute = false;
		this.OscWaveType = ['sine'];
		this.OscGain = [0.25];

		this.GutMIDIOutputToggle = false;

		this.TranspositionEventCodes = {} as TranspositionObject;
		this.RequireFret = false;
		this.RequireValve = false;
		this.RequireCombo = false;
		this.FretSet = [new FretUDTemplate()];
	}
}
export interface IValveUDTemplate {
	TranspositionEventCodes: TranspositionObject;
	DeltaSet: DeltaUDTemplate[];
}
export class ValveUDTemplate extends ActionTypeUDTemplate implements IValveUDTemplate {
	public TranspositionEventCodes: TranspositionObject;
	public DeltaSet: DeltaUDTemplate[];
	constructor() {
		super();
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.DeltaSet = [new DeltaUDTemplate()];
	}
}
export interface IComboUDTemplate {
	Name: string;
	Description: string;
	Combo: boolean[];
	TranspositionEventCodes: TranspositionObject;
	DeltaSet: DeltaUDTemplate[];
}
export class ComboUDTemplate implements IComboUDTemplate {
	public Name: string;
	public Description: string;
	public Combo: boolean[];
	public TranspositionEventCodes: TranspositionObject;
	public DeltaSet: DeltaUDTemplate[];
	constructor() {
		this.Name = '';
		this.Description = '';
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.Combo = []; // Array of BOOLEAN
		this.DeltaSet = [new DeltaUDTemplate()]; //Array of Objects
	}
}
export interface IChartUDTemplate {
	Name: string;
	Description: string;
	TranspositionEventCodes: TranspositionObject;
	PadSet: ActionTypeUDTemplate[];
	ComboSet: ComboUDTemplate[];
}
export class ChartUDTemplate implements IChartUDTemplate {
	public Name: string;
	public Description: string;
	public TranspositionEventCodes: TranspositionObject;
	public PadSet: ActionTypeUDTemplate[];
	public ComboSet: ComboUDTemplate[];
	constructor() {
		this.Name = '';
		this.Description = '';
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.PadSet = [new ActionTypeUDTemplate()];
		this.ComboSet = [new ComboUDTemplate()];
	}
}

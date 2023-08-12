import { MIDILUT } from '../WoodshedMode/woodshedMIDIOUT';

export const CurrentQOPVersion = 'qop0.0.69';
export function QOPUDTimestamp() {
	const now = new Date();
	const formattedDateTime = now.toISOString().slice(0, 16).replace('T', '_').replace(/:/g, '-');
	return formattedDateTime;
}
export class QOPUserDataTemplate {
	public Name: string;
	public Version: string;
	public Timestamp: string;
	public Deprecated: boolean;
	public Description: string;
	public ScaleList: ScaleTemplate[];
	public GutList: GutTemplate[];
	public ValveList: ValveTemplate[];
	public ChartList: ChartTemplate[];

	constructor() {
		this.Name = 'QWERT-O-Phone';
		this.Version = CurrentQOPVersion;
		this.Timestamp = QOPUDTimestamp();
		this.Deprecated = false;
		this.Description = 'Create-A-QWERT-O-Phone';
		this.ScaleList = [new ScaleTemplate()];
		this.GutList = [new GutTemplate()];
		this.ValveList = [new ValveTemplate()];
		this.ChartList = [new ChartTemplate()];
	}
}
export function HydrateScaleForUD(
	QOPUserData: QOPUserDataTemplate,
	passedScale: ScaleTemplate = new ScaleTemplate(),
	isNewAddition = true
) {
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
		passedScale.Name = 'MIDI';
		NoteClassSet = standardMIDINoteNames;
		let octave = -2; // MIDI note 0 corresponds to C-2.
		for (let note = 0; note < 127; note++) {
			NoteSet.push(new NoteTemplate());
		}
		for (let note = 0; note < NoteSet.length; note++) {
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
					NoteSet.push(new NoteTemplate());
				}
				for (let note = 0; note < NoteSet.length; note++) {
					NoteSet[note].PitchHz = TuningHz * Math.pow(2, (note - ReferenceNote) / OctaveDivisions);
				}
				break;
		}
	}

	if (isNewAddition) {
		QOPUserData.ScaleList.push(passedScale);
	}
}
/* QOPUserData stores all of the settings on the app. 
This data, in its straightforward format, is the object that matches the format of a downloadable JSON file that the User can store and use later. 
QOP, which is optimized for speed, is created using the criteria inside the QOPUserData object that the building function is passed.*/
export function BlankQOPUserData() {
	const QOPUserData = new QOPUserDataTemplate();
	HydrateScaleForUD(QOPUserData, QOPUserData.ScaleList[0], false);

	return QOPUserData;
}

export const i32HexRegExp = /^#[0-9A-Fa-f]{8}$/;
export type DeltaTypeString = 'NoteID' | 'Cents' | 'Both';
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
export type ActionEventCodes = {
	[QOPValidEventCode in QOPValidEventCodesString]: [number, number];
};
export type TranspositionObject = {
	[QOPValidEventCode in QOPValidEventCodesString]: [[number, number], [number, number]];
};

export class NoteTemplate {
	public Name: string[];
	public Description: string;
	public PitchHz: number;
	public ColorHex: string;

	constructor() {
		this.Name = [];
		this.Description = '';
		this.PitchHz = 0; //FLOAT Frequency in Hz of this note (0 < x)
		this.ColorHex = '#FFFFFFFF';
	}
}
export class ActionTypeTemplate {
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
export class DeltaTemplate {
	public DeltaType: DeltaTypeString;
	public NoteIDDelta: number;
	public CentsDelta: number;
	constructor() {
		this.DeltaType = 'NoteID';
		this.NoteIDDelta = 0; // INT (any)
		this.CentsDelta = 0; // FLOAT (any)
	}
}
export class ScaleTemplate {
	public Name: string;
	public Description: string;
	public ScaleType: ScaleTypeString;
	public ReferenceNote: number;
	public TuningHz: number;
	public OctaveDivisions: number;
	public NoteClassSet: string[][];
	public NoteSet: NoteTemplate[];

	constructor() {
		this.Name = '';
		this.Description = '';
		this.ScaleType = 'Equal Temperament';
		this.ReferenceNote = 0; //INT (0 <= x)
		this.TuningHz = 440; //FLOAT Frequency in Hz of this.referenceNote (0 < x)
		this.OctaveDivisions = 12;
		this.NoteClassSet = [];
		this.NoteSet = [new NoteTemplate()];
	}
}
export class FretTemplate extends ActionTypeTemplate {
	public TranspositionEventCodes: TranspositionObject;
	public DeltaType: DeltaTypeString;
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
export class GutTemplate extends ActionTypeTemplate {
	public OpenGutNoteID: number[];
	public OpenGutWaveType: SimpleWaveformTypeString[];
	public TranspositionEventCodes: TranspositionObject;
	public RequireFret: boolean;
	public RequireValve: boolean;
	public RequireCombo: boolean;
	public FretSet: FretTemplate[];

	constructor() {
		super();
		this.Name = '';
		this.OpenGutNoteID = [69]; // The 69th MIDI note is A4=440Hz
		this.OpenGutWaveType = ['sine'];
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.RequireFret = false; // For use with Frets
		this.RequireValve = false; // For use with Valves
		this.RequireCombo = false; // For use with PadComboCharts
		this.FretSet = [new FretTemplate()];
	}
}
export class ValveTemplate extends ActionTypeTemplate {
	public TranspositionEventCodes: TranspositionObject;
	public DeltaSet: DeltaTemplate[];
	constructor() {
		super();
		this.Name = '';
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.DeltaSet = [new DeltaTemplate()];
	}
}
export class ComboTemplate {
	public Name: string;
	public Description: string;
	public Combo: boolean[];
	public TranspositionEventCodes: TranspositionObject;
	public DeltaSet: DeltaTemplate[];
	constructor() {
		this.Name = '';
		this.Description = '';
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.Combo = []; // Array of BOOLEAN
		this.DeltaSet = [new DeltaTemplate()]; //Array of Objects
	}
}
export class ChartTemplate {
	public Name: string;
	public Description: string;
	public TranspositionEventCodes: TranspositionObject;
	public PadSet: ActionTypeTemplate[];
	public ComboSet: ComboTemplate[];

	constructor() {
		this.Name = '';
		this.Description = '';
		this.TranspositionEventCodes = {} as TranspositionObject;
		this.PadSet = [new ActionTypeTemplate()];
		this.ComboSet = [new ComboTemplate()];
	}
}

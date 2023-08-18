import type { QOPTemplate } from "./initQOP";

export function OscNodesStop(gut: number, QOP: QOPTemplate) {
	const { ScaleList } = QOP;
	const { GutSoundState } = QOP.StateMachine;
	const { OscNodes, OscGainNodes } = QOP.Oscillators;
	for (let scale = 0; scale < ScaleList.length; scale++) {
		if (OscNodes[gut][scale]) {
			OscNodes[gut][scale].disconnect(OscGainNodes[gut][scale]);
			OscNodes[gut][scale].stop();
		}
	}
	GutSoundState[gut] = false;
}
export function PanicOscNodesStop(QOP: QOPTemplate) {
	for (let gut = 0; gut < QOP.GutList.ButtonState.length; gut++) {
		OscNodesStop(gut, QOP);
	}
}

export function OscNodesUpdate(QOP: QOPTemplate, audioContext: AudioContext) {
	const { ScaleList, GutList } = QOP;
	const {
		GutSoundState,
		TotalFrequency,
		PrevTotalFrequency,
		FretConfirm,
		ValveConfirm,
		ComboConfirm
	} = QOP.StateMachine;
	const { OscNodes, OscGainNodes, OscWaveform, OscNodesMute } = QOP.Oscillators;

	for (let gut = 0; gut < GutList.ButtonState.length; gut++) {
		if (OscNodesMute[gut]) {
			continue;
		}

		if (GutList.ButtonState[gut]) {
			if (GutSoundState[gut]) {
				if (GutList.RequireFretMap[gut]) {
					if (!FretConfirm[gut]) {
						OscNodesStop(gut, QOP);
						continue;
					}
				}
				if (GutList.RequireValveMap[gut]) {
					if (!ValveConfirm) {
						OscNodesStop(gut, QOP);
						continue;
					}
				}
				if (GutList.RequireComboMap[gut]) {
					if (!ComboConfirm) {
						OscNodesStop(gut, QOP);
						continue;
					}
				}
				for (let scale = 0; scale < ScaleList.length; scale++) {
					if (OscGainNodes[gut][scale].gain.value > 0) {
						if (TotalFrequency[gut][scale] !== PrevTotalFrequency[gut][scale]) {
							OscNodes[gut][scale].disconnect(OscGainNodes[gut][scale]);
							if (OscNodes[gut][scale]) {
								OscNodes[gut][scale].stop();
							}
							const newOscillator = new OscillatorNode(audioContext);
							newOscillator.frequency.value = TotalFrequency[gut][scale];
							newOscillator.type = OscWaveform[gut][scale];
							newOscillator.connect(OscGainNodes[gut][scale]);
							newOscillator.start();
							OscNodes[gut][scale] = newOscillator;
						}
					}
				}
			} else {
				if (GutList.RequireFretMap[gut]) {
					if (!FretConfirm[gut]) {
						continue;
					}
				}
				if (GutList.RequireValveMap[gut]) {
					if (!ValveConfirm) {
						continue;
					}
				}
				if (GutList.RequireComboMap[gut]) {
					if (!ComboConfirm) {
						continue;
					}
				}
				GutSoundState[gut] = true;
				for (let scale = 0; scale < ScaleList.length; scale++) {
					if (OscGainNodes[gut][scale].gain.value > 0) {
						const newOscillator = new OscillatorNode(audioContext);
						newOscillator.frequency.value = TotalFrequency[gut][scale];
						newOscillator.connect(OscGainNodes[gut][scale]);
						newOscillator.type = OscWaveform[gut][scale];
						OscNodes[gut][scale] = newOscillator;
						OscNodes[gut][scale].start();
					}
				}
			}
		} else {
			if (GutSoundState[gut]) {
				OscNodesStop(gut, QOP);
			}
		}
	}
}

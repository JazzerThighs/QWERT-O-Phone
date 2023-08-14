import {
	QOPUserDataTemplate,
	CurrentQOPVersion,
	DeltaUDTemplate,
} from './initQOPUD.js';

export function DeprecatedCheck(QOPUserData: QOPUserDataTemplate) {
	if (QOPUserData.Version) {
		if (QOPUserData.Version === CurrentQOPVersion) {
			return false;
		} else {
			if (QOPUserData.Deprecated !== undefined) {
				try {
					QOPUserData.Deprecated = true;
					console.log(`${QOPUserData}.Deprecated has been marked 'true'.`);
					return true;
				} catch (error) {
					console.error(
						`Error setting ${QOPUserData}.Deprecated to true:`,
						error
					);
					return true;
				}
			} else {
				console.error(
					`Error checking version: 'Deprecated' does not exist on ${QOPUserData}.`
				);
				return true;
			}
		}
	} else {
		console.error(
			`Error checking version: 'Version' does not exist on ${QOPUserData}.`
		);
		return true;
	}
}

export function DeltaSetValidator(QOPUserData: QOPUserDataTemplate) {
	const { GutList, ValveList, ChartList } = QOPUserData;

	for (let gut = 0; gut < GutList.length; gut++) {
		for (let valve = 0; valve < ValveList.length; valve++) {
			if (ValveList[valve].DeltaSet.length < GutList.length) {
				while (ValveList[valve].DeltaSet.length < GutList.length) {
					ValveList[valve].DeltaSet.push(new DeltaUDTemplate());
				}
				console.log(
					`Added DeltaTemplate object(s) to ValveList.${valve}.DeltaSet} in order to match the present number of Guts.`
				);
			}
		}

		for (let chart = 0; chart < ChartList.length; chart++) {
			for (let combo = 0; combo < ChartList[chart].ComboSet.length; combo++) {
				if (ChartList[chart].ComboSet[combo].DeltaSet.length < GutList.length) {
					while (
						ChartList[chart].ComboSet[combo].DeltaSet.length < GutList.length
					) {
						ChartList[chart].ComboSet[combo].DeltaSet.push(new DeltaUDTemplate());
					}
					console.log(
						`Added DeltaTemplate object(s) to ChartList.${chart}.ComboSet.${combo}.DeltaSet} in order to match the present number of Guts.`
					);
				}
			}
		}
	}
}

export function OpenGutValidator(QOPUserData: QOPUserDataTemplate) {
	const { ScaleList, GutList } = QOPUserData;

	for (let gut = 0; gut < GutList.length; gut++) {
		if (GutList[gut].OpenGutNoteID.length < ScaleList.length) {
			while (GutList[gut].OpenGutNoteID.length < ScaleList.length) {
				GutList[gut].OpenGutNoteID.push(69);
			}
		}
		if (GutList[gut].OscWaveType.length < ScaleList.length) {
			while (GutList[gut].OscWaveType.length < ScaleList.length) {
				GutList[gut].OscWaveType.push('sine');
			}
		}
	}
}

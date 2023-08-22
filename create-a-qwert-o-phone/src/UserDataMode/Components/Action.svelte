<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		type QOPValidEventCodesString,
		QOPValidEventCodes,
		type ActionEventCodes
	} from '../initQOPUD';

	export let actionData: ActionEventCodes = {};
	export let propString:
		| 'ButtonEventCodes'
		| 'SustainEventCodes'
		| 'AntiSustainEventCodes'
		| 'SostenutoEventCodes'
		| 'AntiSostenutoEventCodes' = 'ButtonEventCodes';
	export let listString: 'GutList' | 'ValveList' | 'ChartList' = 'GutList';
	export let listIndex: number = 0;
	export let setString: 'FretSet' | 'PadSet' | null = null;
	export let setIndex: number | null = null;

	$: {
		if (setString === null && listString !== 'ChartList') {
			actionData = $QOPUserData[listString][listIndex][propString];
		} else if (listString === 'GutList' && setString === 'FretSet' && setIndex !== null) {
			actionData = $QOPUserData[listString][listIndex][setString][setIndex][propString];
		} else if (listString === 'ChartList' && setString === 'PadSet' && setIndex !== null) {
			actionData = $QOPUserData[listString][listIndex][setString][setIndex][propString];
		}
	}

	function handleAddActionCode() {
		function handleKeydownEvent(event: KeyboardEvent) {
			if (QOPValidEventCodes.includes(event.code as QOPValidEventCodesString)) {
				QOPUserData.addActionCode(
					event.code as QOPValidEventCodesString,
					propString,
					listString,
					listIndex,
					setString,
					setIndex
				);
				window.removeEventListener('keydown', handleKeydownEvent);
			} else {
				console.log(`${event.code} is disallowed. Pick a different keyboard key.`);
				window.removeEventListener('keydown', handleKeydownEvent);
			}
		}
		window.addEventListener('keydown', handleKeydownEvent);
	}
	function handleRemoveActionCode(eventCode: string) {
		QOPUserData.removeActionCode(
			eventCode as QOPValidEventCodesString,
			propString,
			listString,
			listIndex,
			setString,
			setIndex
		);
	}
</script>

<div class="actionEventCodes">
	{propString.substring(0, propString.length - 10)} Keys:
	<button on:click={() => handleAddActionCode()}>Add Key</button>
	{#each Object.entries(actionData) as [eventCode, value]}
		<div class="eventCode">
			{[eventCode]}:
			<button on:click={() => handleRemoveActionCode(eventCode)}>Remove Key {eventCode}</button>
			<div>
				↓:
				<select bind:value={value[0]}>
					<option value="1" selected>True</option>
					<option value="0">False</option>
				</select>,
			</div>
			<div>
				↑:
				<select bind:value={value[1]}>
					<option value="1" selected>True</option>
					<option value="0">False</option>
				</select>
			</div>
		</div>
	{/each}
</div>

<style>
	.actionEventCodes {
		border: solid black;
		padding: 2vh;
	}
	.eventCode {
		border: dotted black;
		padding: 1vh;
	}
</style>

<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		type QOPValidEventCodesString,
		QOPValidEventCodes,
		type TranspositionObject
	} from '../initQOPUD';
	export let transpositionData: TranspositionObject = {};
	export let listString: 'GutList' | 'ValveList' | 'ChartList' = 'GutList';
	export let listIndex: number = 0;
	export let setString: 'FretSet' | 'ComboSet' | null = null;
	export let setIndex: number | null = null;
	let showOverlay = false;

	$: {
		if (setString === null) {
			transpositionData = $QOPUserData[listString][listIndex].TranspositionEventCodes;
		} else if (listString === 'GutList' && setString === 'FretSet' && setIndex !== null) {
			transpositionData =
				$QOPUserData[listString][listIndex][setString][setIndex].TranspositionEventCodes;
		} else if (listString === 'ChartList' && setString === 'ComboSet' && setIndex !== null) {
			transpositionData =
				$QOPUserData[listString][listIndex][setString][setIndex].TranspositionEventCodes;
		}
	}

	function handleAddTranspositionCode() {
		showOverlay = true;

		function handleKeydownEvent(event: KeyboardEvent) {
			if (QOPValidEventCodes.includes(event.code as QOPValidEventCodesString)) {
				QOPUserData.addTranspositionCode(
					event.code as QOPValidEventCodesString,
					listString,
					listIndex,
					setString,
					setIndex
				);
			} else {
				console.log(`${event.code} is disallowed. Pick a different keyboard key.`);
			}
			window.removeEventListener('keydown', handleKeydownEvent);
			showOverlay = false;
		}

		window.addEventListener('keydown', handleKeydownEvent);
	}
	function handleRemoveTranspositionCode(eventCode: string) {
		QOPUserData.removeTranspositionCode(
			eventCode as QOPValidEventCodesString,
			listString,
			listIndex,
			setString,
			setIndex
		);
	}
</script>

{#if showOverlay}
	<div class="overlay">Press a Computer-Keyboard Key</div>
{/if}

<div class="transpositionEventCodes">
	Transposition Keys:
	<button on:click={() => handleAddTranspositionCode()}>Add Key</button>
	{#each Object.entries(transpositionData) as [eventCode, value]}
		<div class="eventCode">
			{eventCode}:
			<button on:click={() => handleRemoveTranspositionCode(eventCode)}
				>Remove Key {eventCode}</button
			>
			<div class="transposition-keydown">
				↓: Note ID:<input type="number" bind:value={value[0][0]} />, Cents:<input
					type="number"
					bind:value={value[0][1]}
				/>
			</div>
			<div class="transposition-keyup">
				↑: Note ID:<input type="number" bind:value={value[1][0]} />, Cents:<input
					type="number"
					bind:value={value[1][1]}
				/>
			</div>
		</div>
	{/each}
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999; /* Ensure the overlay is on top of everything else */
		color: white;
		text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
	}
	.transpositionEventCodes {
		border: solid black;
		padding: 2vh;
	}
	.eventCode {
		border: dashed;
		padding: 1vh;
	}
	.transposition-keydown,
	.transposition-keyup {
		border: dotted black;
		padding: 1vh;
	}
</style>

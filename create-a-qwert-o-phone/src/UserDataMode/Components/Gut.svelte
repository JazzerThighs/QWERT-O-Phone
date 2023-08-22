<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		GutUDTemplate,
		type SimpleWaveformTypeString,
		ButtonString,
		SustainString,
		AntiSustainString,
		SostenutoString,
		AntiSostenutoString
	} from '../initQOPUD';
	import Fret from './Fret.svelte';
	import Action from './Action.svelte';
	import Transposition from './Transposition.svelte';
	export let gutData: GutUDTemplate = new GutUDTemplate();
	const ListString = 'GutList';
	const oscWaveTypeOptions: SimpleWaveformTypeString[] = ['sine', 'square', 'triangle', 'sawtooth'];

	$: gutData = $QOPUserData.GutList[gutData.GutID];

	function handleAddFret(gutIndex: number) {
		QOPUserData.addFret(gutIndex);
	}
	function handleRemoveFret(gutIndex: number, fretIndex: number) {
		QOPUserData.removeFret(gutIndex, fretIndex);
	}
</script>

<div class="gut">
	<div>Gut ID: {gutData.GutID}</div>
	<slot />
	<div>
		Gut Name:
		<input type="text" bind:value={gutData.Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={gutData.Description} />
	</div>
	<div>
		Gut MIDI Output Toggle:
		<input type="checkbox" bind:value={gutData.GutMIDIOutputToggle} />
	</div>

	<div>
		Gut Osc Toggle:
		<input type="checkbox" bind:value={gutData.GutOscMute} />
	</div>
	<div>
		Osc Wave Type:
		{#each $QOPUserData.ScaleList as scale, scaleIndex}
		{scaleIndex}:
		<select bind:value={gutData.OscWaveType[scaleIndex]}>
			{#each oscWaveTypeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		{/each}
	</div>
	<div>
		Osc Gain:
		{#each $QOPUserData.ScaleList as scale, scaleIndex}
		{scaleIndex}:
		<input type="number" bind:value={gutData.OscGain[scaleIndex]} />
		{/each}
	</div>
	
	<div>
		Open Gut Note ID:
		{#each $QOPUserData.ScaleList as scale, scaleIndex}
		{scaleIndex}:
		<input type="number" step='1' min=0 bind:value={gutData.OpenGutNoteID[scaleIndex]} />
		{/each}
	</div>
	<div>
		Require Fret:
		<input type="checkbox" bind:value={gutData.RequireFret} />
	</div>
	<div>
		Require Valve:
		<input type="checkbox" bind:value={gutData.RequireValve} />
	</div>
	<div>
		Require Combo:
		<input type="checkbox" bind:value={gutData.RequireCombo} />
	</div>

	<Action
		bind:actionData={gutData.ButtonEventCodes}
		propString={ButtonString}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>
	<Action
		bind:actionData={gutData.SustainEventCodes}
		propString={SustainString}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>
	<Action
		bind:actionData={gutData.AntiSustainEventCodes}
		propString={AntiSustainString}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>
	<Action
		bind:actionData={gutData.SostenutoEventCodes}
		propString={SostenutoString}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>
	<Action
		bind:actionData={gutData.AntiSostenutoEventCodes}
		propString={AntiSostenutoString}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>
	<Transposition
		bind:transpositionData={gutData.TranspositionEventCodes}
		listString={ListString}
		bind:listIndex={gutData.GutID}
	/>

	<div>
		Fret Set:
		<div>
			<button on:click={() => handleAddFret(gutData.GutID)}>Add Fret</button>
			<div class="fret">
				{#each $QOPUserData.GutList[gutData.GutID].FretSet as fret, fretIndex}
					<Fret fretData={fret}>
						<button on:click={() => handleRemoveFret(gutData.GutID, fretIndex)}
							>Remove Fret {fretIndex}</button
						>
					</Fret>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.gut {
		color: black;
		background-color: rgb(255, 214, 137);
	}

	input,
	select {
		color: black;
	}
</style>

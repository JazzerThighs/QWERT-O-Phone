<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		ValveUDTemplate,
		ButtonString,
		SustainString,
		AntiSustainString,
		SostenutoString,
		AntiSostenutoString
	} from '../initQOPUD';
	import Action from './Action.svelte';
	import Transposition from './Transposition.svelte';
	export let valveData: ValveUDTemplate = new ValveUDTemplate();
	const ListString = 'ValveList';

	$: valveData = $QOPUserData.ValveList[valveData.ValveID];
</script>

<div class="valve">
	<div>Valve ID: {valveData.ValveID}</div>
	<slot />
	<div>
		Valve Name:
		<input type="text" bind:value={valveData.Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={valveData.Description} />
	</div>

	<Action
		bind:actionData={valveData.ButtonEventCodes}
		propString={ButtonString}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>
	<Action
		bind:actionData={valveData.SustainEventCodes}
		propString={SustainString}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>
	<Action
		bind:actionData={valveData.AntiSustainEventCodes}
		propString={AntiSustainString}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>
	<Action
		bind:actionData={valveData.SostenutoEventCodes}
		propString={SostenutoString}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>
	<Action
		bind:actionData={valveData.AntiSostenutoEventCodes}
		propString={AntiSostenutoString}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>
	<Transposition
		bind:transpositionData={valveData.TranspositionEventCodes}
		listString={ListString}
		bind:listIndex={valveData.ValveID}
	/>

    {#each valveData.DeltaSet as deltaData}
    <div>
		Delta Type:
		<select bind:value={deltaData.DeltaType}>
			<option value="NoteID">Note ID</option>
			<option value="Cents">Cents</option>
			<option value="Both">Both Note ID & Cents</option>
		</select>
	</div>
	<div>
		Note ID Delta:
		<input type="number" bind:value={deltaData.NoteIDDelta} />
	</div>
	<div>
		Cents Delta:
		<input type="number" bind:value={deltaData.CentsDelta} />
	</div>
    {/each}
</div>

<style>
	.valve {
		color: black;
		background-color: rgb(173, 229, 173);
	}
	input {
		color: black;
	}
</style>

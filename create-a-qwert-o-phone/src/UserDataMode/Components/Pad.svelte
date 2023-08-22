<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		PadUDTemplate,
		ButtonString,
		SustainString,
		AntiSustainString,
		SostenutoString,
		AntiSostenutoString
	} from '../initQOPUD';
	import Action from './Action.svelte';
	export let padData: PadUDTemplate = new PadUDTemplate();
	const ListString = 'ChartList';
	const SetString = 'PadSet';

	$: padData = $QOPUserData.ChartList[padData.ChartID].PadSet[padData.PadID];
</script>

<div class="class_pad">
	<div>PadID: {padData.PadID} ScaleID: {padData.ChartID}</div>
	<slot />
	<div>
		Pad Name:
		<input type="text" bind:value={padData.Name} />
		<!--input type="text" bind:value={pad.Description} /-->
	</div>

	<Action
		bind:actionData={padData.ButtonEventCodes}
		propString={ButtonString}
		listString={ListString}
		bind:listIndex={padData.ChartID}
		setString={SetString}
		bind:setIndex={padData.PadID}
	/>
	<Action
		bind:actionData={padData.SustainEventCodes}
		propString={SustainString}
		listString={ListString}
		bind:listIndex={padData.ChartID}
		setString={SetString}
		bind:setIndex={padData.PadID}
	/>
	<Action
		bind:actionData={padData.AntiSustainEventCodes}
		propString={AntiSustainString}
		listString={ListString}
		bind:listIndex={padData.ChartID}
		setString={SetString}
		bind:setIndex={padData.PadID}
	/>
	<Action
		bind:actionData={padData.SostenutoEventCodes}
		propString={SostenutoString}
		listString={ListString}
		bind:listIndex={padData.ChartID}
		setString={SetString}
		bind:setIndex={padData.PadID}
	/>
	<Action
		bind:actionData={padData.AntiSostenutoEventCodes}
		propString={AntiSostenutoString}
		listString={ListString}
		bind:listIndex={padData.ChartID}
		setString={SetString}
		bind:setIndex={padData.PadID}
	/>
</div>

<style>
	.class_pad {
		display: inline-block;
		padding: 15px;
		border: solid;
	}
	* {
		color: black;
	}
</style>

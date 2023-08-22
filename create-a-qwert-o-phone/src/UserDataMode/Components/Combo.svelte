<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { ComboUDTemplate } from '../initQOPUD';
	import Transposition from './Transposition.svelte';
	export let comboData: ComboUDTemplate = new ComboUDTemplate();
	const ListString = 'ChartList';
	const SetString = 'ComboSet';

	$: comboData = $QOPUserData.ChartList[comboData.ChartID].ComboSet[comboData.ComboID];
</script>

<div class="class_combo">
	<div>ComboID: {comboData.ComboID} ScaleID: {comboData.ChartID}</div>
	<slot />
	<div>
		Combo Name:
		<input type="text" bind:value={comboData.Name} />
		<!--input type="text" bind:value={combo.Description} /-->
	</div>

	<Transposition
		bind:transpositionData={comboData.TranspositionEventCodes}
		listString={ListString}
		bind:listIndex={comboData.ChartID}
		setString={SetString}
		setIndex={comboData.ComboID}
	/>

    {#each comboData.DeltaSet as deltaData}
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
    
    <div class="combination">
        Combo:
        {#each comboData.Combo as pad, padIndex}
            <div class="comboPad">Pad {padIndex}:
                <input type="checkbox" bind:value={pad} />
            </div>
        {/each}
    </div>
</div>

<style>
	.class_combo {
		display: inline-block;
		padding: 15px;
		border: solid;
	}
    .combination {
        border: dashed;
    }
    .comboPad {
        border: dotted black;
    }
	* {
		color: black;
	}
</style>

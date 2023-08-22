<script lang="ts">
import { QOPUserData } from '../QOPUDStore';
	import { ChartUDTemplate } from '../initQOPUD';
	import Pad from './Pad.svelte';
    import Combo from './Combo.svelte';
    import Transposition from './Transposition.svelte';
	export let chartData: ChartUDTemplate = new ChartUDTemplate();
	const listString = 'ChartList';

    $: chartData = $QOPUserData.ChartList[chartData.ChartID];

	function handleAddPad(chartIndex: number) {
        QOPUserData.addPad(chartIndex);
    }
    function handleRemovePad(chartIndex: number, padIndex: number) {
        QOPUserData.removePad(chartIndex, padIndex);
    }
	function handleAddCombo(chartIndex: number) {
        QOPUserData.addCombo(chartIndex);
    }
    function handleRemoveCombo(chartIndex: number, comboIndex: number) {
        QOPUserData.removeCombo(chartIndex, comboIndex);
    }
</script>

<div class="chart">
    <div>Chart ID: {chartData.ChartID}</div>
        <slot />
    <div>
        Chart Name: 
        <input type="text" bind:value={chartData.Name} />
    </div>
    <div>
        Description: 
        <input type="text" bind:value={chartData.Description} />
    </div>

	<Transposition bind:transpositionData={chartData.TranspositionEventCodes} listString={listString} bind:listIndex={chartData.ChartID}/>

	<div>
		Pad Set:
		<div>
			<button on:click={() => handleAddPad(chartData.ChartID)}>Add Pad</button>
			<div class="pad">
				{#each $QOPUserData.ChartList[chartData.ChartID].PadSet as pad, padIndex}
					<Pad padData={pad}>
						<button on:click={() => handleRemovePad(chartData.ChartID, padIndex)}>Remove Pad {padIndex}</button>
					</Pad>
				{/each}
			</div>
		</div>
	</div>
	<div>
		Combo Set:
		<div>
			<button on:click={() => handleAddCombo(chartData.ChartID)}>Add Combo</button>
			<div class="combo">
				{#each $QOPUserData.ChartList[chartData.ChartID].ComboSet as combo, comboIndex}
					<Combo comboData={combo}>
						<button on:click={() => handleRemoveCombo(chartData.ChartID, comboIndex)}>Remove Combo {comboIndex}</button>
					</Combo>
				{/each}
			</div>
		</div>
	</div>

</div>

<style>
	.chart {
		color: black;
		background-color: rgb(128, 255, 255);
	}
	input {
		color: black;
	}
</style>
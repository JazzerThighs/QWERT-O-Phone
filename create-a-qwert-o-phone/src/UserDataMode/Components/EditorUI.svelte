<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;

	import { QOPUserData } from '../QOPUDStore';
	import Scale from './Scale.svelte';
	import Gut from './Gut.svelte';
	import Valve from './Valve.svelte';
	import Chart from './Chart.svelte';

	function handleAddScale() {
		QOPUserData.addScale();
	}
	function handleRemoveScale(scaleIndex: number) {
		QOPUserData.removeScale(scaleIndex);
	}
	function handleAddGut() {
		QOPUserData.addGut();
	}
	function handleRemoveGut(gutIndex: number) {
		QOPUserData.removeGut(gutIndex);
	}
	function handleAddValve() {
		QOPUserData.addValve();
	}
	function handleRemoveValve(valveIndex: number) {
		QOPUserData.removeValve(valveIndex);
	}
	function handleAddChart() {
		QOPUserData.addChart();
	}
	function handleRemoveChart(chartIndex: number) {
		QOPUserData.removeChart(chartIndex);
	}
</script>

<h1>Editor Mode</h1>

<div class="qopud-metadata">
	<div>
		QOP Name:
		<input type="text" bind:value={$QOPUserData.Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={$QOPUserData.Description} />
	</div>
	<div>
		Native Sound Toggle:
		<input type="checkbox" bind:value={$QOPUserData.OscModeToggle} />
	</div>
	<div>
		MIDI Output Toggle:
		<input type="checkbox" bind:value={$QOPUserData.MIDIOutputModeToggle} />
	</div>
	<div>
		Debounce Timer:
		<input type="number" bind:value={$QOPUserData.DebounceTimer} />ms
	</div>
</div>

<button on:click={handleAddScale}>Add Scale</button>
<div class="list-container scale-list">    
    {#each $QOPUserData.ScaleList as scale, scaleIndex}
        <Scale scaleData={scale}>
            <button on:click={() => handleRemoveScale(scaleIndex)}>Remove Scale {scaleIndex}</button>
        </Scale>
    {/each}
</div>

<button on:click={handleAddGut}>Add Gut</button>
<div class="list-container gut-list">    
    {#each $QOPUserData.GutList as gut, gutIndex}
        <Gut gutData={gut}>
            <button on:click={() => handleRemoveGut(gutIndex)}>Remove Gut {gutIndex}</button>
        </Gut>
    {/each}
</div>

<button on:click={handleAddValve}>Add Valve</button>
<div class="list-container valve-list">    
    {#each $QOPUserData.ValveList as valve, valveIndex}
        <Valve valveData={valve}>
            <button on:click={() => handleRemoveValve(valveIndex)}>Remove Valve {valveIndex}</button>
        </Valve>
    {/each}
</div>

<button on:click={handleAddChart}>Add Chart</button>
<div class="list-container chart-list">    
    {#each $QOPUserData.ChartList as chart, chartIndex}
        <Chart chartData={chart}>
            <button on:click={() => handleRemoveChart(chartIndex)}>Remove Chart {chartIndex}</button>
        </Chart>
    {/each}
</div>

<style>
	.list-container {
    max-height: 85vh;
    overflow-y: auto;
	margin: 2.5vh 5vh;
	padding: 1vh;
	}
	.scale-list {
		border: solid palevioletred;
	}
	.gut-list {
		border: solid orange;
	}
	.valve-list {
border: solid lightgreen;
	}
	.chart-list {
		border: solid cyan;
	}
</style>

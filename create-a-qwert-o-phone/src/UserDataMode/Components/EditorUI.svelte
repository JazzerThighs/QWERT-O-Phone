<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import Scale from './Scale.svelte';
	import Gut from './Gut.svelte';
	import Valve from './Valve.svelte';
	import Chart from './Chart.svelte';
	import type { QOPUserDataTemplate } from '../initQOPUD';

	let userData: QOPUserDataTemplate = $QOPUserData;

	$: userData = $QOPUserData;
	function handleDownloadQOPUD() {
		QOPUserData.downloadQOPUD();
	}
	function handleDownloadScale(scaleIndex: number) {
		QOPUserData.downloadScale(scaleIndex);
	}
	function handleDownloadGut(gutIndex: number) {
		QOPUserData.downloadGut(gutIndex);
	}
	function handleDownloadValve(valveIndex: number) {
		QOPUserData.downloadValve(valveIndex);
	}
	function handleDownloadChart(chartIndex: number) {
		QOPUserData.downloadChart(chartIndex);
	}
	
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
	<button on:click={() => handleDownloadQOPUD()}>Download Current QOPUD</button>
	<div>
		QOP Name:
		<input type="text" bind:value={userData.Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={userData.Description} />
	</div>
	<div>
		Native Sound Toggle:
		<div class="button-container">
			<input type="checkbox" bind:value={userData.OscModeToggle} checked />\
		</div>
	</div>
	<div>
		MIDI Output Toggle:
		<div class="button-container">
			<input type="checkbox" bind:value={userData.MIDIOutputModeToggle} />
		</div>
	</div>
	<div>
		Debounce Timer:
		<input type="number" bind:value={userData.DebounceTimer} />ms
	</div>
</div>

<button on:click={handleAddScale}>Add Scale</button>
<div class="list-container scale-list">
	{#each userData.ScaleList as scale, scaleIndex}
	<button on:click={() => handleDownloadScale(scaleIndex)}>Download Scale {scaleIndex}</button>
		<Scale scaleData={scale}>
			<button on:click={() => handleRemoveScale(scaleIndex)}>Remove Scale {scaleIndex}</button>
		</Scale>
	{/each}
</div>

<button on:click={handleAddGut}>Add Gut</button>
<div class="list-container gut-list">
	{#each userData.GutList as gut, gutIndex}
		<button on:click={() => handleDownloadGut(gutIndex)}>Download Gut {gutIndex}</button>
		<Gut gutData={gut}>
			<button on:click={() => handleRemoveGut(gutIndex)}>Remove Gut {gutIndex}</button>
		</Gut>
	{/each}
</div>

<button on:click={handleAddValve}>Add Valve</button>
<div class="list-container valve-list">
	{#each $QOPUserData.ValveList as valve, valveIndex}
	<button on:click={() => handleDownloadValve(valveIndex)}>Download Valve {valveIndex}</button>
		<Valve valveData={valve}>
			<button on:click={() => handleRemoveValve(valveIndex)}>Remove Valve {valveIndex}</button>
		</Valve>
	{/each}
</div>

<button on:click={handleAddChart}>Add Chart</button>
<div class="list-container chart-list">
	{#each $QOPUserData.ChartList as chart, chartIndex}
	<button on:click={() => handleDownloadChart(chartIndex)}>Download Chart {chartIndex}</button>
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
	h1 {
		font-family: 'Comic Sans MS';
	}
	input {
		color: rgb(43, 43, 43);
		background-color: white;
		margin: 3px;
	}
	.button-container {
		display: inline;
		margin: 2px;
		border: black;
		padding: 5px;
		background-color: lightgray
	}
</style>

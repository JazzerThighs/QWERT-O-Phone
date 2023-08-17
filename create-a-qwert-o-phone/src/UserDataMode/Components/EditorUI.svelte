<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import Scale from './Scale.svelte';
	const { ScaleList, GutList, ValveList, ChartList } = $QOPUserData;

	function handleAddScale() {
		QOPUserData.addScale();
	}
	function handleRemoveScale(scaleIndex: number) {
		QOPUserData.removeScale(scaleIndex);
		return QOPUserData;
	}
</script>

<h1>Editor Mode</h1>

<button on:click={handleAddScale}>Add Scale</button>
{#each ScaleList as scale, scaleIndex}
	<button on:click={() => handleRemoveScale(scaleIndex)}>Remove Scale {scaleIndex}</button>
	<Scale scaleData={scale} />
{/each}

<style>
</style>

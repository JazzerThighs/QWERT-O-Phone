<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import Scale from './Scale.svelte';

	function handleAddScale() {
		QOPUserData.addScale();	
	}
	function handleRemoveScale(scaleIndex: number) {
		QOPUserData.removeScale(scaleIndex);
	}
</script>

<h1>Editor Mode</h1>

<button on:click={handleAddScale}>Add Scale</button>
{#each $QOPUserData.ScaleList as scale, scaleIndex}
	<Scale scaleData={scale}>
		<button on:click={() => handleRemoveScale(scaleIndex)}>Remove Scale {scaleIndex}</button>
	</Scale>
{/each}

<style>
</style>

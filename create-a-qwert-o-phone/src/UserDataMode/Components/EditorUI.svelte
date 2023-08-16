<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import Scale from './Scale.svelte';
    const { ScaleList, GutList, ValveList, ChartList } = $QOPUserData;
	
</script>

<h1>QOP User Data:</h1>

{#each ScaleList as scale}
	<Scale scaleData={scale} />
{/each}

<style>
</style>

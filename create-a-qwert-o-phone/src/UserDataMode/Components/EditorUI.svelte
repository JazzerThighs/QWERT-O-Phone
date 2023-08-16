<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import type { IQOPUserDataTemplate, QOPUserDataTemplate } from '../initQOPUD';

	const { 
        
        ScaleList, 
        GutList, 
        ValveList, 
        ChartList, } = $QOPUserData;

	import Scale from './Scale.svelte';
</script>

<h1>QOP User Data:</h1>

{#each ScaleList as scale}
	<Scale scaleData={scale} />
{/each}

<style>
</style>

<script lang="ts">
import { QOPUserData } from '../QOPUDStore';
	import { ChartUDTemplate } from '../initQOPUD';
	import Pad from './Pad.svelte';
    import Combo from './Combo.svelte';
	export let chartData: ChartUDTemplate = new ChartUDTemplate();

    $: chartData = $QOPUserData.ChartList[chartData.ChartID];
</script>

<style>
</style>
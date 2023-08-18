<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { ValveUDTemplate } from '../initQOPUD';
	export let valveData: ValveUDTemplate = new ValveUDTemplate();

	$: valveData = $QOPUserData.ValveList[valveData.ValveID];
</script>

<style>
</style>

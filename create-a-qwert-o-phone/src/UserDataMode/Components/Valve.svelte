<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { ValveUDTemplate } from '../initQOPUD';
	export let valveData: ValveUDTemplate = new ValveUDTemplate();

	$: valveData = $QOPUserData.ValveList[valveData.ValveID];
</script>

<div class="valve">
    <div>Valve ID: {valveData.ValveID}</div>
        <slot />
    <div>
        Valve Name: 
        <input type="text" bind:value={valveData.Name} />
    </div>
    <div>
        Description: 
        <input type="text" bind:value={valveData.Description} />
    </div>
   


</div>

<style>
    .valve {
        color: black;
        background-color: rgb(173, 229, 173);
    }
    input, select {
		color: black;
	}
	button {
		border: black;
		color: black;
		background: lightblue;
		padding: 3px;
	}
</style>

<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { ValveUDTemplate, ButtonString, SustainString, AntiSustainString, SostenutoString, AntiSostenutoString } from '../initQOPUD';
    import Action from './Action.svelte';
    import Transposition from './Transposition.svelte';
	export let valveData: ValveUDTemplate = new ValveUDTemplate();
    const listString = 'ValveList';

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
</style>

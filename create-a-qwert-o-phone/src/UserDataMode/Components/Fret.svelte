<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { FretUDTemplate } from '../initQOPUD'
    export let fretData: FretUDTemplate = new FretUDTemplate();

    $: fretData = $QOPUserData.GutList[fretData.GutID].FretSet[fretData.FretID];
</script>

<div class="class_fret">
    <div>FretID: {fretData.FretID} ScaleID: {fretData.GutID}</div>
    <slot />
    <div>Fret Name:
        <input type="text" bind:value={fretData.Name} />
        <!--input type="text" bind:value={fret.Description} /-->
    </div>

</div>


<style>
    
</style>
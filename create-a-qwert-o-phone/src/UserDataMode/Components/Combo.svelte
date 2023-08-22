<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { ComboUDTemplate } from '../initQOPUD';
    import Transposition from './Transposition.svelte';
    export let comboData: ComboUDTemplate = new ComboUDTemplate();
    const listString = 'ChartList';
    const setString = 'ComboSet';

    $: comboData = $QOPUserData.ChartList[comboData.ChartID].ComboSet[comboData.ComboID];
</script>
\
<div class="class_combo">
    <div>ComboID: {comboData.ComboID} ScaleID: {comboData.ChartID}</div>
    <slot />
    <div>Combo Name:
        <input type="text" bind:value={comboData.Name} />
        <!--input type="text" bind:value={combo.Description} /-->
    </div>

</div>


<style>
    .class_combo {
        display: inline-block;
        padding: 15px;
        border: solid
    }
    * {
        color: black;
    }
</style>
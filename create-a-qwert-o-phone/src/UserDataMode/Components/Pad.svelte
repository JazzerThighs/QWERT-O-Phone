<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { PadUDTemplate } from '../initQOPUD'
    export let padData: PadUDTemplate = new PadUDTemplate();

    $: padData = $QOPUserData.ChartList[padData.ChartID].PadSet[padData.PadID];
</script>

<div class="class_pad">
    <div>PadID: {padData.PadID} ScaleID: {padData.ChartID}</div>
    <slot />
    <div>Pad Name:
        <input type="text" bind:value={padData.Name} />
        <!--input type="text" bind:value={pad.Description} /-->
    </div>

</div>



<style>
    .class_pad {
        display: inline-block;
        padding: 15px;
        border: solid
    }
    * {
        color: black;
    }
</style>
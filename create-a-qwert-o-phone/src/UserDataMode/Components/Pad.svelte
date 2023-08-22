<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { PadUDTemplate, ButtonString, SustainString, AntiSustainString, SostenutoString, AntiSostenutoString } from '../initQOPUD';
    import Action from './Action.svelte';
    export let padData: PadUDTemplate = new PadUDTemplate();
    const listString = 'ChartList';
    const setString = 'PadSet';

    $: padData = $QOPUserData.ChartList[padData.ChartID].PadSet[padData.PadID];
</script>

<div class="class_pad">
    <div>PadID: {padData.PadID} ScaleID: {padData.ChartID}</div>
    <slot />
    <div>Pad Name:
        <input type="text" bind:value={padData.Name} />
        <!--input type="text" bind:value={pad.Description} /-->
    </div>

    <Action bind:actionData={padData.ButtonEventCodes} propString={ButtonString} listString={listString} bind:listIndex={padData.ChartID} setString={setString} bind:setIndex={padData.PadID}/>
    <Action bind:actionData={padData.SustainEventCodes} propString={SustainString} listString={listString} bind:listIndex={padData.ChartID} setString={setString} bind:setIndex={padData.PadID}/>
    <Action bind:actionData={padData.AntiSustainEventCodes} propString={AntiSustainString} listString={listString} bind:listIndex={padData.ChartID} setString={setString} bind:setIndex={padData.PadID}/>
    <Action bind:actionData={padData.SostenutoEventCodes} propString={SostenutoString} listString={listString} bind:listIndex={padData.ChartID} setString={setString} bind:setIndex={padData.PadID}/>
    <Action bind:actionData={padData.AntiSostenutoEventCodes} propString={AntiSostenutoString} listString={listString} bind:listIndex={padData.ChartID} setString={setString} bind:setIndex={padData.PadID}/>

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
<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { FretUDTemplate, ButtonString, SustainString, AntiSustainString, SostenutoString, AntiSostenutoString } from '../initQOPUD';
    import Action from './Action.svelte';
    import Transposition from './Transposition.svelte';
    export let fretData: FretUDTemplate = new FretUDTemplate();
    const listString = 'GutList';
    const setString = 'FretSet';

    $: fretData = $QOPUserData.GutList[fretData.GutID].FretSet[fretData.FretID];

</script>

<div class="class_fret">
    <div>FretID: {fretData.FretID} ScaleID: {fretData.GutID}</div>
    <slot />
    <div>Fret Name:
        <input type="text" bind:value={fretData.Name} />
        <!--input type="text" bind:value={fret.Description} /-->
    </div>

    <Action bind:actionData={fretData.ButtonEventCodes} propString={ButtonString} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>
    <Action bind:actionData={fretData.SustainEventCodes} propString={SustainString} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>
    <Action bind:actionData={fretData.AntiSustainEventCodes} propString={AntiSustainString} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>
    <Action bind:actionData={fretData.SostenutoEventCodes} propString={SostenutoString} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>
    <Action bind:actionData={fretData.AntiSostenutoEventCodes} propString={AntiSostenutoString} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>
    <Transposition bind:transpositionData={fretData.TranspositionEventCodes} listString={listString} bind:listIndex={fretData.GutID} setString={setString} bind:setIndex={fretData.FretID}/>

    <div>Delta Type:
        <select bind:value={fretData.DeltaType}>
            <option value="NoteID">Note ID</option>
            <option value="Cents">Cents</option>
            <option value="Both">Both Note ID & Cents</option>
        </select>
    </div>
    <div>Note ID Delta:
        <input type="number" bind:value={fretData.NoteIDDelta}/>
    </div>
    <div>Cents Delta:
        <input type="number" bind:value={fretData.CentsDelta}/>
    </div>

</div>


<style>
    .class_fret {
        display: inline-block;
        padding: 15px;
        border: solid;
    }
    * {
        color: black;
    }
</style>
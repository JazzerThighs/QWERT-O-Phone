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
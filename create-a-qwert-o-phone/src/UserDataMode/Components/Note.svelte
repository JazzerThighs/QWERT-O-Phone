<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { NoteUDTemplate } from '../initQOPUD'
    export let noteData: NoteUDTemplate = new NoteUDTemplate();
    let { ScaleID, NoteID, Name, PitchHz, ColorHex } = noteData;

    $: {
        ScaleID = $QOPUserData.ScaleList[ScaleID].NoteSet[NoteID].ScaleID;
        NoteID = $QOPUserData.ScaleList[ScaleID].NoteSet[NoteID].NoteID;
        PitchHz = $QOPUserData.ScaleList[ScaleID].NoteSet[NoteID].PitchHz;
        ColorHex = $QOPUserData.ScaleList[ScaleID].NoteSet[NoteID].ColorHex;
        noteData = $QOPUserData.ScaleList[ScaleID].NoteSet[NoteID];
    }
</script>

<div class="class_note" style="background-color: {ColorHex}">
    <div>NoteID: {NoteID}</div>
    <div>Note Name:
        <input type="text" bind:value={Name} />
        <!--input type="text" bind:value={note.Description} /-->
    </div>
    <div>
        Pitch: 
        <input type="number" bind:value={PitchHz} />Hz
    </div>
    <div>
        Color: 
        <input type="color" bind:value={ColorHex} />
    </div>
</div>

<style>
    .class_note {
        display: inline-block;
    }
    * {
        color: black;
    }
</style>
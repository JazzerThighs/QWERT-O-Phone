<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
    import { NoteUDTemplate } from '../initQOPUD'
    export let noteData: NoteUDTemplate = new NoteUDTemplate();

    $: noteData = $QOPUserData.ScaleList[noteData.ScaleID].NoteSet[noteData.NoteID];
</script>


<div class="class_note" style="background-color: {noteData.ColorHex}">
    <slot />
    <div>NoteID: {noteData.NoteID}</div>
    <div>Note Name:
        <input type="text" bind:value={noteData.Name} />
        <!--input type="text" bind:value={note.Description} /-->
    </div>
    <div>
        Pitch: 
        <input type="number" bind:value={noteData.PitchHz} />Hz
    </div>
    <div>
        Color: 
        <input type="color" bind:value={noteData.ColorHex} />
    </div>
</div>

<style>
    .class_note {
        display: inline-block;
        padding: 15px;
        border: solid
    }
    * {
        color: black;
    }
</style>
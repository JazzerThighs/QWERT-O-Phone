<script lang="ts">
    import { NoteUDTemplate, type INoteUDTemplate } from '../initQOPUD'
    export const noteData: INoteUDTemplate = new NoteUDTemplate();

</script>

<div class="class_note" style="background-color: {noteData.ColorHex}">
    <div>NoteID: 
        <input type="number" bind:value={noteData.NoteID} />
    </div>
    <div>Note Name:
        <input type="text" bind:value={noteData.Name[0]} />
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
        display: inline-block
    }
</style>
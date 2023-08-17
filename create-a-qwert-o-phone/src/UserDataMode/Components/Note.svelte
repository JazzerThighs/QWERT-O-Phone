<script lang="ts">
    import { NoteUDTemplate, type INoteUDTemplate } from '../initQOPUD'
    export const noteData: INoteUDTemplate = new NoteUDTemplate();
    let {NoteID, Name, PitchHz, ColorHex} = noteData;

</script>

<div class="class_note" style="background-color: {ColorHex}">
    <div>NoteID: {NoteID}</div>
    <div>Note Name:
        <input type="text" bind:value={Name[0]} />
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
        display: inline-block
    }
</style>
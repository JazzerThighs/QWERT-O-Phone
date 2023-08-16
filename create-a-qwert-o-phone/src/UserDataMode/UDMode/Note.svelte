<script lang="ts">
    import { NoteUDTemplate } from './initQOPUD
    export let note: NoteUDTemplate = new NoteUDTemplate();

</script>

<div class="class_note" style="background-color: {note.ColorHex}">
    <div>Note Name:
        <input type="text" bind:value={note.Name[0]} />
        <!--input type="text" bind:value={note.Description} /-->
    </div>
    <div>
        Pitch: 
        <input type="number" bind:value={note.PitchHz} />Hz
    </div>
    <div>
        Color: 
        <input type="color" bind:value={note.ColorHex} />
    </div>
</div>

<style>
    .class_note {
        display: inline-block
    }
</style>
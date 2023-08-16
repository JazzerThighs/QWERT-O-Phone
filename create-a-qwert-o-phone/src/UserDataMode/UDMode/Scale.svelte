<script lang='ts'>
    import { NoteUDTemplate, type IScaleUDTemplate, ScaleUDTemplate, type ScaleTypeString } from "../../UserDataMode/initQOPUD";
    export let scale: IScaleUDTemplate = new ScaleUDTemplate();
    import Note from "./Note.svelte";

    const scaleTypeOptions: ScaleTypeString[] = [
    'Equal Temperament',
    'Just Intonation',
    'Pythagorean Tuning (5-Limit)',
    'Werckmeister Temperament (Baroque German Music)',
    'Meantone Temperament (Renaissance and Baroque Music)',
    'Kirnberger Temperament (Baroque German Music)',
    'Maqam (Arabic Music)',
    'Ndebele Tuning (Southern African Music)',
    'Gagaku (Japanese Court Music)',
    'Pelog and Slendro (Indonesian Gamelan Music)',
    'Hijaz (Turkish Music)',
    'Shona Mbira Tuning (Zimbabwean Music)',
    'Hexany System (Native American Music)',
    'Bohlen-Pierce Scale (microtonal Music)'
    ];
    
    $: {
        for (let idNum = 0; idNum < scale.NoteSet.length; idNum++) {
            scale.NoteSet[idNum].NoteID = idNum;
        }
    }
   
    function addNote() {
        scale.NoteSet = [...scale.NoteSet, new NoteUDTemplate()];
    }
    
    function removeNote() {
        scale.NoteSet.length = scale.NoteSet.length - 1;
    }


</script>

<div class="scale">
    <div>Scale Name:
        <input type="text" bind:value={scale.Name} />
    </div>
    <div>Description:
        <input type="text" bind:value={scale.Description} />
    </div>
    <div>Scale Type:
        <select bind:value={scale.ScaleType}>
            {#each scaleTypeOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>
    <div>Reference Note ID:
        <input type="number" 
        min="0"
        max={scale.NoteSet.length - 1}
        step="1"
        bind:value={scale.ReferenceNote} />
    </div>
    <div>Tuning:
        <input type="number" bind:value={scale.TuningHz} />Hz
    </div>
    <div>Octave Divisions:
        <input type="number" 
        min="1"
        step="1"
        bind:value={scale.OctaveDivisions} />
    </div>
    <div>Note Class Set:
        {#each scale.NoteClassSet as classSet, classSetIndex}
        <div class="note-class">
            {#each classSet[classSetIndex] as note, nameIndex}
            <input 
                type="text" 
                bind:value={note[nameIndex]} 
                class="note-class-string" />
            {/each}
        </div>
        {/each}
    </div>
    <div>Note Set:
        {#each scale.NoteSet as noteItem (noteItem.NoteID)}
            <Note note={noteItem} />
        {/each}
    </div>

</div>

<style>
    .scale, .note-class {
        display: block;
    }
    .note-class-string {
        display: inline-block;
    }
</style>
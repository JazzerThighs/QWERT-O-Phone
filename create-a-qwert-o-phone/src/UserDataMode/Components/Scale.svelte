<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import {
		NoteUDTemplate,
		type IScaleUDTemplate,
		ScaleUDTemplate,
		type ScaleTypeString
	} from '../initQOPUD';
	import Note from './Note.svelte';
	export let scaleData: IScaleUDTemplate = new ScaleUDTemplate();
	let {
		Name,
		Description,
		ScaleType,
		ScaleID,
		ReferenceNote,
		TuningHz,
		OctaveDivisions,
		NoteClassSet,
		NoteSet
	} = scaleData;
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

	$: for (let idNum = 0; idNum < NoteSet.length; idNum++) {
		NoteSet[idNum].NoteID = idNum;
	}

	function handleAddNote(scaleIndex: number) {
		QOPUserData.addNote(scaleIndex);
	}
	function handleRemoveNote(scaleIndex: number, noteIndex: number) {
		QOPUserData.removeNote(scaleIndex, noteIndex);
	}
</script>

<div class="scale">
	<div>Scale ID: {ScaleID}</div>
	<div>
		Scale Name:
		<input type="text" bind:value={Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={Description} />
	</div>
	<div>
		Scale Type:
		<select bind:value={ScaleType}>
			{#each scaleTypeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</div>
	<div>
		Reference Note ID:
		<input type="number" min="0" max={NoteSet.length - 1} step="1" bind:value={ReferenceNote} />
	</div>
	<div>
		Tuning:
		<input type="number" bind:value={TuningHz} />Hz
	</div>
	<div>
		Octave Divisions:
		<input type="number" min="1" step="1" bind:value={OctaveDivisions} />
	</div>
	<div>
		Note Class Set:
		{#each NoteClassSet as classSet, classSetIndex}
			<div class="note-class">
				{#each classSet[classSetIndex] as note, nameIndex}
					<input type="text" bind:value={note[nameIndex]} class="note-class-string" />
				{/each}
			</div>
		{/each}
	</div>
	<div>
		Note Set:
		<div>
			<button on:click={() => handleAddNote(ScaleID)}>Add Note</button>
			<div>
				{#each NoteSet as note, noteIndex}
					<button on:click={() => handleRemoveNote(ScaleID, noteIndex)} />
					<Note noteData={note} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.scale,
	.note-class {
		display: block;
	}
	.note-class-string {
		display: inline-block;
	}
</style>

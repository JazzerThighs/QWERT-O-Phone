<script lang="ts">
	import { writable } from 'svelte/store';
	import { QOPUserData } from '../QOPUDStore';
	import { NoteUDTemplate, ScaleUDTemplate, type ScaleTypeString } from '../initQOPUD';
	import Note from './Note.svelte';
	import Chart from './Chart.svelte';
	export let scaleData: ScaleUDTemplate = new ScaleUDTemplate();

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

	$: scaleData = $QOPUserData.ScaleList[scaleData.ScaleID];

	function handleAddNoteClass(scaleIndex: number) {
		QOPUserData.addNoteClass(scaleIndex)
	}
	function handleRemoveNoteClass(scaleIndex: number, noteClassIndex: number) {
		QOPUserData.removeNoteClass(scaleIndex, noteClassIndex);
	}
	function handleAddNote(scaleIndex: number) {
		QOPUserData.addNote(scaleIndex);
	}
	function handleRemoveNote(scaleIndex: number, noteIndex: number) {
		QOPUserData.removeNote(scaleIndex, noteIndex);
	}
</script>

<div class="scale">
	<slot />
	<div>Scale ID: {scaleData.ScaleID}</div>
	<div>
		Scale Name:
		<input type="text" bind:value={scaleData.Name} />
	</div>
	<div>
		Description:
		<input type="text" bind:value={scaleData.Description} />
	</div>
	<div>
		Scale Type:
		<select bind:value={scaleData.ScaleType}>
			{#each scaleTypeOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</div>
	<div>
		Reference Note ID:
		<input
			type="number"
			min="0"
			max={scaleData.NoteSet.length - 1}
			step="1"
			bind:value={scaleData.ReferenceNote}
		/>
	</div>
	<div>
		Tuning:
		<input type="number" bind:value={scaleData.TuningHz} />Hz
	</div>
	<div>
		Octave Divisions:
		<input type="number" min="1" step="1" bind:value={scaleData.OctaveDivisions} />
	</div>
	<div>
		Note Class Set:
		<button on:click={() => handleAddNoteClass(scaleData.ScaleID)}>Add Note Class</button>
		{#each scaleData.NoteClassSet as noteClass, noteClassIndex}
			<div class="note-class">
				<input type="text" bind:value={noteClass} />
				<button on:click={() => handleRemoveNoteClass(scaleData.ScaleID, noteClassIndex)}>Remove {noteClass}</button>
			</div>
		{/each}
	</div>
	<div>
		Note Set:
		<div>
			<button on:click={() => handleAddNote(scaleData.ScaleID)}>Add Note</button>
			<div class="note">
				{#each $QOPUserData.ScaleList[scaleData.ScaleID].NoteSet as note, noteIndex}
					<Note noteData={note}>
						<button on:click={() => handleRemoveNote(scaleData.ScaleID, noteIndex)}>Remove Note {noteIndex}</button>
					</Note>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.scale {
		display: inline;
	}
	input {
		color: black;
	}
</style>

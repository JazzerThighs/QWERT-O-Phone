<script lang="ts">
	import {
		NoteUDTemplate,
		type IScaleUDTemplate,
		ScaleUDTemplate,
		type ScaleTypeString
	} from '../initQOPUD';
	import Note from './Note.svelte';
	export let scaleData: IScaleUDTemplate = new ScaleUDTemplate();

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

	$: for (let idNum = 0; idNum < scaleData.NoteSet.length; idNum++) {
		scaleData.NoteSet[idNum].NoteID = idNum;
	}

	function addNote() {
		scaleData.NoteSet = [...scaleData.NoteSet, new NoteUDTemplate()];
	}

	function removeNote() {
		scaleData.NoteSet.length = scaleData.NoteSet.length - 1;
	}
</script>

<div class="scale">
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
		{#each scaleData.NoteClassSet as classSet, classSetIndex}
			<div class="note-class">
				{#each classSet[classSetIndex] as note, nameIndex}
					<input type="text" bind:value={note[nameIndex]} class="note-class-string" />
				{/each}
			</div>
		{/each}
	</div>
	<div>
		Note Set:
		{#each scaleData.NoteSet as noteItem (noteItem.NoteID)}
			<Note noteData={noteItem} />
		{/each}
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

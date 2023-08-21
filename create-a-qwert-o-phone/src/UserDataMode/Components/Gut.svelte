<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { GutUDTemplate, type SimpleWaveformTypeString } from '../initQOPUD';
	import Fret from './Fret.svelte';
	export let gutData: GutUDTemplate = new GutUDTemplate();
    
    const oscWaveTypeOptions: SimpleWaveformTypeString[] = [
        'sine',
        'square',
        'triangle',
        'sawtooth'
    ];

    $: gutData = $QOPUserData.GutList[gutData.GutID];

    function handleAddFret(gutIndex: number) {
        QOPUserData.addFret(gutIndex);
    }
    function handleRemoveFret(gutIndex: number, fretIndex: number) {
        QOPUserData.removeFret(gutIndex, fretIndex);
    }
</script>

<div class="gut">
    <div>Gut ID: {gutData.GutID}</div>
        <slot />
    <div>
        Gut Name: 
        <input type="text" bind:value={gutData.Name} />
    </div>
    <div>
        Description: 
        <input type="text" bind:value={gutData.Description} />
    </div>
    <div>
        Osc Wave Type: 
        <select bind:value={gutData.OscWaveType}>
            {#each oscWaveTypeOptions as option}
            <option value={option}>{option}</option>
            {/each}
        </select>
    </div>
    <div>
        Osc Gain: 
        <input type="number" bind:value={gutData.OscGain} />
    </div>
    <div>
        Gut MIDI Output Toggle: 
        <input type="checkbox" bind:value={gutData.GutMIDIOutputToggle} />
    </div>
    <div>
		Fret Set:
		<div>
			<button on:click={() => handleAddFret(gutData.GutID)}>Add Fret</button>
			<div class="fret">
				{#each $QOPUserData.GutList[gutData.GutID].FretSet as fret, fretIndex}
					<Fret fretData={fret}>
                        <button on:click={() => handleRemoveFret(gutData.GutID, fretIndex)}>Remove Fret {fretIndex}</button>
					</Fret>
				{/each}
			</div>
		</div>
	</div>
   


</div>






<style>
    .gut {
        color: black;
        background-color: rgb(255, 214, 137);
    }

	input, select {
		color: black;
	}
	button {
		border: black;
		color: black;
		background: lightblue;
		padding: 3px;
	}
</style>

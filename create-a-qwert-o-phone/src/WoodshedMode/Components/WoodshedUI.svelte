<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { QOPUserData } from '../../UserDataMode/QOPUDStore';
	import type { QOPUserDataTemplate } from '../../UserDataMode/initQOPUD';
	import { DeltaSetValidator, OpenGutValidator } from '../../UserDataMode/validateQOPUD';
	import { HydrateQOP, QOPTemplate } from '../initQOP';
	import { QOPMutator } from '../mutateQOPLoop';
	import Scale from './Scale.svelte';
	import Gut from './Gut.svelte';
	import Fret from './Fret.svelte';
	import Valve from './Valve.svelte';
	import Chart from './Chart.svelte'
	import Pad from './Pad.svelte';
	import Combo from './Combo.svelte';

	export let qop: QOPTemplate = new QOPTemplate();
	const AudioContext = window.AudioContext;
	const audioContext = new AudioContext();
	
	function WoodshedTriggerKeydown(event: KeyboardEvent) {
		QOPMutator(event, 0, qop, audioContext);
	}
	function WoodshedTriggerKeyup(event: KeyboardEvent) {
		QOPMutator(event, 1, qop, audioContext);
	}
	function WoodshedMode(userData: QOPUserDataTemplate, audioContext: AudioContext) {
		DeltaSetValidator(userData);
		OpenGutValidator(userData);
		qop = HydrateQOP(userData, audioContext);
		window.addEventListener('keydown', WoodshedTriggerKeydown);
		window.addEventListener('keyup', WoodshedTriggerKeyup);
	}

	onMount(() => {
		WoodshedMode($QOPUserData, audioContext);
		console.log(JSON.stringify(qop));
	});

    let midiAccess: MIDIAccess | undefined;
    let midiOutputDevices: MIDIOutput[] = [];
    let selectedOutput: MIDIOutput | null = null;

    onMount(async () => {
        // Request access to MIDI
        midiAccess = await navigator.requestMIDIAccess();

        // Populate available output devices
        midiOutputDevices = Array.from(midiAccess.outputs.values());
    });

	$: qop.MIDIOutput.SelectedMIDIOutput = selectedOutput;

	function handleOutputChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        const outputId = selectElement.value;
        selectedOutput = midiAccess!.outputs.get(outputId) || null;
    }

	onDestroy(() => {
		window.removeEventListener('keydown', WoodshedTriggerKeydown);
		window.removeEventListener('keyup', WoodshedTriggerKeyup);
	});
</script>

<div class="midi-outputs-container">
	<select bind:value={selectedOutput} on:change={handleOutputChange}>
		{#each midiOutputDevices as device (device.id)}
			<option value={device.id}>{device.name}</option>
		{/each}
	</select>
</div>

<div class="woodshed-container">

</div>


<style>
	.woodshed-container {
		display: flex;
	}
</style>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import Banner from './Banner.svelte';
	import EditorUI from '../UserDataMode/Components/EditorUI.svelte';
	import WoodshedUI from '../WoodshedMode/Components/WoodshedUI.svelte';

	let WoodshedModeToggle: boolean = false;

	function toggleMode() {
		WoodshedModeToggle = !WoodshedModeToggle;
	}

	/*function AudioTest() {
		//Tested, works
		const AudioContext = window.AudioContext; //|| window.webkitAudioContext; // Handle vendor prefixes
		const audioContext = new AudioContext();

		const newOscillator = audioContext.createOscillator(); // Use createOscillator method
		newOscillator.connect(audioContext.destination);
		newOscillator.frequency.value = 440;
		newOscillator.start();

		// Set up a timer to stop the oscillator after 3 seconds
		setTimeout(() => {
			newOscillator.stop();
			audioContext.close(); // Close the audio context when you're done to free up resources
		}, 3000);
	}*/
</script>
<!--button on:click={AudioTest}>AudioTest(), a=440, sine, 3 seconds</button-->
<Banner />

<button on:click={toggleMode}> Toggle Mode </button>



{#if WoodshedModeToggle}
	<WoodshedUI />
{:else}
	<EditorUI />
{/if}

<style>
	:global(button) {
		padding: 10px 15px;
		border: none;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		border-radius: 5px;
		margin-bottom: 20px;
	}

	:global(button:hover) {
		background-color: #0056b3;
	}
</style>

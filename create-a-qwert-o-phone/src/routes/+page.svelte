<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import EditorUI from '../UserDataMode/Components/EditorUI.svelte';
	import WoodshedUI from '../WoodshedMode/Components/WoodshedUI.svelte';

	let WoodshedModeToggle: boolean = false;
	function toggleMode() {
		WoodshedModeToggle = !WoodshedModeToggle;
	}
</script>

<div class="animate-gradient text-white py-6">
	<div class="container mx-auto text-center">
		<h1 class="text-4xl font-bold tracking-wider mb-2">QWERT-O-Phone</h1>
		<p class="text-lg font-semibold tracking-wide">Create a Custom MIDI Controller</p>
	</div>
</div>

<button on:click={toggleMode}> Toggle Mode </button>

{#if WoodshedModeToggle}
	<WoodshedUI />
{:else}
	<EditorUI />
{/if}

<style>
	.animate-gradient {
		background-size: 200% 100%;
		background-image: linear-gradient(to right, #6ee7b7, #3b82f6, #9333ea, #f59e0b);
		animation: gradient 8s linear infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	button {
		padding: 10px 15px;
		border: none;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		border-radius: 5px;
		margin-bottom: 20px;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>

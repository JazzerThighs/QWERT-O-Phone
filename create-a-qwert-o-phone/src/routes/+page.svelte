<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import EditorUI from '../UserDataMode/Components/EditorUI.svelte';
	import WoodshedUI from '../WoodshedMode/Components/WoodshedUI.svelte';

	let WoodshedModeToggle: boolean = false;
	function toggleMode() {
		WoodshedModeToggle = !WoodshedModeToggle;
	}
</script>

<button on:click={toggleMode}> Toggle Mode </button>

{#if WoodshedModeToggle}
	<WoodshedUI />
{:else}
	<EditorUI />
{/if}

<style>
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

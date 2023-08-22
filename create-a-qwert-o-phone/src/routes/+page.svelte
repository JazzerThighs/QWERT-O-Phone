<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Banner from './Banner.svelte';
	import EditorUI from '../UserDataMode/Components/EditorUI.svelte';
	import WoodshedUI from '../WoodshedMode/Components/WoodshedUI.svelte';
	import { QOPUserData } from '../UserDataMode/QOPUDStore';
	import type { QOPUserDataTemplate } from '../UserDataMode/initQOPUD';
	import { QOPMutator } from '../WoodshedMode/mutateQOPLoop';
	import { DeltaSetValidator, OpenGutValidator } from '../UserDataMode/validateQOPUD';
	import { HydrateQOP, QOPTemplate } from '../WoodshedMode/initQOP';

	let WoodshedModeToggle: boolean = false;
	
	function toggleMode() {
		WoodshedModeToggle = !WoodshedModeToggle;
	}
</script>

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

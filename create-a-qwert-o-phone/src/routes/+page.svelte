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
	let audioContext: AudioContext;
	onMount(() => {
		if (typeof window !== 'undefined') {
			audioContext = new window.AudioContext();
		}
	});
	function toggleMode() {
		WoodshedModeToggle = !WoodshedModeToggle;
		if (!WoodshedModeToggle) {
			window.removeEventListener('keydown', WoodshedTriggerKeydown);
			window.removeEventListener('keyup', WoodshedTriggerKeyup);
		} else {
			WoodshedMode($QOPUserData);
		}
	}
	let QOP: QOPTemplate;
	function WoodshedTriggerKeydown(event: KeyboardEvent) {
		QOPMutator(event, 0, QOP, audioContext);
	}
	function WoodshedTriggerKeyup(event: KeyboardEvent) {
		QOPMutator(event, 1, QOP, audioContext);
	}
	function WoodshedMode(QOPUserData: QOPUserDataTemplate) {
		DeltaSetValidator(QOPUserData);
		OpenGutValidator(QOPUserData);
		QOP = HydrateQOP(QOPUserData, audioContext);
		window.addEventListener('keydown', WoodshedTriggerKeydown);
		window.addEventListener('keyup', WoodshedTriggerKeyup);
	}
</script>

<Banner />

<button on:click={toggleMode}> Toggle Mode </button>

{#if WoodshedModeToggle}
	<WoodshedUI {QOP} />
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

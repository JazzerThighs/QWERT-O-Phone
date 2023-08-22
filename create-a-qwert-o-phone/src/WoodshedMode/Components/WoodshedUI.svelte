<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { QOPUserData } from '../../UserDataMode/QOPUDStore';
	import type { QOPUserDataTemplate } from '../../UserDataMode/initQOPUD';
	import { DeltaSetValidator, OpenGutValidator } from '../../UserDataMode/validateQOPUD';
	import { HydrateQOP, QOPTemplate } from '../initQOP';
	import { QOPMutator } from '../mutateQOPLoop';

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

	onDestroy(() => {
		window.removeEventListener('keydown', WoodshedTriggerKeydown);
		window.removeEventListener('keyup', WoodshedTriggerKeyup);
	});
</script>

<style>
</style>

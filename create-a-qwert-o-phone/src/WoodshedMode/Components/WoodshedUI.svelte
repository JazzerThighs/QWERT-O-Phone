<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
    import { QOPUserData } from "../../UserDataMode/QOPUDStore";
	import type { QOPUserDataTemplate } from "../../UserDataMode/initQOPUD";
	import { DeltaSetValidator, OpenGutValidator } from "../../UserDataMode/validateQOPUD";
	import { HydrateQOP, QOPTemplate } from "../initQOP";
	import { QOPMutator } from "../mutateQOPLoop";

    export let qop: QOPTemplate = new QOPTemplate();
    const AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    function WoodshedTriggerKeydown(event: KeyboardEvent) {
		QOPMutator(event, 0, qop, audioContext);
	}
	function WoodshedTriggerKeyup(event: KeyboardEvent) {
		QOPMutator(event, 1, qop, audioContext);
	}
	function WoodshedMode(QOPUserData: QOPUserDataTemplate, audioContext: AudioContext) {
		DeltaSetValidator(QOPUserData);
		OpenGutValidator(QOPUserData);
		qop = HydrateQOP($QOPUserData, audioContext);
		window.addEventListener('keydown', WoodshedTriggerKeydown);
		window.addEventListener('keyup', WoodshedTriggerKeyup);
	}

    onMount(() => {
        WoodshedMode($QOPUserData, audioContext);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', WoodshedTriggerKeydown);
        window.removeEventListener('keyup', WoodshedTriggerKeyup);
    });
</script>





<style>

</style>
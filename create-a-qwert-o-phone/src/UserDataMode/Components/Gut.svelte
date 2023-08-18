<script lang="ts">
	import { QOPUserData } from '../QOPUDStore';
	import { GutUDTemplate } from '../initQOPUD';
	import Fret from './Fret.svelte';
	export let gutData: GutUDTemplate = new GutUDTemplate();

    $: gutData = $QOPUserData.GutList[gutData.GutID];

    function handleAddFret(gutIndex: number) {
        QOPUserData.addFret(gutIndex);
    }
    function handleRemoveFret(gutIndex: number, fretIndex: number) {
        QOPUserData.removeFret(gutIndex, fretIndex);
    }
</script>

<style>
</style>

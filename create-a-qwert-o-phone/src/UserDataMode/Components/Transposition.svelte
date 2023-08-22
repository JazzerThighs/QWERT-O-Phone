<script lang="ts">
    import { QOPUserData } from '../QOPUDStore';
    import { type QOPValidEventCodesString, QOPValidEventCodes, type TranspositionObject } from '../initQOPUD';
    export let transpositionData: TranspositionObject = {};
    export let listString: 'GutList' | 'ValveList' | 'ChartList' = 'GutList';
	export let listIndex: number = 0;
    export let setString: 'FretSet' | 'ComboSet' | null = null;
	export let setIndex: number | null = null;

    function handleAddTranspositionCode() {
        function handleKeydownEvent(event: KeyboardEvent) {
            if (QOPValidEventCodes.includes(event.code as QOPValidEventCodesString)) {
                QOPUserData.addTranspositionCode(event.code as QOPValidEventCodesString, listString, listIndex, setString, setIndex);
                window.removeEventListener('keydown', handleKeydownEvent);
            } else {
                console.log(`${event.code} is disallowed. Pick a different keyboard key.`);
                window.removeEventListener('keydown', handleKeydownEvent);
            }
        }
        window.addEventListener('keydown', handleKeydownEvent);
    }
    function handleRemoveTranspositionCode(eventCode: string) {
        QOPUserData.removeTranspositionCode(eventCode as QOPValidEventCodesString, listString, listIndex, setString, setIndex);
    }
</script>

<div class="transpositionEventCodes">Transposition Keys:
    <button on:click={() => handleAddTranspositionCode()}>Add Key</button>
	{#each Object.entries(transpositionData) as [eventCode, value]}
		<div class="eventCode">{eventCode}:
            <button on:click={() => handleRemoveTranspositionCode(eventCode)}>Remove Key {eventCode}</button>
			<div class="transposition-keydown">
				↓:
				Note ID:<input type="number" bind:value={value[0][0]}/>,
                Cents:<input type="number" bind:value={value[0][1]}/> 
			</div>
			<div class="transposition-keyup">
				↑:
				Note ID:<input type="number" bind:value={value[1][0]}/>,
                Cents:<input type="number" bind:value={value[1][1]}/>
			</div>
		</div>
	{/each}
</div>

<style>
    .transpositionEventCodes {
        border: solid black;
        padding: 2vh;
    }
    .eventCode, .transposition-keydown, .transposition-keyup {
        border: dotted black;
        padding: 1vh;
    }
</style>
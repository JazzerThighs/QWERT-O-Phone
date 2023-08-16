<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { BlankQOPUserData } from '../UserDataMode/initQOPUD';
    const QOPUserData = BlankQOPUserData();

    import UDScale from './UDMode/Scale.svelte';
</script>

    <h1>QOP User Data:</h1>
    <pre>{JSON.stringify(QOPUserData, null, 2)}</pre>
    
<style>

</style>

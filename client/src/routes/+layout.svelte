<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { writable } from 'svelte/store';
    import '../app.css';
	import { onMount, setContext } from 'svelte';

	import UiButton from '$lib/components/ui/UIButton.svelte';
	import { page } from '$app/stores';

    import { session, update, signIn, signOut } from '$lib/session';

    onMount(async () => {
        await update();
    });

</script>

<slot />
<script lang="ts">
    import '../app.css';
    import { session } from '$lib/sessionStore';
	import { onMount } from 'svelte';
    export let data;
    if (data.authenticated) {
        $session.authenticated = true;
        $session.user = data.user;
    } else {
        $session.authenticated = false
    }

</script>

<slot />
<script lang="ts">
	import { goto } from "$app/navigation";
	import { signOut } from "$lib/session";
	import LogoLarge from "./ui/LogoLarge.svelte";
	import UiButton from "./ui/UIButton.svelte";
	import UiInput from "./ui/UIInput.svelte";

    const logout = async () => {
        await signOut();
        goto('/');
    }


</script>

<nav class="flex flex-row justify-between px-4 py-2 backdrop-blur fixed w-full">
    <LogoLarge/>
    <div class="">
        <UiButton on:click={logout} style='secondary' size='small'>Wyloguj się</UiButton>
    </div>
</nav>
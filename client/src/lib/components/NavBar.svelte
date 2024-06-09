<script lang="ts">
	import { goto } from "$app/navigation";
	import { signOut } from "$lib/sessionStore";
	import LogoLarge from "./ui/LogoLarge.svelte";
	import UiButton from "./ui/UIButton.svelte";
	import UiInput from "./ui/UIInput.svelte";
    import { session } from "$lib/sessionStore";

    const logout = async () => {
        await signOut();
        goto('/');
    }


</script>

<nav class="flex flex-row justify-between px-4 py-2 backdrop-blur fixed w-full">
    <LogoLarge/>
    <div class="">
        
    </div>
</nav>
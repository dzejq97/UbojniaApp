<script lang="ts">
	import LogoLarge from "./ui/LogoLarge.svelte";
	import UiButton from "./ui/UIButton.svelte";


</script>

<nav class="flex flex-row justify-between px-4 py-2 backdrop-blur sticky w-full">
    <LogoLarge/>
    <div>
        <UiButton style='secondary'>Zaloguj się</UiButton>
        <span>lub</span>
        <UiButton style='primary'>Utwórz konto</UiButton>
    </div>
</nav>
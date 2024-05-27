<script lang="ts">
	import LogoLarge from "$lib/components/ui/LogoLarge.svelte";
	import LogoSmall from "$lib/components/ui/LogoSmall.svelte";
import UiButton from "$lib/components/ui/UIButton.svelte";
	import UiCheckbox from "$lib/components/ui/UICheckbox.svelte";
	import UiInput from "$lib/components/ui/UIInput.svelte";
	import UiTextarea from "$lib/components/ui/UITextarea.svelte";

    let checkbox_checked: boolean | undefined;

    let text_value: string;
</script>


<main class="bg-light rounded flex flex-col items-center gap-10 pb-40 pt-20">
    <div>
        <LogoLarge/>
        <LogoSmall/>
    </div>
    <div>
        <UiButton  size='small'>small primary</UiButton>
        <UiButton >normal primary</UiButton>
        <UiButton size='large'>large primary</UiButton>
    </div>
    <div>
        <UiButton size='small' style='secondary'>small secondary</UiButton>
        <UiButton style='secondary'>normal secondary</UiButton>
        <UiButton style='secondary' size='large'>large secondary</UiButton>
    </div>
    <div class="">
        <UiButton size='small' style='accent'>small accent</UiButton>
        <UiButton style='accent'>normal accent</UiButton>
        <UiButton size='large' style='accent'>large accent</UiButton>
    </div>
    <div>
        <UiButton icon='mdi:emoji' size='small'></UiButton>
        <UiButton icon='mdi:emoji'></UiButton>
        <UiButton icon='mdi:emoji' size='large'></UiButton>
    </div>
    <div>
        <UiButton style='link'>link</UiButton>
    </div>
    <div>
        <UiInput type='password' placeholder='password'></UiInput>
        <UiInput type='text' placeholder='username'></UiInput>
        <UiInput placeholder='with icon' icon='mdi:user'></UiInput>
        <UiInput bind:content={text_value}/>
        <p>
            {text_value}
        </p>
    </div>
    <div class=""> <!-- FIX THIS do kurwy nędzy-->
        <UiCheckbox bind:checked={checkbox_checked}>test</UiCheckbox>
        {#if checkbox_checked}
            <p class="">Dziena mordko, essa</p>
        {/if}
    </div>
    <div class=""> <!-- FIX THIS do kurwy nędzy-->
        <UiCheckbox>test</UiCheckbox>
    </div>
    <div class="flex flex-col gap-5">
        <UiTextarea placeholder="Pole tekstowe"></UiTextarea>
        <UiTextarea></UiTextarea>
    </div>
</main>
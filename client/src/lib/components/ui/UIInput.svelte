<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { HTMLInputTypeAttribute } from "svelte/elements";

    export let type: HTMLInputTypeAttribute = 'text';
    export let placeholder: string | undefined = undefined;
    export let icon: string | undefined = undefined;
    export let content: string = '';
</script>
    <div class="flex flex-row items-center">
        {#if icon}
            <Icon icon={icon} width='auto' class='text-primary'></Icon>
        {/if}
        <input
        bind:value={content}
        {... {placeholder, type}}
        {...$$restProps}
        />
    </div>

<style lang="postcss">
    div {
        border-bottom: solid 2px;
        @apply border-primary shadow-sm m-1;
        max-width: 280px;
        min-width: 150px;
    }
    input {
        @apply px-2 py-1;
        background-color: transparent;
        width: 100%;
        transition: all ease 0.3s;
        pointer-events: auto;
    }
    input::placeholder {
        font-size: 1.05rem;
    }
    input:focus {
        outline: none;
    }
    input:hover {
        @apply bg-gray bg-opacity-5;
    }
    div:has(input:nth-of-type(1):focus) {
        @apply bg-opacity-5 bg-primary;
    }
</style>
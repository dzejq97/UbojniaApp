<script lang="ts">
    import Icon from '@iconify/svelte';

    export let icon: undefined | string = undefined;
    export let style: 'primary' | 'secondary' | 'accent' | 'link' = 'primary';
    export let size: 'small' | 'normal' | 'large' = 'normal';

    const setIconSize = () => {
        if (size === 'small') return '1.15rem';
        else if (size === 'large') return '1.7rem';
        else return '1.3rem';
    }
</script>

    <button
    class="button {style} {size}"
    on:click
    on:mouseenter
    on:mouseleave >
        <span class="flex flex-row items-center justify-center gap-2">
            <slot/>
            {#if icon}
                <Icon icon={icon} height={setIconSize()} />
            {/if}
        </span> 
    </button>

<style lang="postcss">
    .button {
        border-radius: 8px;
        transition: all 0.2s ease;
    }
    .primary {
        @apply bg-primary border-2 border-dark text-light shadow;
    }
    .primary:hover {
        @apply bg-primaryhover border-transparent;
    }
    .secondary {
        @apply border-2 border-primary text-dark shadow;
    }
    .secondary:hover {
        @apply bg-primary text-light border-transparent;
    }
    .accent {
        @apply bg-accent border-2 text-dark shadow;
    }
    .accent:hover {
        @apply bg-accenthover border-transparent;
    }
    .link {
        padding: 0px 15px !important;
        font-weight: 300 !important;
        border-bottom: solid 1px transparent;
        border-radius: 0;
    }
    .link:hover {
        @apply text-primary;
        @apply border-primary;
    }
    .small {
        @apply px-2;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 1rem;
        font-weight: 300;
    }
    .normal {
        @apply px-4 py-1;
        font-size: 1.1rem;
        font-weight: 300;
    }
    .large {
        @apply px-6 py-2;
        font-size: 1.1rem;
        font-weight: 300;
    }
</style>
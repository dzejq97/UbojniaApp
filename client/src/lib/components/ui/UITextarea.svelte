<script lang="ts">
    export let placeholder: string | undefined = undefined;
    export let content : string | number | string[] | null | undefined = undefined;

</script>

<textarea
placeholder={placeholder}
bind:value={content}
/>

<style lang="postcss">
    textarea {
        @apply bg-transparent rounded shadow px-5 py-2;
        resize: none;
        background-color: transparent;
        transition: all 0.3s ease;
        min-width: 350px;
    }
    textarea:focus {
        outline: none;
        border: 1px solid;
        @apply border-primary bg-primary bg-opacity-5;
    }
    textarea:hover {
        @apply bg-gray bg-opacity-5;
    }
    textarea::-webkit-scrollbar {
        width: 5px;
    }
    textarea::-webkit-scrollbar-track {
        @apply bg-transparent;
    }
    textarea::-webkit-scrollbar-thumb {
        @apply bg-primary;
        border-radius: 5px;
    }
</style>
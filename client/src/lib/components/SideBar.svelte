<script lang="ts">
    import { goto } from "$app/navigation";
import { signOut } from "$lib/sessionStore";
import Icon from "@iconify/svelte";
    
    const logout = async () => {
        await signOut();
        goto('/');
    }

</script>

<aside class="sidebar">
    <div class="sidebutton">
        <Icon icon='carbon:home'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate={-90} class='absolute right-[134px] text-primary'/>
            Strona główna
        </span>
    </div>
    <div class="sidebutton">
        <Icon icon='ph:fire-light'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate={-90} class='absolute right-[80px] text-primary'/>
            Gorące
        </span>
    </div>
    <div class="sidebutton">
        <Icon icon='ph:user'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate={-90} class='absolute right-[64px] text-primary'/>
            Profil
        </span>
    </div>
    <button on:click={logout}>
    <div class="sidebutton">
        <Icon icon='material-symbols:logout'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate={-90} class='absolute right-[112px] text-primary'/>
            Wyloguj się
        </span>
    </div>
    </button>
</aside>

<style lang="postcss">
    .sidebar {
        @apply border-r-2 border-gray border-opacity-10 shadow-xl fixed rounded h-screen pt-2 mt-12;
    }

    .sidebar .sidebutton:last-child {
        position: absolute;
        bottom: calc(0px + 3rem);
    }

    .sidebutton {
        @apply flex items-center text-3xl justify-start p-4;
    }
    .label {
        @apply absolute left-10 text-base ml-8 flex items-center justify-center bg-primary text-light px-4 py-1 rounded-lg text-nowrap shadow-lg;
        visibility: hidden;
    }

    .sidebutton:hover {
        
    }

    .sidebutton:hover .label {
        visibility: visible;
    }

</style>
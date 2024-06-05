<script lang="ts">
    import Icon from "@iconify/svelte";
    

</script>

<aside class="sidebar">
    <div class="sidebutton">
        <Icon icon='carbon:home'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate='-90deg' class='absolute right-[134px] text-primary'/>
            Strona główna
        </span>
    </div>
    <div class="sidebutton">
        <Icon icon='ph:fire-light'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate='-90deg' class='absolute right-[80px] text-primary'/>
            Gorące
        </span>
    </div>
    <div class="sidebutton">
        <Icon icon='ph:user'/>
        <span class="label">
            <Icon icon='eva:arrow-up-fill' rotate='-90deg' class='absolute right-[64px] text-primary'/>
            Profil
        </span>
    </div>
</aside>

<style lang="">
    .sidebar {
        @apply border-r-2 border-gray border-opacity-10 shadow-xl fixed rounded h-full pt-10 mt-16;
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
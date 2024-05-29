<script lang="ts">
    export let data;
    import NavBar from "$lib/components/NavBar.svelte";
</script>

<NavBar/>
<main class="">
    <div>
        {#each data.latest_posts as post}
            { post.id }
        {/each}
    </div>
    <div class="section lead">
        <div class="title">
            UBOJNIA
        </div>
        <div class="text-2xl">
            Twoje <span class="gradient">patologiczne</span> miejsce w sieci
        </div>
    </div>
    <div class="section">
        
    </div>
</main>

<style lang='postcss'>
.lead {
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.title {
    @apply text-7xl text-accent;
    font-weight: 600;
    letter-spacing: -8px;
}

</style>
<script>
	import NavBar from "$lib/components/NavBar.svelte";
    import SideBar from '$lib/components/SideBar.svelte';
</script>

<NavBar/>
<main class="flex">
    <SideBar/>
    <section class="ml-28 mt-14">
        <slot/>
    </section>
</main>
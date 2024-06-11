<script lang="ts">
	import Icon from "@iconify/svelte";
    import Post from "$lib/components/Post.svelte";
    import { marked } from "marked";

    export let data;

    let post_content: string = '';

    const submitNewPost = async () => {
        if (!post_content) return;

        const res = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: post_content,
            })
        });

        if (res.status === 200) {
            const json = await res.json();
            console.log(json);
        } else return;
    }


</script>

<main class="flex flex-col items-center">
    <section class="flex flex-row w-3/4 py-12 px-4">
        <textarea class="w-11/12 bg-light p-4 rounded-xl" placeholder="Dodaj post" bind:value={post_content} />
        <button
        on:click={submitNewPost}
        class="w-1/12 flex items-center justify-center text-3xl rounded-md m-4 bg-primary text-light shadow border border-black border-opacity-10 hover:bg-primaryhover">
            <Icon icon='tabler:send'/>
        </button>
    </section>

    <section class="flex flex-col w-10/12 bg-light px-28 gap-4">
        {#each data.latest_posts as post}
            <Post post_data={post}/>
        {/each}
    </section>

</main>

<style lang="postcss">
    textarea {
        outline: none;
        resize: none;
        height: 7rem;
        transition: all 0.2s ease;
    }
    textarea:focus {
        height: 15rem;
    }
    textarea::-webkit-scrollbar {
        width: 6px;
    }
    textarea::-webkit-scrollbar-track {
        border-radius: 50%;
    }
    textarea::-webkit-scrollbar-thumb {
        @apply bg-primary;
        opacity: 0.5;
        border-radius: 20%;
    }
</style>

<div class="flex flex-wrap gap-10 items-center justify-center">
    {#each {length: 20} as _, i }
        <div class="min-w-[60%] shadow flex flex-col rounded-xl">
            <span class="bg-primary text-right text-light rounded-t-xl px-4 py-1">Jakiś tytuł postu numer {i+4232}</span>
            <p class="p-4">To jest post numer <span class="font-semibold">{i+5441}</span></p>
            <div class="flex gap-4 text-2xl ml-96 pl-80 py-4">
                <Icon icon='mynaui:like'/>
                <Icon icon='material-symbols:add-comment-outline'/>
            </div>
        </div>
    {/each}
</div>


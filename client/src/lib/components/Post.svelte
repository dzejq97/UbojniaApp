<script lang="ts">
    import { marked } from "marked";
    import Icon from "@iconify/svelte";
	import UiButton from "./ui/UIButton.svelte";
    export let post_data: any;

    let post_likes: number = post_data.likes.length;
    let comment_text: string = '';


    const submitLike = async () => {
        post_likes++;
        const res = await fetch(`/api/posts/${post_data._id}/like`, { method: 'POST' });
        if (res.status === 200) return;
        else post_likes--;
    }

    const submitComment = async () => {
        const res = await fetch(`/api/posts/${post_data._id}/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: comment_text
            })
        });

        if (res.status === 200) return;
        else post_data.comments.pop();
        
    }

</script>

<div class="post">
    <div class="post_content flex justify-start items-center">
        <div class="author bg-primary h-14 text-light px-8 flex items-center justify-center">
            { post_data.author.username }
        </div>
        <div class="post_text pl-6">
            {@html marked(post_data.content)}
        </div>
        <div class="likes flex items-center justify-center gap-6 ml-auto">
            <span class="font-semibold">{ post_likes }</span>
            <button on:click={submitLike} class="post_like text-3xl pr-4 hover:text-primary">
                <Icon icon='iconamoon:like-light'/>
            </button>
        </div>
    </div>
    <div class="comments flex flex-col gap-4">
        {#each post_data.comments as comment}
            <div class="comment">
                { comment.content }
            </div>
        {/each}
        <div class="flex">
            <textarea placeholder="Dodaj komentarz"
            class="w-full p-2"
            bind:value={comment_text}></textarea>
            <UiButton on:click={submitComment} style='secondary' size='small' icon='tabler:send'></UiButton>
        </div>
    </div>
</div>

<style lang="postcss">
    textarea {
        outline: none;
        resize: none;
        margin: 0
    }
.post {
    @apply w-full bg-white flex flex-col gap-2;
}
.post_content {
}

</style>
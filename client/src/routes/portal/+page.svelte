<script lang="ts">
	import Icon from "@iconify/svelte";

</script>

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


<script lang="ts">
    import {session} from '$lib/session';
    let redirect: string = $session.authorized ? '/portal' : '/';
</script>

<a href={redirect}>
    <div class="text-2xl hover:drop-shadow"> 
        <span class="ubojnia">UBOJNIA</span>Mikroblog
    </div>
</a>

<style lang="postcss">
    div {
        letter-spacing: -2px;
        pointer-events: auto;
        transition: all 0.5s ease;
        font-weight: 300;
    }

    .ubojnia {
        font-weight: 700;
        @apply text-primary;
    }
</style>
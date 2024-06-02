<script lang="ts">
    import UiInput from '$lib/components/ui/UIInput.svelte';
    import UiButton from '$lib/components/ui/UIButton.svelte';
    import Icon from '@iconify/svelte';
	import doFetch from '$lib/doFetch';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    onMount( async () => {
        const res = await doFetch('/auth/verify', { method: 'GET' });
        if (res.status === 200) goto('/portal');
    })



    let username = '';
    let password = '';
    let error = '';

    const login = async () => {
        if (!username || !password) {
            error = 'Musisz wypełnić wszystkie pola';
            return;
        }

        if (username.length > 32 || password.length > 32) {
            return error = 'Nazwa użytkowniak lub hasło za długie';
        }
        
        const res = await doFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (res.status === 200) {
            return goto('/portal');
        } else {
            return error = 'Nieprawidłowy login lub hasło';
        }
    }

</script>

<main class="">
    <section class="flex flex-col lg:flex-row justify-around items-baseline mt-16">
        <div class="">
            <div class="blob1 flex flex-col gap-4">
                <span class="title">UBOJNIA</span>
                <span class="text-light">
                    Twoje patologiczne miejsce w sieci.
                </span>
            </div>
            <div class="flex justify-around">
                <div class="blob2 flex justify-center items-center text-center text-2xl font-bold text-light">
                    Dołącz do nas! <span class="rotate-90 ml-4"><Icon icon='fa:arrow-up'/></span>
                </div>
                <div class="blob3 flex gap-4 text-5xl text-light">
                    <a href="/"><Icon icon='ic:baseline-discord'></Icon></a>
                    <a href="/"><Icon icon='ic:baseline-facebook'></Icon></a>
                    <a href="/"><Icon icon='ic:baseline-tiktok'></Icon></a>
                </div>
            </div>
           
        </div>
        <div class="border border-black bg-light_container border-opacity-5 px-12 py-8 rounded-xl shadow flex flex-col justify-center items-center gap-2">
            <span class="font-semibold w-full text-center">Zaloguj się</span>
            <UiInput placeholder='Nazwa użytkownika' icon='mdi:user' bind:content={username}></UiInput>
            <UiInput placeholder='Hasło' type='password' icon='mdi:password' bind:content={password}></UiInput>
            <UiButton size='small' style='primary' on:click={login}>Zaloguj</UiButton>
            <div class="error" class:error>
                {error}
            </div>
        </div>
    </section>
</main>

<style lang='postcss'>
.error {
    @apply opacity-100 text-sm py-2 px-4 border border-red-400 rounded-xl text-red-400 mt-4;
}

a {
    transition: all 0.2s ease;
}
a:hover {
    @apply text-accent text-center drop-shadow-2xl;
}

.blob1 {
    transform: rotate(-2deg);
    background: linear-gradient(30deg, rgb(199, 85, 248) 30%, rgb(57, 136, 254) 80%);
    padding: 7rem;
    border-radius:27% 73% 39% 61% / 27% 42% 68% 73%;
    @apply shadow-xl border border-black border-opacity-10;
}

.blob2 {
    transform: rotate(5deg);
    background: linear-gradient(210deg, rgb(199, 85, 248) 30%, rgb(57, 136, 254) 80%);
    padding: 3rem;
    border-radius:17% 83% 80% 20% / 32% 45% 55% 68% ;
    @apply shadow-xl border border-black border-opacity-10;

}

.blob3 {
    background: linear-gradient(30deg, rgb(199, 85, 248) 30%, rgb(57, 136, 254) 80%);
    padding: 2rem;
    border-radius:81% 19% 38% 62% / 32% 45% 55% 68%;
    @apply shadow-xl border border-black border-opacity-10;
}

.title {
    @apply text-7xl text-light;
    font-weight: 600;
    letter-spacing: -8px;
}

</style>
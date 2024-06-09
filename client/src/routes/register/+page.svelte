<script lang="ts">
	import LogoLarge from "$lib/components/ui/LogoLarge.svelte";
import UiButton from "$lib/components/ui/UIButton.svelte";
import UiInput from "$lib/components/ui/UIInput.svelte";
import UiCheckbox from '$lib/components/ui/UICheckbox.svelte';
import NavBar from "$lib/components/NavBar.svelte";
	import { goto } from "$app/navigation";

let username = '';
let email = '';
let password = '';
let repeat_password = '';
let accept_rules = false;

let errors: string[] = [];
let response_error = '';

const submitRegister = async () => {
    errors = [];
    response_error = '';
    if (!username || !email || !password || !repeat_password) errors.push('Musisz wypełnić wszystkie pola.');
    if (!accept_rules) errors.push('Musisz zapoznać i zaakceptować regulamin');
    if (password !== repeat_password) errors.push('Hasła muszą być takie same')

    if (errors.length) return;

    const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
    });
    
    if (res.status === 200) {
        goto('/');
    } else {
        return response_error = 'Podana nazwa użytkownika lub adres email jest już w użyciu'
    }

}

</script>

<NavBar/>
<main class="flex h-screen items-center justify-start">
    <div class="form">
        <span class="font-light text-3xl pb-12">Utwórz konto</span>
        <UiInput placeholder='Nazwa użytkownika' icon='mdi:user' bind:content={username}/>
        <UiInput placeholder='Adres email' icon='mdi:email-outline' bind:content={email}/>
        <UiInput placeholder='Hasło' icon='mdi:password' type='password' bind:content={password}/>
        <UiInput placeholder='Powtórz hasło' icon='mdi:password-outline' type='password' bind:content={repeat_password}/>
        <UiCheckbox bind:checked={accept_rules}>Akceptuję regulamin portalu</UiCheckbox>
        <UiButton on:click={submitRegister}>Dołącz</UiButton>
        {#if errors.length}                
            <div class="opacity-100 text-sm py-2 px-4 border border-red-400 rounded-xl text-red-400 mt-4">
                <ul>
                {#each errors as error}
                    <li>{ error }</li>
                {/each}
                </ul>
            </div>
        {/if}
        {#if response_error}
            <div class="bg text-base text-center drop-shadow-md">
                { response_error }
            </div>
        {/if}
    </div>
    <div class="bg flex justify-center items-center basis-2/3 text-center h-full">
        <span>Dołącz do zjebów.</span>
    </div>
</main>


<style lang="postcss">
.bg {
    background-image: url('/bg.svg');
    background-size: cover;
}

ul {
    list-style-type: disc;
    list-style-position: inside;
}

.form {
    @apply shadow rounded-md px-12 py-24 flex flex-col justify-center items-center gap-4 basis-1/3 h-full bg-light;
}
</style>
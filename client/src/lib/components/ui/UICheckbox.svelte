<script lang="ts">
    export let checked: boolean | undefined = undefined;
</script>

<label><slot/>
  <input type="checkbox" bind:checked/>
  <span class="checkmark"></span>
</label>
  
  <style lang="postcss">
    label {
      position: relative;
      padding-left: 30px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 22px;
      width: 22px;
      border-radius: 4px;
      @apply border-primary border bg-transparent shadow;
      transition: all 0.2s ease;
    }

    label:hover input ~ .checkmark {
      @apply bg-gray bg-opacity-5;
    }

    label input:checked ~ .checkmark {
      @apply bg-primary;
    }

    .checkmark::after {
      content: '';
      position: absolute;
      display: none;
    }

    label input:checked ~ .checkmark::after {
      display: block;
    }

    label .checkmark::after {
      left: 6px;
      top:1px;
      width: 9px;
      height: 14px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }


  </style>
  
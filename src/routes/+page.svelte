<script lang="ts">
    import Steam from "$lib/components/steam.svelte";

  let start = $state(false);
</script>

<main>
  <button onclick={() => start = true}>
    start
  </button>

  {#if start}
    <Steam />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0; padding: 0;
  }

  main {
    width: 100vw; height: 100vh;
  }

  @font-face {
    src: url("$lib/assets/fonts/TerminusTTF-Bold.ttf") format("truetype");
    font-family: terminus;
    font-weight: normal;
  }

   @font-face {
    src: url("$lib/assets/fonts/TerminusTTF-Bold.ttf") format("truetype");
    font-family: terminus;
    font-weight: normal;
  }

  @font-face {
    src: url("$lib/assets/fonts/SegoeUIVF.ttf") format("truetype");
    font-family: s;
  }

  @font-face {
    src: url("$lib/assets/fonts/Icons.ttf") format("truetype");
    font-family: icons;
  }
</style>
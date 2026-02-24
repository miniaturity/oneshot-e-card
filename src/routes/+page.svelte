<script lang="ts">
    import Steam from "$lib/components/steam.svelte";

  let start = $state(false);
</script>

<main>
  

  {#if start}
    <Steam />
  {/if}
</main>

<style>

</style>
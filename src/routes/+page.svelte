<script lang="ts">
    import Controlwindow from "$lib/components/controlwindow.svelte";
    import Oneshotbutton from "$lib/components/oneshotbutton.svelte";
    import Steam from "$lib/components/steam.svelte";

    let start = $state(false);

    
</script>

<svelte:window onkeydown={(e) => {
  if (e.key === "Enter" && !start) {
    start = true;
  }
}}/>
<main>

  <div class="cw">
    <Controlwindow />
  </div>

  <div class="world-machine">
    <div class="center">
      <Oneshotbutton 
        onPress={() => start = true}
      />
    </div>
  </div>

  {#if start}
    <Steam />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0; padding: 0;
    background: #000;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw; height: 100vh;
  }

  .cw {
    position: absolute;
    
    left: 10%; top: 10%;
  }

  .world-machine {
    width: 250px; height: 250px;
    border: 3px solid #741ACD;    

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 2;

    background-color: #000;
  }

  .center {
    --margin: 24px;
    margin: var(--margin);
    border: 3px solid #741ACD;  

    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - calc(var(--margin) * 2));
    height: calc(100% - calc(var(--margin) * 2));

    background-image: url("/tv_encounter.png");
    background-repeat: repeat-y;

    animation: bg-scroll 80s linear infinite;
  }

  @keyframes bg-scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -200%;
  }
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
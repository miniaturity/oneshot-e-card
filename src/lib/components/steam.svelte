<script lang="ts">
  import { onMount } from "svelte";
  import Oneshot from "./oneshot.svelte";


  const TIME: number = 1000;
  let loaded: boolean = $state(false);
  let animate: boolean = $state(false);

  function load() { loaded = true; }

  onMount(() => {
    setTimeout(() => { 
      animate = true;
      setTimeout(load, 300); 
    }, TIME);
  });
</script>

{#if !loaded}
  <div class={`steam ${animate ? 'out' : ''}`}>
    <div class="s__window-bar">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"></path></svg>
    </div>
    <div class="s__content">
      <div class="sc__game">
        <img src="/oneshot.jpg" alt=""/>
      </div>
      <div class="sc__status">
        <div class="scs__text">
          <span class="scst__sg">Starting game</span>
          <span class="scst__os">OneShot</span>
          <span class="scst__l">LAUNCHING</span>
        </div>
        <div class="scs__open">
          <div class="scsb__btn">
            Open Steam
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <Oneshot />
{/if}

<style>
  .steam {
    user-select: none;
    position: absolute;
    top: calc(50% - calc(285px / 2));
    left: calc(50% - calc(600px / 2));

    display: flex;
    flex-direction: column;
    width: 600px; height: 285px;
    background-color: #25282E;

    font-family: motiva;
    color: #969696;

    border-radius: 8px;
  }

  .s__window-bar {
    display: flex;
    justify-content: flex-end;
    height: 32px;
    border-radius: 8px 8px 0px 0px;
    margin-right: 16px;
    margin-top: 16px;
  }

  .s__content {
    display: flex;
    flex-direction: row;
    margin-left: 32px;
    margin-right: 32px;
    border-radius: 0px 0px 8px 8px;
    gap: 12px;
    margin-bottom: 32px;
  }

  .sc__game {
    width: 150px;
    
    & img {
      object-fit: contain;
      width: 100%;
    }
  }

  .sc__status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .scs__text {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }

  .scst__os { 
    font-weight: 500; 
    font-size: 1.6rem; 
    color: #fff; 
    margin-top: 8px; 
    margin-bottom: 16px; 
  }
  
  .scsb__btn {
    display: flex;
    align-items: center; justify-content: center;

    width: 375px; height: 40px;
    background-color: #3D4450;
    color: #fff;
  }

  .out {
    animation: out 0.3s ease-out forwards;
  }

  @keyframes out {
    from {
      opacity: 1;
      scale: 1;
    } to {
      opacity: 0;
      scale: 0.9;
      display: none;
    }
  }

  @font-face {
    src: url("$lib/assets/fonts/MotivaSansRegular.ttf");
    font-family: motiva;
    font-weight: normal;
  }

  @font-face {
    src: url("$lib/assets/fonts/MotivaSansMedium.ttf");
    font-family: motiva;
    font-weight: 500;
  }
</style>
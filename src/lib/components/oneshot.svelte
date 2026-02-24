<script lang="ts">
  import Dialogue from "$lib/components/dialogue.svelte";
  import type { DialogueNode, Flags } from "$lib/types/types";
  import { DIALOGUE } from "$lib/dialogue/dialogue";
  import { onMount } from "svelte";
  import { draggable } from '@neodrag/svelte';
  import distant_bgm from "$lib/assets/music/Distant.ogg";


  let bgm = $state<HTMLAudioElement | null>(null);
  let bgm_src = $state<string>(distant_bgm);

  $effect(() => {
    if (bgm) {
      bgm.currentTime = 0;
      bgm.volume = 0.5;
      bgm.play().catch(() => {
        console.log("BGM autoplay blocked.");
      });
    }
  });

  function killBgm() {
    if (!bgm) return;
    bgm.currentTime = 0;
    bgm.pause();
  }

  let LOADED = $state(false);
  
  let renderDialogue = $state<boolean>(true);
  let flags = $state<Flags>({});

  let numVisits = $state<number>(0);
  let currentNodeId = $state<string>("start");
  let currentNode = $derived<DialogueNode>(DIALOGUE[currentNodeId]);
  
  onMount(() => {
    const visits = localStorage.getItem('visits');
    if (visits) {
      numVisits = Number(visits);
    }

    if (!visits) {
      localStorage.setItem('visits', '1');
    } else {
      localStorage.setItem('visits', `${Number(visits) + 1}`);
    }

    const visit_count_dialogues: Record<number, string> = {
      0: "start",
      1: "visit_1a",
      2: "visit_2a",
      5: "visit_5",
      10: "visit_10",
      67: "visit_67"
    }

    if (!visits) {
      currentNodeId = visit_count_dialogues[0]
    } else {
      currentNodeId = visit_count_dialogues[Number(visits)] || "visit_3"
    }
    
    LOADED = true;
  });


  function meetsRequirements(node: DialogueNode): boolean {
    if (!node.requiresFlags) return true;
    return node.requiresFlags.every(flag => flags[flag]);
  }

  function applyFlags(flagList?: string[]) {
    if (!flagList) return;
    flagList.forEach(flag => flags[flag] = true);
  }

  function goTo(id: string) {
    const node = DIALOGUE[id];
    if (!node) return;

    if (!meetsRequirements(node)) {
      if (node.next) goTo(node.next);
      return;
    }

    applyFlags(node.setFlags);
    currentNodeId = id;
  }

  function handleNext(choiceNext?: string) {
    if (choiceNext) {
      const option = currentNode.options?.find(o => o.next === choiceNext);
      applyFlags(option?.setFlags);
      goTo(choiceNext);
      return;
    }

    if (currentNode.next) {
      goTo(currentNode.next);
    } else if (!currentNode.next) {
      renderDialogue = false;
    }
  }

  $effect(() => {
    if (!renderDialogue) {
      killBgm();
    }
  });

  function kill() {
    renderDialogue = false;
  }
</script>
<audio bind:this={bgm} src={bgm_src} loop style="display: none"></audio>
<div class={`window ${!renderDialogue ? "fade-out" : ""}`} use:draggable={{ bounds: 'parent', handle: '.window-bar', cancel: '.wb__controls' }}>
  <div class="window-bar">
    <span class="wb__title"><img alt="" src="/lightbulb.png"/>OneShot</span>
    <div class="wb__controls">
      <button class="wbc minimize" title="Minimize">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8v1H3V8h11z"></path>
        </svg>
      </button>
      <button class="wbc maximize" title="Maximize">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z"></path>
        </svg>
      </button>
      <button class="wbc close" title="Close" onclick={kill}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"></path></svg></button>
    </div>
  </div>

  <div class="window-content">
    {#if renderDialogue && LOADED}
      <Dialogue
        dialogue={currentNode}
        flags={flags}
        onNext={handleNext}
      />
    {/if}
  </div>

</div>

<style>
  .window {
    position: absolute;
    left: calc(50% - calc(640px / 2));
    top: calc(50% - calc(calc(480px + 32px) / 2));
    border: 1px solid #9e9e9e;
    width: 640px;
    height: calc(480px + 32px);

    border-radius: 8px;
  }

  .window-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 640px;
    height: 32px;
    border-radius: 8px 8px 0px 0px;
    background-color: #fff;

    font-family: s;
    user-select: none;
  }

  .wb__title {
    font-size: 10pt;
    height: 100%;
    display: flex;
    align-items: center;

    & img {
      width: 16px; height: 16px;
      object-fit: cover;
      margin-left: 8px;
      margin-right: 8px;
    }
  }

  .wb__controls {
    height: 100%;
  }

  .wbc {
    background: transparent;
    border: none;
    user-select: none;

    height: 100%;
    width: 40px;

    cursor: pointer;
  }

  .close {
    border-top-right-radius: 8px;

    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: rgb(250, 78, 78);
      color: #fff;
    }
  }

  .maximize {
    opacity: 0.15;
    cursor: default;
  }

  .window-content {
    position: relative;

    display: flex;
    width: 640px;
    height: 480px;
    background-color: #000;
    font-family: terminus;
    user-select: none;

    border-radius: 0px 0px 8px 8px;

    background-image: url("/solstice.png");
  }

  .fade-out {
    animation: fade-out 0.8s forwards;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    } to {
      opacity: 0;
      display: none;
    }
  }
</style>
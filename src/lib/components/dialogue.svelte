<script lang="ts">
  import type { DialogueNode, DialogueOption } from "$lib/types/types";


  const preloadAudio = (src: string): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.load();
    return audio;
  };


  import text_sfxfile from "$lib/assets/sfx/text.wav";
  import menucursor_sfxfile from "$lib/assets/sfx/menu_cursor.wav";
  import menudecision_sfxfile from "$lib/assets/sfx/menu_decision.wav";

  const sfx_TEXT = preloadAudio(text_sfxfile);
  const sfx_MENUCURSOR = preloadAudio(menucursor_sfxfile);
  const sfx_MENUDECISION = preloadAudio(menudecision_sfxfile);

  let {
    dialogue,
    flags,
    onNext
  }: {
    dialogue: DialogueNode;
    flags: Record<string, boolean>;
    onNext: (choiceNext?: string) => void;
  } = $props();

  const SPEED = 25;

  let finished = $state(false);
  let currentText = $state("");
  let index = $state(0);

  let currentOptions = $state<DialogueOption[]>([]);
  let selectedOption = $state(0);
  let currentMode = $state<"dialogue" | "options">("dialogue");

  let typingTimeout: number | undefined;


  function filterOptions() {
    currentOptions =
      dialogue.options?.filter(option => {
        if (!option.requiresFlags) return true;
        return option.requiresFlags.every(flag => flags[flag]);
      }) ?? [];
  }

  function startTyping() {
    currentText = "";
    index = 0;
    finished = false;
    currentMode = "dialogue";
    selectedOption = 0;

    clearTimeout(typingTimeout);

    typeNextCharacter();
  }

  function typeNextCharacter() {
    if (finished) {
      currentText = dialogue.text;
      return;
    }

    if (index >= dialogue.text.length) return;

    currentText += dialogue.text[index];
    index++;

    

    const pausePoints = dialogue.pausePoints;
    const pause = pausePoints?.find(p => p.index === index);
    const allDelay = dialogue.allDelay || 0;

    const delay = (pause ? pause.ms : SPEED) + allDelay;

    if (index % 3 === 0 || allDelay > 100) {
      sfx_TEXT.currentTime = 0;
      sfx_TEXT.play();
    }
    
    typingTimeout = setTimeout(typeNextCharacter, delay);
  }

  function finish() {
    finished = true;
  }

  function chooseOption() {
    const option = currentOptions?.[selectedOption];
    if (!option) return;

    sfx_MENUDECISION.currentTime = 0;
    sfx_MENUDECISION.play();

    onNext(option.next);
  }

  function nextOrFinish() {
    if (currentText !== dialogue.text) {
      finish();
      return;
    }

    if (dialogue.options && dialogue.options.length > 0) {
      filterOptions();

      if (currentOptions && currentOptions.length > 0) {
        currentMode = "options";
        return;
      }
    }

    onNext();
  }

  function selectOption(increment: boolean) {
    if (!currentOptions || currentOptions.length <= 1) return;

    sfx_MENUCURSOR.currentTime = 0;
    sfx_MENUCURSOR.play();

    if (increment) {
      selectedOption =
        selectedOption === currentOptions.length - 1
          ? 0
          : selectedOption + 1;
    } else {
      selectedOption =
        selectedOption === 0
          ? currentOptions.length - 1
          : selectedOption - 1;
    }
  }

  const act = () => {
    if (currentMode === "options") {
      chooseOption();
    } else {
      nextOrFinish();
    }
  }


  const controls: Record<string, () => void> = {
    Enter: () => act(),
    z: () => act(),
    Z: () => act(),
    x: () => act(),
    X: () => act(),
    " ": () => act(),

    ArrowDown: () => selectOption(true),
    ArrowRight: () => selectOption(true),

    ArrowUp: () => selectOption(false),
    ArrowLeft: () => selectOption(false)
  };

  function handleKeydown(e: KeyboardEvent) {
    const action = controls[e.key];
    if (action) action();
  }

  let prevDialogueId: string | number | undefined;

  $effect(() => {
    const id = dialogue?.id;
    if (id === prevDialogueId) return;
    prevDialogueId = id;

    // schedule startTyping asynchronously so the effect
    // doesn't record reads performed by the typing logic..
    Promise.resolve().then(() => startTyping());

    return () => clearTimeout(typingTimeout);
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if currentMode === "options"}
  <div class="options">
    {#each currentOptions as option, i}
      <div
        class={`dbc__option`}
        style={`top: calc(calc(50% - calc(${currentOptions.length - 1} * 25px)) + calc(25px * ${i})); left: var(--margin)`}
      >
        <div class={`dbco__content ${i === selectedOption ? "o__selected" : ""}`}>{option.title}</div>
      </div>
    {/each}
  </div>
{/if}

{#if currentMode === "dialogue"}
  <div class="dialogue-box" role="dialog">
    <div class="db__content">
        {currentText}      
      
    </div>

    <div class="db__face">
      <img
        alt={dialogue.expression}
        src={`/faces/${dialogue.expression}.png`}
        onerror={() =>
          console.log("Expression " + dialogue.expression + " not found.")
        }
      />
    </div>

    {#if currentText.length === dialogue.text.length}
      <img alt="" src="/normal.gif" class="arrow"/>
    {/if}
</div>
{/if}

<style>
  .options {
    --margin: 18px;
    border-image-source: url("/normal.png");
    border-image-slice: 25%;
    border-image-repeat: repeat;

    color: #fff;
    background-color: #180C1E;
    font-size: 1.2rem;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }
  .dialogue-box {
    align-self: flex-end;

    --margin: 18px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    height: 100px;
    width: calc(100% - calc(var(--margin) * 2));

    margin: var(--margin);
    border: 14px solid transparent;

    border-image-source: url("/normal.png");
    border-image-slice: 25%;
    border-image-repeat: repeat;

    color: #fff;
    background-color: #180C1E;
    font-size: 1.2rem;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);

  }

  .arrow {
    position: absolute;
    
    bottom: -15px;
    left: 50%;
  }

  .db__content {
    flex: 1;              
    min-width: 0;         
    overflow-wrap: break-word;
    word-wrap: break-word;

    margin: 2px;
  }

  .dbc__option {
    position: absolute;
    left: 0;
    width: calc(100% - calc(2 * var(--margin)));
    isolation: isolate;
  }


  .o__selected::before {
    z-index: -1;
    position: absolute;

    content: "";
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: 2px solid transparent;

    border-image-source: url("/normal.png");
    border-image-slice: 10%;
    border-image-repeat: repeat;

    background: linear-gradient(90deg,rgba(255, 146, 30, 0.5) 0%, rgba(72, 20, 40, 0.3) 10%, rgba(72, 20, 40, 0.5) 50%, rgba(72, 20, 40, 0.3) 90%, rgba(255, 146, 30, 0.5) 100%);
    animation: flash infinite 0.7s ease-in-out;
  }

  .dbco__content {
    position: relative;
    border: 2px solid transparent;
    padding-left: 4px;
  }

  @keyframes flash {
    0% {
      opacity: 0.5;
    } 50% {
      opacity: 0.95;
    } 100% {
      opacity: 0.5;
    }
  }
  
</style>

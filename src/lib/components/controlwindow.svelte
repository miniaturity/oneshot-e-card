
<div class="control-window">
  <div class="cw__content">
    <div class="cwc__content">
      <img src="/instruction1.png" alt="Controls"/>
    </div>
  </div>
</div>

<style>
  .control-window {
    position: relative;
    --margin: 24px;
    width: 400px;

    aspect-ratio: 4 / 3;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 3px solid #741ACD;  

    overflow: hidden;
  }

  .cw__content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; 
    height: 200%; 
    background-image: url('/tv_encounter.png'); 
    background-repeat: repeat-y;
    background-size: cover; 
    animation: infiniteScroll 30s linear infinite, customOpacity 10s infinite alternate; 
  }


  .cw__content {
    position: relative;
    overflow: hidden;
    margin: var(--margin);
    width: calc(100% - calc(var(--margin) * 2)); height: calc(100% - calc(var(--margin) * 2));
    & .cwc__content {
      width: 100%; height: 100%;
      & img {
        width: 100%; height: 100%;
      }
    }
    border: 3px solid #741ACD;  
  }

  @keyframes infiniteScroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, -50%, 0); 
    }
  }

  @keyframes customOpacity {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
    75% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
</style>
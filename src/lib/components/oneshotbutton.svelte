<script lang="ts">

  let {
    onPress
  }: {
    onPress: () => void
  } = $props();

</script>

<button class="oneshot" onclick={onPress}>
  <img alt="" src="/lightbulb.png"/>
  <div class="o__text">OneShot</div>
</button>


<style>
  .oneshot {
    position: relative;
    width: 64px;
    height: 64px;
    background: none; border: none;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgba(236, 236, 236, 0.555);
    }

    & img {
      width: 32px; height: 32px;
    }

    &:hover&::after {
      content: "";
      position: absolute;
      width: 12px; height: 12px;
      top: 0; left: 25%;
      border-radius: 1px;
      background-color: #fff;
      border: 1px solid #000;
    }
  }

  .o__text {
    font-family: s;
    color: #fff;
    text-shadow: 0px 0px 4px #000000;
  }
</style>
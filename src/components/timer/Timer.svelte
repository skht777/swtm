<script lang="ts">
  import { onMount } from 'svelte';

  let time = new Date();

  // these automatically update when `time`
  // changes, because of the `$:` prefix
  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function int02(num: number): string {
    return `${num}`.padStart(2, '0');
  }
</script>

<div id="timer" class="flex justify-center items-center w-full h-full text-7xl font-mono">
  {int02(hours)}:{int02(minutes)}:{int02(seconds)}
</div>

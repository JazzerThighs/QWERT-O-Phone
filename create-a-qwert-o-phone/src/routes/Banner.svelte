<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const title = document.querySelector('.banner-title');
    title.addEventListener('mouseover', () => {
      title.classList.add('animate-bounce');
    });
    title.addEventListener('mouseout', () => {
      title.classList.remove('animate-bounce');
    });
  });
</script>

<style>
  .rainbow-text {
    background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
    -webkit-background-clip: text;
    color: transparent;
    animation: rainbow-animation 3s infinite linear;
  }

  @keyframes rainbow-animation {
    0% {background-position: 0%;}
    100% {background-position: 100%;}
  }
</style>

<div class="relative overflow-hidden">
  <!-- Background animation -->
  <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse z-0"></div>
  
  <!-- Text Content -->
  <div class="relative z-10 text-center p-10">
    <h1 class="text-6xl font-extrabold banner-title animate__animated animate__fadeIn rainbow-text hover:animate-bounce">
      QWERT-O-Phone
    </h1>
    <p class="text-xl font-semibold text-white animate__animated animate__fadeIn animate__delay-2s">
      Create Your Own MIDI Controllers!
    </p>
  </div>

  <!-- Flashy Decorations -->
  <div class="absolute top-0 left-0 w-1/4 h-1/4 bg-yellow-300 rounded-full animate-spin slowest z-5"></div>
  <div class="absolute bottom-0 right-0 w-1/4 h-1/4 bg-blue-300 rounded-full animate-spin-fastest z-5"></div>
</div>
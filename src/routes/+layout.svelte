<!-- >======================================< • >======================================< -->
<!-- >=============<                         JS                          >=============< -->
<!-- >======================================< • >======================================< -->

<script>
   // import db from '../json/db.json'
   import { onMount } from 'svelte';
   import Icon from '../components/Icon.svelte';
   import '../app.postcss';

   let scrollY, bodyHeight, screenHeight;

   onMount(() => {
		bodyHeight = document.body.scrollHeight;
	})

   function onWindowScrolled () {
      // console.log(`BH: ${bodyHeight} | SH: ${screenHeight} | SY: ${scrollY}`);
   }
</script>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         HTML                        >=============< -->
<!-- >======================================< • >======================================< -->


<span style={`transform: tranneutralY(${(bodyHeight * (scrollY / (bodyHeight - (screenHeight) + 50)))}px)`} class="scroll-thumb"></span>

<div class="container variant-primary" id="sidebar">
   <a class="btn variant-primary btn-text-icon" href="/">
      <Icon icon="home" size="24px" strokeWidth="1.5px" />
      Home
   </a>
   
   <a class="btn variant-primary btn-text-icon" href="account-balance">
      <Icon icon="transfer-arrows" size="24px" strokeWidth="1.5px"/>
      Saldo
   </a>

   <a class="btn variant-primary btn-text-icon" href="general-configuration"> 
      <Icon icon="settings" size="24px" strokeWidth="1.5px"/> 
      Configuração
   </a>
</div>

<div id="app">
   <!-- <p>{ db.users[0] }</p> -->
   <slot />
</div>

<!-- <svelte:window bind:outerHeight={windowHeight} on:scroll={() => console.log(`ScrollY: ${scrollY} | Body element: ${bodyElement}`)} bind:scrollY={scrollY} /> -->

<svelte:window bind:innerHeight={screenHeight} on:scroll={onWindowScrolled} bind:scrollY={scrollY} />


<!-- >======================================< • >======================================< -->
<!-- >=============<                         CSS                         >=============< -->
<!-- >======================================< • >======================================< -->


<style lang="postcss">
   @import '../css/_variables.css';

   #app {
      height: 100%;
      width: 100%;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
   }

   #sidebar {
      position: absolute;
      top: 15px;
      left: 15px;
      display: flex;
      flex-flow: column nowrap;
      z-index: 2;

      transition: max-width ease 300ms;
      color: white;

      max-width: 5.25rem;
      height: calc(100% - 30px);
      background-color: var(--color-neutral-900);
      border: 1px solid var(--color-neutral-700);
      
      &:hover {
         max-width: 260px;
         
         & a {
            color: white;
         }
      }

      & a {
         transition: all ease 200ms;
         color: transparent;
         border: 0;

         margin: {
            left: 0;
            right: 0;
         }

         &:hover {
            :global(svg.icon) {
               margin-right: 20px;
            }
         }
      }
   }
</style>
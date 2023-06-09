<!-- >======================================< • >======================================< -->
<!-- >=============<                         JS                          >=============< -->
<!-- >======================================< • >======================================< -->

<script lang="ts">
   import Icon from "./Icon.svelte";
   import type { Item } from "../types/Item";
   import CurrencyFormatterMini from "../js/CurrencyFormatterMini";
   
   let open = '';

   function toggleOpen () { open === '' ? open = 'open' : open = '' };

   const itemIcon = {
      saude: 'medical',
      futuro: 'wallet',
      investimentos: 'coin',
      transporte: 'car'
   };

   export let item: Item = {
      title: '',
      amount: 0,
      category: ''
   }

   export let itemType: 'expense' | 'income' | 'saving' = 'expense';
</script>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         HTML                        >=============< -->
<!-- >======================================< • >======================================< -->


<div on:keydown={toggleOpen} on:click={toggleOpen} class={`balance-item ${ itemType } ${ open }`}>
   <Icon icon={itemIcon[item.category]} color="currentColor"/>
   <div>
      <p class="category">{ item.category }</p>
      <p class="name">{ item.title }</p>
   </div>
   <!-- <p class="amount">{`R$ ${ moneyMagic.convert((item.amount).toString()) }`}</p> -->
   <p class="amount">{`R$ ${ CurrencyFormatterMini(item.amount) }`}</p>

   <slot name="info" class="info"></slot>
</div>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         CSS                         >=============< -->
<!-- >======================================< • >======================================< -->


<style lang="postcss">
   @import '../css/_variables.css';

   .balance-item {
      width: 100%;
      /* max-height: auto; */
      transition: all ease 150ms;
      overflow: hidden;
      position: relative;
      
      display: grid;
      grid-template-columns: 32px auto 1fr;
      grid-template-rows: 1fr;
      align-items: start;
      justify-content: start;
      
      color: white;
      font-family: var(--font-family);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 10px 15px;
      max-height: 55px;
      margin: 2px 0;
      border: 1px solid transparent;
      overflow: hidden;

      & p.name {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 160px;
      }
      
      & p.amount {
         margin: 0;
         padding: 0;
         justify-self: flex-end;
         font-size: 15px;
         font-weight: 400;
         white-space: nowrap;
         text-overflow: ellipsis;
         max-width: 91px;
         margin-top: 8px;
      }

      & .info {
         border-radius: 8px;
         box-sizing: border-box;
         padding: 5px;
         border: 1px solid var(--color-neutral-800);
      }

      & p.category { text-transform: uppercase; }
      
      &.open {
         max-height: 300px;

         & .name {
            white-space: normal;
         }

         &.expense, &.saving, &.income { 
            border: 1px solid var(--color-neutral-600); 
         }
      }

      &:hover {
         border: 1px solid var(--color-neutral-700);
         cursor: pointer;
      }


      :global(&.balance-item svg) {
         color: var(--color-neutral-600);
         margin-top: 5px;
      }


      & .category {
         color: var(--color-neutral-500);
         font-weight: 800;
         font-size: 12px;
         letter-spacing: 0.5px;
      }

      & div {
         display: flex;
         flex-flow: column nowrap;
         align-items: flex-start;
         justify-content: center;
         margin-left: 10px;
         
         & p {
            padding: 0;
            margin: 0;
         }
      }
   }
</style>
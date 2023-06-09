<!-- >======================================< • >======================================< -->
<!-- >=============<                      JAVASCRIPT                     >=============< -->
<!-- >======================================< • >======================================< -->

<script lang="ts">
   import { onMount } from "svelte";
   import BalanceItem from "../../components/BalanceItem.svelte";
   import Icon from "../../components/Icon.svelte";
   import ModalNewItem from "../../components/ModalNewItem.svelte";
   import { ExpensesBalance, IncomesBalance, SavingsBalance, TotalBalance } from "../../stores/stores";
    import IconButton from "../../components/IconButton.svelte";
   // import type { Items } from "../../types/Item";

   let newExpenseModal;
   let decimalsRegex = /\d+\.?\d{0,2}/g;

   $: expensePercentage = capPercentage( ($ExpensesBalance / $TotalBalance) || 0);
   $: savingPercentage = capPercentage( ($SavingsBalance / $TotalBalance) || 0);
   $: incomePercentage = capPercentage( ($IncomesBalance / $TotalBalance) || 0);
   
   let local_storage;
   
   function capPercentage (_value) {
      if (_value !== Infinity && _value !== -Infinity && _value !== undefined && _value !== null) {
         return (_value * 100).toString().match(decimalsRegex)[0];
      }
   }

   async function loadItems () {
      let response = await fetch('/api/load-items');
      local_storage = await response.json();

      local_storage.items.expenses.forEach(item => {
         ExpensesBalance.update((current_data) => current_data += item.amount);
      });

      local_storage.items.savings.forEach(item => {
         SavingsBalance.update((current_data) => current_data += item.amount);
      });

      local_storage.items.incomes.forEach(item => {
         IncomesBalance.update((current_data) => current_data += item.amount);
      });

      TotalBalance.set($ExpensesBalance + $IncomesBalance + $SavingsBalance);
   }

   async function addItem (item, operation) {200
      await fetch('/api/add-item', {
         method: 'POST',
         body: JSON.stringify({ item: item, operation: operation })
      });

      let loadResponse = await fetch('/api/load-items');
      local_storage = await loadResponse.json();

      switch (operation) {
         case 'expense':
            ExpensesBalance.update((current_data) => current_data += item.amount);
            break;
         case 'saving':
            SavingsBalance.update((current_data) => current_data += item.amount);
            break;
         case 'income':
            IncomesBalance.update((current_data) => current_data += item.amount);
            break;
      }

      TotalBalance.set($ExpensesBalance + $IncomesBalance + $SavingsBalance);
   }

   onMount(async () => {
      await loadItems();
   })
</script>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         HTML                        >=============< -->
<!-- >======================================< • >======================================< -->


<svelte:head>
   <title>Account balance</title>
</svelte:head>

<main>
  <ModalNewItem addItem={addItem} bind:this={newExpenseModal}/>

   <!-- ACCOUNT BALANCE -->
   <section id="account-balance">
      <h2>Saldo</h2>
      <span class="bar">
         <span style={`width: ${ expensePercentage }%;`} class="expenses"></span>
         <span style={`width: ${ savingPercentage }%;`} class="savings"></span>
         <span style={`width: ${ incomePercentage }%;`} class="incomes"></span>
      </span>

      <div class="legend">
         <span class="expenses">{`Despesas • ${expensePercentage}%`}</span>
         <span class="savings">{`Reservas • ${savingPercentage}%`}</span>
         <span class="incomes">{`Ganhos • ${incomePercentage}%`}</span>
      </div>
   </section>
   
   <!-- ACCOUNT EXPENSES -->
   <section id="account-expenses">
      <div class="header">
         <h2>Despesas</h2>
         <button class="btn-open-modal" on:click={() => newExpenseModal.openModal('expense')}>
            <Icon icon="add" size="24" />
         </button>
      </div>
      {#if local_storage?.items}
         {#each local_storage.items.expenses as item}
            <BalanceItem item={{title: item.title, amount: item.amount, category: item.category}} itemType="expense"/>
         {/each}
      {/if}
      </section>
   
   <!-- ACCOUNT SAVINGS -->
   <section id="account-savings">
      <div class="header">
         <h2>Reservas</h2>
         <IconButton className="btn-icon" icon="add" size="24" on:click={() => newExpenseModal.openModal('saving')} />
            
      </div>
      {#if local_storage?.items}
         {#each local_storage.items.savings as item}
            <BalanceItem item={{title: item.title, amount: item.amount, category: item.category}} itemType="saving"/>
         {/each}
      {/if}
   </section>
   
   <!-- ACCOUNT INCOMES -->
   <section id="account-incomes">
      <div class="header">
         <h2>Ganhos</h2>
         <button class="btn-open-modal" on:click={() => newExpenseModal.openModal('income')}>
            <Icon icon="add" size="24" />
         </button>
      </div>
      {#if local_storage?.items}
         {#each local_storage.items.incomes as item}
            <BalanceItem item={{title: item.title, amount: item.amount, category: item.category}} itemType="income"/>
         {/each}
      {/if}
   </section>
</main>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         CSS                         >=============< -->
<!-- >======================================< • >======================================< -->


<style lang="postcss">
   @import '../../css/_variables.css';

   main {
      display: grid;
      height: 100%;
      width: 100%;
      font-family: var(--font-family);
      letter-spacing: 0.025rem;

      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto 8fr;
      grid-template-areas: 
         "balance balance balance"
         "expenses savings incomes"
      ;

      grid-row-gap: var(--spacing-500);
      grid-column-gap: var(--spacing-500);

      
      & h2 {
         color: white;
         margin: 0;
         margin-bottom: 15px;
      }

      & section {
         border: 1px solid var(--color-neutral-700);
         border-radius: var(--border-radius-200);
         padding: var(--spacing-600);
         box-sizing: border-box;
         
         & .header {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-bottom: var(--spacing-200);
            box-sizing: border-box;
            
            & h2 {
               margin: 0;
            }
            
            & .btn-open-modal {
               background: transparent;
               border: none;
               padding: 0;
               margin: 0;
               
               :global(& svg) {
                  transition: all ease 100ms;
                  color: var(--color-neutral-600);
                  
                  &:hover { 
                     cursor: pointer;
                     color: var(--color-neutral-500);
                  }
                  
                  &:active {
                     color: var(--color-neutral-500);
                  }
               }
            }
            
         }
      }
   
      #account-balance { grid-area: balance; }
      #account-expenses { 
         grid-area: expenses; 
         border-top: 1px solid var(--color-red-600);
      }
      #account-savings { 
         grid-area: savings; 
         border-top: 1px solid var(--color-blue-500);
      }
      #account-incomes { 
         grid-area: incomes; 
         border-top: 1px solid var(--color-green-500);
      }

      #account-balance {
         display: flex;
         flex-flow: column nowrap;

         & .bar {
            background-color: var(--color-neutral-800);
            width: 100%;
            height: 16px;
            border-radius: var(--border-radius-100);
            margin-bottom: var(--spacing-300);
            display: flex;
            flex-flow: row nowrap;
            overflow: hidden;

            & .expenses { 
               background-color: var(--color-red-600);
            }
            
            & .savings {
               background-color: var(--color-blue-500);
               width: 200px; 
            }
            
            & .incomes {
               background-color: var(--color-green-500);
               width: 150px; 
             }
         }

         & .legend {
            margin-left: 20px;
            font-weight: 600;

            & span {
               margin-right: 30px;
               position: relative;

               &::before {
                  content: '';
                  height: 14px; width: 14px;
                  position: absolute;
                  top: 50%;
                  left: -20px;
                  transform: translateY(-50%);
                  border-radius: var(--border-radius-100);
               }
            }

            & .expenses { 
               color: var(--color-red-600); 

               &::before { background: var(--color-red-600); }
            }

            & .savings { 
               color: var(--color-blue-500);

               &::before { background: var(--color-blue-500); }
            }

            & .incomes { 
               color: var(--color-green-500); 
               
               &::before { background: var(--color-green-500); }
            }

         }
      }
   
      #account-expenses, #account-savings, #account-incomes {
         display: flex;
         flex-flow: column nowrap;
      }
   }

</style>
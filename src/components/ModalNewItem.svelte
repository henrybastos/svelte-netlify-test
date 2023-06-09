<!-- >======================================< • >======================================< -->
<!-- >=============<                         JS                          >=============< -->
<!-- >======================================< • >======================================< -->

<script lang="ts">
   import { Categories } from "../stores/stores";
   import type { Item } from "../types/Item";

   export let addItem: Function;

   export function openModal (_operation) { 
      operation = _operation;
      modalHeading = setModalHeading();
      modal.showModal(); 
   };

   export function closeModal () { 
      modal.close(); 
   };

   let modal;
   let operation;
   let modalHeading;

   let inputs = {
      category: undefined,
      currentCategory: undefined
   }

   let item: Item = {
      title: '',
      amount: 0,
      category: ''
   }

   function setModalHeading () {
      switch (operation) {
         case 'expense':
            return 'Nova despesa';
         case 'income':
            return 'Novo ganho';
         case 'saving':
            return 'Nova reserva';
      }
   }

   function setCategory (category) { 
      item.category = category; 
      toggleCategoryDialog();
   };

   function modalCheckout () {
      addItem({...item}, operation);
      resetInputs();
      closeModal();
   }
   
   function resetInputs () {
      item.title = '';
      item.amount = 0;
      item.category = '';
   }

   function toggleCategoryDialog () { 
      if (inputs.category.hasAttribute('open')) {
         inputs.category.close();
      } else {
         inputs.category.show();
      }
   }

   function selectAndFocus (el) {
      el.target.select(); 
      el.target.focus();
   }

   function windowHandleClick (event) {
      let elementClass = event.target.classList;

      const IF_NOT_CLICK_ON_CATEGORY_DIALOG = 
         inputs.category.hasAttribute('open') && 
         elementClass[0] !== 'options-item' && 
         elementClass[0] !== 'options' && 
         elementClass[0] !== 'current-category';
      
      if (IF_NOT_CLICK_ON_CATEGORY_DIALOG) {
         inputs.category.close();
      }
   }

   function windowHandleKeydown ({ key }) {
      if (inputs.category.hasAttribute('open')) {
         if (key === 'Esc') {
            inputs.category.close();
         }

         if (document.activeElement.classList[0] !== 'options-item') {
            inputs.category.children[0].focus();
         } else {
            let currentID = Number(document.activeElement.getAttribute('data-id'));
            
            if (key === 'ArrowDown' && currentID < (inputs.category.children.length - 1)) {
               inputs.category.children[currentID + 1].focus();
            }
            
            if (key === 'ArrowUp' && currentID > 0) {
               inputs.category.children[currentID - 1].focus();
            }

         }
      }
   }
</script>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         HTML                        >=============< -->
<!-- >======================================< • >======================================< -->

<svelte:window on:click={windowHandleClick} on:keydown={windowHandleKeydown}/>

<dialog bind:this={modal}>
   <section class="wrapper">
      <h2 class="heading">{modalHeading}</h2>

      <div class="content">
         <div class="title">
            <h4>Título</h4>
            <input bind:value={item.title} type="text" placeholder="Novo aparador">
         </div>
         
         <div class="amount">
            <h4>Quantia</h4>
            <input 
               bind:value={item.amount} 
               on:click={selectAndFocus} 
               type="number" 
               placeholder="320.95"
            >
         </div>

         <div class="select-category">
            <h4>Categoria</h4>

            <button
               bind:this={inputs.currentCategory}
               bind:innerText={item.category} 
               on:click={toggleCategoryDialog}
               class="current-category" 
               contenteditable="false" 
               tabindex="0"
            >
               { item.category }
            </button>
            
            <dialog bind:this={inputs.category} class="options">
               {#each $Categories as category, index (index)}
                  <button 
                     on:click={() => setCategory(category)}
                     class="options-item"
                     data-id={index}
                  >
                     {category}
                  </button>
               {/each}
            </dialog>
         </div>
      </div>

      <div>
         <button on:click={modalCheckout}>Adicionar</button>
         <button on:click={closeModal}>Cancelar</button>
      </div>
   </section>
</dialog>


<!-- >======================================< • >======================================< -->
<!-- >=============<                         CSS                         >=============< -->
<!-- >======================================< • >======================================< -->


<style lang="postcss">
   @import '../css/_variables.css';

   dialog {
      border: 1px solid var(--color-neutral-800);
      border-radius: 8px;
      outline: none;
      height: 300px;
      background-color: var(--color-neutral-900);
      font-family: var(--font-family);
      color: var(--color-neutral-100);
      padding: 0;
      overflow: visible;

      &::backdrop {
         background: rgba(0, 0, 0, 0.5);
         backdrop-filter: blur(5px);
      }

      & h2.heading {
         margin: 10px;
      }

      & section.wrapper {
         width: 100%;
         height: 100%;
         display: flex;
         flex-flow: column nowrap;
         justify-content: space-between;
         border: 0;
         position: relative;
         padding: 15px;
         box-sizing: border-box;

         & .content {
            display: flex;
            flex-flow: row nowrap;
            
            & .select-category {
               margin-left: 15px;
               position: relative;
               
               & .current-category {
                  min-width: 125px;
                  width: auto;
                  display: block;
                  transition: all ease 150ms;

                  padding: 6px;
                  min-height: 32px;
                  padding: 6px 12px;
                  margin: 0;
                  margin-top: 10px;

                  background: transparent;
                  color: var(--color-neutral-100);

                  outline: none;
                  border: 1px solid var(--color-neutral-700);
                  border-radius: 6px;

                  font: {
                     family: var(--font-family);
                     size: 14px;
                     weight: 500;
                  };
                  text: {
                     transform: uppercase;
                     align: center;
                  }

                  &:hover {
                     cursor: pointer;
                     background-color: var(--color-neutral-800);
                  }

                  &:focus {
                     border: 1px solid var(--color-neutral-500);
                  }
               }
               
               & dialog.options,  {
                  width: 100%;
                  overflow: hidden;
                  border-radius: 6px;
                  border: 1px solid transparent;
                  transition: all ease 150ms;
                  box-sizing: border-box;
                  width: fit-content;
                  margin-top: 5px;
                  margin-left: 5px;
                  min-width: 100%;
                  text-transform: uppercase;
                  
                  font: {
                     family: var(--font-family);
                     size: 12px;
                     weight: 500;
                  }
                  
                  &[open] {
                     display: flex;
                     flex-flow: column nowrap;
                     align-items: center;
                     height: fit-content;
                     border: 1px solid var(--color-neutral-700);
                  }
                  
                  & button {
                     box-sizing: border-box;
                     padding: 8px 12px;
                     width: 100%;
                     font-size: 14px;
                     text-align: center;
                     border: none;
                     background: transparent;  
                     transition: all ease 150ms;
                     border-radius: 0;

                     &:hover, &:focus {
                        background: var(--color-neutral-700);  
                        cursor: pointer;
                     }
                  }
               }
            }

            & .amount {
               margin-left: 15px;

               & input {
                  -moz-appearance: textfield;

                  &::-webkit-outer-spin-button,
                  &::-webkit-inner-spin-button {
                     -webkit-appearance: none;
                     margin: 0;
                  }
               }
            }
         }


         & button {
            padding: 8px 0;
            /* border: 1px solid var(--color-neutral-700); */
            background-color: var(--color-neutral-800);
            outline: 0;
            border-radius: 6px;
            width: 100px;
            margin: 0 5px;
            transition: all ease 100ms;
            font: {
               family: var(--font-family);
               size: 12px;
               weight: 500;
            }
            color: var(--color-neutral-100);
            text-transform: uppercase;
            border: 1px solid transparent;
            
            &:hover {
               background-color: var(--color-neutral-700);
               cursor: pointer;
            }

            &:focus {
               border: 1px solid var(--color-neutral-500);
            }
         }

         & h4 {
            padding: 0;
            margin: 10px 0;
         }

         & input {
            outline: none;
            border: 1px solid var(--color-neutral-700);
            background: transparent;
            padding: 6px;
            padding-left: 10px;
            font-family: var(--font-family);
            color: var(--color-neutral-100);
            border-radius: 6px;
            font-size: 14px;

            &:focus {
               border: 1px solid var(--color-neutral-500);
            }
         }
      }
   }
</style>
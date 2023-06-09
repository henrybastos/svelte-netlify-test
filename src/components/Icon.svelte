<script lang="ts">
   export let size: string | number = 24;
   export let strokeWidth: string | number = 2;
   export let icon: 'warning' | 'add' | 'coin' | 'home' | 'medical' | 'transfer-arrows' | 'wallet' | 'car' | 'settings' = 'warning';
   export let color: string = 'currentColor';
</script>

<svg 
   xmlns="http://www.w3.org/2000/svg" 
   width={size} height={size} 
   stroke-width={strokeWidth} 
   stroke={color} 
   stroke-linecap="round" 
   stroke-linejoin="round"
   class="icon"
   viewBox="0 0 24 24" 
   fill="none" 
>  
   {#if icon === 'warning'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
   {/if}

   {#if icon === 'add'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 12h6"></path>
      <path d="M12 9v6"></path>
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
   {/if}

   {#if icon === 'coin'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path>
      <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path>
      <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path>
      <path d="M3 6v10c0 .888 .772 1.45 2 2"></path>
      <path d="M3 11c0 .888 .772 1.45 2 2"></path>
   {/if}

   {#if icon === 'home'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
   {/if}

   {#if icon === 'medical'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z"></path>
   {/if}

   {#if icon === 'transfer-arrows'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 21v-6"></path>
      <path d="M20 6l-3 -3l-3 3"></path>
      <path d="M17 3v18"></path>
      <path d="M10 18l-3 3l-3 -3"></path>
      <path d="M7 3v2"></path>
      <path d="M7 9v2"></path>
   {/if}

   {#if icon === 'wallet'}
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
   {/if}

   {#if icon === 'car'}   
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"></path>
   {/if}

   {#if icon === 'settings'}   
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
   {/if}
   
   <!-- {#if icon === 'settings'}   
   {/if} -->
</svg>
<script lang="ts">
   import Icon from "./Icon.svelte";

   export let size: string | number = 24;
   export let strokeWidth: string | number = 2;
   export let icon: 'warning' | 'add' | 'coin' | 'home' | 'medical' | 'transfer-arrows' | 'wallet' | 'car' | 'settings' = 'warning';
   export let color: string = 'currentColor';
   export let className: string;
</script>

<button class={className}>
   <Icon 
      size={size} 
      strokeWidth={strokeWidth}
      icon={icon}
      color={color}
   />
</button>

<style lang="postcss">

</style>
<script>
   import '../../app.postcss';
</script>

<main id="config" class="container variant-primary">
   <button id="clear-database" class="btn btn-text-icon variant-danger">
      Limpar Banco de Dados
   </button>
</main>

<style lang="postcss">
   #config {
      padding: 1rem;
      width: 100%;
      height: 100%;

      #clear-database {
         transition: all ease 200ms;
         padding: 1.5rem 5rem;
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
</style>
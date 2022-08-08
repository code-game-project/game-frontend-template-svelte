<script lang="ts">
  import ErrorBar from "./error-bar.svelte";

  export let errors: string[];
</script>

<div>
  {#each errors as error, index}
    <ErrorBar message={error} on:dismiss={() => {
      errors.splice(index, 1);
      errors = errors;
    }} />
  {/each}
</div>
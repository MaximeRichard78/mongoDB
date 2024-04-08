<script type="ts">
  import { goto } from '$app/navigation';

  export let data;

  let title = '';
  let date = '';
  let errorMessage = '';

  async function handleSubmit() {
    const currentDate = new Date();
    const enteredDate = new Date(date);
    if (enteredDate < currentDate) {
      errorMessage = 'Date non valide. Veuillez entrer une date future.';
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, date })
    });

    if (response.ok) {
      goto('/');
    } else {
      console.error('Failed to update task');
    }
  }
</script>
<div class="mx-4 mt-3">
<form on:submit|preventDefault={handleSubmit}>
<div class="form-group">
  <label for="title">Titre</label>
  <input type="text" class="form-control" id="title" bind:value={title} required>
</div>
<div class="form-group">
  <label for="date">Date</label>
  <input type="date" class="form-control" id="date" bind:value={date} required>
</div>
{#if errorMessage}
  <p>{errorMessage}</p>
{/if}
<button type="submit" class="btn btn-primary mt-3">Mettre à jour</button>
</form>
</div>
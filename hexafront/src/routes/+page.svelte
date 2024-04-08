<script lang="ts">
  import { onMount } from "svelte";

  interface Task {
    _id: string;
    title: string;
    date: string;
  }

  let tasks: Task[] = [];

  onMount(async () => {
    const response = await fetch("http://localhost:3000/tasks");
    tasks = await response.json();
  });
  async function handleDelete(id : string) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      tasks = tasks.filter(task => task._id !== id);
    } else {
      console.error('Failed to delete task');
    }
  }
</script>

<div class="container mt-3 mb-3">
  <h1 class="d-flex justify-content-center">Les taches a faire</h1>
  <div class="d-flex justify-content-center">
    <a href={`/creer`} class="btn btn-primary d-flex justify-content-center"
      >Ajouter une tâche</a
    >
  </div>

  <div class="row">
    {#each tasks as task (task._id)}
      <div class="col-sm-4">
        <div class="card my-3">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-center">
              {task.title}
            </h5>
            <p class="card-text d-flex justify-content-center">
              {new Date(task.date).toLocaleDateString("fr-FR")}
            </p>
            <a
              href={`/tasks/${task._id}/update`}
              class="btn btn-warning mb-1">Modifier</a
            >
            <button style="display:block" on:click={() => handleDelete(task._id)} class="btn btn-danger d-flex justify-content-center">Supprimer</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

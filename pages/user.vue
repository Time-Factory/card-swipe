<template>
  <div>
    <h1>Test Table Data</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { UserModel } from '~/server/model/user';
useHead({
    title: 'User Page'
});

const isLoading = ref(false);
const rows = ref<UserModel[]>([]);

const fetchData = async () => {
    try {
        const result = await $fetch('/api/user');
        rows.value = result.data as UserModel[];
    } catch (error) {
        alert('Error')
    }
}

const onDelete = async (id: number) => {
    try {
        await $fetch('/api/user/' + id, {
            method: 'DELETE',
        })
        await fetchData();
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    try {
        isLoading.value = true;
        await fetchData();
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
})
</script>
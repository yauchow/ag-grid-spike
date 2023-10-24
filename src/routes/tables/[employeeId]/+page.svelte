<script lang="ts">
	import { page } from '$app/stores';
	import { getEmployeeAsync, type Employee } from '$lib/test-data/emplloyees';
	import { onMount } from 'svelte';

	const employeeId: string = $page.params['employeeId'];
	let employee: Employee | undefined = undefined;

	onMount(async () => (employee = await getEmployeeAsync(employeeId)));
</script>

{#if employee}
	<div>
		{employee?.firstname}
		{employee?.surname}
	</div>
	<div>
		{employee?.date}
	</div>
	<div>
		{employee?.rating}
	</div>
{/if}

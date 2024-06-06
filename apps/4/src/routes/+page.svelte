<script lang="ts">
	import { todoCreate, todoStore } from '$lib';
	import { gsap } from 'gsap/dist/gsap';
	import { Flip } from 'gsap/dist/Flip';
	import { tick } from 'svelte';
	import FaceNeutral from 'carbon-icons-svelte/lib/FaceNeutral.svelte';
	import FaceSatisfied from 'carbon-icons-svelte/lib/FaceSatisfied.svelte';

	gsap.registerPlugin(Flip);

	let todoCurrent = '';
	const todos = todoStore([
		todoCreate('Buy new sweatshirt', true),
		todoCreate('Buy new sweatshirt', true),
		todoCreate('Read an article'),
		todoCreate('Write blog post'),
		todoCreate('Watch "Mr Robot"'),
		todoCreate('Run')
	]);

	const todayMonth = 'December';
	const todayDate = 'Tuesday, December 22';

	const flip = async (cb: () => void) => {
		const state = Flip.getState('.item');

		cb();
		await tick();

		Flip.from(state);
	};

	const saveTodo = () => {
		todos.add(todoCurrent);
		todoCurrent = '';
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center bg-[#f0eeea]">
	<h1 class="w-fit text-black font-bold text-3xl">4</h1>
	<div class="relative flex flex-col max-w-sm mx-auto bg-white rounded-sm shadow-md py-6 gap-6">
		<div class="flex flex-col gap-2 text-center px-8">
			<h2 class="text-3xl font-bold text-gray-500">{todayMonth}</h2>
			<p class="text-xs text-indigo-600">{todayDate}</p>
		</div>
		<div class="w-full h-1 bg-gray-100" />
		<div id="container" class="flex flex-col px-4 gap-3">
			{#each $todos as todo (todo.id)}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="item flex gap-16 items-center justify-between cursor-pointer text-sm"
					style:order={todo.isCompleted ? -1 : 1}
					data-flip-id={todo.id}
					on:click={() => flip(() => todos.toggle(todo.id))}
				>
					{#if todo.isCompleted}
						<p class="line-through text-gray-400">{todo.content}</p>
						<FaceSatisfied class="w-6 h-6 text-[#00c670]" />
					{:else}
						<p>{todo.content}</p>
						<FaceNeutral class="w-6 h-6 opacity-50" />
					{/if}
				</div>
			{/each}
		</div>
		<div class="mx-4 mb-6">
			<div class="flex items-center justify-between">
				<input
					class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300"
					placeholder="Add Task"
					bind:value={todoCurrent}
				/>
			</div>
		</div>
		<button
			class="absolute px-8 py-1 -bottom-4 left-1/2 -translate-x-1/2 bg-[#00c670] text-white font-bold rounded-3xl"
			on:click={saveTodo}
		>
			Add
		</button>
	</div>
</div>

<style>
	:global(body, html) {
		width: 100%;
		height: 100%;
	}
</style>

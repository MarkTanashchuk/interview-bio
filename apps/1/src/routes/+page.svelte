<script lang="ts">
	import { gsap } from 'gsap';
	import type { ActionReturn } from 'svelte/action';

	let tabNodes: HTMLLIElement[] = [];
	let tabIdxActive = 0;

	function animateBorder(_containerNode: HTMLUListElement, index: number): ActionReturn<number> {
		const animationCurrent = gsap.timeline();
		let indexCurrent = index;

		return {
			update: (indexNew) => {
				if (indexCurrent !== indexNew) {
					indexCurrent = indexNew;

					animationCurrent.to('#border', {
						xPercent: indexCurrent * 300
					});
				}
			},
			destroy: () => {}
		};
	}
</script>

<div class="flex flex-col w-full h-full items-center justify-center">
	<h1 class="w-fit text-white font-bold text-3xl pb-10">1</h1>

	<ul class="relative flex w-full max-w-xl" use:animateBorder={tabIdxActive}>
		{#each ['Animation', 'Branding', 'Illustration'] as text, i}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				class="m-0 p-2 z-10 text-white font-bold text-xl text-center cursor-pointer list-none transition-opacity"
				style:opacity={tabIdxActive === i ? 1 : 0.5}
				bind:this={tabNodes[i]}
				on:click={() => (tabIdxActive = i)}
			>
				{text}
			</li>
		{/each}

		<div class="absolute left-16 -bottom-2 z-10 bg-white h-1 w-16 rounded-3xl" id="border"></div>
	</ul>
</div>

<style>
	:global(body, html) {
		height: 100%;
		width: 100%;
		font-family: 'Roboto', sans-serif;
		background: rgb(12, 0, 28);
		background: radial-gradient(circle at bottom, #1c0047 0%, #0b001d 75%);
	}
</style>

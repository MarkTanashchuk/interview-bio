<script lang="ts">
	import { gsap } from 'gsap';
	import type { ActionReturn } from 'svelte/action';

	let tabNodes: HTMLLIElement[] = [];
	let tabIdxActive = 0;

	function animateBorder(containerNode: HTMLUListElement, index: number): ActionReturn<number> {
		const animationCurrent = gsap.timeline();
		const tabNodesAmount = tabNodes.length;
		let indexCurrent = index;

		tabNodes.forEach((node, i) => {
			node.addEventListener('click', () => {
				// check if clicked target is new and if the timeline is currently active
				if (index != tabIdxActive) {
					// if (animationCurrent.isActive()) {
					// 	animationCurrent.progress(1);
					// }
					// indexCurrent = tabIdxActive;
					// tabIdxActive = index;
					// // animate bubble border to clicked target
					// animationCurrent.to('.border', {
					// 	x: tabNodes[tabIdxActive].offsetLeft
					// });
				}
			});
		});

		// set initial article and position bubble border on first tab
		// gsap.set('.border', { x: tabNodes[index].offsetLeft });

		return {
			update: (indexNew) => {
				// check if clicked target is new and if the timeline is currently active
				if (indexCurrent != indexNew) {
					console.info(indexCurrent, indexNew);
					indexCurrent = indexNew;
					console.info(indexCurrent, indexNew);
					// if (animationCurrent.isActive()) {
					// 	animationCurrent.progress(1);
					// }

					// // animate bubble border to clicked target
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
	<h1 class="w-fit text-white font-bold text-3xl pb-[var(--n)]" style:--n="40px">1</h1>

	<ul class="relative flex w-full max-w-xl" use:animateBorder={tabIdxActive}>
		{#each ['Animation', 'Branding', 'Illustration'] as text, i}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				class="text-white font-bold text-xl"
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
		background:
        /* linear-gradient(180deg, rgba(12, 0, 28, 1) 0%, rgba(24, 0, 60, 1) 100%) */ radial-gradient(
			circle at bottom,
			#1c0047 0%,
			#0b001d 75%
		);
	}

	li {
		text-align: center;
		margin: 0;
		padding: 10px;
		flex: auto;
		position: relative;
		cursor: pointer;
		list-style: none;
		z-index: 10;
		transition: opacity 200ms;
	}
</style>

<script context="module" lang="ts">
	export type SlideIdx = 1 | 2 | 3;
</script>

<script lang="ts">
	import { gsap } from 'gsap/dist/gsap';

	type Lang = (typeof languages)[number];
	const languages = ['ENG', 'FR'] as const;
	const socials = [
		{ name: 'FB', href: 'https://google.com' },
		{ name: 'PIN', href: 'https://google.com' },
		{ name: 'IG', href: 'https://google.com' }
	] as const;

	let slideIdx: SlideIdx = 1;
	let languageActive: Lang = 'ENG';

	const handleSelectLanguage = (lang: Lang) => {
		languageActive = lang;
	};

	const handleSelectPrevSlide = () => {
		if (slideIdx <= 1) {
			slideIdx = 3;
		} else {
			slideIdx -= 1;
		}
	};

	const handleSelectNextSlide = () => {
		if (slideIdx >= 3) {
			slideIdx = 1;
		} else {
			slideIdx += 1;
		}
	};

	const animate = (node: Element) => {
		const q = gsap.utils.selector(node);
		const timeline = gsap.timeline();

		timeline
			.from(q('#hero-image'), {
				opacity: 0
			})
			.from(
				[q('#menu'), q('#primary-title'), q('#secondary-title'), q('#navigation'), q('#socials')],
				{
					opacity: 0,
					x: -20,
					stagger: 0.2
				}
			)
			.from(
				[q('#languages'), q('#info'), q('#secondary-image'), q('#tertiary-image'), q('#button')],
				{
					opacity: 0,
					x: 20,
					stagger: 0.2
				}
			);
	};

	const logSlideChange = (...args: any[]) => {
		console.info(slideIdx);
	};

	$: logSlideChange(slideIdx);
</script>

<div
	class="relative min-h-96 flex w-fit h-fit max-h-screen max-w-[100vw] aspect-[16/10] mx-auto"
	use:animate
>
	<div
		class="relative flex flex-col justify-end w-3/5 h-full p-12 py-24 gap-12 lg:gap-16 xl:gap-24 text-white"
	>
		<div
			id="menu"
			class="flex absolute invisible items-center left-12 top-12 gap-4 z-50 text-white cursor-pointer"
		>
			<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="m0 0h24v24h-24z" fill="#fff" opacity="0" transform="matrix(-1 0 0 -1 24 24)" />
				<g fill="#fff">
					<rect height="2" rx=".95" width="18" x="3" y="11" />
					<rect height="2" rx=".95" width="18" x="3" y="16" />
					<rect height="2" rx=".95" width="18" x="3" y="6" />
				</g>
			</svg>

			<div class="text-xs font-bold">Menu</div>
		</div>
		<div
			id="socials"
			class="flex invisible absolute gap-8 left-12 bottom-12 z-50 text-white text-xs"
		>
			{#each socials as { name, href }}
				<a class="font-bold" {href}>{name}</a>
			{/each}
		</div>
		<img
			id="hero-image"
			class="w-full h-full invisible object-cover absolute left-0 top-0 z-10 select-none"
			src="3.jpg"
			alt="a white cat"
		/>
		<div class="relative flex justify-between w-full z-30">
			<div id="secondary-title" class="flex flex-col invisible text-white text-xs italic">
				<span>Summurr</span>
				<span>Collection</span>
				<span>2022</span>
			</div>
			<div id="navigation" class="flex invisible items-center gap-4 text-xs">
				<button class="text-white" on:click={handleSelectNextSlide}>Next</button>
				<div class="h-[1px] w-16 bg-white" />
				<button class="text-white" on:click={handleSelectPrevSlide}>Previous</button>
			</div>
		</div>
		<div
			id="primary-title"
			class="relative invisible flex flex-col text-4xl md:text-6xl lg:text-8xl z-30 mb-12 italic"
		>
			<span>Summurr</span>
			<span>2020</span>
		</div>
	</div>

	<div
		class="relative flex flex-col gap-4 justify-end items-end w-2/5 min-h-full h-full p-12 bg-[#f8eee4]"
	>
		<div
			id="languages"
			class="flex invisible absolute gap-8 right-12 top-12 z-50 text-black text-sm"
		>
			{#each languages as language}
				<button
					class="text-xs"
					class:font-bold={language === languageActive}
					on:click={() => handleSelectLanguage(language)}
				>
					{language}
				</button>
			{/each}
		</div>

		<div
			id="info"
			class="flex invisible items-center absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 z-50 text-bold text-xs gap-4"
		>
			<div>REF: 6687/767</div>
			<div class="h-[1px] w-16 bg-black" />
			<div>White loose dress</div>
		</div>

		<img id="secondary-image" class="invisible w-2/3 mr-12" src="1.jpg" alt="a white cat" />
		<div class="flex justify-between w-full gap-8 items-end">
			<img id="tertiary-image" class="invisible w-1/2" src="2.jpg" alt="a white cat" />
			<div
				id="button"
				class="flex invisible justify-center items-center whitespace-nowrap py-3 px-12 text-sm bold h-fit w-1/2 border-black border-solid border-2"
			>
				Shop now
			</div>
		</div>
	</div>
</div>

<style>
	:global(body, html) {
		height: 100%;
		width: 100%;
		font-family: 'Roboto', sans-serif;
	}

	span {
		font-family: 'Playball', cursive;
		font-weight: 400;
		font-style: normal;
	}
</style>

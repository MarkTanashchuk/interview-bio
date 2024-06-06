<script context="module" lang="ts">
	export type SlideIdx = 1 | 2 | 3;
</script>

<script lang="ts">
	type Lang = (typeof languages)[number];
	const languages = ['ENG', 'FR'] as const;
	const socials = ['FB', 'PIN', 'IG'] as const;

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
</script>

<div class="relative flex w-fit h-fit max-h-screen max-w-[100vw] aspect-[16/10] mx-auto">
	<div class="relative flex flex-col justify-end w-3/5 h-full p-12 gap-12 text-white">
		<div class="flex absolute items-center left-12 top-12 gap-4 z-50 text-white cursor-pointer">
			<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="m0 0h24v24h-24z" fill="#fff" opacity="0" transform="matrix(-1 0 0 -1 24 24)" />
				<g fill="#fff">
					<rect height="2" rx=".95" width="18" x="3" y="11" />
					<rect height="2" rx=".95" width="18" x="3" y="16" />
					<rect height="2" rx=".95" width="18" x="3" y="6" />
				</g>
			</svg>

			<div class="text-xs">Menu</div>
		</div>
		<div class="flex absolute gap-8 left-12 bottom-12 z-50 text-white text-xs">
			{#each socials as social}
				<button>{social}</button>
			{/each}
		</div>
		<img
			class="w-full h-full object-cover absolute left-0 top-0 z-10 select-none"
			src="3.jpg"
			alt="a white cat"
		/>
		<div class="relative flex justify-between w-full z-30">
			<div class="flex flex-col text-white text-xs italic">
				<span>Summurr</span>
				<span>Collection</span>
				<span>2022</span>
			</div>
			<div class="flex items-center gap-4 text-xs">
				<button class="text-white" on:click={handleSelectNextSlide}>Next</button>
				<div class="h-[1px] w-16 bg-white" />
				<button class="text-white" on:click={handleSelectPrevSlide}>Previous</button>
			</div>
		</div>
		<div class="relative flex flex-col text-9xl z-30 mb-12 italic">
			<span>Summurr</span>
			<span>2020</span>
		</div>
	</div>

	<div
		class="relative flex flex-col gap-4 justify-end items-end w-2/5 min-h-full h-full p-12 pr-20 bg-[#f8eee4]"
	>
		<div class="flex absolute gap-8 right-12 top-12 z-50 text-black text-sm">
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
			class="flex items-center absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 z-50 text-bold text-xs gap-4"
		>
			<div>REF: 6687/767</div>
			<div class="h-[1px] w-16 bg-black" />
			<div>FR</div>
		</div>

		<img class="w-2/3" src="1.jpg" alt="a white cat" />
		<div class="flex w-full gap-8 items-end">
			<img class="w-1/2" src="2.jpg" alt="a white cat" />
			<div
				class="flex justify-center items-center whitespace-nowrap py-2 px-12 text-sm bold h-fit w-1/2 border-black border-solid border-2"
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

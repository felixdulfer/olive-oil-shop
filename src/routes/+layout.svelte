<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { basketItemCount } from '$lib/stores/basket.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="bg-white shadow-md">
	<div class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<a href="/" class="text-2xl font-bold text-green-600 hover:text-green-700">
				Olive Oil Shop
			</a>

			<div class="flex items-center gap-6">
				<a
					href="/"
					class="text-gray-700 hover:text-gray-900 font-medium transition-colors"
				>
					Products
				</a>
				<a
					href="/basket"
					class="relative text-gray-700 hover:text-gray-900 font-medium transition-colors"
				>
					Basket
					{#if $basketItemCount > 0}
						<span
							class="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
						>
							{$basketItemCount}
						</span>
					{/if}
				</a>
			</div>
		</div>
	</div>
</nav>

<main>
	{@render children()}
</main>

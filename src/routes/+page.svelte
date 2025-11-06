<script lang="ts">
	import { products } from '$lib/data/products.js';
	import { basketStore } from '$lib/stores/basket.js';
	import type { Product } from '$lib/types/product.js';

	function addToBasket(product: Product) {
		basketStore.addProduct(product, 1);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8 text-gray-900">Olive Oil Collection</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each products as product}
			<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
				<a href="/products/{product.id}">
					{#if product.image}
						<img
							src={product.image}
							alt={product.name}
							class="w-full h-48 object-cover"
						/>
					{:else}
						<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
							<span class="text-gray-400">No image</span>
						</div>
					{/if}

					<div class="p-6">
						<h2 class="text-xl font-semibold mb-2 text-gray-900">{product.name}</h2>
						<p class="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>

						<div class="flex items-center justify-between mb-4">
							<span class="text-lg font-bold text-gray-900">
								€{product.price.toFixed(2)}
							</span>
							<span class="text-sm text-gray-500">{product.unit}</span>
						</div>
					</div>
				</a>

				<div class="px-6 pb-6">
					<button
						onclick={() => addToBasket(product)}
						class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
					>
						Add to Basket
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

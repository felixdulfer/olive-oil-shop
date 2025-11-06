<script lang="ts">
	import { basketStore } from '$lib/stores/basket.js';
	import { withBase } from '$lib/utils/paths.js';
	import { base } from '$app/paths';
	import type { Product } from '$lib/types/product.js';

	let { data }: { data: { product: Product; relatedProducts: Product[] } } = $props();

	let quantity = $state(1);

	function addToBasket() {
		basketStore.addProduct(data.product, quantity);
		// Optionally redirect to basket or show a notification
	}

	function increaseQuantity() {
		quantity += 1;
	}

	function decreaseQuantity() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}
</script>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm">
		<a href={base || '/'} class="text-gray-600 hover:text-gray-900">Home</a>
		<span class="mx-2 text-gray-400">/</span>
		<a href={base || '/'} class="text-gray-600 hover:text-gray-900">Products</a>
		<span class="mx-2 text-gray-400">/</span>
		<span class="text-gray-900">{data.product.name}</span>
	</nav>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
		<!-- Product Image -->
		<div class="bg-white rounded-lg overflow-hidden">
			{#if data.product.image}
				<img
					src={withBase(data.product.image)}
					alt={data.product.name}
					class="w-full h-auto object-cover"
				/>
			{:else}
				<div class="w-full h-96 bg-gray-200 flex items-center justify-center">
					<span class="text-gray-400">No image</span>
				</div>
			{/if}
		</div>

		<!-- Product Info -->
		<div>
			{#if data.product.category}
				<span
					class="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-green-100 text-green-800"
				>
					{data.product.category}
				</span>
			{/if}

			<h1 class="text-4xl font-bold mb-4 text-gray-900">{data.product.name}</h1>

			<div class="mb-6">
				<div class="flex items-baseline gap-4 mb-4">
					<span class="text-3xl font-bold text-gray-900">
						€{data.product.price.toFixed(2)}
					</span>
					<span class="text-lg text-gray-600">{data.product.unit}</span>
				</div>
				<p class="text-gray-600 text-sm mb-2">The price does not include home delivery</p>
			</div>

			<!-- Product Details -->
			<div class="mb-6 space-y-3">
				{#if data.product.profile}
					<div>
						<span class="font-semibold text-gray-900">Profile:</span>
						<span class="ml-2 text-gray-600">{data.product.profile}</span>
					</div>
				{/if}
				{#if data.product.extraction}
					<div>
						<span class="font-semibold text-gray-900">Extraction:</span>
						<span class="ml-2 text-gray-600">{data.product.extraction}</span>
					</div>
				{/if}
				{#if data.product.acidity}
					<div>
						<span class="font-semibold text-gray-900">Acidity:</span>
						<span class="ml-2 text-gray-600">{data.product.acidity}</span>
					</div>
				{/if}
			</div>

			<!-- Quantity Selector -->
			<div class="mb-6">
				<label for="quantity" class="block text-sm font-semibold text-gray-900 mb-2">
					Quantity
				</label>
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2 border border-gray-300 rounded-lg">
						<button
							onclick={decreaseQuantity}
							class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
							aria-label="Decrease quantity"
						>
							−
						</button>
						<input
							type="number"
							id="quantity"
							bind:value={quantity}
							min="1"
							class="w-16 text-center border-0 focus:ring-0 focus:outline-none"
						/>
						<button
							onclick={increaseQuantity}
							class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
							aria-label="Increase quantity"
						>
							+
						</button>
					</div>
				</div>
			</div>

			<!-- Add to Basket Button -->
			<button
				onclick={addToBasket}
				class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-4"
			>
				Add to Basket
			</button>

			<!-- Shipping Info -->
			<div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
				<p class="font-semibold mb-2">Shipping Information</p>
				<p>Shipping in 48/72h business days (Peninsular Spain)</p>
				<p class="mt-2">Free shipping over €145</p>
			</div>
		</div>
	</div>

	<!-- Detailed Description -->
	{#if data.product.detailedDescription}
		<div class="mb-12">
			<h2 class="text-2xl font-bold mb-4 text-gray-900">Description</h2>
			<p class="text-gray-700 leading-relaxed">{data.product.detailedDescription}</p>
		</div>
	{/if}

	<!-- Aromas and Pairing -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
		{#if data.product.aromas}
			<div>
				<h3 class="text-xl font-semibold mb-3 text-gray-900">Aromas</h3>
				<p class="text-gray-700">{data.product.aromas}</p>
			</div>
		{/if}
		{#if data.product.pairing}
			<div>
				<h3 class="text-xl font-semibold mb-3 text-gray-900">Pairing</h3>
				<p class="text-gray-700">{data.product.pairing}</p>
			</div>
		{/if}
	</div>

	<!-- Related Products -->
	{#if data.relatedProducts.length > 0}
		<div>
			<h2 class="text-2xl font-bold mb-6 text-gray-900">Related Products</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each data.relatedProducts as relatedProduct}
					<a
						href={`${base}/products/${relatedProduct.id}`}
						class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
					>
						{#if relatedProduct.image}
							<img
								src={withBase(relatedProduct.image)}
								alt={relatedProduct.name}
								class="w-full h-48 object-contain bg-gray-50"
							/>
						{:else}
							<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
								<span class="text-gray-400">No image</span>
							</div>
						{/if}

						<div class="p-4">
							<h3 class="text-lg font-semibold mb-2 text-gray-900">
								{relatedProduct.name}
							</h3>
							<div class="flex items-center justify-between">
								<span class="text-lg font-bold text-gray-900">
									€{relatedProduct.price.toFixed(2)}
								</span>
								<span class="text-sm text-gray-500">{relatedProduct.unit}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

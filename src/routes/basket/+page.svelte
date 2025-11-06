<script lang="ts">
	import { basketStore, basketTotal } from '$lib/stores/basket.js';

	function updateQuantity(productId: string, quantity: number) {
		basketStore.updateQuantity(productId, quantity);
	}

	function removeItem(productId: string) {
		basketStore.removeProduct(productId);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold text-gray-900">Your Basket</h1>

	{#if $basketStore.length === 0}
		<div class="py-12 text-center">
			<p class="mb-4 text-lg text-gray-600">Your basket is empty</p>
			<a
				href="/"
				class="inline-block rounded-lg bg-green-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-700"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="divide-y divide-gray-200">
				{#each $basketStore as item}
					<div class="flex items-center justify-between p-6">
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-gray-900">{item.product.name}</h3>
							<p class="text-sm text-gray-600">{item.product.unit}</p>
							<p class="mt-2 text-lg font-bold text-gray-900">
								€{(item.product.price * item.quantity).toFixed(2)}
							</p>
						</div>

						<div class="flex items-center gap-4">
							<div class="flex items-center gap-2">
								<button
									onclick={() => updateQuantity(item.product.id, item.quantity - 1)}
									class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
									aria-label="Decrease quantity"
								>
									−
								</button>
								<span class="w-12 text-center font-semibold">{item.quantity}</span>
								<button
									onclick={() => updateQuantity(item.product.id, item.quantity + 1)}
									class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
									aria-label="Increase quantity"
								>
									+
								</button>
							</div>

							<button
								onclick={() => removeItem(item.product.id)}
								class="font-semibold text-red-600 hover:text-red-700"
								aria-label="Remove item"
							>
								Remove
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="border-t border-gray-200 bg-gray-50 p-6">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-xl font-semibold text-gray-900">Total:</span>
					<span class="text-2xl font-bold text-gray-900">€{$basketTotal.toFixed(2)}</span>
				</div>

				<div class="flex gap-4">
					<a
						href="/"
						class="flex-1 rounded-lg bg-gray-200 px-6 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-gray-300"
					>
						Continue Shopping
					</a>
					<a
						href="/order"
						class="flex-1 rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
					>
						Proceed to Order
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>

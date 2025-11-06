<script lang="ts">
	import { basketStore, basketTotal } from '$lib/stores/basket.js';
	import { goto } from '$app/navigation';

	let customerName = $state('');
	let customerEmail = $state('');
	let deliveryAddress = $state('');
	let isSubmitting = $state(false);
	let orderPlaced = $state(false);

	function handleSubmit() {
		if (!customerName || !customerEmail || !deliveryAddress) {
			alert('Please fill in all fields');
			return;
		}

		if ($basketStore.length === 0) {
			alert('Your basket is empty');
			return;
		}

		isSubmitting = true;

		// Simulate order processing
		setTimeout(() => {
			// In a real app, you would send this to a backend API
			console.log('Order placed:', {
				customerName,
				customerEmail,
				deliveryAddress,
				items: $basketStore,
				total: $basketTotal
			});

			orderPlaced = true;
			isSubmitting = false;

			// Clear basket after successful order
			setTimeout(() => {
				basketStore.clear();
				goto('/');
			}, 3000);
		}, 1000);
	}
</script>

<div class="container mx-auto px-4 py-8 max-w-2xl">
	{#if orderPlaced}
		<div class="text-center py-12">
			<div class="mb-6">
				<svg
					class="w-16 h-16 text-green-600 mx-auto"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					></path>
				</svg>
			</div>
			<h1 class="text-3xl font-bold mb-4 text-gray-900">Order Placed Successfully!</h1>
			<p class="text-gray-600 mb-6">
				Thank you for your order, {customerName}. We'll send a confirmation email to
				{customerEmail}.
			</p>
			<p class="text-sm text-gray-500">Redirecting to home page...</p>
		</div>
	{:else}
		<h1 class="text-4xl font-bold mb-8 text-gray-900">Place Your Order</h1>

		{#if $basketStore.length === 0}
			<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
				<p class="text-yellow-800">Your basket is empty. Please add some products first.</p>
				<a
					href="/"
					class="inline-block mt-4 text-green-600 hover:text-green-700 font-semibold"
				>
					Continue Shopping →
				</a>
			</div>
		{:else}
			<div class="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 class="text-xl font-semibold mb-4 text-gray-900">Order Summary</h2>
				<div class="space-y-2 mb-4">
					{#each $basketStore as item}
						<div class="flex justify-between text-sm">
							<span class="text-gray-600">
								{item.product.name} × {item.quantity}
							</span>
							<span class="font-semibold">
								€{(item.product.price * item.quantity).toFixed(2)}
							</span>
						</div>
					{/each}
				</div>
				<div class="border-t border-gray-200 pt-4 flex justify-between">
					<span class="text-lg font-semibold text-gray-900">Total:</span>
					<span class="text-xl font-bold text-gray-900">€{$basketTotal.toFixed(2)}</span>
				</div>
			</div>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				class="bg-white rounded-lg shadow-md p-6 space-y-6"
			>
				<div>
					<label for="customerName" class="block text-sm font-semibold text-gray-900 mb-2">
						Full Name *
					</label>
					<input
						type="text"
						id="customerName"
						bind:value={customerName}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						placeholder="Enter your full name"
					/>
				</div>

				<div>
					<label for="customerEmail" class="block text-sm font-semibold text-gray-900 mb-2">
						Email Address *
					</label>
					<input
						type="email"
						id="customerEmail"
						bind:value={customerEmail}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						placeholder="your.email@example.com"
					/>
				</div>

				<div>
					<label
						for="deliveryAddress"
						class="block text-sm font-semibold text-gray-900 mb-2"
					>
						Delivery Address *
					</label>
					<textarea
						id="deliveryAddress"
						bind:value={deliveryAddress}
						required
						rows="4"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						placeholder="Enter the delivery address"
					></textarea>
				</div>

				<div class="flex gap-4 pt-4">
					<a
						href="/basket"
						class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
					>
						Back to Basket
					</a>
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
					>
						{isSubmitting ? 'Placing Order...' : 'Place Order'}
					</button>
				</div>
			</form>
		{/if}
	{/if}
</div>


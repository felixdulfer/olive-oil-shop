import { writable, derived } from 'svelte/store';
import type { BasketItem, Product } from '../types/product.js';

function createBasketStore() {
	const { subscribe, set, update } = writable<BasketItem[]>([]);

	return {
		subscribe,
		addProduct: (product: Product, quantity: number = 1) => {
			update((items) => {
				const existingItem = items.find((item) => item.product.id === product.id);

				if (existingItem) {
					existingItem.quantity += quantity;
					return items;
				} else {
					return [...items, { product, quantity }];
				}
			});
		},
		removeProduct: (productId: string) => {
			update((items) => items.filter((item) => item.product.id !== productId));
		},
		updateQuantity: (productId: string, quantity: number) => {
			update((items) => {
				const item = items.find((item) => item.product.id === productId);
				if (item) {
					if (quantity <= 0) {
						return items.filter((item) => item.product.id !== productId);
					} else {
						item.quantity = quantity;
						return items;
					}
				}
				return items;
			});
		},
		clear: () => set([])
	};
}

export const basketStore = createBasketStore();

export const basketTotal = derived(basketStore, ($basket) =>
	$basket.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const basketItemCount = derived(basketStore, ($basket) =>
	$basket.reduce((count, item) => count + item.quantity, 0)
);

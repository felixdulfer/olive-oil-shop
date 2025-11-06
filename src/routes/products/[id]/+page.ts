import { error } from '@sveltejs/kit';
import { getProductById, getRelatedProducts, products } from '$lib/data/products.js';
import type { Product } from '$lib/types/product.js';

export function entries() {
	// Prerender all product pages
	return products.map((product) => ({ id: product.id }));
}

export function load({ params }) {
	const product = getProductById(params.id);

	if (!product) {
		throw error(404, 'Product not found');
	}

	const relatedProducts = getRelatedProducts(params.id, 4);

	return {
		product,
		relatedProducts
	};
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image?: string;
	unit: string; // e.g., "500ml", "1L", "250ml"
}

export interface BasketItem {
	product: Product;
	quantity: number;
}

export interface Order {
	id: string;
	items: BasketItem[];
	total: number;
	customerName: string;
	customerEmail: string;
	deliveryAddress: string;
	orderDate: Date;
}


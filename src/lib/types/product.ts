export interface Product {
	id: string;
	name: string;
	description: string;
	detailedDescription?: string;
	price: number;
	image?: string;
	unit: string; // e.g., "500ml", "1L", "250ml"
	profile?: string; // e.g., "Mild medium ripe fruity profile"
	extraction?: string; // e.g., "Cold extraction"
	acidity?: string; // e.g., "Less than 0.2º"
	pairing?: string; // e.g., "Ideal for consuming raw with fish, meat, and desserts"
	aromas?: string; // e.g., "Secondary aromas of a vegetable type, with clear connotations of fennel or tomato"
	category?: string; // e.g., "Traditional", "Premium", "Ecological"
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

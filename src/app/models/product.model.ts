export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  category: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

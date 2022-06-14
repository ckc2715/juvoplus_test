import * as Knex from 'knex';

interface Product {
  product_id: string;
  product_name: string;
  category: string;
  description: string;
  image_url1: string;
  image_url2: string;
  date_created: Date;
}

export class ProductService {
  constructor(private knex: Knex) {}

  getProductById = (productId: number) => {
    return this.knex
      .select<Product>(
        'product_id',
        'product_name',
        'category',
        'description',
        'image_url1',
        'image_url2',
        'date_created'
      )
      .from('product')
      .where('product_id', productId)
      .first();
  };

  getBestSellers = () => {
    return this.knex
      .select<Product[]>(
        'p.product_id',
        'p.product_name',
        'p.category',
        'p.description',
        'p.image_url1',
        'p.image_url2',
        'p.date_created'
      )
      .from('product as p')
      .innerJoin('salesorder as s', 's.product_id', 'p.product_id')
      .groupBy('s.product_id')
      .orderByRaw('sum(s.quantity) desc')
      .limit(10);
  };
}

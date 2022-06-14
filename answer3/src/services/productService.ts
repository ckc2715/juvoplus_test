import endpoint from "../endpoint";

export interface Product {
  product_id: string;
  product_name: string;
  category: string;
  description: string;
  image_url1: string;
  image_url2: string;
  date_created: Date;
}

class ProductService {
  async getProductById(productId: string) {
    const res = await endpoint.get<{ ok: boolean; product: Product }>(
      "/product/" + productId
    );
    return res.data;
  }

  async getBestsellers() {
    const res = await endpoint.get<{ ok: boolean; products: Product[] }>(
      "/bestsellers"
    );
    return res.data;
  }
}
export default new ProductService();

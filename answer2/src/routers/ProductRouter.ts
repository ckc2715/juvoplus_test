import * as express from 'express';
import { ProductService } from 'services/ProductService';

export class ProductRouter {
  constructor(private productService: ProductService) {}

  router = () => {
    const router = express.Router();
    router.get('/product/:productId', this.getProductById);
    router.get('/bestsellers', this.getBestSellers);
    return router;
  };

  private getProductById: express.RequestHandler = async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      if (!productId || isNaN(productId)) {
        res.status(400).json({ ok: false, message: 'Invalid input' });
        return;
      }
      const product = await this.productService.getProductById(productId);
      res.json({ ok: true, product });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  };

  private getBestSellers: express.RequestHandler = async (req, res) => {
    try {
      const products = await this.productService.getBestSellers();
      res.json({ ok: true, products });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  };
}

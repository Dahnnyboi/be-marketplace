import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { FEEDBACK } from 'constants/validations';
import authRequired from 'middlewares/auth/jwt.middleware';
import {
  sellerCheckerMiddleware,
  buyerCheckerMiddleware,
} from 'middlewares/auth/type.middleware';
import { expressValidatorErrorHandler } from 'middlewares/errors/express-validator.middleware';
import ProductsModel from 'models/products.model';
import ProductReviewsModel from 'models/product-reviews.model';
import productsService from 'services/product.service';
import productReviewsService from 'services/product-reviews.service';

const route = Router();

export default (app: Router) => {
  app.use('/products', route);

  route.post(
    '/',
    authRequired,
    sellerCheckerMiddleware,
    body('name', FEEDBACK.required('name')).isString().notEmpty(),
    body('price', FEEDBACK.required('price')).isNumeric().notEmpty(),
    body('description', FEEDBACK.required('description'))
      .isString()
      .notEmpty(),
    expressValidatorErrorHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.payload;
      const { name, price, description } = req.body as ProductsModel;

      const handler = async () => {
        await productsService.createProduct(
          userId,
          name,
          price,
          description,
        );
      };

      handler()
        .then(() => {
          res
            .status(200)
            .json({ message: 'Successfully created a product!' });
        })
        .catch((err) => {
          next(err);
        });
    },
  );

  route.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
      const { limit, offset, order, orderBy, search } =
        req.query as unknown as PaginationQuery;

      const handler = async () => {
        const datas = await productsService.getProductsByList(
          limit,
          offset,
          order,
          orderBy,
          search,
        );

        return datas;
      };

      handler()
        .then((datas) => {
          const { data, meta } = datas;
          res.status(200).json({ data, meta });
        })
        .catch((e) => {
          next(e);
        });
    },
  );

  route.get(
    '/:productId',
    (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;

      const handler = async () => {
        const product = await productsService.getProductById(
          productId,
        );

        return product;
      };

      handler()
        .then((product) => {
          if (!product) {
            res
              .status(404)
              .json({ error: { message: 'Product not found' } });
          } else {
            res.status(200).json({ data: { ...product } });
          }
        })
        .catch((e) => {
          next(e);
        });
    },
  );

  route.put(
    '/:productId',
    authRequired,
    sellerCheckerMiddleware,
    body('name', FEEDBACK.required('name')).isString().notEmpty(),
    body('price', FEEDBACK.required('price')).isNumeric().notEmpty(),
    body('description', FEEDBACK.required('description'))
      .isString()
      .notEmpty(),
    expressValidatorErrorHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const { name, price, description } = req.body as ProductsModel;
      const { userId } = req.payload;
      const { productId } = req.params;

      const handler = async () => {
        const product = await productsService.updateProduct(
          userId,
          productId,
          name,
          price,
          description,
        );

        return product;
      };

      handler()
        .then((product) => {
          if (!product) {
            res
              .status(404)
              .json({ error: { message: 'Product not found' } })
              .end();
          } else {
            res
              .status(200)
              .json({ message: 'Product updated successfully' });
          }
        })
        .catch((e) => {
          next(e);
        });
    },
  );

  route.post(
    '/:productId/product-reviews',
    authRequired,
    buyerCheckerMiddleware,
    body('title', FEEDBACK.required('title')).isString().notEmpty(),
    body('description', FEEDBACK.required('description'))
      .isString()
      .notEmpty(),
    body('stars', FEEDBACK.required('stars')).isNumeric().notEmpty(),
    expressValidatorErrorHandler,
    (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.payload;
      const { productId } = req.params;
      const { title, description, stars } =
        req.body as ProductReviewsModel;

      const handler = async () => {
        await productReviewsService.createProductReview(
          userId,
          productId,
          title,
          description,
          stars,
        );
      };

      handler()
        .then(() => {
          res
            .status(200)
            .json({ message: 'Successfully created product review' });
        })
        .catch((e) => {
          next(e);
        });
    },
  );

  route.get(
    '/:productId/product-reviews',
    (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      const { limit, offset, order, orderBy } =
        req.params as unknown as PaginationQuery;

      const handler = async () => {
        const datas =
          await productReviewsService.getProductReviewsList(
            productId,
            limit,
            offset,
            order,
            orderBy,
          );

        return datas;
      };

      handler()
        .then((datas) => {
          const { data, meta } = datas;

          res.status(200).json({ data, meta });
        })
        .catch((e) => next(e));
    },
  );
};

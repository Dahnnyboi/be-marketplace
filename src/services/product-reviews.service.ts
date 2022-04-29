import { FindOptions } from 'sequelize';
import { Service, Inject, Container } from 'typedi';
import ProductReviewsModel from 'models/product-reviews.model';
import { ORDER_TYPES, ORDER_BY_TYPES } from 'constants/types';

Container.set('productReviewsModel', ProductReviewsModel);

@Service()
class ProductReviewsService {
  constructor(
    @Inject('productReviewsModel')
    private ProductReviewsModelService: typeof ProductReviewsModel,
  ) {}

  async createProductReview(
    userId: string,
    productId: string,
    title: string,
    description: string,
    stars: number,
  ) {
    await this.ProductReviewsModelService.create({
      userId,
      productId,
      title,
      description,
      stars,
    });
  }

  async getProductReviewsList(
    productId: string,
    limit: number,
    offset: number,
    order: string,
    orderBy: string,
  ) {
    const pageLimit = limit || 20;
    const pageOffset = offset || 0;
    const pageOrdering = order || ORDER_TYPES.desc;
    const pageOrderBy = orderBy || ORDER_BY_TYPES.createdAt;

    const optionQuery: FindOptions<Any> | undefined = {
      where: { productId },
      limit: pageLimit,
      offset: pageOffset * pageLimit,
      order: [[pageOrderBy, pageOrdering]],
    };

    const productReviews =
      await this.ProductReviewsModelService.findAll(optionQuery);

    const count = await this.ProductReviewsModelService.count({
      where: { productId },
    });

    const meta = {
      totalPages: Math.ceil(count / (Number(limit) || 20)),
      totalRows: count,
      limit: limit || 20,
      offset: offset || 0,
      order: order || ORDER_TYPES.desc,
      orderBy: orderBy || ORDER_BY_TYPES.createdAt,
    };

    return { data: productReviews, meta };
  }
}

export default Container.get(ProductReviewsService);

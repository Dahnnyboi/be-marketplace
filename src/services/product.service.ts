import { Op, fn, FindOptions } from 'sequelize';
import { Service, Inject, Container } from 'typedi';
import ProductsModel from 'models/products.model';
import { ORDER_TYPES, ORDER_BY_TYPES } from 'constants/types';

Container.set('productsModel', ProductsModel);

@Service()
class ProductsService {
  constructor(
    @Inject('productsModel')
    private ProductsModelService: typeof ProductsModel,
  ) {}

  async createProduct(
    userId: string,
    name: string,
    price: number,
    description: string,
  ) {
    await this.ProductsModelService.create({
      userId,
      name,
      price,
      description,
    });
  }

  async getProductsByList(
    limit?: number,
    offset?: number,
    order?: Ordering,
    orderBy?: string,
    search?: string,
  ): Promise<PaginationInterface> {
    const pageLimit = limit || 20;
    const pageOffset = offset || 0;
    const pageOrdering = order || ORDER_TYPES.desc;
    const pageOrderBy = orderBy || ORDER_BY_TYPES.createdAt;

    let whereOption;
    const optionQuery: FindOptions<Any> | undefined = {
      limit: pageLimit,
      offset: pageOffset * pageLimit,
      order: [[pageOrderBy, pageOrdering]],
    };

    if (search) {
      whereOption = {
        name: { [Op.match]: fn('to_tsquery', search) },
      };
      optionQuery.where = whereOption;
    }
    const products = await this.ProductsModelService.findAll(
      optionQuery,
    );

    const count = await this.ProductsModelService.count({
      where: whereOption,
    });

    const meta = {
      totalPages: Math.ceil(count / (Number(limit) || 20)),
      totalRows: count,
      limit: limit || 20,
      offset: offset || 0,
      order: order || ORDER_TYPES.desc,
      orderBy: orderBy || ORDER_BY_TYPES.createdAt,
    };

    return { data: products, meta };
  }

  async getProductById(
    productId: string,
  ): Promise<false | ProductsModel> {
    const product = await this.ProductsModelService.findOne({
      where: { productId },
    });

    if (!product) return false;

    return product;
  }

  async updateProduct(
    userId: string,
    productId: string,
    name: string,
    price: number,
    description: string,
  ): Promise<false | number> {
    const product = await this.ProductsModelService.update(
      { name, price, description },
      {
        where: { userId, productId },
      },
    );

    if (!product[0]) return false;

    return product[0];
  }
}

export default Container.get(ProductsService);

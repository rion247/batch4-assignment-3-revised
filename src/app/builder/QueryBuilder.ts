import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' } as FilterQuery<T>,
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this?.query };

    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'skip',
      'page',
      'fields',
    ];

    excludeFields.forEach((el) => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortByRaw = this?.query?.sortBy as string;
    const sortOrderRaw = (this?.query?.sortOrder as string)?.toLowerCase();
    const sortOrder = sortOrderRaw === 'asc' ? '' : '-';

    const sortBy = sortByRaw?.split(',').filter(Boolean) || [];

    const sortFields = sortBy.length
      ? sortBy.map((field) => `${sortOrder}${field}`).join(' ')
      : '-createdAt';

    this.modelQuery = this.modelQuery.sort(sortFields);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;

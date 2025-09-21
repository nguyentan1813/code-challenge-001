import { Config } from "../config/config"
import { ResourceModel } from "../models/resource.model"

export class ResourceRepository {
  private repository = Config.PostgresDataSource.getRepository(ResourceModel)

  public async getListPagingResources(
    skip: number,
    limit: number,
    state?: string,
    keyword?: string,
    sortBy: string = "createdAt",
    sortOrder: "ASC" | "DESC" = "DESC",
  ): Promise<{ total: number; data: ResourceModel[] }> {
    const queryBuilder = this.repository.createQueryBuilder("resource")

    if (state) {
      queryBuilder.andWhere("resource.state = :state", { state })
    }

    if (keyword) {
      queryBuilder.andWhere("resource.name ILIKE :keyword OR resource.desc ILIKE :keyword", {
        keyword: `%${keyword}%`,
      })
    }

    queryBuilder.skip(skip).take(limit).orderBy(`resource.${sortBy}`, sortOrder)

    const [data, total] = await queryBuilder.getManyAndCount()

    return { data, total }
  }

  public async getResourceById(id: number): Promise<ResourceModel | null> {
    return this.repository.findOneBy({ id })
  }

  public async createResource(data: Partial<ResourceModel>): Promise<ResourceModel> {
    const resource = this.repository.create(data)
    return this.repository.save(resource)
  }

  public async updateResource(
    id: number,
    data: Partial<ResourceModel>,
  ): Promise<ResourceModel | null> {
    const resource = await this.repository.findOneBy({ id })
    if (!resource) {
      return null
    }
    Object.assign(resource, data)
    return this.repository.save(resource)
  }

  public async deleteResource(id: number): Promise<boolean> {
    const result = await this.repository.delete(id)
    return result.affected && result.affected > 0 ? true : false
  }
}

import { AppDefine } from "../define/app.define"
import type {
  CreateResourceParamDto,
  DeleteResourceResultDto,
  ListingResourceParamDto,
  ListingResourceResultDto,
  ResourceResultDto,
  UpdateResourceParamDto,
  UpdateResourceResultDto,
} from "../dtos/resource.dto"
import { ResourceModel } from "../models/resource.model"
import { ResourceRepository } from "../repositories/resource.repository"

export class ResourceUsecase {
  private readonly resourceRepository = new ResourceRepository()

  async getAllResources(param: ListingResourceParamDto): Promise<ListingResourceResultDto> {
    const { total, data } = await this.resourceRepository.getListPagingResources(
      param.skip || AppDefine.DefaultSkip,
      param.limit || AppDefine.DefaultLimit,
      param.state || undefined,
      param.keyword || undefined,
      param.sortBy,
      param.sortOrder as "ASC" | "DESC" | undefined,
    )
    const response: ListingResourceResultDto = {
      total,
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        desc: item.desc,
        state: item.state,
        createdAt: item.createdAt,
      })),
    }
    return response
  }
  async getResourceById(id: number): Promise<ResourceResultDto | undefined> {
    const resource = await this.resourceRepository.getResourceById(id)
    if (!resource) {
      return undefined
    }
    const result: ResourceResultDto = {
      id: resource.id,
      name: resource.name,
      desc: resource.desc,
      state: resource.state,
      createdAt: resource.createdAt,
    }
    return result
  }
  async createResource(param: CreateResourceParamDto): Promise<ResourceResultDto> {
    const createObj: Partial<ResourceModel> = {
      name: param.name,
      desc: param.desc,
      state: AppDefine.ResourceState.ACTIVE,
    }
    const result = await this.resourceRepository.createResource(createObj)
    const resourceCreated: ResourceResultDto = {
      id: result.id,
      name: result.name,
      desc: result.desc,
      state: result.state,
      createdAt: result.createdAt,
    }
    return resourceCreated
  }
  async updateResource(
    id: number,
    udpateParam: UpdateResourceParamDto,
  ): Promise<UpdateResourceResultDto> {
    const updatedResource = await this.resourceRepository.updateResource(id, udpateParam)
    if (updatedResource) {
      return {
        result: true,
        item: {
          id: updatedResource.id,
          name: updatedResource.name,
          desc: updatedResource.desc,
          state: updatedResource.state,
          createdAt: updatedResource.createdAt,
          updatedAt: updatedResource.updatedAt,
        },
      }
    }
    return { result: false }
  }
  async deleteResource(id: number): Promise<DeleteResourceResultDto> {
    const result = await this.resourceRepository.deleteResource(id)
    return {
      result,
    }
  }
}

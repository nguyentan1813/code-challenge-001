import {
  CreateResourceParamDto,
  DeleteResourceResultDto,
  ListingBaseParamDto,
  ListingResourceResultDto,
  ResourceResultDto,
  UpdateResourceParamDto,
  UpdateResourceResultDto,
} from "../../dtos/resource.dto"
import { ResourceUsecase } from "../../usecases/resource.usecase"
import type { Request, Response } from "express"
import { LogHelper } from "../../helpers/log.helper"
import { BaseController } from "../base.controller"

const resourceUsecase = new ResourceUsecase()

export class ResourceApiController extends BaseController {
  constructor() {
    super()
  }

  async getAllResources(req: Request, res: Response) {
    try {
      LogHelper.info("Api getAllResources called")
      const param: ListingBaseParamDto = req.query
      LogHelper.debug("Query Parameters", param)
      const result = await resourceUsecase.getAllResources(param)
      return super.returnSuccess<ListingResourceResultDto>(res, result)
    } catch (error: unknown) {
      return super.returnError(res, error, "Process failed", 500)
    }
  }

  async getResourceById(req: Request, res: Response) {
    try {
      LogHelper.info("Api getResourceById called")
      const id = parseInt(req.params.id as string, 10)
      LogHelper.debug("Path Parameters", { id })
      const result = await resourceUsecase.getResourceById(id)
      return super.returnSuccess<ResourceResultDto | undefined>(res, result)
    } catch (error: unknown) {
      return super.returnError(res, error, "Process failed", 500)
    }
  }

  async createResource(req: Request, res: Response) {
    try {
      LogHelper.info("Api createResource called")
      const param: CreateResourceParamDto = req.body
      LogHelper.debug("Body Parameters", param)
      const result = await resourceUsecase.createResource(param)
      return super.returnSuccess<ResourceResultDto>(res, result)
    } catch (error: unknown) {
      return super.returnError(res, error, "Process failed", 500)
    }
  }

  async updateResource(req: Request, res: Response) {
    try {
      LogHelper.info("Api updateResource called")
      const id = parseInt(req.params.id as string, 10)
      const param: UpdateResourceParamDto = req.body
      LogHelper.debug("Path Parameters", { id })
      LogHelper.debug("Body Parameters", param)
      const result = await resourceUsecase.updateResource(id, param)
      return super.returnSuccess<UpdateResourceResultDto>(res, result)
    } catch (error: unknown) {
      return super.returnError(res, error, "Process failed", 500)
    }
  }

  async deleteResource(req: Request, res: Response) {
    try {
      LogHelper.info("Api deleteResource called")
      const id = parseInt(req.params.id as string, 10)
      LogHelper.debug("Path Parameters", { id })
      const result = await resourceUsecase.deleteResource(id)
      return super.returnSuccess<DeleteResourceResultDto>(res, result)
    } catch (error: unknown) {
      return super.returnError(res, error, "Process failed", 500)
    }
  }
}

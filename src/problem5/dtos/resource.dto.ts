import { IsIn, IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from "class-validator"
import { AppDefine } from "../define/app.define"
import { Type } from "class-transformer"

export class CreateResourceParamDto {
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(100, { message: "Name must be at most 100 characters" })
  name!: string

  @IsOptional()
  @MaxLength(255, { message: "Description must be at most 255 characters" })
  desc?: string
}

export class ResourceResultDto {
  @IsNotEmpty()
  id!: number

  @IsNotEmpty()
  name!: string

  @IsOptional()
  desc?: string | undefined

  @IsNotEmpty()
  state!: string

  @IsNotEmpty()
  createdAt!: Date

  @IsOptional()
  updatedAt?: Date | undefined
}

export class ListingBaseParamDto {
  @IsOptional()
  @MaxLength(100, { message: "Keyword must be at most 100 characters" })
  keyword?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(AppDefine.DefaultSkip, { message: "Skip must be a non-negative integer" })
  skip?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: "Limit must be a positive integer" })
  @Max(AppDefine.MaxLimit, { message: "Limit must be at most 100" })
  limit?: number

  @IsOptional()
  sortBy?: string = "createdAt"

  @IsOptional()
  @IsIn(["ASC", "DESC"], { message: 'sortOrder must be either "ASC" or "DESC"' })
  sortOrder?: string
}

export class ListingResourceParamDto extends ListingBaseParamDto {
  @IsOptional()
  @IsIn(
    [
      AppDefine.ResourceState.ACTIVE,
      AppDefine.ResourceState.INACTIVE,
      AppDefine.ResourceState.REMOVED,
    ],
    {
      message: `State must be either ${AppDefine.ResourceState.ACTIVE} or ${AppDefine.ResourceState.INACTIVE} or ${AppDefine.ResourceState.REMOVED}`,
    },
  )
  state?: string
}
export class ListingResourceResultDto {
  @IsNotEmpty()
  total!: number

  @IsNotEmpty()
  items!: ResourceResultDto[]
}

export class UpdateResourceParamDto {
  @IsOptional()
  @MaxLength(100, { message: "Name must be at most 100 characters" })
  name?: string

  @IsOptional()
  @MaxLength(255, { message: "Description must be at most 255 characters" })
  desc?: string

  @IsOptional()
  @IsIn(
    [
      AppDefine.ResourceState.ACTIVE,
      AppDefine.ResourceState.INACTIVE,
      AppDefine.ResourceState.REMOVED,
    ],
    {
      message: `State must be either ${AppDefine.ResourceState.ACTIVE} or ${AppDefine.ResourceState.INACTIVE} or ${AppDefine.ResourceState.REMOVED}`,
    },
  )
  state?: string
}

export class UpdateResourceResultDto {
  result: boolean = false
  item?: ResourceResultDto | undefined
}

export class DeleteResourceResultDto {
  result: boolean = false
}

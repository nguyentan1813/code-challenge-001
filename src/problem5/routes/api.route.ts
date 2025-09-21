import { Router } from "express"
import { ResourceApiController } from "../presentation/apis/resource.api.controller"
import { validationMiddleware } from "../middlewares/validate.middleware"
import {
  CreateResourceParamDto,
  ListingResourceParamDto,
  UpdateResourceParamDto,
} from "../dtos/resource.dto"

const router = Router()
const resourceController = new ResourceApiController()

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResourceParamDto'
 *     responses:
 *       200:
 *         description: The created resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResultDto'
 */
router.post(
  "/resources",
  validationMiddleware(CreateResourceParamDto, "body"),
  resourceController.createResource,
)

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Retrieve a list of resources
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of items to return
 *       - in: query
 *         name: state
 *         schema:
 *            type: string
 *            enum: [active, inactive, removed]
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to filter resources by name or description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., name, createdAt)
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order (ASC or DESC)
 *     responses:
 *       200:
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListingResourceResultDto'
 */
router.get(
  "/resources",
  validationMiddleware(ListingResourceParamDto, "query"),
  resourceController.getAllResources,
)

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Retrieve a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: The resource with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResultDto'
 */
router.get("/resources/:id", resourceController.getResourceById)

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateResourceParamDto'
 *     responses:
 *       200:
 *         description: The updated resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateResourceResultDto'
 */
router.put(
  "/resources/:id",
  validationMiddleware(UpdateResourceParamDto, "body"),
  resourceController.updateResource,
)

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: Deletion result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResourceResultDto'
 */
router.delete("/resources/:id", resourceController.deleteResource)

export { router }

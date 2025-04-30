import express from 'express';
import {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
  getPlantHealth
} from '../controllers/plantController';

const router = express.Router();

/**
 * @swagger
 * /api/plants:
 *   get:
 *     summary: Get all plants
 *     description: Retrieve a list of all plants with optional filtering
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter plants by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter plants by type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter plants by location
 *     responses:
 *       200:
 *         description: A list of plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
router.get('/', getAllPlants);

/**
 * @swagger
 * /api/plants/{id}:
 *   get:
 *     summary: Get a plant by ID
 *     description: Retrieve a specific plant by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plant ID
 *     responses:
 *       200:
 *         description: A plant object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
router.get('/:id', getPlant);

/**
 * @swagger
 * /api/plants:
 *   post:
 *     summary: Create a new plant
 *     description: Add a new plant to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       201:
 *         description: Plant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       400:
 *         description: Invalid input
 */
router.post('/', createPlant);

/**
 * @swagger
 * /api/plants/{id}:
 *   put:
 *     summary: Update a plant
 *     description: Update an existing plant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: Plant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
router.put('/:id', updatePlant);

/**
 * @swagger
 * /api/plants/{id}:
 *   delete:
 *     summary: Delete a plant
 *     description: Delete a plant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plant ID
 *     responses:
 *       200:
 *         description: Plant deleted successfully
 *       404:
 *         description: Plant not found
 */
router.delete('/:id', deletePlant);

/**
 * @swagger
 * /api/plants/{id}/health:
 *   get:
 *     summary: Get plant health status
 *     description: Retrieve health status of a plant based on weather data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plant ID
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for weather data (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for weather data (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Plant health status
 *       404:
 *         description: Plant not found
 *       400:
 *         description: Invalid input
 */
router.get('/:id/health', getPlantHealth);

export default router; 
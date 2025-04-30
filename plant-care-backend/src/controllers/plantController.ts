import { Request, Response } from 'express';
import Plant, { IPlant } from '../models/Plant';
import axios from 'axios';

// Get all plants
export const getAllPlants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, location } = req.query;
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (type) filter.type = { $regex: type, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    const plants = await Plant.find(filter);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plants', error });
  }
};

// Get a single plant
export const getPlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant', error });
  }
};

// Create a new plant
export const createPlant = async (req: Request, res: Response) => {
  try {
    const plant = new Plant(req.body);
    const savedPlant = await plant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plant', error });
  }
};

// Update a plant
export const updatePlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(400).json({ message: 'Error updating plant', error });
  }
};

// Delete a plant
export const deletePlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plant', error });
  }
};

// Plant health evaluation
export const getPlantHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { start, end } = req.query;
    const plant = await Plant.findById(id);
    if (!plant) {
      res.status(404).json({ message: 'Plant not found' });
      return;
    }
    if (!plant.latitude || !plant.longitude) {
      res.status(400).json({ message: 'Plant location (latitude/longitude) is required' });
      return;
    }
    if (!start || !end) {
      res.status(400).json({ message: 'start and end query parameters are required' });
      return;
    }
    // Open-Meteo API'den veri çek
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${plant.latitude}&longitude=${plant.longitude}&start_date=${start}&end_date=${end}&hourly=precipitation,relative_humidity_2m`;
    const response = await axios.get(url);
    const data = response.data;
    // Haftalık toplam yağış ve ortalama nem hesapla
    const precipitation = data.hourly?.precipitation || [];
    const humidity = data.hourly?.relative_humidity_2m || [];
    const totalPrecipitation = precipitation.reduce((sum: number, val: number) => sum + val, 0);
    const avgHumidity = humidity.length > 0 ? humidity.reduce((sum: number, val: number) => sum + val, 0) / humidity.length : 0;
    // Sağlık değerlendirmesi
    const waterStatus = totalPrecipitation >= plant.weeklyWaterNeed ? 'Yeterli' : 'Yetersiz';
    const humidityStatus = avgHumidity >= plant.expectedHumidity ? 'Yeterli' : 'Yetersiz';
    res.json({
      plant: plant.name,
      totalPrecipitation,
      avgHumidity,
      waterStatus,
      humidityStatus,
      expectedWater: plant.weeklyWaterNeed,
      expectedHumidity: plant.expectedHumidity,
      dateRange: { start, end }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating plant health', error });
  }
}; 
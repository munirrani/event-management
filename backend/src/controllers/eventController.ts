import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const createEvent = async (req: Request, res: Response) => {
  console.log(req.body);  
  try {
    if (!req.body.name || !req.body.startDate || !req.body.endDate || !req.body.location || !req.body.description) { 
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Missing thumbnail' });
    } else {
      req.body.thumbnailUrl = `http://127.0.0.1:${process.env.PORT}/` + req.file.path;
    }
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const filterEvent = req.query.status ? { status: req.query.status } : {};
    const events = await eventService.getEvents(filterEvent);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if ('status' in req.body) {
      if (['Ongoing', 'Completed'].indexOf(req.body.status) === -1) {
        return res.status(400).json({ error: 'Invalid event status' });
      }
    } 
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
};
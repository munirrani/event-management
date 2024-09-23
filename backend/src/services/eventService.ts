import { Event, IEvent } from '../models/Event';

export const createEvent = async (eventData: Partial<IEvent>): Promise<IEvent> => {
  const event = new Event(eventData);
  return event.save();
};

export const getEvents = async (filter: object = {}): Promise<IEvent[]> => {
  const events = await Event.find(filter);
  return events.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
};

export const updateEvent = async (id: string, eventData: Partial<IEvent>): Promise<IEvent | null> => {
  return Event.findByIdAndUpdate(id, eventData, { new: true });
};

export const deleteEvent = async (id: string): Promise<IEvent | null> => {
  return Event.findByIdAndDelete(id);
};
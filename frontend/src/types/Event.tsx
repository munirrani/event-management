interface Event {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    location: string;
    thumbnailUrl: string;
    description: string;
    status: 'Ongoing' | 'Completed';
}
  
export default Event;

import React from 'react';
import Layout from '@/components/Layout';
import EventCard from '@/components/EventCard';

const Events = () => {
  const events = [
    {
      id: '1',
      title: 'Juhu Beach Monsoon Cleanup',
      date: 'Dec 15, 2024',
      time: '8:00 AM',
      location: 'Juhu Beach, Mumbai',
      volunteers: 47,
    },
    {
      id: '2',
      title: 'Marine Drive Dawn Cleanup',
      date: 'Dec 18, 2024',
      time: '6:30 AM',
      location: 'Marine Drive, Mumbai',
      volunteers: 32,
    },
    {
      id: '3',
      title: 'Versova Beach Community Drive',
      date: 'Dec 22, 2024',
      time: '7:00 AM',
      location: 'Versova Beach, Mumbai',
      volunteers: 68,
    },
    {
      id: '4',
      title: 'Bandra Bandstand Cleanup',
      date: 'Dec 25, 2024',
      time: '8:30 AM',
      location: 'Bandra Bandstand, Mumbai',
      volunteers: 23,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[70%_30%] gap-8">
          {/* Left Column - Events List */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Upcoming Cleanup Drives</h1>
              <p className="text-muted-foreground">
                Join fellow ocean warriors in making our beaches cleaner and healthier
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
          
          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Event Locations</h2>
                <p className="text-sm text-muted-foreground">Mumbai cleanup sites</p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-ocean-light to-sand-light relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mumbai Beach Locations
                    </p>
                  </div>
                </div>
                {/* Map pins simulation */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-coral rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-coral rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-coral rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;

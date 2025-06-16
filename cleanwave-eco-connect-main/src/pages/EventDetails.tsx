
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const EventDetails = () => {
  const { id } = useParams();
  const [hasJoined, setHasJoined] = React.useState(false);

  const event = {
    id: id || '1',
    title: 'Juhu Beach Monsoon Cleanup',
    date: 'December 15, 2024',
    time: '8:00 AM - 12:00 PM',
    location: 'Juhu Beach, Mumbai',
    volunteers: 47,
    description: 'Join us for a morning of beach cleaning at one of Mumbai\'s most popular beaches. We\'ll be focusing on removing plastic waste and debris that has accumulated during the monsoon season. This is a great opportunity to make a real impact on our marine ecosystem while meeting like-minded environmental advocates.',
    whatToBring: [
      'Comfortable clothes that can get dirty',
      'Closed-toe shoes (preferably old sneakers)',
      'Hat and sunscreen',
      'Reusable water bottle',
      'Gloves (we\'ll provide extras)',
    ],
    safetyProtocols: [
      'All participants must sign a safety waiver',
      'Follow volunteer coordinator instructions at all times',
      'Do not pick up sharp objects without proper tools',
      'Stay hydrated and take breaks as needed',
      'Report any injuries immediately to coordinators',
    ],
  };

  const handleJoinDrive = () => {
    setHasJoined(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Banner Image */}
        <div className="aspect-[21/9] bg-gradient-to-br from-ocean-medium to-ocean-dark rounded-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">What to Bring</h2>
                <ul className="space-y-2">
                  {event.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-coral mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Safety Protocols */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Safety Protocols</h2>
                <ul className="space-y-2">
                  {event.safetyProtocols.map((protocol, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{protocol}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Button */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-lg font-semibold">{event.volunteers} volunteers registered</span>
                </div>
                
                {hasJoined ? (
                  <Button disabled className="w-full bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    You're Going!
                  </Button>
                ) : (
                  <Button 
                    onClick={handleJoinDrive}
                    className="w-full coral-gradient hover:opacity-90 text-lg py-6"
                  >
                    Join Drive
                  </Button>
                )}
                
                <p className="text-sm text-muted-foreground mt-3">
                  Free event • All supplies provided
                </p>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-sm text-muted-foreground">Mumbai, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Beach Cleanup</Badge>
                  <Badge variant="secondary">Environmental</Badge>
                  <Badge variant="secondary">Community</Badge>
                  <Badge variant="secondary">Mumbai</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;

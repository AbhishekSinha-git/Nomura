
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Settings, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrganizerDashboard = () => {
  const managedEvents = [
    {
      id: '1',
      title: 'Juhu Beach Monsoon Cleanup',
      date: 'Dec 15, 2024',
      volunteers: 47,
      status: 'Published',
    },
    {
      id: '2',
      title: 'Marine Drive Dawn Cleanup',
      date: 'Dec 18, 2024',
      volunteers: 32,
      status: 'Published',
    },
    {
      id: '3',
      title: 'Versova Beach Community Drive',
      date: 'Dec 22, 2024',
      volunteers: 68,
      status: 'Draft',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Create Event Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your cleanup events and track community impact
            </p>
          </div>
          
          <Button asChild className="coral-gradient hover:opacity-90">
            <Link to="/create-event" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New Event</span>
            </Link>
          </Button>
        </div>

        {/* My Managed Events */}
        <Card>
          <CardHeader>
            <CardTitle>My Managed Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Registered Volunteers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.volunteers}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={event.status === 'Published' ? 'default' : 'secondary'}
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/events/${event.id}/analytics`}>
                            <BarChart3 className="h-4 w-4 mr-1" />
                            View Analytics
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrganizerDashboard;

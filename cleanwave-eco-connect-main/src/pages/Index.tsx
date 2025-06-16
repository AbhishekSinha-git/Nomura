
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Waves, Users, MapPin, Calendar, ArrowRight, Heart, Recycle } from 'lucide-react';

const Index = () => {
  const stats = [
    { label: 'Beach Cleanups', value: '150+', icon: Waves },
    { label: 'Active Volunteers', value: '2.5K+', icon: Users },
    { label: 'Cities Covered', value: '25+', icon: MapPin },
    { label: 'Waste Collected', value: '50+ tons', icon: Recycle },
  ];

  const upcomingEvents = [
    {
      title: 'Juhu Beach Monsoon Cleanup',
      date: 'Dec 15, 2024',
      location: 'Mumbai',
      volunteers: 47,
    },
    {
      title: 'Marine Drive Dawn Cleanup',
      date: 'Dec 18, 2024',
      location: 'Mumbai',
      volunteers: 32,
    },
    {
      title: 'Versova Beach Community Drive',
      date: 'Dec 22, 2024',
      location: 'Mumbai',
      volunteers: 68,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 ocean-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 coral-gradient" variant="secondary">
              🌊 Making Waves for Ocean Conservation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 ocean-gradient bg-clip-text text-transparent">
              CleanWave
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of ocean warriors in organizing and participating in beach cleanup drives. 
              Together, we can protect our marine ecosystems one wave at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="coral-gradient hover:opacity-90 text-lg px-8 py-6">
                <Link to="/events" className="flex items-center">
                  Explore Cleanup Drives
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/signup">Join as Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="ocean-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Cleanup Drives</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community in making a real impact on ocean conservation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-ocean-light to-ocean-medium rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">🏖️</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.volunteers} joined</span>
                    </div>
                    <Badge variant="outline">Free Event</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 coral-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you're organizing cleanup drives or joining as a volunteer, 
              every action counts in protecting our beautiful oceans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/signup">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-coral">
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

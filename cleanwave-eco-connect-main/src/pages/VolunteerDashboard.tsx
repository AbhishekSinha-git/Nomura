
import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import AIEcoBotModal from '@/components/AIEcoBotModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Weight, Calendar, Bot, Award } from 'lucide-react';

const VolunteerDashboard = () => {
  const [isBotOpen, setIsBotOpen] = React.useState(false);

  const upcomingEvents = [
    {
      id: '1',
      title: 'Juhu Beach Monsoon Cleanup',
      date: 'Dec 15, 2024',
      time: '8:00 AM',
    },
    {
      id: '2',
      title: 'Marine Drive Dawn Cleanup',
      date: 'Dec 18, 2024',
      time: '6:30 AM',
    },
  ];

  const badges = [
    { name: 'First Cleanup', icon: '🌊', unlocked: true },
    { name: 'Waste Warrior', icon: '♻️', unlocked: true },
    { name: 'Early Bird', icon: '🌅', unlocked: true },
    { name: 'Team Player', icon: '🤝', unlocked: true },
    { name: 'Recycling Champion', icon: '🏆', unlocked: false },
    { name: 'Ocean Guardian', icon: '🐠', unlocked: false },
    { name: 'Plastic Fighter', icon: '🥊', unlocked: false },
    { name: 'Green Leader', icon: '🌱', unlocked: false },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Impact Dashboard</h1>
          <p className="text-muted-foreground">
            Track your environmental impact and upcoming cleanup drives
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Hours Volunteered"
            value={12}
            icon={Clock}
            subtitle="This month"
          />
          <StatCard
            title="Waste Collected"
            value="25 kg"
            icon={Weight}
            subtitle="Total contribution"
          />
          <StatCard
            title="Drives Attended"
            value={4}
            icon={Calendar}
            subtitle="Since joining"
          />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Upcoming Drives */}
            <Card>
              <CardHeader>
                <CardTitle>My Upcoming Drives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <Badge variant="outline">Registered</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  My Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-lg border transition-all ${
                        badge.unlocked
                          ? 'bg-gradient-to-br from-ocean-light to-sand-light hover:shadow-md'
                          : 'bg-muted/50 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <p className="text-xs font-medium">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating AI Bot Button */}
        <Button
          onClick={() => setIsBotOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 ocean-gradient shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>

        <AIEcoBotModal open={isBotOpen} onOpenChange={setIsBotOpen} />
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;

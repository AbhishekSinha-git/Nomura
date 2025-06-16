
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

const Community = () => {
  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 2580, badge: 'Ocean Guardian' },
    { rank: 2, name: 'Rajesh Kumar', points: 2340, badge: 'Waste Warrior' },
    { rank: 3, name: 'Anita Patel', points: 2120, badge: 'Eco Champion' },
    { rank: 4, name: 'Vikram Singh', points: 1950, badge: 'Green Leader' },
    { rank: 5, name: 'Sneha Iyer', points: 1820, badge: 'Plastic Fighter' },
    { rank: 6, name: 'Arjun Mehta', points: 1675, badge: 'Beach Guardian' },
    { rank: 7, name: 'Kavya Nair', points: 1540, badge: 'Cleanup Hero' },
    { rank: 8, name: 'Rohit Agarwal', points: 1420, badge: 'Eco Warrior' },
    { rank: 9, name: 'Meera Joshi', points: 1280, badge: 'Ocean Protector' },
    { rank: 10, name: 'Kiran Reddy', points: 1150, badge: 'Green Crusader' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return 'default';
    if (rank <= 5) return 'secondary';
    return 'outline';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 ocean-gradient bg-clip-text text-transparent">
            Community Warriors Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating our most dedicated volunteers who are making waves in ocean conservation
          </p>
        </div>

        {/* Top 3 Spotlight */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((volunteer, index) => (
            <Card key={volunteer.rank} className={`text-center ${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
              <CardContent className="pt-6">
                <div className="mb-4">
                  {getRankIcon(volunteer.rank)}
                </div>
                <h3 className="text-lg font-semibold mb-2">{volunteer.name}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{volunteer.points}</p>
                <p className="text-sm text-muted-foreground mb-3">points</p>
                <Badge variant={getRankBadgeColor(volunteer.rank)}>{volunteer.badge}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Leaderboard</CardTitle>
            <p className="text-muted-foreground">Points are earned through cleanup participation, waste collection, and community engagement</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((volunteer) => (
                <div
                  key={volunteer.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-accent/50 ${
                    volunteer.rank <= 3 ? 'bg-gradient-to-r from-accent/20 to-transparent' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(volunteer.rank)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{volunteer.name}</h3>
                      <Badge variant={getRankBadgeColor(volunteer.rank)} className="text-xs">
                        {volunteer.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{volunteer.points}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="ocean-gradient">
            <CardContent className="p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Join the Leaderboard?</h2>
              <p className="text-lg mb-6 opacity-90">
                Participate in cleanup drives, collect waste, and climb the ranks to become an Ocean Guardian!
              </p>
              <Badge variant="secondary" className="text-primary">
                Next event: December 15th at Juhu Beach
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;

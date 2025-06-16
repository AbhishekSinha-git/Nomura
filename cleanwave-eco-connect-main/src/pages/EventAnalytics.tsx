
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Users, Weight, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EventAnalytics = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [generatedPost, setGeneratedPost] = React.useState('');

  const eventTitle = 'Juhu Beach Monsoon Cleanup';

  const generateSocialPost = () => {
    const post = `What an incredible day! ✨ Our amazing 57 volunteers collected 120 kg of waste from Juhu Beach today, making a real difference for our marine ecosystem! 🌊

Together we removed:
🗑️ 45 kg plastic waste
♻️ 25 kg recyclable materials  
🥤 30 kg general debris

Thank you to everyone who joined us in this mission to protect our beautiful coastline! 🏖️

Next cleanup drive: December 18th at Marine Drive
Register now and be part of the change! 💙

#CleanWave #Mumbai #Sustainability #BeachCleanup #OceanConservation #CommunityAction`;

    setGeneratedPost(post);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({
      title: "Copied to clipboard!",
      description: "Social media post copied successfully.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Event Analytics</h1>
          <h2 className="text-xl text-muted-foreground">{eventTitle}</h2>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Volunteers Checked-In"
            value={57}
            icon={Users}
            subtitle="Out of 64 registered"
          />
          <StatCard
            title="Total Waste Collected"
            value="120 kg"
            icon={Weight}
            subtitle="Above target of 100 kg"
          />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Charts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Waste Breakdown by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-gradient-to-br from-ocean-light to-sand-light rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-lg font-medium mb-2">Waste Collection Chart</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-coral rounded mr-2"></div>
                          <span>Plastic: 45 kg</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-ocean-medium rounded mr-2"></div>
                          <span>Glass: 15 kg</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-sand-medium rounded mr-2"></div>
                          <span>Metal: 25 kg</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-muted rounded mr-2"></div>
                          <span>Other: 35 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* GenAI Content Co-pilot */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Generate Promotional Content
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  AI-powered social media content generator
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateSocialPost}
                  className="w-full coral-gradient hover:opacity-90"
                >
                  Generate Social Media Post
                </Button>

                {generatedPost && (
                  <div className="space-y-3">
                    <Textarea
                      value={generatedPost}
                      onChange={(e) => setGeneratedPost(e.target.value)}
                      rows={12}
                      className="text-sm"
                    />
                    <Button 
                      onClick={copyToClipboard}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventAnalytics;

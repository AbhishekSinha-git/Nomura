
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="clean-blue-gradient border-0">
            <CardContent className="p-8">
              <div className="mb-6">
                <Waves className="h-16 w-16 mx-auto text-ocean-medium mb-4" />
                <h1 className="text-4xl font-bold text-ocean-dark mb-2">404</h1>
                <h2 className="text-xl font-semibold text-ocean-dark mb-4">
                  Page Not Found
                </h2>
                <p className="text-muted-foreground">
                  Looks like you've drifted into uncharted waters. Let's get you back to shore!
                </p>
              </div>
              
              <Button asChild className="coral-gradient hover:opacity-90">
                <Link to="/" className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

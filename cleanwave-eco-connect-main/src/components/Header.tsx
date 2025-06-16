
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Waves, Calendar, BarChart3, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="ocean-gradient p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold ocean-gradient bg-clip-text text-transparent">
              CleanWave
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild className="hover:bg-ocean-light">
                  <Link to="/events" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Events</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="hover:bg-ocean-light">
                  <Link to={`/dashboard/${user?.userType}`} className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>My Dashboard</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="hover:bg-ocean-light">
                  <Link to="/community" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Community</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleLogin}>
                  Login
                </Button>
                <Button className="coral-gradient hover:opacity-90" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

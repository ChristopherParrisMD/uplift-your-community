
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// This is a utility page used to update the password for the main admin user
// It will not be linked in the navigation, only used for direct access when needed

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateAdminPassword = async () => {
      setLoading(true);
      setMessage('Updating password for christopher@myinsightally.com...');

      try {
        // Use the admin email directly for password reset
        const { error } = await supabase.auth.resetPasswordForEmail(
          'christopher@myinsightally.com',
          { redirectTo: `${window.location.origin}/reset-password` }
        );
        
        if (error) {
          console.error('Error initiating password reset:', error);
          setMessage(`Error: ${error.message}. Please try the "Forgot password" option on the login page instead.`);
        } else {
          setMessage('Password reset email sent to christopher@myinsightally.com! Please check your email inbox and follow the link to reset your password.');
        }
      } catch (error: any) {
        console.error('Unhandled error:', error);
        setMessage(`An unexpected error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    updateAdminPassword();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Password Reset</CardTitle>
            <CardDescription>
              Resetting password for christopher@myinsightally.com
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              {loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  <p className="text-gray-600">{message}</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">{message}</p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate('/admin-login')}
                      className="w-full"
                    >
                      Go to Login
                    </Button>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UpdatePassword;

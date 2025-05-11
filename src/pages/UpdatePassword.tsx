
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// This is a utility page used to update the password for a specific user
// It will not be linked in the navigation, only used for direct access when needed

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateUserPassword = async () => {
      setLoading(true);
      setMessage('Updating password...');

      try {
        // Update the password for the specified user
        const { data, error } = await supabase.auth.admin.updateUserById(
          '9801f334-4597-4aad-b1cc-74b1ab3a3154', // This would be a variable in a real implementation
          { password: '168759Cp!@' }
        );
        
        if (error) {
          console.error('Error updating password:', error);
          setMessage('Error: Could not update password. This page requires direct admin API access which is not available in client-side code.');
        } else {
          setMessage('Password updated successfully for christopher@myinsightally.com!');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        console.error('Unhandled error:', error);
        setMessage('An unexpected error occurred. Admin API access is required for this operation.');
      } finally {
        setLoading(false);
      }
    };

    updateUserPassword();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Update Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {loading ? 'Processing...' : message}
          </p>
          {!loading && (
            <button
              onClick={() => navigate('/admin-login')}
              className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

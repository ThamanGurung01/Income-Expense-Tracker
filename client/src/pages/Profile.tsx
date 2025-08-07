import React, { useState, useEffect } from 'react';
import { User, Mail, Eye, EyeOff, Save, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cookieService, getCookie } from '../services/Authentication/cookieService';
import { getService } from '../services/Api/getService';
import { patchService } from '../services/Api/patchService';
import { TailSpin } from 'react-loader-spinner';

interface ProfileData {
  id: string;
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    id:'',
    name: '',
    email: ''
  });
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [message, setMessage] = useState<{ msg: string, error: string }>({
    msg: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const Cookie = getCookie("Token");
    if (!Cookie) {
      navigate("/login", { replace: true });
    } else {
      fetchProfileData();
    }
  }, [navigate]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const userData= await getService("userAuth");
      setProfileData(userData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ msg: "", error: "Failed to load profile data" });
    }finally{
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handlePasswordChange = (field: keyof typeof passwords) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = (): boolean => {
    if (!profileData.name.trim()) {
      setMessage({ msg: "", error: "Name is required" });
      return false;
    }

    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ msg: "", error: "New passwords do not match" });
      return false;
    }

    if (passwords.newPassword && passwords.newPassword.length < 6) {
      setMessage({ msg: "", error: "New password must be at least 6 characters" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ msg: "", error: "" });

    try {
      const updateData: any = {
        name: profileData.name
      };
      if (passwords.newPassword) {
        updateData.password = passwords.newPassword;
      }
        const response= await patchService(updateData,"user",profileData.id);
        await cookieService(response.token);
        setMessage({ msg: "Profile updated successfully!", error: "" });
        setPasswords({ newPassword: '', confirmPassword: '' });
        setIsLoading(false);
        fetchProfileData();
        setTimeout(() => {
          setMessage({ msg: "", error: "" });
        }, 3000);

    } catch (error: any) {
      setIsLoading(false);
      if (error.response?.data?.tokenError) {
        navigate("/login");
      } else {
        setMessage({ 
          msg: "", 
          error: error.response?.data?.error || "Failed to update profile" 
        });
      }
    }
  };

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <TailSpin height="60" width="60" color="#4f46e5" />
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
            type="button">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account information and security</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            {message.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-700 text-sm font-medium">{message.error}</span>
              </div>
            )}
            {message.msg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-700 text-sm font-medium">{message.msg}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </h2>

                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={handlePasswordChange('newPassword')}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange('confirmPassword')}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  } text-white`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
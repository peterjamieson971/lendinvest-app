import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { LogIn, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the page they tried to visit, or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      // Redirect to the page they tried to visit or home
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/shutterstock_2599873053.jpg"
          alt="Modern Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/20 to-[#0A1628]/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <h2 className="text-4xl font-bold mb-4">Transform Your Property Investment</h2>
            <p className="text-lg text-white/90">Secure, professional lending solutions for modern investors</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Smart Financing</h3>
                <p className="text-white/80 text-sm">Competitive rates tailored to your investment goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <img
                src="https://cdn.mortgagestrategy.co.uk/content/uploads/2016/05/LendInvest-logo--768x270.gif"
                alt="LendInvest"
                className="h-12"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    const fallback = document.createElement('div');
                    fallback.className = 'text-4xl font-bold text-[#0A1628]';
                    fallback.textContent = 'LendInvest';
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">Welcome Back</h1>
            <p className="text-[#64748B]">Sign in to access your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@home.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                icon={<LogIn />}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-center space-y-3">
                <button
                  type="button"
                  className="text-sm text-[#64748B] hover:text-[#0A1628] transition-colors"
                  onClick={() => navigate('/')}
                >
                  ← Back to Home
                </button>
                <p className="text-sm text-[#64748B]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/demo-info')}
                    className="text-[#FFB800] hover:text-[#E5A600] font-semibold transition-colors"
                  >
                    Start Application
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

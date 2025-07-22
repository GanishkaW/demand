import { useState } from 'react';
import { Eye, EyeOff, Apple, TrendingUp, Shield, Zap, Users, Star } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

type AuthMode = 'signin' | 'signup';

// // Mock components - replace with your actual components
// const SignIn = () => (
//   <div className="space-y-4">
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//       <input 
//         type="email" 
//         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         placeholder="Enter your email"
//       />
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//       <div className="relative">
//         <input 
//           type="password" 
//           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           placeholder="Enter your password"
//         />
//         <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
//       </div>
//     </div>
//     <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
//       Sign In
//     </button>
//   </div>
// );

// const SignUp = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => (
//   <div className="space-y-4">
//     <div className="grid grid-cols-2 gap-3">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//         <input 
//           type="text" 
//           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           placeholder="John"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//         <input 
//           type="text" 
//           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//           placeholder="Doe"
//         />
//       </div>
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//       <input 
//         type="email" 
//         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         placeholder="john@example.com"
//       />
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//       <input 
//         type="password" 
//         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         placeholder="Create a strong password"
//       />
//     </div>
//     <button 
//       onClick={onSignUpSuccess}
//       className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//     >
//       Create Account
//     </button>
//   </div>
// );

export default function Landing() {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');

  const handleSignUpSuccess = () => {
    setAuthMode('signin');
  };

  const features = [
    { icon: TrendingUp, title: 'Smart Analytics', desc: 'AI-powered demand forecasting' },
    { icon: Shield, title: 'Waste Reduction', desc: 'Minimize inventory waste by 40%' },
    { icon: Zap, title: 'Real-time Data', desc: 'Live market insights & trends' },
    { icon: Users, title: 'Team Collaboration', desc: 'Seamless team management' }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '40%', label: 'Waste Reduced' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between min-h-screen">
          
          {/* Left Side - Content */}
          <div className="flex-1 max-w-2xl pr-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-2xl">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                FruitFlow
              </span>
            </div>

            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Smart Juice Bar
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Management
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your juice bar with AI-powered demand forecasting. Reduce waste, optimize inventory, 
                and maximize profits with data-driven insights.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex gap-4 mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Get Started Free
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300 group">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex-shrink-0 w-96">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Auth Toggle */}
              <div className="p-8 pb-0">
                <div className="bg-gray-100 p-1 rounded-2xl mb-6">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => setAuthMode('signin')}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        authMode === 'signin'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthMode('signup')}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        authMode === 'signup'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {authMode === 'signin' ? 'Welcome Back!' : 'Join FruitFlow'}
                  </h2>
                  <p className="text-gray-600">
                    {authMode === 'signin' 
                      ? 'Sign in to your account to continue' 
                      : 'Create your account and start optimizing'
                    }
                  </p>
                </div>
              </div>

              {/* Auth Forms */}
              <div className="px-8 pb-8">
                {authMode === 'signin' ? (
                  <SignIn />
                ) : (
                  <SignUp onSignUpSuccess={handleSignUpSuccess} />
                )}

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-600">Or continue with</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-700">Twitter</span>
                    </button>
                  </div>
                </div>

                {/* Footer Text */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    {authMode === 'signin' 
                      ? "Don't have an account? Switch to Sign Up above"
                      : "Already have an account? Switch to Sign In above"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Trusted by 10,000+ juice bars worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
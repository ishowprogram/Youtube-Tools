import React, { useState } from 'react';
import { LogIn, UserPlus, X } from 'lucide-react';

interface AuthButtonsProps {
  isDark: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isDark }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const Modal: React.FC<{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }> = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className={`relative w-full max-w-md p-6 rounded-xl shadow-xl ${
          isDark 
            ? 'bg-[#1a1a3a] border border-indigo-900/30' 
            : 'bg-white/90 backdrop-blur-sm border border-indigo-100'
        }`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-indigo-600/20 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-indigo-400 to-purple-400' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
          } bg-clip-text text-transparent`}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    );
  };

  const SignInForm = () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Email
        </label>
        <input
          type="email"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#0a0a1f] border-indigo-900/30 focus:border-indigo-500' 
              : 'bg-white border-indigo-100 focus:border-indigo-500'
          } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Password
        </label>
        <input
          type="password"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#0a0a1f] border-indigo-900/30 focus:border-indigo-500' 
              : 'bg-white border-indigo-100 focus:border-indigo-500'
          } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] ${
          isDark
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white'
        }`}
      >
        Sign In
      </button>
    </form>
  );

  const SignUpForm = () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Email
        </label>
        <input
          type="email"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#0a0a1f] border-indigo-900/30 focus:border-indigo-500' 
              : 'bg-white border-indigo-100 focus:border-indigo-500'
          } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Password
        </label>
        <input
          type="password"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#0a0a1f] border-indigo-900/30 focus:border-indigo-500' 
              : 'bg-white border-indigo-100 focus:border-indigo-500'
          } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          placeholder="Create a password"
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Confirm Password
        </label>
        <input
          type="password"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#0a0a1f] border-indigo-900/30 focus:border-indigo-500' 
              : 'bg-white border-indigo-100 focus:border-indigo-500'
          } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          placeholder="Confirm your password"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] ${
          isDark
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white'
        }`}
      >
        Create Account
      </button>
    </form>
  );

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setShowSignIn(true)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            isDark
              ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400'
              : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
          }`}
        >
          <LogIn size={18} />
          <span className="hidden sm:inline">Sign In</span>
        </button>
        <button
          onClick={() => setShowSignUp(true)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            isDark
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white'
          }`}
        >
          <UserPlus size={18} />
          <span className="hidden sm:inline">Sign Up</span>
        </button>
      </div>

      <Modal
        title="Sign In"
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      >
        <SignInForm />
      </Modal>

      <Modal
        title="Create Account"
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
      >
        <SignUpForm />
      </Modal>
    </>
  );
};

export default AuthButtons;
// src/components/LoginCard.tsx
import { useState } from 'react';

export default function LoginCard() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'login' ? 'Login to FruitFlow' : 'Create an Account'}
      </h2>

      <form className="space-y-4">
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-emerald-400 hover:to-blue-400 transition-colors"
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => setMode('signup')}
              className="text-emerald-500 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setMode('login')}
              className="text-emerald-500 font-semibold hover:underline"
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}

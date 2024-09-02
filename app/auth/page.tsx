"use client"

import React, { useState } from 'react';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <div className="toggle-link">
        {isSignUp ? (
          <p className='text-center pt-5'>
            Already have an account?{' '}
            <button onClick={toggleForm} className="link-button">
              Sign In
            </button>
          </p>
        ) : (
          <p className='items-center pt-5'>
            Don&apos;t have an account?{' '}
            <button onClick={toggleForm} className="link-button">
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

"use client"

import React, { useState } from 'react';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-page flex flex-col items-center justify-center min-h-screen">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <div className="toggle-link">
        {isSignUp ? (
          <Label className='text-center pt-5'>
            Already have an account?{' '}
            <Button onClick={toggleForm} className="link-button">
              Sign In
            </Button>
          </Label>
        ) : (
          <Label  className='items-center pt-5'>
            Don&apos;t have an account?{' '}
            <button onClick={toggleForm} className="link-button">
              Sign Up
            </button>
          </Label>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

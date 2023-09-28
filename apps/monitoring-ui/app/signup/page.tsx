import React from 'react';
import SignInForm from '../components/SignInForm';
import Link from 'next/link';
import { setCookie } from '../../libs/set-cookie';
import { NextPage } from 'next';

const SignupPage: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <div className="z-10 max-w-5xl w-full items-center justify-center lg:flex">
        <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up for an account
            </h1>
            <SignInForm setToken={setCookie} />
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Back To Login{' '}
              <Link href="/login" className="link link-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;

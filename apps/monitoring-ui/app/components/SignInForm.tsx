'use client';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignIn } from '../../models/SignIn';

const SignInForm: React.FC<{
  signingAction: (params: SignIn) => Promise<SignIn>;
  buttonName: string;
}> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [isLoading, setLoading] = useState(false);

  const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError({ isError: false, message: '' });
    const { username, password } = user;
    try {
      const result = await props.signingAction({ username, password });
      const { accessToken } = result;
      if (accessToken) {
        router.push('/airinfo');
      } else {
        setLoading(false);
        setError({
          isError: false,
          message: 'User created successfully. Please go to Login!',
        });
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      setError({ ...error, isError: true });
    }
  };
  return (
    <div>
      {error.isError && (
        <div className="alert alert-error mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Invalid Credentials.</span>
        </div>
      )}
      {!error.isError && error.message && (
        <div className="alert alert-success mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            className={`w-full p-2 text-black dark:text-white border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 dark:bg-gray-800 dark:border-gray-700 dark:caret-white`}
            id="username"
            placeholder="Your Username"
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className={`w-full p-2 text-black dark:text-white border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 dark:bg-gray-800 dark:border-gray-700 dark:caret-white`}
            id="password"
            placeholder="Your Password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center items-center mt-6">
          {!isLoading && (
            <button className="btn btn-primary btn-wide">
              {props.buttonName}
            </button>
          )}
          {isLoading && (
            <button className="btn btn-wide">
              <span className="loading loading-spinner"></span>
              loading
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

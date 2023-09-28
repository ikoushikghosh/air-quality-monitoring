'use client';
import React, { ChangeEvent, useState } from 'react';
import { post } from '../../libs/base-http-helper';
import { useRouter } from 'next/navigation';

const SignInForm: React.FC<{ setToken: (token: string) => void }> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [isError, setError] = useState(false);

  const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    const { username, password } = user;
    try {
      const result = await post('auth/signin', '', { username, password });
      const accessToken = result.data.accessToken;
      if (accessToken) {
        await props.setToken(accessToken);
      }

      router.push('/airinfo');
    } catch (ex) {
      console.log(ex);
      setError(true);
    }
  };
  return (
    <div>
      {isError && (
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
          <button className="btn btn-primary btn-wide">Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

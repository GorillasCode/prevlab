import React from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import FeedBack from '../../FeedBack';

import { prevlabAxiosInstace } from '../../../services/prevlabAxios';
export default function Login() {
  const router = useRouter();
  const email = React.useRef(null);
  const password = React.useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState({
    open: false,
    type: 'success',
    msg: 'feedback'
  });

  const handleLogin = async evt => {
    evt.preventDefault();
    setLoading(true);
    try {
      const loginResponse = await prevlabAxiosInstace.auth._adminLogin(
        email.current.value,
        password.current.value
      );
      if (loginResponse.data.error) {
        return setFeedback({
          open: true,
          type: 'error',
          msg: loginResponse.data.msg
        });
      }
      setFeedback({
        open: true,
        type: 'success',
        msg: 'Bem vindo!'
      });
      setCookie('userInfo', loginResponse.data.data);
      return router.push('/prevlab/admin/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 py-12 px-4 sm:px-6 lg:px-8 ">
      <FeedBack obj={feedback} close={setFeedback} />
      <div className="flex-1 max-w-md w-full space-y-8 ">
        <div className="flex flex-col items-center justify-center ">
          <div>
            <h2 className="text-7xl text-white font-semibold tracking-wide ">
              Prev<span className="text-7xl  font-thin">Lab</span>
            </h2>
          </div>
          <p className="text-white font-semibold">{`< Admin />`}</p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                ref={email}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-4 border border-transparent bg-green-700 placeholder-white text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-green-800 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <input
                ref={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-4 border border-transparent bg-green-700 placeholder-white text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-green-800 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

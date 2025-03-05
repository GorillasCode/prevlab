import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { prevlabAxiosInstace } from "../services/prevlabAxios";
import FeedBack from "../components/FeedBack";
export default function Login() {
  const email = React.useRef(null);
  const password = React.useRef(null);
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [feedback, setFeedback] = React.useState({
    open: false,
    type: "success",
    msg: "feedback",
  });

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const loginResponse = await prevlabAxiosInstace.auth._login(
        email.current.value,
        password.current.value
      );
      if (loginResponse.data.error) {
        return setFeedback({
          open: true,
          type: "error",
          msg: loginResponse.data.msg,
        }); 
      }
  
      setFeedback({
        open: true,
        type: "success",
        msg: "Bem vindo!",
      });
      setCookie("userInfo", loginResponse.data.data);
      return router.push("prevlab/users/dashboard");
    } catch (error) {
      console.log(error);
      setFeedback({
        open: true,
        type: "error",
        msg: "Email ou senha errados.",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <FeedBack obj={feedback} close={setFeedback} />
      <div className="flex-1 max-w-md w-full space-y-8 ">
        <div className="flex flex-col items-center justify-center ">
          <div>
            <Image src={`/PREVLAB.png`} width={175} height={100} />
          </div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-600 ">
              Entre com sua conta
            </h2>
          </div>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                ref={email}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>

              <input
                ref={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          <div className="flex items-center justify-between"></div>

          <div>
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-green-500 group-hover:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Logar
            </button>
          </div>
        </form>
        <div className="text-sm ">
          <a href="prevlab/admin/login" className="font-medium text-green-600 ">
            Entrar como administrador.
          </a>
        </div>
      </div>
    </div>
  );
}

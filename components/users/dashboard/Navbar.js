import React from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Profile as ProfileSVG } from "../../svgs";
import { DashboardUsersContext } from "../../../context/userContext";

const navigation = ["Dashboard"];
const profile = ["Perfil", "Configurações", "Sair"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const router = useRouter();
  const [userDashContext, setUserDashContext] = React.useContext(
    DashboardUsersContext
  );
  const [cookies, setCookie, removeCookie] = useCookies();

  const singOut = () => {
    removeCookie("userInfo");
    return router.push("/");
  };

  const profileActions = async (actionType) => {
    switch (actionType) {
      case "Sair":
        return singOut();

      default:
        break;
    }
  };

  const changeContext = (appTitle) => {
    setUserDashContext({ app: appTitle });
  };

  return (
    <Disclosure as="nav" className="bg-green-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div>
                    <h2 className="text-3xl text-white font-semibold tracking-wide ">
                      Prev<span className="text-3xl  font-thin">Lab</span>
                    </h2>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item, itemIdx) =>
                      item === userDashContext.app ? (
                        <Fragment key={item}>
                          {/* Current: "bg-green-900 text-white", Default: "text-green-300 hover:bg-green-700 hover:text-white" */}
                          <button
                            // href="#"
                            className="bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => changeContext(item)}
                          >
                            {item}
                          </button>
                        </Fragment>
                      ) : (
                        <button
                          key={item}
                          onClick={() => changeContext(item)}
                          className="text-green-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="bg-green-800 p-1 rounded-full text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                  <p className="text-white px-3 py-2 rounded-md text-sm font-medium ">
                    {userDashContext.email}
                  </p>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-green-800 rounded-full flex items-center text-sm focus:outline-none   focus:ring-offset-green-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <ProfileSVG />
                            {/* <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          /> */}
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {profile.map((item) => (
                              <Menu.Item key={item}>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-green-100" : "",
                                      "block px-4 py-2 text-sm text-green-700"
                                    )}
                                    onClick={() => profileActions(item)}
                                  >
                                    {item}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-green-800 inline-flex items-center justify-center p-2 rounded-md text-green-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>

                  <MenuIcon />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item}>
                    {/* Current: "bg-green-900 text-white", Default: "text-green-300 hover:bg-green-700 hover:text-white" */}
                    <button
                      className="bg-green-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => changeContext(item)}
                    >
                      {item}
                    </button>
                  </Fragment>
                ) : (
                  <button
                    key={item}
                    onClick={() => changeContext(item)}
                    className="text-green-300 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <div className="pt-2 pb-3 border-t border-green-700">
              <div className="flex mt-0 px-2">
                <div className="flex flex-col space-y-1 w-1/2">
                  {profile.map((item) => (
                    <button
                      key={item}
                      onClick={() => profileActions(item)}
                      className="w-1/2 px-3 py-2 rounded-md text-base font-medium text-green-400 hover:text-white hover:bg-green-700"
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="w-1/2">
                  <p className="block px-48 py-2 text-base font-medium text-white">
                    {userDashContext.email}
                  </p>
                </div>


              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

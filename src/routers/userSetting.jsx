import UserSetting from "/pages/UserSetting";
import Account from "/pages/UserSetting/Account";
import Profile from "/pages/UserSetting/Profile";
import { defer, redirect, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "/api";

const userSettingLoader = async function () {
  const id = localStorage.getItem("userId");
  return defer({ user: getUserById(id) });
};

export default [
  {
    path: "/:workspaceId?/UserSetting",
    element: <UserSetting />,
    children: [
      {
        index: true,
        element: <Account />,
        loader: userSettingLoader,
      },
      {
        path: "Profile",
        element: <Profile />,
        loader: userSettingLoader,
      },
    ],
  },
];

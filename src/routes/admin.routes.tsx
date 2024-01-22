import { NavLink } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { ReactNode } from "react";

interface TRoute {
  path?: string;
  element?: JSX.Element;
}

type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export const AdminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];

// sidebars menus
export const adminSidebarItems: TSidebarItem[] = AdminPath.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.element) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);
// console.log(JSON.stringify(newArr));

// routes
export const adminRoutes = AdminPath.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  // console.log(item.path);

  if (item.children) {
    item.children.forEach((child) => {
      if (child.path && child.element) {
        acc.push({
          path: child.path,
          element: child.element,
        });
      }
    });
  }

  return acc;
}, []);
// console.log(newArr);

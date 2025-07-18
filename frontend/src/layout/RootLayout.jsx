import { Outlet } from "@tanstack/react-router";

export default function RootLayout({ children }) {
  return (
    <div>
      {/* <header className="p-4 bg-gray-100">🌐 Global Header</header> */}
      <>{children || <Outlet />}</>
    </div>
  );
}

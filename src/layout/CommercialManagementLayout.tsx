import { Link, Outlet, useLocation } from "react-router";

export const CommercialManagementLayout = () => {
  const location = useLocation();
  const { pathname } = location;

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="flex flex-col w-full md:w-[950px] mx-auto shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <header className="bg-[#1E68CA] text-white text-xl font-bold px-4 py-2">
        Sistema de Gestión Comercial
      </header>
      <nav className="px-7 py-3">
        <div className="flex ">
          <Link
            to="/gestion-comercial"
            className={`hover:text-[#1E68CA] hover:font-bold transition-all w-[10%] text-left ${
              isActive("/gestion-comercial") &&
              !isActive("/gestion-comercial/avisos-debito") &&
              !isActive("/gestion-comercial/anticipos")
                ? "text-[#1E68CA] font-bold"
                : "text-[#808080]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/gestion-comercial/avisos-debito"
            className={`hover:text-[#1E68CA] hover:font-bold transition-all w-[23%] text-center ${
              isActive("/gestion-comercial/avisos-debito")
                ? "text-[#1E68CA] font-bold"
                : "text-[#808080]"
            }`}
          >
            Avisos de Débito
          </Link>
          <Link
            to="/gestion-comercial/anticipos"
            className={`hover:text-[#1E68CA] hover:font-bold transition-all w-[15%] text-left ${
              isActive("/gestion-comercial/anticipos")
                ? "text-[#1E68CA] font-bold"
                : "text-[#808080]"
            }`}
          >
            Anticipos
          </Link>
        </div>
      </nav>
      <div className="flex-1 px-7 py-3">
        <Outlet />
      </div>
    </div>
  );
};

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { CommercialManagementLayout } from "../layout/CommercialManagementLayout";
import { DebitNoticesPage } from "../pages/DebitNoticesPage";
import { AdvancesPage } from "../pages/AdvancesPage";
import { DebitNoticeDetailPage } from "../pages/DebitNoticeDetailPage";
import { DebitNoticeCreate } from "../pages/DebitNoticeCreatePage";

export const Root = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/gestion-comercial" replace />} />

          <Route
            path="gestion-comercial"
            element={<CommercialManagementLayout />}
          >
            <Route index element={<p>DashBoard</p>} />
            <Route path="avisos-debito" element={<DebitNoticesPage />} />
            <Route
              path="avisos-debito/:nAviso"
              element={<DebitNoticeDetailPage />}
            />
            <Route path="anticipos" element={<AdvancesPage />} />
            <Route path="debitNoticeCreate" element={<DebitNoticeCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

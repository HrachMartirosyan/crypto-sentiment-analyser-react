import { FC } from "react";

import { MainLayout } from "../components/Layouts";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserQuery } from "../tanstack";
import { Loading } from "../components/Feedback";
import { useCompanyListQuery } from "../tanstack/company.query.tsx";

type Props = NonNullable<unknown>;

export const RootPage: FC<Props> = () => {
  const { isLoading, data: user } = useUserQuery();
  const { data: companies } = useCompanyListQuery();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (companies?.data?.[0] && location.pathname === "/") {
    return <Navigate to={`/analytics/${companies?.data[0].slug}`} />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

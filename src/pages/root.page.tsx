import { FC } from "react";

import { MainLayout } from "../components/Layouts";
import { Navigate, Outlet } from "react-router-dom";
import { useUserQuery } from "../tanstack";
import { Loading } from "../components/Feedback";

type Props = NonNullable<unknown>;

export const RootPage: FC<Props> = () => {
  const { isLoading, data: user } = useUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

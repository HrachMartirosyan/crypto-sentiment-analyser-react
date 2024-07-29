import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { BaseProvider } from "book-ui";

import { RootPage } from "./pages/root.page.tsx";
import { ErrorPage } from "./pages/error.page.tsx";
import { AnalyticsPage } from "./pages/Analytics/analytics.page.tsx";
import { HelpPage } from "./pages/help.page.tsx";
import { SignInPage } from "./pages/SignIn/SignIn.page.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./tanstack";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SignUpPage } from "./pages/SignUp/SignUp.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AnalyticsPage />,
      },
      {
        path: "/help",
        element: <HelpPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <BaseProvider Link={Link}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
      </CookiesProvider>
    </BaseProvider>
  );
}

export default App;

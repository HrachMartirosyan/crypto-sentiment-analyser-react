import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { BaseProvider } from "book-ui";

import { RootPage } from "./pages/Root.page.tsx";
import { ErrorPage } from "./pages/Error/Error.page.tsx";
import { AnalyticsPage } from "./pages/Analytics/Analytics.page.tsx";
import { AboutContentAndCommentsPage } from "./pages/AboutContentAndComments/AboutContentAndComments.page.tsx";
import { SignInPage } from "./pages/SignIn/SignIn.page.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./tanstack";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SignUpPage } from "./pages/SignUp/SignUp.page.tsx";
import { AboutSentimentAnalysisPage } from "./pages/AboutSentimentAnalysis/AboutSentimentAnalysis.page.tsx";
import { AccessibilityPage } from "./pages/Accessibility/Accessibility.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "analytics/:companyId",
        element: <AnalyticsPage />,
      },
      {
        path: "/about-sentiment-analysis",
        element: <AboutSentimentAnalysisPage />,
      },
      {
        path: "/about-content-and-comments",
        element: <AboutContentAndCommentsPage />,
      },
      {
        path: "/accessibility",
        element: <AccessibilityPage />,
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </BaseProvider>
  );
}

export default App;

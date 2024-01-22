import { Suspense, lazy } from "react";
import Products from "@/components/products";
import Banner from "@/components/banner";
import BannerSkeleton from "@/components/common/skeleton/banner";
import ProductsSkeleton from "@/components/common/skeleton/products";
import MainSpinner from "@/components/common/skeleton/main";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBannerFallback from "@/components/common/error/banner";
import {
  // QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";

const Layout = lazy(() => import("@/components/common/layout/index"));

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={<MainSpinner />}>
      <Layout>
        <div className="flex flex-col gap-4">
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(props) => <ErrorBannerFallback {...props} />}
          >
            <Suspense fallback={<BannerSkeleton />}>
              <Banner />
            </Suspense>
          </ErrorBoundary>
          {/* <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorBannerFallback {...props} />}
              >
                <Suspense fallback={<BannerSkeleton />}>
                  <Banner />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary> */}
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(props) => <ErrorBannerFallback {...props} />}
          >
            <Suspense
              fallback={
                <div className="flex flex-col gap-4">
                  <ProductsSkeleton />
                  <ProductsSkeleton />
                  <ProductsSkeleton />
                </div>
              }
            >
              <Products />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Layout>
    </Suspense>
  );
}

export default App;

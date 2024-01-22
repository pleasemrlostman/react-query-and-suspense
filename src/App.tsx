import { Suspense, lazy } from "react";
import Products from "@/components/products";
import Banner from "@/components/banner";
import BannerSkeleton from "@/components/common/skeleton/banner";
import ProductsSkeleton from "@/components/common/skeleton/products";
import MainSpinner from "@/components/common/skeleton/main";
import {
  CriticalErrorBoundary,
  RetryErrorBoundary,
} from "@/components/common/error";

const Layout = lazy(() => import("@/components/common/layout/index"));

function App() {
  return (
    <CriticalErrorBoundary>
      <Suspense fallback={<MainSpinner />}>
        <Layout>
          <div className="flex flex-col gap-4">
            <RetryErrorBoundary>
              <Suspense fallback={<BannerSkeleton />}>
                <Banner />
              </Suspense>
            </RetryErrorBoundary>
            <RetryErrorBoundary>
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
            </RetryErrorBoundary>
            {/* <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallbackComponent {...props} />}
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
            </ErrorBoundary> */}
          </div>
        </Layout>
      </Suspense>
    </CriticalErrorBoundary>
  );
}

export default App;

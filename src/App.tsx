import { Suspense, lazy } from "react";
import Products from "@/components/products";
import Banner from "@/components/banner";
import BannerSkeleton from "@/components/common/skeleton/banner";
import ProductsSkeleton from "@/components/common/skeleton/products";
import MainSpinner from "@/components/common/skeleton/main";

const Layout = lazy(() => import("@/components/common/layout/index"));

function App() {
  return (
    <Suspense fallback={<MainSpinner />}>
      <Layout>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<BannerSkeleton />}>
            <Banner />
          </Suspense>
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
        </div>
      </Layout>
    </Suspense>
  );
}

export default App;

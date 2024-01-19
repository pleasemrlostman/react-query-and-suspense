import { Suspense, lazy } from "react";
import Products from "@/components/products";
import Banner from "@/components/banner";

const Layout = lazy(() => import("./components/common/layout/index"));

function App() {
  return (
    <Suspense fallback={<div>로딩중.....</div>}>
      <Layout>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<div>이미지 로딩중.....</div>}>
            <Banner />
          </Suspense>
          <Suspense fallback={<div>프로덕트 로딩중.....</div>}>
            <Products />
          </Suspense>
        </div>
      </Layout>
    </Suspense>
  );
}

export default App;

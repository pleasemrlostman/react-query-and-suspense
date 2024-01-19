import { Suspense, lazy } from "react";
// import Layout from "@/components/common/layout";
const Layout = lazy(() => import("./components/common/layout/index"));

function App() {
  return (
    <Suspense fallback={<div>로딩중.....</div>}>
      <Layout>
        <h1 className="text-8xl text-red-400">hello world</h1>
      </Layout>
    </Suspense>
  );
}

export default App;

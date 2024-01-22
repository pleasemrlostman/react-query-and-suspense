# 리액트 쿼리 / 서스펜스 / 에러 바운더리

## 학습 목적

`react`에서 제공하는 `suspense`기능과 `v5` 버전으로 변경 후 `react-query`에서 제공하는 `useSuspenseQuery` `hook`을 이용하여 조금 더 선언적인 코드를 작성하기 위한 목적을 위해 학습함. 추가적으로 `Error Boundary` 컴포넌트를 활용해 에러 핸들링을 선언적으로 변경하는 것을 학습 목적으로 함

## 기획

`fake store api` 와 `unsplash api` 를 이용해 다수의 `api` 요청을 하여 `api` 요청을 하는 컴포넌트 마다 `skleton` 및 `error handling` 을 선언적 코드로 작성함

## Error Boundary

### 정의

`Error Boundary`는 `React v16` 에서 도입된 에러를 제어하는 합성 컴포넌트다. `Error Boundary`는 하위 컴포넌트 트리에서 발생하는 자바 스크립트 에러를 기록하고 에러가 발생한 컴포넌트 대신 (에러가 발생한이란 의미가 중요) `fallback UI`를 보여준다

> fallback
> 어떤 기능이 제대로 동작하지 않을 때, 이에 대처하는 기능 또는 동작을 말한다. 실패에 대해서 후처리를 위해 설정해 두는 것을 의미한다.

즉 특정 컴포넌트에서 JS에러가 발생했을 때 전체 애플리케이션이 중단되는 것을 방지하고 에러가 발생한 특정 컴포넌트 대신 `fallback UI`를 보여주는 기능이다.

`Error Boundary` 컴포넌트는 생명주기 메서드 (`getDerivedStateFromError`, `componentDidCatch` )를 사용해야해서 클래스 컴포넌트로 작성이 불가능하다. 이러한 이유로 React 공식 문서에서도 `react-error-boundary` 라이브러리르 사용하는 것을 권장하고 있으니 안심하고 사용하자.

`Error Boundary` 컴포넌트를 사용하면 렌더링시 발생하는 에러 처리를 명령형이 아닌 선언형으로 제어할 수 있다.

> 다른 블로그 아티클을 참조해보면 `throwOnError` 값을 true로 변경해줘야 발생하는 에러가 `ErrorBoundary` 컴포넌트까지 전달된다고 한다. 하지만 정작 낸가 작성한 코드에서는 해당 프로퍼티를 추가 안해줘도 에러가 잘 전달되고있어서 해당 부분은 더 공부가 필요해보인다.

```tsx
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      return error;
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      return error;
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: false,
      // throwOnError: true,
    },
  },
});
```

### Error Boundary 적용하기

react-query로 데이터를 받아오고 있는 컴포넌트를 `ErrorBoundary` 컴포넌트로 감싸준다.

```tsx
import { Suspense, lazy } from "react";
import Products from "@/components/products";
import Banner from "@/components/banner";
import BannerSkeleton from "@/components/common/skeleton/banner";
import ProductsSkeleton from "@/components/common/skeleton/products";
import MainSpinner from "@/components/common/skeleton/main";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBannerFallback from "@/components/common/error/banner";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

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
        </div>
      </Layout>
    </Suspense>
  );
}

export default App;
```

나는 `ErrorBoundary` 컴포넌트에서 `const { reset } = useQueryErrorResetBoundary();` 의 `reset` 을 가져와 전달해 주었지만

```tsx
<QueryErrorResetBoundary>
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
</QueryErrorResetBoundary>
```

이런 방식으로 사용해도 상관없다

### fallback Ul

이후 `ErrorBoundary` 컴포넌트에서 `fallbackRender` 프롭스에 보여주고 싶은 `UI`를 넣어주면된다. 나는 여기서 몇몇 문제가 발생했는데 우선 `fallback UI` 를 전달해주는 정확한 `props`의 이름은 `fallbackRender`이다 해당 값에 내가 전달해주고 싶은 `UI` 컴포넌트를 전달해주면 되는데

`<ErrorBoundary fallbackRender={<ErrorBannerFallback />}`

이렇게만 넣어주면 `ErrorBoundary`가 전달해주는 `error` 값과 `resetErrorBoundary` 값을 props로 전달받지 못한다. 그러므로 아래 코드 처럼 전달해줘야 `fallback UI` 가 `ErrorBoundary`가 전달하는 값을 받을 수 있다.

`<ErrorBoundary fallbackRender={(props) => <ErrorBannerFallback {...props} />} />`

여기서 `react-query`가 대단한점은 `resetErrorBoundary` 값이 에러가 발생한 쿼리를 재실행 시킬수 있다는 점이다.

```tsx
import { AxiosError } from "axios";

const ErrorBannerFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: AxiosError;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="w-full p-4 border flex gap-4 flex-col items-center">
      <p> 에러: {error.code} </p>
      <button
        className="py-2 px-4 border rounded-md text-sm bg-blue-400 border-blue-400 hover:bg-blue-600 hover:border-blue-600 text-white"
        onClick={() => resetErrorBoundary()}
      >
        다시 시도
      </button>
    </div>
  );
};

export default ErrorBannerFallback;
```

아마 내부적으로 연결되어서 해당 함수를 호출하면 query를 다시 요청시키는 즉 `retry`와 같은 비슷한 기능을 하여 선언형으로 코드를 쉽게 짤 수 있는 장점이 존재한다.

아마도 그러한 기능은 `const { reset } = useQueryErrorResetBoundary();`을 통해 값을 전달해서 사용할 수 있을것이라 추측되서 내부 코드를 학습할 필요가 있어보인다.

### 차이점

기존의 프로젝트에서는 에러 핸들링을 `react-query`단에서 하지않고 `axios` `response`에서 에러 핸들링을 수행했다.

또한 위 코드처럼 선언적으로 코드를 작성하지 않고 `useQuery`가 return하는 `isError` 값을 이용해 명령형으로 코드를 작성했다.

그리고 모든 컴포넌트 마다 이러한 로직을 추가해줘야 했는데 `ErrorBoundary` 컴포넌트를 이용해서 이러한 로직을 쉽게 구현할 수 있는것 같다.

## 이슈

### 갑작스러운 502 Error

잘 작동하던 `fakeStore` 가 갑자기 502에러가 발생했다. 아마도 `api` 자체에서 이슈가 생긴 이슈인데 강제적으로 내가 발생 시킨 `4xx` 에러만 처리할 수 있었는데 오히려 `5xx` 서버측 에러를 컨트롤 해볼 수 있는 좋은 기회가 생겼다.

```

```

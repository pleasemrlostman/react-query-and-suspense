import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Layout from "../layout";

const RetryErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={(props) => <ErrorFallbackComponent {...props} />}
      onError={(props) => {
        const error = props as AxiosError;
        console.log("props", error.code);
        if (error.message === "Network Error") {
          throw error;
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const CriticalErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={() => <CriticalErrorFallbackComponent />}
      onError={(props) => {
        const error = props as AxiosError;
        if (error.message !== "Network Error") {
          throw error;
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorFallbackComponent = ({
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
        재시도
      </button>
    </div>
  );
};

const CriticalErrorFallbackComponent = () => {
  return (
    <Layout className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <p>일시적인 오류로 인해</p>
          <p>서비스 연결이 되지 않습니다.</p>
          <p>나중에 다시 시도해 주세요.</p>
        </div>
        <button
          className="py-2 px-4 border rounded-md text-sm bg-blue-400 border-blue-400 hover:bg-blue-600 hover:border-blue-600 text-white"
          onClick={() => {
            window.location.reload();
          }}
        >
          재시도
        </button>
      </div>
    </Layout>
  );
};

export { CriticalErrorBoundary, RetryErrorBoundary, ErrorFallbackComponent };

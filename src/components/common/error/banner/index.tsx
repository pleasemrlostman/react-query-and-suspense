import { AxiosError } from "axios";

const ErrorBannerFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: AxiosError;
  resetErrorBoundary: () => void;
}) => {
  console.log("error boundary", error);

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

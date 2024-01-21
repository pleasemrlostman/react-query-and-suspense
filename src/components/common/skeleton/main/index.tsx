import ClipLoader from "react-spinners/ClipLoader";

const MainSpinner = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-center p-4 border min-w-[20rem] w-3/4 m-auto">
        <ClipLoader
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default MainSpinner;

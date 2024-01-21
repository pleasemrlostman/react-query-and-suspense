import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="rounded-full w-12 h-12" />
      <Skeleton className="w-[calc(100%-48px)] h-12" />
    </div>
  );
};

export default ProductsSkeleton;

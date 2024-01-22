import { Product } from "@/@types/products";
import { useGlobalSuspenseQuery } from "@/hooks/react-query";

const Products = () => {
  const { data } = useGlobalSuspenseQuery<object, Product[]>({
    URL: "products",
    key: "products",
  });

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {data.map((value) => {
        return (
          <div key={value.id} className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src={value.image}
              alt={value.id.toString()}
            />
            <h4>{value.title}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Products;

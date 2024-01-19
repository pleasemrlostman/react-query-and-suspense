import { Product } from "@/@types/products"
import { useGlobalSuspenseQuery } from "@/hooks/react-query"

const Products = () => {

const { data } = useGlobalSuspenseQuery<{}, Product[]>({
    URL: "products",
    key: "products",
}) 
    
    return <div>
        {data.map((value)=> {
            return (
                <div key={value.id}>
                    <h4>{value.title}</h4>
                </div>
            )
        })}
        </div>
}

export default Products
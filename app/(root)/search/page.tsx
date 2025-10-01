import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";
import { ProductTypes } from "@/types";

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  //localhost:3000/search?category=Laptop&q=Macbook+Pro+M1&price=4&rating=4.5&sort=newest&page=1
  // console.log(q, category, price, rating, sort, page);

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}
        <div className="text-xl mb-2 mt-3">Department</div>
        <div></div>
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => {
            const cleanedProduct: ProductTypes = {
              ...product,
              banner: product.banner ?? "",
              price:
                typeof product.price === "string"
                  ? product.price
                  : String(product.price),
              rating:
                typeof product.rating === "string"
                  ? product.rating
                  : String(product.rating),
              createdAt:
                typeof product.createdAt === "string"
                  ? product.createdAt
                  : product.createdAt.toISOString(),
            };

            return <ProductCard key={product.id} product={cleanedProduct} />;
          })}
          {/* {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// import sampleData from "@/db/sample-data";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  const parseFeaturedProducts = featuredProducts.map((product) => ({
    ...product,
    price: parseFloat(product.price),
    rating: product.rating,
  }));

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={parseFeaturedProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  );
};

export default Homepage;

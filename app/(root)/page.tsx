// import sampleData from "@/db/sample-data";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  const parseFeaturedProducts = featuredProducts.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: product.rating.toString(),
  }));

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={parseFeaturedProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" />
      <ViewAllProductsButton />
      <IconBoxes />
    </>
  );
};

export default Homepage;

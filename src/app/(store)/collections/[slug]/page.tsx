import { getCollectionProducts } from "@/lib/dal";
import { ProductCard } from "@/components/product/product-card";

export default async function StoreCollectionsPage({ params }: PageProps<"/collections/[slug]">) {
	const { slug } = await params;
	const products = await getCollectionProducts(slug);

	return products.map((product) => <ProductCard key={product.id} product={product} />);
}

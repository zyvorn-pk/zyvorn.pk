import { LinkButton } from "@/components/ui/button";
import { ImageCarousel } from "@/components/store/home/image-carousel";
import { LatestProducts } from "@/components/store/home/latest-products";

export default function StoreHomePage() {
	return (
		<div className="container mx-auto flex flex-col gap-4 px-4">
			<ImageCarousel className="space-y-4" />
			<section className="space-y-6">
				<h1 className="text-left text-xl/9 font-semibold">Latest Products</h1>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					<LatestProducts />
				</div>
				<div className="flex justify-center">
					<LinkButton href="/collections/all" variant="outline">
						Show More
					</LinkButton>
				</div>
			</section>
		</div>
	);
}

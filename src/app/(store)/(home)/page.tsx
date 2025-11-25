import { ImageCarousel } from "@/components/store/home/image-carousel";

export default function HomePage() {
	return (
		<div className="container mx-auto flex flex-col gap-4 px-4">
			<ImageCarousel className="space-y-4" />
		</div>
	);
}

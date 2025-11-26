export default function StoreCollectionsLayout({ children }: LayoutProps<"/collections/[slug]">) {
	return (
		<div className="container mx-auto flex flex-col gap-4 px-4">
			<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{children}</div>
		</div>
	);
}

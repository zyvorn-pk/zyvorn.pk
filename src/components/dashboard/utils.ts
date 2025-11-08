import { sidebarRoutes } from "./routes";

export function getSidebarActiveItem(pathname: string) {
	let activeUrl = null;
	let maxLength = 0;

	const allUrls = sidebarRoutes.flatMap(({ menu }) => menu.map((item) => item.url));

	for (const url of allUrls) {
		if (pathname === url || pathname.startsWith(url + "/")) {
			if (url.length > maxLength) {
				maxLength = url.length;
				activeUrl = url;
			}
		}
	}

	return activeUrl;
}

export function getHeaderRoutes(pattern: string, path: string) {
	const patternSegments = pattern.split("/").filter(Boolean);
	const pathSegments = path.split("/").filter(Boolean);

	if (patternSegments.length !== pathSegments.length) return false;

	for (let i = 0; i < patternSegments.length; i++) {
		const patternSeg = patternSegments[i];
		const pathSeg = pathSegments[i];

		if (patternSeg !== pathSeg && !patternSeg.endsWith("Id")) {
			return false;
		}
	}

	return true;
}

import { base } from '$app/paths';

/**
 * Prepends the base path to a URL if needed
 * This is necessary for GitHub Pages deployment where the site is served from a subdirectory
 */
export function withBase(path: string): string {
	return `${base}${path}`;
}



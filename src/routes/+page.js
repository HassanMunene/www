import { site } from '$lib/js/site.js';

export function load() {
	return {
		meta: {
			title: site.name,
			description: site.description
		}
	};
}

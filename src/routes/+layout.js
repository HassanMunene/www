import { site } from '$lib/js/site.js';

export const prerender = true;

export const load = () => {
	return {
		meta: {
			title: site.name,
			description: site.description
		}
	};
};

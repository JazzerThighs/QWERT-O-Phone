

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.d3abf14b.js","_app/immutable/chunks/index.e8c503f9.js"];
export const stylesheets = ["_app/immutable/assets/0.02abe939.css"];
export const fonts = [];

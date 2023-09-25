

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.58243eb8.js","_app/immutable/chunks/index.e8c503f9.js","_app/immutable/chunks/index.28c22bee.js"];
export const stylesheets = ["_app/immutable/assets/2.eb3bf8c5.css"];
export const fonts = [];

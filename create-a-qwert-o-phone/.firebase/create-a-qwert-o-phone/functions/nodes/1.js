

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1a005a9f.js","_app/immutable/chunks/index.e8c503f9.js","_app/immutable/chunks/singletons.cebf1699.js","_app/immutable/chunks/index.28c22bee.js"];
export const stylesheets = [];
export const fonts = [];

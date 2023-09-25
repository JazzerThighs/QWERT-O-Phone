export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/AbrilFatface.ttf"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.e77ac43f.js","app":"_app/immutable/entry/app.de1d17bc.js","imports":["_app/immutable/entry/start.e77ac43f.js","_app/immutable/chunks/index.e8c503f9.js","_app/immutable/chunks/singletons.cebf1699.js","_app/immutable/chunks/index.28c22bee.js","_app/immutable/entry/app.de1d17bc.js","_app/immutable/chunks/index.e8c503f9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { env } from "node:process";

export default defineConfig({
	plugins: [
		...(env.BUILD_TYPE !== "vite" ? [sveltekit()] : []),
		dts({
			entryRoot: "src/lib",
		}),
	],
	...(env.BUILD_TYPE === "vite"
		? {
				build: {
					lib: {
						entry: "./src/lib/index.ts",
						formats: ["es"],
					},
					ssr: true,
					minify: false,
					rollupOptions: {
						output: {
							compact: false,
							preserveModules: true,
						},
					},
				},
		  }
		: {}),
});

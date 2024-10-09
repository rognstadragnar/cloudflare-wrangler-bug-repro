# Cloudflare Wrangler bug repro

A sub-dependency of Wrangler (`yoga-layout` used in `ink`) adds `process.on` listeners that re-throw errors.

This is an issue when using the the runtime APIs that Wrangler expose, rather than the CLI.

An example of this being an issue is in Astro when using the [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter with `platformProxy.enabled` as the listeners hijack Astro's own error handling and error overlay in certain cases.
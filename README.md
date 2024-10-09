# Cloudflare Wrangler bug repro

A sub-dependency of Wrangler (`yoga-layout` used in `ink`) adds `process.on` listeners that re-throw errors.

This is an issue when using the the runtime APIs that Wrangler expose, rather than the CLI.

An example of this being an issue is in Astro when using the [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter with `platformProxy.enabled` as the listeners hijack Astro's own error handling and error overlay in certain cases.

## Running the repro
```sh
npm install # or pnpm install
node index.js
```

One would expect that the handlers for `uncaughtException` and `unhandledRejection` defined in the example gets triggered, but that is not the case.

```sh
/node_modules/.pnpm/wrangler@3.80.2/node_modules/wrangler/wrangler-dist/cli.js:29768
            throw a;
            ^

Error: This is an error
    at file:///Users/ragnar.rognstad/Code/mock/wrangler-repro/index.js:17:7
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:483:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
```
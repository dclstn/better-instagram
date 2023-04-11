const ESBuild = require('esbuild');
const EsbuildPluginImportGlob = require('esbuild-plugin-import-glob');
const CSSModulesPlugin = require('esbuild-css-modules-plugin');
const package = require('./package.json');
const fs = require('fs/promises');

(async () => {
  console.log('Building: Extension');

  await ESBuild.build({
    entryPoints: ['./src/script'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome58', 'firefox57'],
    outdir: './public/build/',
    plugins: [EsbuildPluginImportGlob.default(), CSSModulesPlugin()],
  });

  console.log('Building: Manifest');

  const manifest = {
    manifest_version: 3,
    name: package.name,
    description: package.description,
    version: package.version,
    icons: {
      32: 'logo32.png',
      48: 'logo48.png',
      96: 'logo96.png',
      128: 'logo128.png',
    },
    content_scripts: [
      {
        matches: ['https://www.instagram.com/*'],
        js: ['./build/script.js'],
        run_at: 'document_start',
        world: 'MAIN',
      },
    ],
    host_permissions: ['https://www.instagram.com/*'],
  };

  await fs.writeFile('./public/manifest.json', JSON.stringify(manifest, null, 2));
})();

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(id, ...args) { return resolve.call(this, id.startsWith('@/') ? path.join(root, id.slice(2)) : id, ...args); };
for (const ext of ['.ts','.tsx']) require.extensions[ext] = (mod, filename) => mod._compile(transformSync(fs.readFileSync(filename,'utf8'), { filename, module:{type:'commonjs'}, jsc:{parser:{syntax:'typescript',tsx:filename.endsWith('.tsx')},transform:{react:{runtime:'automatic'}},target:'es2020'} }).code,filename);
test('all unrelated approved-base files and exact scoped source bytes remain intact', () => {
  const crypto = require('node:crypto');
  const baseline = require('./fixtures/mobile-actions-baseline.json');
  const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
  for (const [name, hash] of Object.entries(baseline.protected)) assert.equal(sha(fs.readFileSync(path.join(root,name))),hash,name);
  const preserved = require('./fixtures/preserved-files.json');
  for (const name of ['components/Header.tsx','app/globals.css']) {
    assert.equal(baseline.hashes[name],preserved[name]);
    require('./fixtures/mobile-actions-preservation.cjs').normalizeMobileActions(name,fs.readFileSync(path.join(root,name)));
  }
  assert.equal(sha(baseline.legacyFurniture),baseline.hashes.legacyFurniture);
});
test('real Header SSR exposes sibling mobile dock with exact two actions', () => {
  const { Header } = require('../components/Header.tsx');
  const { site } = require('../lib/site.ts');
  assert.ok(/^tel:\+\d+$/.test(site.phoneHref), 'native phone destination has expected format');
  const html = renderToStaticMarkup(React.createElement(Header));
  const dock = html.match(/<nav aria-label="Actions rapides"[\s\S]*?<\/nav>/);
  assert.ok(dock, 'mobile dock exists before opening menu');
  assert.ok(html.includes('</header>'+dock[0]), 'dock is header sibling, outside backdrop blur');
  const anchors = [...dock[0].matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(anchors.length,2);
  assert.equal(anchors[0][1],'/contact');
  assert.equal(anchors[1][1],site.phoneHref);
  assert.equal(anchors[0][2],'Devis');
  assert.equal(anchors[1][2].replace(/<[^>]+>/g,'').trim(),'Téléphone');
  assert.match(dock[0],/lg:hidden/);
});

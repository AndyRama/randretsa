const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Module = require('node:module');
const { transformSync } = require('next/dist/build/swc');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(id, ...args) { return resolve.call(this, id.startsWith('@/') ? path.join(root, id.slice(2)) : id, ...args); };
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(transformSync(fs.readFileSync(filename, 'utf8'), {
  filename, module: { type: 'commonjs' }, jsc: { parser: { syntax: 'typescript', tsx: filename.endsWith('.tsx') }, transform: { react: { runtime: 'automatic' } }, target: 'es2020' },
}).code, filename);
const fixtures = require('./fixtures/screenshots.json');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const text = html => normalize(html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
const ssr = element => renderToStaticMarkup(element);

test('FAQ supports real typed answers and preserves existing string consumers safely', () => {
  const { Faq } = require('../components/Faq.tsx');
  const pairs = [{ question: 'Une question ?', answer: 'Une réponse explicite et lisible.' }];
  const html = ssr(React.createElement(Faq, { items: pairs }));
  assert.ok(text(html).includes(pairs[0].answer));
  assert.ok(text(html).includes(pairs[0].question));
  assert.equal((html.match(/<details/g) || []).length, 1);
  assert.doesNotMatch(html, /<details[^>]*\sopen/);
  const old = ssr(React.createElement(Faq, { items: ['Question existante'] }));
  assert.ok(text(old).includes('Question existante'));
  assert.doesNotMatch(text(old), /à compléter|\[object Object\]/i);
});

for (const fixture of fixtures) test(`${fixture.slug}: complete source copy, answers, metadata, assets, links and review selection`, () => {
  const file = path.join(root, 'app', fixture.slug, 'page.tsx');
  assert.ok(fs.existsSync(file), `Missing service route /${fixture.slug}`);
  const { default: Page, metadata } = require(file);
  const { services } = require('../lib/services.ts');
  const service = services[fixture.slug];
  assert.ok(service, `Missing exported service ${fixture.slug}`);
  const html = ssr(React.createElement(Page)); const rendered = text(html);
  assert.equal((html.match(/<h1\b/g)||[]).length, 1);
  for (const copy of [fixture.title, fixture.intro, ...fixture.paragraphs, ...fixture.bullets, ...fixture.panels.flatMap(p=>[p.title,p.text]), ...fixture.questions]) assert.ok(rendered.includes(normalize(copy)), `Missing source text: ${copy}`);
  assert.equal(metadata.title, fixture.title);
  assert.equal(metadata.description, fixture.intro);
  assert.equal(service.faqs.length, fixture.questions.length);
  assert.deepEqual(service.faqs.map(f=>f.question), fixture.questions);
  for (const faq of service.faqs) {
    assert.ok(faq.answer.length > 35, `Non-substantive answer: ${faq.question}`);
    assert.ok(rendered.includes(faq.answer), `Missing FAQ answer: ${faq.question}`);
  }
  assert.equal((html.match(/<details/g)||[]).length, fixture.questions.length);
  assert.doesNotMatch(html, /<details[^>]*\sopen/);
  assert.doesNotMatch(rendered, /à compléter|réponse à venir|placeholder|TODO/i);
  const images = [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m=>{const url=new URL(m[1].replaceAll('&amp;','&'),'http://localhost');return url.searchParams.get('url')||url.pathname;});
  assert.ok(images.includes(fixture.image));
  for (const image of images) assert.ok(fs.existsSync(path.join(root,'public',image)),image);
  for (const slug of fixture.related) assert.ok(html.includes(`href="/${slug}"`));
  for (const target of ['/contact','/realisations']) assert.ok(html.includes(`href="${target}"`));
  assert.ok(rendered.includes("Un projet, une réparation : le plus simple est d'en parler."));
  assert.deepEqual(service.reviewKeys,fixture.reviewKeys);
  assert.equal((html.match(/<blockquote/g)||[]).length, fixture.reviewKeys.length);
  if (fixture.comparison !== null) {
    assert.ok(rendered.includes('Visuel comparatif statique'));
    assert.doesNotMatch(html,/type="range"|role="slider"/);
    assert.doesNotMatch(rendered,/glissez|faites glisser|déplacez le curseur/i);
    assert.ok(images.includes(fixture.comparison===0?'/images/avant-apres-porte.jpg':'/images/avant-apres-volets.jpg'));
  }
});

test('navigation: all six global destinations, unique metadata and old furniture related links are live routes', () => {
  const { prestations, nav, site } = require('../lib/site.ts');
  const { services } = require('../lib/services.ts');
  assert.equal(fixtures.length, 6);
  assert.deepEqual(Object.keys(services).sort(),fixtures.map(f=>f.slug).sort());
  assert.deepEqual(prestations.map(p=>p.href),fixtures.map(f=>`/${f.slug}`));
  assert.equal(new Set(Object.values(services).map(s=>s.title)).size,6);
  assert.equal(new Set(Object.values(services).map(s=>s.intro)).size,6);
  assert.ok(nav.some(p=>p.href==='/sur-mesure'));
  assert.ok(nav.some(p=>p.href==='/renovation'));
  const { Footer } = require('../components/Footer.tsx');
  const footer = ssr(React.createElement(Footer));
  for (const f of fixtures) assert.ok(footer.includes(`href="/${f.slug}"`));
  const Page = require('../app/sur-mesure/page.tsx').default;
  const html = ssr(React.createElement(Page)); const rendered=text(html);
  for (const slug of ['portes','volets','fenetres']) assert.ok(html.includes(`href="/${slug}"`));
  const meubles = fixtures.find(f=>f.slug==='meubles');
  for (const copy of [meubles.title,meubles.intro,...meubles.paragraphs,...meubles.bullets,...meubles.panels.flatMap(p=>[p.title,p.text]),...meubles.questions]) assert.ok(rendered.includes(copy),copy);
  for (const faq of services.meubles.faqs) assert.ok(rendered.includes(faq.answer));
  assert.doesNotMatch(rendered,/à compléter/i);
  assert.ok(html.includes(`href="${site.phoneHref}"`));
});

test('preservation: scoped legacy edits cannot alter any other furniture copy or renovation IDs', () => {
  const { execFileSync } = require('node:child_process');
  const before = execFileSync('git',['show','80ea89e8ee6004a27695b7cb2c7719b07a9a1a08:app/sur-mesure/page.tsx'],{cwd:root,encoding:'utf8'});
  const after = fs.readFileSync(path.join(root,'app/sur-mesure/page.tsx'),'utf8');
  const normalized=after.replace('import { services } from "@/lib/services";\n','').replace('items={services.meubles.faqs}','items={faqMeubles}').replace('href={`/${p.toLowerCase().replace("ê", "e")}`}','href={`/renovation#${p.toLowerCase().replace("ê", "e")}`}');
  assert.equal(normalized,before);
  const renovation=ssr(React.createElement(require('../app/renovation/page.tsx').default));
  for (const slug of ['portes','volets','fenetres','depannage']) assert.ok(renovation.includes(`id="${slug}"`));
});

test('new service review links open a real Google Maps destination instead of a hash placeholder', () => {
  for (const fixture of fixtures) {
    const Page = require(path.join(root, 'app', fixture.slug, 'page.tsx')).default;
    const html = ssr(React.createElement(Page));
    const anchor = html.match(/<a[^>]+href="([^"]+)"[^>]*>Voir la fiche Google/);
    assert.ok(anchor, fixture.slug);
    const url = new URL(anchor[1].replaceAll('&amp;', '&'));
    assert.equal(url.origin, 'https://www.google.com');
    assert.equal(url.pathname, '/maps/search/');
    assert.ok(url.searchParams.get('query').includes('Randretsa'));
    assert.ok(url.searchParams.get('query').includes('5 Rue de Bègles'));
    assert.match(anchor[0], /target="_blank"/);
    assert.match(anchor[0], /rel="noopener noreferrer"/);
  }
});

const preserved = require('./fixtures/preserved-files.json');
const readmeBaseline = require('./fixtures/readme-rewrite-baseline.json');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function normalizePreservedReadme(bytes) {
  // Authenticate the independent historical bytes before allowing the exact rewrite.
  assert.equal(sha256(Buffer.from(readmeBaseline.normalizedReadme)), preserved['README.md']);
  if (sha256(bytes) === readmeBaseline.approvedRewriteSha256) {
    return Buffer.from(readmeBaseline.normalizedReadme);
  }
  {
      const original = '`/` · `/sur-mesure` · `/renovation` · `/realisations` · `/a-propos` · `/contact` · `/mentions-legales` · `/confidentialite`';
      const documented = [
        '`/` · `/sur-mesure` · `/renovation` · `/portes` · `/volets` · `/fenetres` · `/meubles` · `/placards` · `/depannage` · `/realisations` · `/a-propos` · `/contact` · `/mentions-legales` · `/confidentialite`',
        '',
        'Les six pages de prestations reprennent les captures fournies, avec FAQ et liens dédiés. `docs/service-sources.md` distingue les textes visibles, les réponses de FAQ rédigées à partir de ces informations et les limites des visuels. Les avant/après sont explicitement statiques : les deux photos originales nécessaires à un curseur réel ne sont pas disponibles.',
        '', '```bash', 'node --test --test-concurrency=1 tests/*.test.cjs', '```',
      ].join('\n');
      const after = bytes.toString('utf8');
      assert.equal(after.split(documented).length, 2, 'exact scoped README addition occurs once');
      bytes = Buffer.from(after.replace(documented, original));
  }
  return bytes;
}

test('README preservation accepts the historical addition and only the exact approved rewrite', () => {
  const current = fs.readFileSync(path.join(root, 'README.md'));
  assert.equal(sha256(current), readmeBaseline.approvedRewriteSha256);
  assert.equal(sha256(normalizePreservedReadme(current)), preserved['README.md']);
  // Reconstruct the historical routes/docs/test-command addition independently.
  const original = '`/` · `/sur-mesure` · `/renovation` · `/realisations` · `/a-propos` · `/contact` · `/mentions-legales` · `/confidentialite`';
  const documented = [
    '`/` · `/sur-mesure` · `/renovation` · `/portes` · `/volets` · `/fenetres` · `/meubles` · `/placards` · `/depannage` · `/realisations` · `/a-propos` · `/contact` · `/mentions-legales` · `/confidentialite`',
    '',
    'Les six pages de prestations reprennent les captures fournies, avec FAQ et liens dédiés. `docs/service-sources.md` distingue les textes visibles, les réponses de FAQ rédigées à partir de ces informations et les limites des visuels. Les avant/après sont explicitement statiques : les deux photos originales nécessaires à un curseur réel ne sont pas disponibles.',
    '', '```bash', 'node --test --test-concurrency=1 tests/*.test.cjs', '```',
  ].join('\n');
  const historical = Buffer.from(readmeBaseline.normalizedReadme.replace(original, documented));
  assert.equal(sha256(normalizePreservedReadme(historical)), preserved['README.md']);
  assert.throws(() => normalizePreservedReadme(Buffer.concat([current, Buffer.from('\nunauthorized')])), /exact scoped README addition/);
  assert.notEqual(sha256(normalizePreservedReadme(Buffer.concat([historical, Buffer.from('\nunauthorized')]))), preserved['README.md']);
  assert.throws(() => normalizePreservedReadme(Buffer.from(historical.toString().replace('docs/service-sources.md', 'docs/other.md'))), /exact scoped README addition/);
});

test('preservation: every unrelated tracked file and local asset stays byte-identical', () => {
  for (const [name, hash] of Object.entries(preserved)) {
    let bytes = fs.readFileSync(path.join(root,name));
    if (name === 'README.md') bytes = normalizePreservedReadme(bytes);
    assert.equal(sha256(bytes),hash,name);
  }
});

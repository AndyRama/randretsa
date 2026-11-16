const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const baseline = require('./mobile-actions-baseline.json');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function normalizeMobileActions(name, bytes) {
  assert.equal(sha(baseline[name]), baseline.hashes[name], 'authentic original fixture');
  let source = bytes.toString();
  for (const change of [...baseline.changes[name]].reverse()) {
    assert.ok(change.after.length, 'only explicitly approved additions/replacements');
    assert.equal(source.split(change.after).length, 2, 'unique exact authorized hunk');
    source = source.replace(change.after, change.before);
  }
  assert.equal(source, baseline[name], 'all bytes outside approved changes preserved');
  return Buffer.from(source);
}
module.exports = { normalizeMobileActions };

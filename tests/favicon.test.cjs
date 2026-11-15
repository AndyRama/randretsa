const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pngSignature = Buffer.from([137,80,78,71,13,10,26,10]);
function dimensions(data) {
  assert.deepEqual(data.subarray(0,8), pngSignature);
  assert.equal(data.toString('ascii',12,16), 'IHDR');
  return [data.readUInt32BE(16),data.readUInt32BE(20)];
}

test('Next icon convention supplies a square 192px Randretsa PNG', () => {
  assert.deepEqual(dimensions(fs.readFileSync(path.join(root,'app/icon.png'))),[192,192]);
});
test('Apple icon convention supplies a square 180px PNG', () => {
  assert.deepEqual(dimensions(fs.readFileSync(path.join(root,'app/apple-icon.png'))),[180,180]);
});
test('favicon ICO contains complete 16, 32 and 48px PNG frames without external resources', () => {
  const data=fs.readFileSync(path.join(root,'app/favicon.ico'));
  assert.equal(data.readUInt16LE(0),0);
  assert.equal(data.readUInt16LE(2),1);
  assert.equal(data.readUInt16LE(4),3);
  let end=6+3*16;
  for (const [i,size] of [16,32,48].entries()) {
    const entry=6+i*16;
    assert.equal(data[entry],size);assert.equal(data[entry+1],size);
    assert.equal(data.readUInt16LE(entry+4),1);assert.equal(data.readUInt16LE(entry+6),32);
    const length=data.readUInt32LE(entry+8),offset=data.readUInt32LE(entry+12);
    assert.equal(offset,end);assert.ok(length>0);
    end=offset+length;assert.ok(end<=data.length);
    assert.deepEqual(dimensions(data.subarray(offset,end)),[size,size]);
  }
  assert.equal(end,data.length);
});

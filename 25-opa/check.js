// OPA sunucusuna REST ile soru sorar (Node 18+ yerleşik fetch)
const OPA_URL = 'http://localhost:8181/v1/data/httpapi/authz';

async function check(input) {
  const res = await fetch(OPA_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ input })
  });
  const { result } = await res.json();
  return result;
}

const cases = [
  { name: 'admin siler', input: { user: { name: 'ali', role: 'admin' }, method: 'DELETE', path: '/articles/1' } },
  { name: 'viewer okur', input: { user: { name: 'veli', role: 'viewer' }, method: 'GET', path: '/articles/1' } },
  { name: 'viewer yazar', input: { user: { name: 'veli', role: 'viewer' }, method: 'POST', path: '/articles' } },
  { name: 'editor kendi makalesini siler', input: { user: { name: 'ayse', role: 'editor' }, method: 'DELETE', path: '/articles/2', resource: { owner: 'ayse' } } },
  { name: 'editor başkasınınkini siler', input: { user: { name: 'ayse', role: 'editor' }, method: 'DELETE', path: '/articles/3', resource: { owner: 'mehmet' } } }
];

(async () => {
  for (const c of cases) {
    const r = await check(c.input);
    console.log(`${r.allow ? 'İZİN  ' : 'RED   '} | ${c.name}${r.reason ? ' -> ' + r.reason : ''}`);
  }
})().catch((e) => console.error('OPA sunucusuna ulaşılamadı:', e.message));

(() => {
'use strict';

/* Built-in API profiles and catalogs for Italian Tourism, Geospatial, Macroeconomic & Context APIs.
   m = method, p = path, s = summary, q = query params, r = required query params, b = takes a body, h = headers, dv = default values, bd = default body */
const BUILTIN_PROFILES = [
  {
    id: 'istat',
    name: '1. ISTAT SDMX REST API',
    baseUrl: 'https://esploradati.istat.it',
    prefix: '/SDMXWS/rest/',
    auth: { type: 'none', name: '' },
    pingPath: 'dataflow/IT1/DCSC_TUR',
    extraHeaders: 'Accept: application/vnd.sdmx.data+json;version=1.0.0-wd',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Tourism Dataflow (DCSC_TUR)', 'dataflow/IT1/DCSC_TUR'],
      ['Tourism Accommodation Data', 'data/DCSC_TUR/{key}']
    ]
  },
  {
    id: 'eurostat',
    name: '1. Eurostat Dissemination API',
    baseUrl: 'https://ec.europa.eu',
    prefix: '/eurostat/api/dissemination/statistics/1.0/data/',
    auth: { type: 'none', name: '' },
    pingPath: 'tour_occ_nim?geo=IT&sinceTimePeriod=2024-01',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Nights Spent at Tourist Accommodations', 'tour_occ_nim'],
      ['Air Passenger Transport', 'avia_paoc'],
      ['Hospitality Inflation (HICP)', 'prc_hicp_midx']
    ]
  },
  {
    id: 'bancaditalia',
    name: '1. Bank of Italy (BDS) API',
    baseUrl: 'https://a2a.bancaditalia.it',
    prefix: '/infostat/dataservices/export/IT/CSV/',
    auth: { type: 'none', name: '' },
    pingPath: '',
    extraHeaders: 'Accept: text/csv, application/json',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['International Tourism Survey Series', 'DATA/CUBE/TURI']
    ]
  },
  {
    id: 'datigovit',
    name: '1. Dati.gov.it & Min. Turismo (CKAN)',
    baseUrl: 'https://www.dati.gov.it',
    prefix: '/opendata/api/3/action/',
    auth: { type: 'none', name: '' },
    pingPath: 'package_search?q=turismo&rows=1',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: 'start', itemsParam: 'rows',
    overview: [
      ['Search Tourism & MiC Datasets', 'package_search'],
      ['Query Datastore Resource', 'datastore_search']
    ]
  },
  {
    id: 'amadeus',
    name: '2. Amadeus for Developers',
    baseUrl: 'https://test.api.amadeus.com',
    prefix: '/v2/',
    auth: { type: 'bearer', name: '' },
    pingPath: '',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: 'max',
    overview: [
      ['Live Flight Offers', 'shopping/flight-offers'],
      ['Historical Flight Price Metrics', 'analytics/itinerary-price-metrics']
    ]
  },
  {
    id: 'insideairbnb',
    name: '2. Inside Airbnb (Open Data)',
    baseUrl: 'https://data.insideairbnb.com',
    prefix: '/italy/',
    auth: { type: 'none', name: '' },
    pingPath: '',
    extraHeaders: 'Accept: text/csv, application/geo+json',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Regional Listings Snapshot (.csv.gz)', '{region}/{province}/{city}/{date}/data/listings.csv.gz'],
      ['Neighbourhood GeoJSON', '{region}/{province}/{city}/{date}/visualisations/neighbourhoods.geojson']
    ]
  },
  {
    id: 'overpass',
    name: '3. Overpass API (OpenStreetMap)',
    baseUrl: 'https://overpass-api.de',
    prefix: '/api/',
    auth: { type: 'none', name: '' },
    pingPath: 'status',
    extraHeaders: 'User-Agent: ItalyTourismAnalyticsDashboard/1.0',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Overpass QL Interpreter (GET)', 'interpreter']
    ]
  },
  {
    id: 'foursquare',
    name: '3. Foursquare Places API',
    baseUrl: 'https://api.foursquare.com',
    prefix: '/v3/',
    auth: { type: 'header', name: 'Authorization' },
    pingPath: 'places/search?near=Rome,IT&limit=1',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: 'limit',
    overview: [
      ['Search Venues & Landmarks', 'places/search']
    ]
  },
  {
    id: 'googleplaces',
    name: '3. Google Places API (New)',
    baseUrl: 'https://places.googleapis.com',
    prefix: '/v1/',
    auth: { type: 'header', name: 'X-Goog-Api-Key' },
    pingPath: '',
    extraHeaders: 'X-Goog-FieldMask: places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Text Search (Landmarks & Reviews)', 'places:searchText'],
      ['Nearby Search', 'places:searchNearby']
    ]
  },
  {
    id: 'geoapify',
    name: '3. Geoapify Places API',
    baseUrl: 'https://api.geoapify.com',
    prefix: '/v2/',
    auth: { type: 'query', name: 'apiKey' },
    pingPath: 'places?categories=tourism&filter=rect:12.45,41.88,12.51,41.92&limit=1',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: 'offset', itemsParam: 'limit',
    overview: [
      ['Places by Bounding Box / Radius', 'places']
    ]
  },
  {
    id: 'openmeteo',
    name: '4. Open-Meteo Historical Weather',
    baseUrl: 'https://archive-api.open-meteo.com',
    prefix: '/v1/',
    auth: { type: 'none', name: '' },
    pingPath: 'archive?latitude=41.9028&longitude=12.4964&start_date=2024-07-01&end_date=2024-07-02&daily=temperature_2m_max',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Historical Daily Weather (2022–2026)', 'archive']
    ]
  },
  {
    id: 'frankfurter',
    name: '4. Frankfurter Exchange Rates (ECB)',
    baseUrl: 'https://api.frankfurter.app',
    prefix: '/',
    auth: { type: 'none', name: '' },
    pingPath: 'latest?from=USD&to=EUR',
    extraHeaders: '',
    totalItems: '', totalPages: '', pageParam: '', itemsParam: '',
    overview: [
      ['Historical Time Series (USD/GBP to EUR)', '{start_date}..{end_date}'],
      ['Latest ECB Reference Rates', 'latest']
    ]
  }
];

const BUILTIN_CATALOGS = {
  istat: [
    {
      group: 'Metadata & Discovery',
      endpoints: [
        { m: 'GET', p: 'dataflow/IT1/DCSC_TUR', s: 'Get DCSC_TUR dataflow structure & dimensions', q: [], r: [], b: false },
        { m: 'GET', p: 'datastructure/IT1/{dsdId}', s: 'Get Data Structure Definition (codelists & concepts)', q: ['references'], r: [], dv: { references: 'children' }, b: false }
      ]
    },
    {
      group: 'Tourism Accommodation Data',
      endpoints: [
        { m: 'GET', p: 'data/DCSC_TUR/{key}', s: 'Monthly arrivals & overnight stays by NUTS-2/NUTS-3 & origin', q: ['startPeriod', 'endPeriod', 'detail'], r: [], dv: { startPeriod: '2022-01', endPeriod: '2026-12' }, b: false }
      ]
    }
  ],
  eurostat: [
    {
      group: 'Tourism & Transport Statistics',
      endpoints: [
        { m: 'GET', p: 'tour_occ_nim', s: 'Nights spent at tourist accommodation establishments', q: ['geo', 'sinceTimePeriod', 'untilTimePeriod', 'unit', 'c_resid', 'nace_r2'], r: [], dv: { geo: 'IT', sinceTimePeriod: '2022-01' }, b: false },
        { m: 'GET', p: 'avia_paoc', s: 'Air passenger transport by reporting country & airports (FCO/CIA/MXP/LIN/BGY)', q: ['geo', 'sinceTimePeriod', 'untilTimePeriod', 'tra_meas', 'unit'], r: [], dv: { geo: 'IT', sinceTimePeriod: '2022-01' }, b: false },
        { m: 'GET', p: 'prc_hicp_midx', s: 'Hospitality inflation (HICP for restaurants and hotels)', q: ['geo', 'coicop', 'sinceTimePeriod', 'untilTimePeriod', 'unit'], r: [], dv: { geo: 'IT', coicop: 'CP11', sinceTimePeriod: '2022-01' }, b: false }
      ]
    }
  ],
  bancaditalia: [
    {
      group: 'International Tourism Survey',
      endpoints: [
        { m: 'GET', p: 'DATA/CUBE/TURI', s: 'Inbound traveler expenditure, daily spend & trip purpose', q: ['startPeriod', 'endPeriod', 'freq'], r: [], dv: { startPeriod: '2022-01' }, b: false },
        { m: 'GET', p: 'SERIES/{seriesKey}', s: 'Download specific BDS statistical series', q: ['startPeriod', 'endPeriod'], r: [], b: false }
      ]
    }
  ],
  datigovit: [
    {
      group: 'CKAN Catalog & Datastore',
      endpoints: [
        { m: 'GET', p: 'package_search', s: 'Search datasets (borghi, agriturismi, MiC museums, tourism tax)', q: ['q', 'fq', 'rows', 'start'], r: [], dv: { q: 'musei MiC visitatori', rows: '20' }, b: false },
        { m: 'GET', p: 'package_show', s: 'Get dataset metadata and resource download URLs', q: ['id'], r: ['id'], b: false },
        { m: 'GET', p: 'datastore_search', s: 'Query tabular records inside a CKAN datastore resource', q: ['resource_id', 'q', 'limit', 'offset'], r: ['resource_id'], dv: { limit: '25' }, b: false }
      ]
    }
  ],
  amadeus: [
    {
      group: 'Flight & Hotel Pricing (v2 / v3)',
      endpoints: [
        { m: 'GET', p: 'shopping/flight-offers', s: 'Live flight pricing offers into Italy', q: ['originLocationCode', 'destinationLocationCode', 'departureDate', 'returnDate', 'adults', 'currencyCode', 'max'], r: ['originLocationCode', 'destinationLocationCode', 'departureDate', 'adults'], dv: { originLocationCode: 'JFK', destinationLocationCode: 'FCO', departureDate: '2026-06-15', adults: '1', currencyCode: 'EUR', max: '10' }, b: false },
        { m: 'GET', p: 'analytics/itinerary-price-metrics', s: 'Historical flight price quartiles (v1 endpoint via full path)', q: ['originIataCode', 'destinationIataCode', 'departureDate', 'currencyCode'], r: ['originIataCode', 'destinationIataCode', 'departureDate'], dv: { originIataCode: 'LHR', destinationIataCode: 'MXP', departureDate: '2026-06-15', currencyCode: 'EUR' }, b: false },
        { m: 'GET', p: 'shopping/hotel-offers', s: 'Live hotel ADR samples (note: v3 endpoint; set prefix to /v3/)', q: ['hotelIds', 'checkInDate', 'checkOutDate', 'adults', 'currency'], r: ['hotelIds'], dv: { adults: '2', currency: 'EUR' }, b: false }
      ]
    }
  ],
  insideairbnb: [
    {
      group: 'Regional Snapshots (2022–2026)',
      endpoints: [
        { m: 'GET', p: '{region}/{province}/{city}/{date}/data/listings.csv.gz', s: 'Compressed listings CSV (rates, availability, reviews)', q: [], r: [], b: false },
        { m: 'GET', p: '{region}/{province}/{city}/{date}/visualisations/listings.csv', s: 'Summary listings CSV (uncompressed flat file)', q: [], r: [], b: false },
        { m: 'GET', p: '{region}/{province}/{city}/{date}/visualisations/neighbourhoods.geojson', s: 'Neighbourhood boundary polygons (GeoJSON)', q: [], r: [], b: false }
      ]
    }
  ],
  overpass: [
    {
      group: 'OpenStreetMap Geospatial Queries',
      endpoints: [
        { m: 'GET', p: 'interpreter', s: 'Run Overpass QL query for Italian tourism POIs', q: ['data'], r: ['data'], dv: { data: '[out:json][timeout:25];area["ISO3166-1"="IT"]->.a;(node["tourism"="museum"](area.a););out count;' }, b: false },
        { m: 'POST', p: 'interpreter', s: 'Submit Overpass QL query in request body', q: [], r: [], b: true, bd: '[out:json][timeout:25];\narea["name"="Roma"]["admin_level"="8"]->.searchArea;\n(\n  node["tourism"="attraction"](area.searchArea);\n  node["historic"="monument"](area.searchArea);\n);\nout body 50;' },
        { m: 'GET', p: 'status', s: 'Check Overpass API slot availability and rate limits', q: [], r: [], b: false }
      ]
    }
  ],
  foursquare: [
    {
      group: 'Places & Venues',
      endpoints: [
        { m: 'GET', p: 'places/search', s: 'Search restaurants and landmarks with popularity & price tiers', q: ['query', 'near', 'll', 'radius', 'categories', 'sort', 'limit', 'fields'], r: [], dv: { near: 'Florence, Italy', query: 'museum', limit: '20', fields: 'fsq_id,name,rating,popularity,price,categories,location' }, b: false },
        { m: 'GET', p: 'places/{fsq_id}', s: 'Get detailed venue ratings, stats, and tips', q: ['fields'], r: [], dv: { fields: 'fsq_id,name,rating,popularity,price,stats,hours' }, b: false }
      ]
    }
  ],
  googleplaces: [
    {
      group: 'Google Places (New)',
      endpoints: [
        { m: 'POST', p: 'places:searchText', s: 'Search landmarks & compare review counts (e.g., Colosseum vs Matera)', q: [], r: [], h: ['X-Goog-FieldMask'], dv: { 'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.types' }, b: true, bd: '{\n  "textQuery": "Colosseum Rome",\n  "languageCode": "en"\n}' },
        { m: 'POST', p: 'places:searchNearby', s: 'Search tourist attractions within a radius', q: [], r: [], h: ['X-Goog-FieldMask'], dv: { 'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount' }, b: true, bd: '{\n  "includedTypes": ["tourist_attraction", "museum"],\n  "maxResultCount": 10,\n  "locationRestriction": {\n    "circle": {\n      "center": { "latitude": 40.6664, "longitude": 16.6043 },\n      "radius": 2000.0\n    }\n  }\n}' },
        { m: 'GET', p: 'places/{placeId}', s: 'Get place details and userRatingCount by Place ID', q: [], r: [], h: ['X-Goog-FieldMask'], dv: { 'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,priceLevel' }, b: false }
      ]
    }
  ],
  geoapify: [
    {
      group: 'Geospatial & Accessibility POIs',
      endpoints: [
        { m: 'GET', p: 'places', s: 'Query tourist facilities, transit stops & wheelchair-accessible attractions', q: ['categories', 'conditions', 'filter', 'bias', 'limit', 'offset'], r: ['categories'], dv: { categories: 'tourism.attraction,public_transport', conditions: 'wheelchair.yes', filter: 'circle:12.4922,41.8902,3000', limit: '25' }, b: false }
      ]
    }
  ],
  openmeteo: [
    {
      group: 'Historical Climate Archive',
      endpoints: [
        { m: 'GET', p: 'archive', s: 'Daily historical temperature, precipitation & snowfall (2022–2026)', q: ['latitude', 'longitude', 'start_date', 'end_date', 'daily', 'timezone'], r: ['latitude', 'longitude', 'start_date', 'end_date'], dv: { latitude: '46.5405', longitude: '12.1357', start_date: '2026-01-01', end_date: '2026-02-28', daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum', timezone: 'Europe/Rome' }, b: false }
      ]
    }
  ],
  frankfurter: [
    {
      group: 'ECB Foreign Exchange Rates',
      endpoints: [
        { m: 'GET', p: '{start_date}..{end_date}', s: 'Historical USD & GBP to EUR exchange rates over date range', q: ['from', 'to'], r: [], dv: { from: 'USD', to: 'EUR' }, b: false },
        { m: 'GET', p: 'latest', s: 'Latest ECB reference exchange rates', q: ['from', 'to'], r: [], dv: { from: 'GBP', to: 'EUR' }, b: false }
      ]
    }
  ]
};

const CATEGORY_META = {
  '1.': { label: 'Official Statistics & Macro', desc: 'ISTAT, Eurostat, Bank of Italy & Dati.gov.it' },
  '2.': { label: 'Travel, Flights & Accommodation', desc: 'Amadeus pricing & Inside Airbnb snapshots' },
  '3.': { label: 'Geospatial, Venues & Landmarks', desc: 'OpenStreetMap, Foursquare, Google Places & Geoapify' },
  '4.': { label: 'Climate & Currency Context', desc: 'Open-Meteo weather archive & ECB exchange rates' }
};

const BUILTIN_IDS = new Set(BUILTIN_PROFILES.map(p => p.id));
const DEFAULT_ID = BUILTIN_PROFILES[0].id;

const BLANK = { baseUrl: '', prefix: '', auth: { type: 'bearer', name: '' }, pingPath: '', extraHeaders: '',
  totalItems: '', totalPages: '', pageParam: '', itemsParam: '', overview: null };
const AUTH_TYPES = [
  ['header', 'API key in a header'], ['bearer', 'Bearer token'], ['basic', 'Basic (username:password)'],
  ['query', 'API key in the query string'], ['none', 'No authentication']
];
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const SECRET_RE = /pass(word)?|secret|token|api[_-]?key|^code$/i;
const isSecret = n => SECRET_RE.test(n);

const $ = s => document.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid != null) e.append(kid.nodeType ? kid : document.createTextNode(kid));
  return e;
};
const store = {
  get: (s, k) => { try { return s.getItem(k); } catch { return null; } },
  set: (s, k, v) => { try { s.setItem(k, v); return true; } catch { return false; } },
  del: (s, k) => { try { s.removeItem(k); } catch {} }
};
const jparse = t => { try { return JSON.parse(t); } catch { return null; } };

/* ---------- state ---------- */
const state = {
  profiles: [], profile: null, catalog: [], ALL: [],
  ep: null, vals: { path: {}, query: {}, header: {}, free: { path: '', headers: '' } },
  connected: false, busy: false, last: null, rows: null, view: 'json'
};

/* ---------- profiles & catalogs ---------- */
const K = { profiles: 'apisbx:profiles', active: 'apisbx:active', cat: id => 'apisbx:cat:' + id, tok: id => 'apisbx:token:' + id };
function loadProfiles() {
  const stored = (jparse(store.get(localStorage, K.profiles)) || []).filter(p => p.id !== 'configio');
  const out = BUILTIN_PROFILES.map(bp => Object.assign({}, bp, stored.find(p => p.id === bp.id) || {}));
  for (const p of stored) if (!BUILTIN_IDS.has(p.id)) out.push(Object.assign({}, BLANK, p));
  state.profiles = out;
}
const saveProfiles = () => store.set(localStorage, K.profiles, JSON.stringify(state.profiles));
function normEp(e) {
  return { m: (e.m || 'GET').toUpperCase(), p: (e.p || '').replace(/^\/+/, ''), s: e.s || e.p || '', q: e.q || [], r: e.r || [],
    b: !!e.b, h: e.h || [], dv: e.dv || {}, bd: e.bd || '' };
}
function setCatalog(groups) {
  state.catalog = groups.map(g => ({ group: g.group, endpoints: g.endpoints.map(normEp) }));
  state.ALL = [];
  state.catalog.forEach(g => g.endpoints.forEach(e => { e.group = g.group; e.idx = state.ALL.length; state.ALL.push(e); }));
}
function loadCatalogFor(p) {
  const stored = jparse(store.get(localStorage, K.cat(p.id)));
  setCatalog(stored || (BUILTIN_CATALOGS[p.id] || []));
}
function persistCatalog(groups) {
  return store.set(localStorage, K.cat(state.profile.id), JSON.stringify(groups));
}

/* ---------- request helpers ---------- */
const base = () => $('#baseUrl').value.trim().replace(/\/+$/, '');
const token = () => $('#token').value.trim();
const prefixStr = () => { const p = (state.profile.prefix || '').replace(/^\/+|\/+$/g, ''); return p ? '/' + p + '/' : '/'; };
const pathParams = ep => ep.free ? [] : [...ep.p.matchAll(/\{([^}/]+)\}/g)].map(m => m[1]);
const pathResolved = (ep, v = state.vals.path, placeholders = true) =>
  ep.p.replace(/\{([^}/]+)\}/g, (_, k) => v[k] ? encodeURIComponent(v[k]) : (placeholders ? `{${k}}` : ''));
const qs = (q, mask = false) => {
  const p = Object.entries(q).filter(([, v]) => v !== '' && v != null);
  if (!p.length) return '';
  return '?' + p.map(([k, v]) => encodeURIComponent(k) + '=' + (mask && isSecret(k) ? '••••' : encodeURIComponent(v))).join('&');
};
const withQuery = (url, extra) => {
  const p = Object.entries(extra);
  if (!p.length) return url;
  return url + (url.includes('?') ? '&' : '?') + p.map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v)).join('&');
};
const fmtBytes = n => n < 1024 ? n + ' B' : (n / 1024).toFixed(1) + ' KB';
const explain = s => ({
  400: 'Bad request. Check the parameters and body.',
  401: 'The credential is missing or was not accepted.',
  403: 'Blocked. Check the credential’s permissions and any IP allowlist.',
  404: 'Nothing found at that address or ID.',
  429: 'Throttled. Wait a moment and try again.'
}[s] || (s >= 500 ? 'The server had a problem with this request.' : ''));

function authParts() {
  const a = state.profile.auth || { type: 'none' }, t = token();
  if (!t || a.type === 'none') return {};
  if (a.type === 'header') return { headers: { [a.name || 'X-API-Key']: t } };
  if (a.type === 'bearer') return { headers: { Authorization: 'Bearer ' + t } };
  if (a.type === 'basic') return { headers: { Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(t))) } };
  if (a.type === 'query') return { query: { [a.name || 'api_key']: t } };
  return {};
}
function extraHeaders(text) {
  const h = {};
  for (const line of (text || '').split('\n')) {
    const i = line.indexOf(':'); if (i < 1) continue;
    const k = line.slice(0, i).trim(), v = line.slice(i + 1).trim(); if (k) h[k] = v;
  }
  return h;
}
function tokenLabel() {
  const a = state.profile.auth || {};
  return { header: a.name || 'API key', bearer: 'Bearer token', basic: 'username:password', query: a.name || 'API key', none: 'No credential needed' }[a.type] || 'Token';
}

async function request(method, url, { headers = {}, body } = {}, onWait) {
  let attempt = 0;
  for (;;) {
    const t0 = performance.now();
    const res = await fetch(url, { method, headers, body });
    const ms = Math.round(performance.now() - t0);
    if (res.status === 429 && method === 'GET' && attempt < 3) {
      const ra = Number(res.headers.get('Retry-After'));
      const wait = (ra > 0 ? ra : 2 ** attempt) * 1000;
      attempt++;
      if (onWait) onWait(wait, attempt);
      await new Promise(r => setTimeout(r, wait));
      continue;
    }
    const text = await res.text();
    return { ok: res.ok, status: res.status, statusText: res.statusText, ms, headers: res.headers, text, json: jparse(text) };
  }
}
function baseHeaders() {
  const ap = authParts();
  return { Accept: 'application/json', ...extraHeaders(state.profile.extraHeaders), ...(ap.headers || {}) };
}
const apiGet = (relPath, query = {}, onWait) => {
  const ap = authParts();
  const url = withQuery(base() + prefixStr() + relPath + qs(query), ap.query || {});
  return request('GET', url, { headers: baseHeaders() }, onWait);
};

/* ---------- header bar ---------- */
function setStatus(text, kind = '') { const s = $('#status'); s.textContent = text; s.className = 'status ' + kind; }
function updateEnvLabel() {
  let host = state.profile ? state.profile.name : '';
  try { host += ' · ' + new URL(base()).host; } catch {}
  $('#envLabel').textContent = host || 'not connected';
}
function renderProfileSelect() {
  const sel = $('#profile'); sel.replaceChildren();
  for (const p of state.profiles) { const o = el('option', { value: p.id, text: p.name }); o.selected = p.id === state.profile.id; sel.append(o); }
  sel.append(el('option', { value: '__new__', text: '+ New connection…' }));
}
function refreshHeaderFields() {
  $('#baseUrl').value = state.profile.baseUrl || '';
  const saved = store.get(sessionStorage, K.tok(state.profile.id));
  $('#token').value = saved || ''; $('#remember').checked = !!saved;
  $('#tokenLabel').textContent = tokenLabel();
  const noAuth = (state.profile.auth || {}).type === 'none';
  $('#token').disabled = noAuth;
  $('#token').placeholder = noAuth ? 'Not required for this API' : 'Paste your credential';
  updateEnvLabel();
}
function switchProfile(id) {
  state.profile && (state.profile.baseUrl = base(), saveProfiles());
  state.profile = state.profiles.find(p => p.id === id) || state.profiles[0];
  store.set(localStorage, K.active, state.profile.id);
  loadCatalogFor(state.profile);
  const noAuth = (state.profile.auth || {}).type === 'none';
  state.connected = noAuth;
  state.ep = null;
  renderProfileSelect(); refreshHeaderFields();
  setStatus(noAuth ? 'Public API · Ready' : 'Not connected', noAuth ? 'ok' : '');
  buildNav($('#filter').value); showOverview();
}
$('#profile').addEventListener('change', e => {
  if (e.target.value === '__new__') {
    const p = Object.assign({}, BLANK, { id: 'p' + Date.now().toString(36), name: 'New API' });
    state.profiles.push(p); saveProfiles(); switchProfile(p.id); openSettings();
  } else switchProfile(e.target.value);
});
$('#baseUrl').addEventListener('input', () => { updateEnvLabel(); if (state.ep) renderReqline(); });
$('#baseUrl').addEventListener('change', () => { state.profile.baseUrl = base(); saveProfiles(); });
$('#allowWrites').addEventListener('change', e => { document.body.classList.toggle('writes-on', e.target.checked); updateSend(); });

function persistConnection() {
  state.profile.baseUrl = base(); saveProfiles();
  if ($('#remember').checked) store.set(sessionStorage, K.tok(state.profile.id), token());
  else store.del(sessionStorage, K.tok(state.profile.id));
}
$('#connForm').addEventListener('submit', async e => {
  e.preventDefault();
  persistConnection(); updateEnvLabel();
  const needsToken = (state.profile.auth || {}).type !== 'none';
  if (needsToken && !token()) { setStatus('Enter your credential first', 'bad'); return; }
  const ping = (state.profile.pingPath || '').replace(/^\/+/, '');
  if (!ping) { state.connected = true; setStatus('Ready (no test request set)', 'ok'); showOverview(); return; }
  setStatus('Connecting…');
  try {
    const r = await apiGet(ping);
    state.connected = r.ok;
    setStatus(r.ok ? `Connected · ${r.ms} ms` : `${r.status} ${explain(r.status)}`.trim(), r.ok ? 'ok' : 'bad');
    showOverview();
  } catch {
    state.connected = false; setStatus('Could not reach the API', 'bad'); showOverview(networkHelp());
  }
});
function networkHelp() {
  return el('div', { class: 'notice bad' },
    el('strong', { text: 'The browser could not reach the API.' }),
    el('ul', {},
      el('li', { text: 'The API may not allow browser requests from this site (CORS). The Network tab shows a failed preflight request when this is the cause.' }),
      el('li', { text: 'The API address may be wrong. Include the scheme and any base path, for example https://api.example.com/v2.' }),
      el('li', { text: 'The API may only accept approved IP addresses. Your public IP may need to be on its allowlist.' }),
      el('li', { text: 'If it is CORS, the same request still works from Postman. Use “Postman collection” on the Overview page to export one.' })));
}

/* ---------- sidebar ---------- */
function buildNav(filter = '') {
  const f = filter.trim().toLowerCase(), nav = $('#nav'); nav.replaceChildren();
  if (!state.ALL.length) { nav.append(el('p', { class: 'muted', style: 'padding:0 8px', text: 'No endpoints yet. Open Settings to load an OpenAPI or Postman file.' })); markNav(); return; }
  for (const g of state.catalog) {
    const eps = g.endpoints.filter(e => !f || (e.p + ' ' + e.s + ' ' + g.group + ' ' + e.m).toLowerCase().includes(f));
    if (!eps.length) continue;
    nav.append(el('details', { open: true },
      el('summary', {}, el('span', { text: g.group }), el('span', { class: 'n', text: String(eps.length) })),
      el('ul', {}, eps.map(e => el('li', {},
        el('button', { class: 'ep', type: 'button', 'data-i': e.idx, title: e.s, onclick: () => { selectEndpoint(e); $('#app').classList.remove('nav-open'); } },
          el('span', { class: 'm ' + e.m.toLowerCase(), text: e.m }), el('span', { class: 'path', text: e.p || '/' })))))));
  }
  markNav();
}
function markNav() {
  document.querySelectorAll('.ep').forEach(b => b.classList.toggle('active', !!state.ep && !state.ep.free && Number(b.dataset.i) === state.ep.idx));
  $('#homeBtn').classList.toggle('active', !state.ep);
  $('#freeBtn').classList.toggle('active', !!state.ep && !!state.ep.free);
}
$('#filter').addEventListener('input', e => buildNav(e.target.value));
$('#homeBtn').addEventListener('click', () => { showOverview(); $('#app').classList.remove('nav-open'); });
$('#freeBtn').addEventListener('click', () => { openFree(); $('#app').classList.remove('nav-open'); });
$('#navToggle').addEventListener('click', () => $('#app').classList.toggle('nav-open'));

/* ---------- visual overview dashboard ---------- */
function showOverview(extra) {
  state.ep = null; markNav();
  const P = state.profile, main = $('#main'); main.replaceChildren();

  const totalCatalogEndpoints = Object.values(BUILTIN_CATALOGS)
    .reduce((sum, groups) => sum + groups.reduce((gSum, g) => gSum + g.endpoints.length, 0), 0);
  const authMode = (P.auth || {}).type || 'none';
  const authLabel = authMode === 'none' ? 'Public (No Key)' : authMode.toUpperCase();

  // Header + Quick Actions
  main.append(el('div', { class: 'dash-head' },
    el('div', { class: 'intro' },
      el('span', { class: 'eyebrow', text: 'ITALIAN TOURISM & MACROECONOMIC DATA HUB' }),
      el('h1', { text: P.name }),
      el('p', { class: 'muted', text: `${P.baseUrl || 'No base URL set'}${prefixStr()}` })),
    el('div', { class: 'btnrow' },
      el('button', { class: 'btn primary', type: 'button', onclick: openFree }, 'Custom request'),
      el('button', { class: 'btn', type: 'button', onclick: openSettings }, 'Settings'),
      state.ALL.length ? el('button', { class: 'btn', type: 'button', onclick: () => download(slug() + '.postman_collection.json', postmanCollection()) }, 'Export Postman') : null)));

  // Top KPI Strip
  main.append(el('div', { class: 'kpi-grid' },
    el('div', { class: 'kpi-card' },
      el('span', { class: 'kpi-label', text: 'Active API Endpoints' }),
      el('strong', { class: 'kpi-value', text: String(state.ALL.length) }),
      el('span', { class: 'kpi-sub', text: `Across ${state.catalog.length} group(s)` })),
    el('div', { class: 'kpi-card' },
      el('span', { class: 'kpi-label', text: 'Authentication' }),
      el('strong', { class: 'kpi-value', text: authLabel }),
      el('span', { class: 'kpi-sub', text: authMode === 'none' ? 'Ready for direct GET queries' : `Requires ${tokenLabel()}` })),
    el('div', { class: 'kpi-card' },
      el('span', { class: 'kpi-label', text: 'Connection Status' }),
      el('strong', { class: 'kpi-value ' + (state.connected ? 'ok-txt' : 'warn-txt'), text: state.connected ? 'Ready' : 'Credential Needed' }),
      el('span', { class: 'kpi-sub', text: P.pingPath ? `Test: ${P.pingPath.split('?')[0]}` : 'No ping endpoint configured' })),
    el('div', { class: 'kpi-card' },
      el('span', { class: 'kpi-label', text: 'Total Catalog Coverage' }),
      el('strong', { class: 'kpi-value', text: `${state.profiles.length} APIs` }),
      el('span', { class: 'kpi-sub', text: `${totalCatalogEndpoints} pre-configured endpoints` }))));

  if (extra) main.append(extra);

  if (!state.connected) {
    main.append(el('div', { class: 'notice' },
      el('strong', { text: 'Credential required for this API.' }),
      el('p', { text: 'Paste your API key or token in the top bar and click Connect, or select a Public API card below.' })));
  }

  // Active API Quick-Launch Endpoint Cards
  if (state.ALL.length) {
    main.append(el('h2', { class: 'dash-sec-title', text: 'Endpoints in Selected API' }));
    const epGrid = el('div', { class: 'ep-cards' });
    for (const ep of state.ALL) {
      const canQuickRun = state.connected && ep.m === 'GET' && pathParams(ep).length === 0 && ep.r.every(k => ep.dv[k] !== undefined);
      epGrid.append(el('div', { class: 'ep-card' },
        el('div', { class: 'ep-card-top' },
          el('span', { class: 'm ' + ep.m.toLowerCase(), text: ep.m }),
          el('code', { class: 'ep-card-path', text: ep.p })),
        el('p', { class: 'ep-card-desc', text: ep.s }),
        el('div', { class: 'ep-card-foot' },
          el('span', { class: 'muted', text: ep.group }),
          el('div', { class: 'ep-card-btns' },
            canQuickRun ? el('button', { class: 'btn small primary', type: 'button', onclick: () => { selectEndpoint(ep); send(); } }, 'Run now') : null,
            el('button', { class: 'btn small', type: 'button', onclick: () => selectEndpoint(ep) }, 'Configure')))));
    }
    main.append(epGrid);
  }

  // All 12 APIs Switcher Grid grouped by Domain
  main.append(el('h2', { class: 'dash-sec-title', text: 'All Tourism & Context Data Sources' }));
  const apiGrid = el('div', { class: 'api-grid' });
  for (const prof of state.profiles) {
    const isCurrent = prof.id === P.id;
    const isPublic = (prof.auth || {}).type === 'none';
    const catKey = prof.name.slice(0, 2);
    const domain = CATEGORY_META[catKey] ? CATEGORY_META[catKey].label : 'Custom Connection';
    const epCount = (BUILTIN_CATALOGS[prof.id] || []).reduce((a, g) => a + g.endpoints.length, 0);

    apiGrid.append(el('button', {
      type: 'button',
      class: 'api-tile' + (isCurrent ? ' active' : ''),
      onclick: () => switchProfile(prof.id)
    },
      el('div', { class: 'api-tile-top' },
        el('span', { class: 'api-domain', text: domain }),
        el('span', { class: 'pill ' + (isPublic ? 'pub' : 'key'), text: isPublic ? 'Public' : 'API Key' })),
      el('strong', { class: 'api-tile-name', text: prof.name }),
      el('span', { class: 'api-tile-url', text: prof.baseUrl || 'Custom URL' }),
      el('span', { class: 'api-tile-meta', text: epCount ? `${epCount} endpoint(s)` : 'Custom catalog' })));
  }
  main.append(apiGrid);
}

function openList(path) {
  const ep = state.ALL.find(e => e.p === path);
  if (!ep) return;
  selectEndpoint(ep);
  if (state.connected && ep.m === 'GET' && pathParams(ep).length === 0 && ep.r.length === 0) send();
}

/* ---------- request builder ---------- */
function resetVals(ep) {
  state.vals = { path: {}, query: {}, header: {}, free: { path: '', headers: '' } };
  const P = state.profile, iso = d => d.toISOString().slice(0, 10), now = new Date();
  for (const k of ep.q) if (ep.dv[k] !== undefined && ep.dv[k] !== '') state.vals.query[k] = String(ep.dv[k]);
  for (const k of ep.h) if (ep.dv[k] !== undefined && ep.dv[k] !== '') state.vals.header[k] = String(ep.dv[k]);
  if (P.itemsParam && ep.q.includes(P.itemsParam) && !state.vals.query[P.itemsParam]) state.vals.query[P.itemsParam] = '25';
  for (const k of ep.r) {
    if (k.toLowerCase() === 'startdate' && !state.vals.query[k]) state.vals.query[k] = iso(new Date(now - 30 * 864e5));
    if (k.toLowerCase() === 'enddate' && !state.vals.query[k]) state.vals.query[k] = iso(now);
  }
}
function selectEndpoint(ep) {
  state.ep = ep; state.last = null; state.rows = null; resetVals(ep); renderBuilder(); markNav();
}
function openFree() {
  selectEndpoint({ m: 'GET', p: '', s: 'Custom request', group: 'Free-form', q: [], r: [], b: true, h: [], dv: {}, bd: '', free: true, idx: -1 });
}

function fieldRow(kind, name, required) {
  const id = `f-${kind}-${name}`, secret = isSecret(name);
  const inp = el('input', { id, type: secret ? 'password' : 'text', autocomplete: 'off', spellcheck: 'false', value: state.vals[kind][name] || '' });
  inp.dataset.kind = kind; inp.dataset.name = name;
  inp.addEventListener('input', () => { state.vals[kind][name] = inp.value.trim(); renderReqline(); });
  return el('div', { class: 'field' }, el('label', { for: id }, name, required ? el('em', { text: 'required' }) : null), inp);
}

function renderBuilder() {
  const ep = state.ep, main = $('#main'), pp = pathParams(ep);
  let fields;
  if (ep.free) {
    const mSel = el('select', { id: 'freeMethod', 'aria-label': 'Method', onchange: e => { ep.m = e.target.value; renderReqline(); } },
      ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => { const o = el('option', { value: m, text: m }); o.selected = m === ep.m; return o; }));
    const pIn = el('input', { id: 'freePath', type: 'text', autocomplete: 'off', spellcheck: 'false', placeholder: 'users?limit=10',
      oninput: e => { state.vals.free.path = e.target.value.trim(); renderReqline(); } });
    const hIn = el('textarea', { id: 'freeHeaders', class: 'hdr', spellcheck: 'false', placeholder: 'Name: value',
      oninput: e => { state.vals.free.headers = e.target.value; } });
    fields = el('div', { class: 'fields' },
      el('div', { class: 'field' }, el('label', { for: 'freeMethod', text: 'Method' }), mSel),
      el('div', { class: 'field' }, el('label', { for: 'freePath', text: 'Path after the API address' }), pIn),
      el('div', { class: 'field' }, el('label', { for: 'freeHeaders', text: 'Extra headers, one per line' }), hIn),
      el('h3', { text: 'Body' }), el('textarea', { id: 'body', class: 'big', spellcheck: 'false', 'aria-label': 'Body' }));
  } else {
    fields = el('div', { class: 'fields' },
      pp.length ? el('h3', { text: 'In the path' }) : null, pp.map(k => fieldRow('path', k, true)),
      ep.q.length ? el('h3', { text: 'Query parameters' }) : null, ep.q.map(k => fieldRow('query', k, ep.r.includes(k))),
      ep.h.length ? el('h3', { text: 'Headers' }) : null, ep.h.map(k => fieldRow('header', k, ep.r.includes(k))),
      ep.b ? [el('h3', { text: 'Body' }), el('textarea', { id: 'body', class: 'big', spellcheck: 'false', 'aria-label': 'Request body' }, ep.bd || '{}')] : null);
  }
  main.replaceChildren(
    el('div', { class: 'reqline', id: 'reqline' }),
    el('div', { class: 'actions' },
      el('button', { class: 'btn primary', id: 'sendBtn', type: 'button', onclick: send }, 'Send request'),
      el('button', { class: 'btn', id: 'curlBtn', type: 'button', onclick: copyCurl }, 'Copy as cURL'),
      el('button', { class: 'btn', type: 'button', onclick: showOverview }, 'Back to Dashboard'),
      el('span', { class: 'hint', id: 'hint' })),
    el('div', { class: 'cols' },
      el('section', { class: 'pane' }, el('h2', { text: ep.s }), el('p', { class: 'muted', text: ep.group }), fields),
      el('section', { class: 'pane' },
        el('div', { class: 'resbox' },
          el('div', { class: 'resmeta', id: 'resMeta', 'aria-live': 'polite' }, 'No response yet'),
          el('div', { class: 'tabs', id: 'tabs', role: 'tablist' }),
          el('div', { class: 'out', id: 'out' }, el('div', { class: 'empty', text: 'Send a request to see the response here.' })),
          el('div', { class: 'pager', id: 'pager' })))));
  renderReqline();
}
function urlPieces(mask) {
  const ep = state.ep;
  if (ep.free) return { pre: base() + '/', path: (state.vals.free.path || '').replace(/^\/+/, ''), q: '' };
  return { pre: base() + prefixStr(), path: pathResolved(ep), q: qs(state.vals.query, mask) };
}
function renderReqline() {
  const ep = state.ep; if (!ep) return;
  const u = urlPieces(true);
  $('#reqline').replaceChildren(
    el('span', { class: 'chip ' + ep.m.toLowerCase(), text: ep.m }),
    el('span', { class: 'u-base', text: u.pre || 'https://…/' }),
    el('span', { class: 'u-path', text: u.path }),
    el('span', { class: 'u-q', text: u.q }));
  updateSend();
}
const isWrite = m => !['GET', 'HEAD', 'OPTIONS'].includes(m);
function updateSend() {
  const b = $('#sendBtn'); if (!b || !state.ep) return;
  const write = isWrite(state.ep.m), blocked = write && !$('#allowWrites').checked;
  b.disabled = blocked || state.busy;
  $('#hint').textContent = blocked ? 'Turn on “Allow changes” in the header to send this request.'
    : (write ? 'This request changes or posts data to the API.' : '');
}
function showMsg(kind, text) { $('#out').replaceChildren(el('div', { class: 'notice ' + kind, style: 'margin:14px' }, text)); }

function buildRequest() {
  const ep = state.ep, ap = authParts(), u = urlPieces(false);
  const rel = ep.free ? u.path : pathResolved(ep, state.vals.path, false);
  const q = ep.free ? {} : state.vals.query;
  const url = withQuery(u.pre + rel + (ep.free ? '' : qs(q)), ap.query || {});
  const headers = { ...baseHeaders() };
  if (ep.free) Object.assign(headers, extraHeaders(state.vals.free.headers));
  else for (const [k, v] of Object.entries(state.vals.header)) if (v) headers[k] = v;
  let body;
  const bt = $('#body') ? $('#body').value.trim() : '';
  if (bt && isWrite(ep.m)) {
    body = bt;
    if (!Object.keys(headers).some(h => h.toLowerCase() === 'content-type')) {
      headers['Content-Type'] = /^[\[{]/.test(bt) ? 'application/json' : 'text/plain';
    }
  }
  return { method: ep.m, url, headers, body };
}

async function send() {
  const ep = state.ep; if (!ep || state.busy) return;
  if (!base()) return showMsg('bad', 'Enter the API address in the header first.');
  if ((state.profile.auth || {}).type !== 'none' && !token()) return showMsg('bad', 'Enter your credential in the header first.');
  const missing = ep.free ? [] : [...pathParams(ep).filter(k => !state.vals.path[k]),
    ...ep.r.filter(k => ep.q.includes(k) && !state.vals.query[k]), ...ep.r.filter(k => ep.h.includes(k) && !state.vals.header[k])];
  if (missing.length) return showMsg('bad', `Fill in ${missing.join(', ')} first.`);
  if (ep.free && !state.vals.free.path) return showMsg('bad', 'Enter a path first, or leave a single / for the root.');
  const bt = $('#body') ? $('#body').value.trim() : '';
  if (bt && /^[\[{]/.test(bt)) { try { JSON.parse(bt); } catch (e) { return showMsg('bad', 'The body is not valid JSON: ' + e.message); } }
  state.busy = true; updateSend(); $('#sendBtn').textContent = 'Sending…';
  try {
    const rq = buildRequest();
    const r = await request(rq.method, rq.url, { headers: rq.headers, body: rq.body },
      w => showMsg('warn', `Throttled by the API (429). Retrying in ${Math.round(w / 1000)} s…`));
    showResponse(r);
  } catch {
    $('#resMeta').textContent = 'Request failed'; $('#tabs').replaceChildren(); $('#pager').replaceChildren();
    $('#out').replaceChildren(networkHelp());
  } finally {
    state.busy = false; const b = $('#sendBtn'); if (b) { b.textContent = 'Send request'; updateSend(); }
  }
}

/* ---------- response ---------- */
function rowsOf(j) {
  if (Array.isArray(j)) return j.length && j.every(x => x && typeof x === 'object') ? j : null;
  if (j && typeof j === 'object') for (const v of Object.values(j)) if (Array.isArray(v) && v.length && v[0] && typeof v[0] === 'object') return v;
  return null;
}
function showResponse(r) {
  const P = state.profile; state.last = r; state.rows = rowsOf(r.json);
  const total = P.totalItems ? r.headers.get(P.totalItems) : null, pages = P.totalPages ? r.headers.get(P.totalPages) : null;
  $('#resMeta').replaceChildren(
    el('span', { class: 'badge ' + (r.ok ? 'ok' : 'bad'), text: `${r.status} ${r.statusText || ''}`.trim() }),
    el('span', { text: `${r.ms} ms` }), el('span', { text: fmtBytes(r.text.length) }),
    total != null ? el('span', { text: `${Number(total).toLocaleString()} items` }) : (state.rows ? el('span', { text: `${state.rows.length} rows` }) : null),
    pages != null ? el('span', { text: `${pages} pages` }) : null,
    !r.ok && explain(r.status) ? el('span', { text: explain(r.status) }) : null);
  state.view = state.rows ? 'table' : (r.json !== null ? 'json' : (r.text ? 'raw' : 'headers'));
  renderTabs(); renderOut(); renderPager(pages);
}
function renderTabs() {
  const r = state.last, defs = [];
  if (state.rows) defs.push(['table', 'Table']);
  if (r.json !== null) defs.push(['json', 'JSON']); else if (r.text) defs.push(['raw', 'Body']);
  defs.push(['headers', 'Headers']);
  $('#tabs').replaceChildren(...defs.map(([k, label]) => el('button', { class: 'tab', type: 'button', role: 'tab',
    'aria-selected': String(state.view === k), onclick: () => { state.view = k; renderTabs(); renderOut(); } }, label)));
}
function hl(s) {
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return s.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
    let c = 'n';
    if (m[0] === '"') c = /:$/.test(m) ? 'k' : 's'; else if (m === 'true' || m === 'false') c = 'b'; else if (m === 'null') c = 'z';
    return `<span class="j${c}">${m}</span>`;
  });
}
function renderOut() {
  const r = state.last, out = $('#out');
  if (state.view === 'table') {
    const rows = state.rows.slice(0, 100), cols = [];
    for (const row of rows.slice(0, 50)) for (const [k, v] of Object.entries(row)) if ((v === null || typeof v !== 'object') && !cols.includes(k)) cols.push(k);
    const shown = cols.slice(0, 8), cell = v => { const t = v == null ? '' : String(v); return t.length > 60 ? t.slice(0, 57) + '…' : t; };
    out.replaceChildren(el('table', { class: 'tbl' },
      el('thead', {}, el('tr', {}, shown.map(c => el('th', { text: c })))),
      el('tbody', {}, rows.map(row => el('tr', {}, shown.map(c => el('td', { text: cell(row[c]), title: row[c] == null ? '' : String(row[c]) })))))));
  } else if (state.view === 'json') {
    const txt = JSON.stringify(r.json, null, 2), pre = el('pre');
    if (txt.length < 200000) pre.innerHTML = hl(txt); else pre.textContent = txt;
    out.replaceChildren(pre);
  } else if (state.view === 'raw') {
    out.replaceChildren(el('pre', { text: r.text }));
  } else {
    const dl = el('dl', { class: 'hdrs' });
    for (const [k, v] of r.headers.entries()) dl.append(el('dt', { text: k }), el('dd', { text: v }));
    out.replaceChildren(dl, el('p', { class: 'muted', style: 'padding:0 14px 12px;font-size:13px', text: 'The browser only shows headers the API exposes through CORS.' }));
  }
}
function renderPager(pages) {
  const box = $('#pager'), P = state.profile; box.replaceChildren();
  const ep = state.ep, n = Number(pages);
  if (!n || n < 2 || !P.pageParam || !ep.q.includes(P.pageParam)) return;
  const cur = Number(state.vals.query[P.pageParam] || 1);
  const go = p => {
    state.vals.query[P.pageParam] = String(p);
    const f = document.querySelector(`[data-kind="query"][data-name="${P.pageParam}"]`); if (f) f.value = String(p);
    renderReqline(); send();
  };
  box.append(el('button', { class: 'btn small', type: 'button', disabled: cur <= 1, onclick: () => go(cur - 1) }, 'Previous'),
    el('span', { text: `Page ${cur} of ${n}` }),
    el('button', { class: 'btn small', type: 'button', disabled: cur >= n, onclick: () => go(cur + 1) }, 'Next'));
}

/* ---------- copy as cURL ---------- */
async function copyCurl() {
  const ep = state.ep; if (!ep) return;
  const a = state.profile.auth || { type: 'none' }, u = urlPieces(false), parts = [];
  const q = {};
  for (const [k, v] of Object.entries(ep.free ? {} : state.vals.query)) q[k] = isSecret(k) && v ? '$' + k.toUpperCase().replace(/\W/g, '_') : v;
  let url = u.pre + (ep.free ? u.path : pathResolved(ep)) + (ep.free ? '' : qs(q).replace(/%24/g, '$'));
  if (a.type === 'query') url += (url.includes('?') ? '&' : '?') + encodeURIComponent(a.name || 'api_key') + '=$API_TOKEN';
  parts.push(`curl -X ${ep.m} "${url}"`);
  if (a.type === 'header') parts.push(`-H "${a.name || 'X-API-Key'}: $API_TOKEN"`);
  if (a.type === 'bearer') parts.push(`-H "Authorization: Bearer $API_TOKEN"`);
  if (a.type === 'basic') parts.push(`-u "$API_TOKEN"`);
  parts.push(`-H "Accept: application/json"`);
  for (const [k, v] of Object.entries(extraHeaders(state.profile.extraHeaders))) parts.push(`-H "${k}: ${v}"`);
  const hv = ep.free ? extraHeaders(state.vals.free.headers) : state.vals.header;
  for (const [k, v] of Object.entries(hv)) if (v) parts.push(`-H "${k}: ${isSecret(k) ? '$' + k.toUpperCase().replace(/\W/g, '_') : v}"`);
  const bt = $('#body') ? $('#body').value.trim() : '';
  if (bt && isWrite(ep.m)) {
    const ct = /^[\[{]/.test(bt) ? 'application/json' : 'text/plain';
    parts.push(`-H "Content-Type: ${ct}"`, `-d '${bt.replace(/'/g, `'\\''`)}'`);
  }
  try { await navigator.clipboard.writeText(parts.join(' \\\n  ')); $('#curlBtn').textContent = 'Copied'; }
  catch { $('#curlBtn').textContent = 'Copy failed'; }
  setTimeout(() => { const b = $('#curlBtn'); if (b) b.textContent = 'Copy as cURL'; }, 1500);
}

/* ---------- Postman export ---------- */
const slug = () => (state.profile.name || 'api').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'api';
function download(name, obj) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }));
  const a = el('a', { href: url, download: name }); document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function postmanCollection() {
  const P = state.profile, a = P.auth || { type: 'none' };
  const pre = (P.prefix || '').split('/').filter(Boolean), extra = extraHeaders(P.extraHeaders);
  const item = e => {
    const segs = [...pre, ...e.p.split('/').filter(Boolean)].map(s => s.replace(/\{([^}/]+)\}/g, ':$1'));
    const query = e.q.map(k => ({ key: k, value: String(e.dv[k] ?? ''), disabled: !e.r.includes(k) }));
    const header = [{ key: 'Accept', value: 'application/json' },
      ...Object.entries(extra).map(([key, value]) => ({ key, value })),
      ...e.h.map(k => ({ key: k, value: String(e.dv[k] ?? ''), disabled: !e.r.includes(k) }))];
    const on = query.filter(x => !x.disabled).map(x => `${x.key}=${x.value}`).join('&');
    const req = { method: e.m, header, url: { raw: '{{baseUrl}}/' + segs.join('/') + (on ? '?' + on : ''), host: ['{{baseUrl}}'], path: segs } };
    if (query.length) req.url.query = query;
    const pv = [...e.p.matchAll(/\{([^}/]+)\}/g)].map(m => ({ key: m[1], value: '' }));
    if (pv.length) req.url.variable = pv;
    if (e.b) { header.push({ key: 'Content-Type', value: 'application/json' }); req.body = { mode: 'raw', raw: e.bd || '{}', options: { raw: { language: 'json' } } }; }
    return { name: `${e.m} ${e.s}`, request: req };
  };
  const col = {
    info: { name: P.name + ' sandbox', description: `Exported from API sandbox.`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
    item: state.catalog.map(g => ({ name: g.group, item: g.endpoints.map(item) }))
  };
  if (a.type === 'header') col.auth = { type: 'apikey', apikey: [{ key: 'key', value: a.name || 'X-API-Key', type: 'string' }, { key: 'value', value: '{{token}}', type: 'string' }, { key: 'in', value: 'header', type: 'string' }] };
  if (a.type === 'query') col.auth = { type: 'apikey', apikey: [{ key: 'key', value: a.name || 'api_key', type: 'string' }, { key: 'value', value: '{{token}}', type: 'string' }, { key: 'in', value: 'query', type: 'string' }] };
  if (a.type === 'bearer') col.auth = { type: 'bearer', bearer: [{ key: 'token', value: '{{token}}', type: 'string' }] };
  if (a.type === 'basic') col.auth = { type: 'basic', basic: [{ key: 'username', value: '{{username}}', type: 'string' }, { key: 'password', value: '{{password}}', type: 'string' }] };
  return col;
}
function postmanEnvironment() {
  const P = state.profile, a = P.auth || { type: 'none' };
  const vals = [{ key: 'baseUrl', value: base() || P.baseUrl || '', type: 'default', enabled: true }];
  if (a.type === 'basic') vals.push({ key: 'username', value: '', type: 'default', enabled: true }, { key: 'password', value: '', type: 'secret', enabled: true });
  else if (a.type !== 'none') vals.push({ key: 'token', value: '', type: 'secret', enabled: true });
  return { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), name: P.name, values: vals, _postman_variable_scope: 'environment' };
}

/* ---------- spec import ---------- */
function deref(o, spec) {
  let n = 0;
  while (o && o.$ref && n++ < 10) {
    const parts = String(o.$ref).replace(/^#\//, '').split('/').map(s => decodeURIComponent(s).replace(/~1/g, '/').replace(/~0/g, '~'));
    let cur = spec; for (const p of parts) cur = cur && cur[p]; o = cur;
  }
  return o;
}
function sample(schema, spec, depth = 0) {
  schema = deref(schema, spec); if (!schema || depth > 5) return null;
  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (schema.enum) return schema.enum[0];
  if (schema.allOf) return Object.assign({}, ...schema.allOf.map(s => sample(s, spec, depth + 1)));
  if (schema.oneOf || schema.anyOf) return sample((schema.oneOf || schema.anyOf)[0], spec, depth + 1);
  const t = schema.type || (schema.properties ? 'object' : schema.items ? 'array' : null);
  if (t === 'object') { const o = {}; for (const [k, v] of Object.entries(schema.properties || {})) o[k] = sample(v, spec, depth + 1); return o; }
  if (t === 'array') return [sample(schema.items, spec, depth + 1)];
  if (t === 'integer' || t === 'number') return 0;
  if (t === 'boolean') return false;
  if (t === 'string') return schema.format === 'date-time' ? '2026-01-01T00:00:00Z' : schema.format === 'date' ? '2026-01-01' : 'string';
  return null;
}
function parseOpenAPI(doc, sourceUrl) {
  const groups = new Map(); let baseUrl = '';
  if (doc.openapi && doc.servers && doc.servers[0]) {
    let u = doc.servers[0].url || '';
    for (const [k, v] of Object.entries(doc.servers[0].variables || {})) u = u.replace(`{${k}}`, v.default);
    try { u = new URL(u, sourceUrl || undefined).href; } catch {}
    baseUrl = u.replace(/\/+$/, '');
  } else if (doc.swagger && doc.host) {
    baseUrl = `${(doc.schemes || ['https'])[0]}://${doc.host}${doc.basePath || ''}`.replace(/\/+$/, '');
  }
  for (const [path, item0] of Object.entries(doc.paths || {})) {
    const item = deref(item0, doc) || {};
    for (const m of METHODS) {
      const op = item[m]; if (!op) continue;
      const pm = new Map();
      for (const p of [...(item.parameters || []), ...(op.parameters || [])]) { const d = deref(p, doc); if (d && d.name) pm.set(d.in + ':' + d.name, d); }
      const params = [...pm.values()], q = [], r = [], h = [], dv = {};
      let bodyParam = null;
      for (const p of params) {
        const sch = deref(p.schema, doc) || {}, def = p.example ?? sch.default ?? p.default;
        if (p.in === 'query') { q.push(p.name); if (p.required) r.push(p.name); if (def !== undefined) dv[p.name] = def; }
        else if (p.in === 'header' && !/^(accept|content-type|authorization)$/i.test(p.name)) { h.push(p.name); if (p.required) r.push(p.name); if (def !== undefined) dv[p.name] = def; }
        else if (p.in === 'body') bodyParam = p;
      }
      let b = false, bd = '';
      const rb = deref(op.requestBody, doc);
      if (rb) {
        b = true;
        const c = rb.content || {}, ct = c['application/json'] || Object.values(c)[0];
        if (ct) { const ex = ct.example ?? (ct.examples && Object.values(ct.examples)[0] && deref(Object.values(ct.examples)[0], doc).value) ?? sample(ct.schema, doc); if (ex != null) bd = JSON.stringify(ex, null, 2); }
      } else if (bodyParam) { b = true; const ex = sample(bodyParam.schema, doc); if (ex != null) bd = JSON.stringify(ex, null, 2); }
      const gname = (op.tags && op.tags[0]) || path.split('/').filter(Boolean)[0] || 'General';
      if (!groups.has(gname)) groups.set(gname, []);
      groups.get(gname).push({ m: m.toUpperCase(), p: path, q, r, h, dv, b, bd,
        s: op.summary || (op.description || '').split('\n')[0].slice(0, 90) || op.operationId || `${m.toUpperCase()} ${path}` });
    }
  }
  return { groups: [...groups].map(([group, endpoints]) => ({ group, endpoints })), baseUrl, title: (doc.info && doc.info.title) || '' };
}
function parsePostman(col) {
  const groups = new Map(); let baseUrl = '';
  const add = (it, gname) => {
    const rq = it.request; if (!rq) return;
    const url = typeof rq.url === 'string' ? { raw: rq.url } : (rq.url || {});
    let rest = String(url.raw || '').split('?')[0].split('#')[0];
    const mo = rest.match(/^(https?:\/\/[^/]+)(.*)$/);
    if (mo) { if (!baseUrl) baseUrl = mo[1]; rest = mo[2]; }
    else { const mv = rest.match(/^\{\{[^}]+\}\}(.*)$/); if (mv) rest = mv[1]; }
    const p = rest.split('/').filter(Boolean).map(s => s.replace(/^:(\w+)$/, '{$1}').replace(/\{\{([^}]+)\}\}/g, '{$1}')).join('/');
    const q = [], dv = {}, h = [], r = [], isVar = v => /\{\{[^}]*\}\}/.test(v || '');
    for (const x of url.query || []) if (x.key) {
      q.push(x.key);
      if (x.value && !isVar(x.value)) dv[x.key] = x.value;
      if (!x.disabled && isVar(x.value)) r.push(x.key);
    }
    for (const x of rq.header || []) if (x.key && !/^(accept|content-type|authorization)$/i.test(x.key)) { h.push(x.key); if (x.value) dv[x.key] = x.value; }
    const b = !!(rq.body && rq.body.mode === 'raw'), bd = b ? rq.body.raw || '' : '';
    if (!groups.has(gname)) groups.set(gname, []);
    groups.get(gname).push({ m: (rq.method || 'GET').toUpperCase(), p, q, r, h, dv, b: b || ['POST', 'PUT', 'PATCH'].includes((rq.method || '').toUpperCase()), bd, s: it.name || p });
  };
  const walk = (items, g) => { for (const it of items || []) it.item ? walk(it.item, g || it.name) : add(it, g || 'Requests'); };
  walk(col.item);
  return { groups: [...groups].map(([group, endpoints]) => ({ group, endpoints })), baseUrl, title: (col.info && col.info.name) || '' };
}
function loadScript(src) {
  return new Promise((res, rej) => { const s = el('script', { src }); s.onload = res; s.onerror = () => rej(new Error('Could not load the YAML reader.')); document.head.append(s); });
}
async function parseText(text) {
  let doc = jparse(text);
  if (!doc) {
    if (!window.jsyaml) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js');
    try { doc = window.jsyaml.load(text); } catch (e) { throw new Error('That is neither valid JSON nor valid YAML.'); }
  }
  if (!doc || typeof doc !== 'object') throw new Error('Nothing readable found in that text.');
  return doc;
}
async function importText(text, sourceUrl) {
  const status = $('#sSpecStatus'); status.style.color = '';
  try {
    const doc = await parseText(text);
    let res;
    if (doc.openapi || doc.swagger) res = parseOpenAPI(doc, sourceUrl);
    else if (doc.info && doc.item) res = parsePostman(doc);
    else throw new Error('This is not an OpenAPI, Swagger or Postman file.');
    const n = res.groups.reduce((a, g) => a + g.endpoints.length, 0);
    if (!n) throw new Error('The file has no endpoints.');
    setCatalog(res.groups);
    const saved = persistCatalog(res.groups);
    if (res.baseUrl && !$('#baseUrl').value.trim()) { $('#baseUrl').value = res.baseUrl; state.profile.baseUrl = res.baseUrl; saveProfiles(); }
    if (res.title && $('#sName').value.trim() === 'New API') $('#sName').value = res.title;
    buildNav($('#filter').value);
    status.textContent = `Loaded ${n} endpoints in ${res.groups.length} groups${res.title ? ' from “' + res.title + '”' : ''}.` +
      (res.baseUrl ? ` API address in the file: ${res.baseUrl}.` : '') + (saved ? '' : ' They are too large to save in this browser and will be lost on reload.');
    showOverview();
  } catch (err) { status.textContent = err.message; status.style.color = 'var(--bad)'; }
}

/* ---------- settings dialog ---------- */
const dlg = $('#dlg');
function syncAuthNameVisibility() {
  const t = $('#sAuthType').value;
  $('#sAuthNameWrap').style.display = (t === 'header' || t === 'query') ? '' : 'none';
}
function openSettings() {
  const P = state.profile;
  $('#sName').value = P.name; $('#sAuthType').value = (P.auth || {}).type || 'none'; $('#sAuthName').value = (P.auth || {}).name || '';
  $('#sPrefix').value = P.prefix || ''; $('#sPing').value = P.pingPath || ''; $('#sHeaders').value = P.extraHeaders || '';
  $('#sPageParam').value = P.pageParam || ''; $('#sItemsParam').value = P.itemsParam || '';
  $('#sTotalItems').value = P.totalItems || ''; $('#sTotalPages').value = P.totalPages || '';
  $('#sSpecUrl').value = ''; $('#sSpecText').value = ''; $('#sSpecFile').value = '';
  $('#sSpecStatus').textContent = state.ALL.length ? `${state.ALL.length} endpoints loaded.` : 'No endpoints loaded.';
  $('#sSpecStatus').style.color = '';
  $('#sDelete').textContent = BUILTIN_IDS.has(P.id) ? 'Reset to defaults' : 'Delete connection';
  syncAuthNameVisibility(); dlg.showModal();
}
$('#settingsBtn').addEventListener('click', openSettings);
$('#sClose').addEventListener('click', () => dlg.close());
$('#sAuthType').append(...AUTH_TYPES.map(([v, t]) => el('option', { value: v, text: t })));
$('#sAuthType').addEventListener('change', syncAuthNameVisibility);
$('#dlgForm').addEventListener('submit', e => {
  e.preventDefault();
  const P = state.profile, t = v => $(v).value.trim();
  P.name = t('#sName') || 'API'; P.auth = { type: $('#sAuthType').value, name: t('#sAuthName') };
  P.prefix = t('#sPrefix'); P.pingPath = t('#sPing'); P.extraHeaders = $('#sHeaders').value.trim();
  P.pageParam = t('#sPageParam'); P.itemsParam = t('#sItemsParam'); P.totalItems = t('#sTotalItems'); P.totalPages = t('#sTotalPages');
  P.baseUrl = base(); saveProfiles(); dlg.close();
  renderProfileSelect(); $('#tokenLabel').textContent = tokenLabel();
  const noAuth = P.auth.type === 'none';
  $('#token').disabled = noAuth;
  $('#token').placeholder = noAuth ? 'Not required for this API' : 'Paste your credential';
  updateEnvLabel();
  state.connected = noAuth;
  setStatus(noAuth ? 'Public API · Ready' : 'Not connected', noAuth ? 'ok' : '');
  showOverview();
});
$('#sLoadUrl').addEventListener('click', async () => {
  const u = $('#sSpecUrl').value.trim(), s = $('#sSpecStatus'); if (!u) return;
  s.style.color = ''; s.textContent = 'Loading…';
  try { const r = await fetch(u); if (!r.ok) throw new Error(`The server answered ${r.status}.`); await importText(await r.text(), u); }
  catch (err) { s.style.color = 'var(--bad)'; s.textContent = (err instanceof TypeError ? 'The browser could not fetch that URL, likely because the site does not allow browser requests (CORS). Download the file and upload it instead.' : err.message); }
});
$('#sSpecFile').addEventListener('change', async e => { const f = e.target.files[0]; if (f) importText(await f.text()); });
$('#sImportText').addEventListener('click', () => { const t = $('#sSpecText').value.trim(); if (t) importText(t); });
$('#sClear').addEventListener('click', () => {
  store.set(localStorage, K.cat(state.profile.id), '[]'); setCatalog([]); buildNav(); showOverview();
  $('#sSpecStatus').textContent = 'All endpoints removed.';
});
$('#sDelete').addEventListener('click', () => {
  const P = state.profile;
  if (BUILTIN_IDS.has(P.id)) {
    if (!confirm(`Reset “${P.name}” to its built-in defaults?`)) return;
    state.profiles = state.profiles.filter(p => p.id !== P.id);
    store.del(localStorage, K.cat(P.id));
    saveProfiles(); loadProfiles(); dlg.close(); switchProfile(P.id); return;
  }
  if (!confirm(`Delete the connection “${P.name}”?`)) return;
  state.profiles = state.profiles.filter(p => p.id !== P.id); store.del(localStorage, K.cat(P.id)); store.del(sessionStorage, K.tok(P.id));
  saveProfiles(); dlg.close(); state.profile = null; switchProfile(DEFAULT_ID);
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && state.ep) { e.preventDefault(); send(); }
});

/* ---------- start ---------- */
loadProfiles();
const active = store.get(localStorage, K.active);
state.profile = state.profiles.find(p => p.id === active && p.id !== 'configio') || state.profiles[0];
loadCatalogFor(state.profile);
const startNoAuth = (state.profile.auth || {}).type === 'none';
state.connected = startNoAuth;
renderProfileSelect(); refreshHeaderFields();
setStatus(startNoAuth ? 'Public API · Ready' : 'Not connected', startNoAuth ? 'ok' : '');
buildNav(); showOverview();
})();

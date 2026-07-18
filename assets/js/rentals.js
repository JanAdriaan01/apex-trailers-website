const trailers = [
  { number: 1, code: 'MDN-001', dimensions: '1.8m x 1.2m x 0.8m', capacity: '750 kg', rate: 335, deposit: 335, image: 'assets/images/trailer-1-mdn-001.png', position: 'center 55%' },
  { number: 2, code: 'MDN-002', dimensions: '2.0m x 1.2m x 1.0m', capacity: '750 kg', rate: 355, deposit: 355, image: 'assets/images/trailer-2-mdn-002.png', position: 'center 56%' },
  { number: 3, code: 'MDN-003', dimensions: '2.4m x 1.5m x 1.2m', capacity: '750 kg', rate: 385, deposit: 385, image: 'assets/images/trailer-3-mdn-003.png', position: 'center 59%' },
  { number: 4, code: 'MDN-004', dimensions: '3.0m x 1.5m x 1.0m', capacity: '750 kg', rate: 420, deposit: 420, image: null }
];

const formatRand = value => new Intl.NumberFormat('en-ZA', {
  style: 'currency', currency: 'ZAR', maximumFractionDigits: 0
}).format(value);

function availabilityLink(t) {
  const message = [
    'Hi Apex Trailers, please check availability for this exact trailer:',
    '',
    `Trailer ${t.number} - ${t.code}`,
    `Dimensions: ${t.dimensions}`,
    `Load capacity: ${t.capacity}`,
    `Daily hire: ${formatRand(t.rate)}`,
    `Refundable deposit: ${formatRand(t.deposit)}`,
    '',
    'Please confirm availability and the next booking steps. I understand that I should not make payment until availability is confirmed.'
  ].join('\n');
  return `https://wa.me/27687121066?text=${encodeURIComponent(message)}`;
}

function renderFleet() {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;
  grid.innerHTML = trailers.map(t => `
    <article class="trailer-card">
      <div class="trailer-media">
        ${t.image
          ? `<img src="${t.image}" alt="Trailer ${t.number} ${t.code} for hire in Midrand" style="object-position:${t.position}" loading="lazy">`
          : `<div class="trailer-placeholder"><div><strong>TRAILER 4</strong><span>MDN-004<br>Photo to be added</span></div></div>`}
        <span class="status">CHECK AVAILABILITY</span>
      </div>
      <div class="card-body">
        <div class="card-code">TRAILER ${t.number} - ${t.code}</div>
        <h3>${t.dimensions}</h3>
        <div class="specs">
          <div class="spec"><small>Dimensions</small><strong>${t.dimensions}</strong></div>
          <div class="spec"><small>Load capacity</small><strong>${t.capacity}</strong></div>
          <div class="spec"><small>Hire period</small><strong>24 hours</strong></div>
        </div>
        <div class="price-row">
          <div><small>Daily hire</small><strong>${formatRand(t.rate)}</strong></div>
          <div><small>Refundable deposit</small><strong>${formatRand(t.deposit)}</strong></div>
        </div>
        <a class="btn whatsapp" href="${availabilityLink(t)}" target="_blank" rel="noopener">CHECK AVAILABILITY</a>
      </div>
    </article>
  `).join('');
}

renderFleet();

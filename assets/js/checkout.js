const trailerData = {
  'MDN-001': { number: 1, dimensions: '1.8m x 1.2m x 0.8m', rate: 335, deposit: 335 },
  'MDN-002': { number: 2, dimensions: '2.0m x 1.2m x 1.0m', rate: 355, deposit: 355 },
  'MDN-003': { number: 3, dimensions: '2.4m x 1.5m x 1.2m', rate: 385, deposit: 385 },
  'MDN-004': { number: 4, dimensions: '3.0m x 1.5m x 1.0m', rate: 420, deposit: 420 }
};
const money = value => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(value);
const form = document.getElementById('bookingForm');
const trailerSelect = document.getElementById('trailer');
const pickup = document.getElementById('pickup');
const days = document.getElementById('days');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const whatsappButton = document.getElementById('whatsappButton');

function getSelected() { return trailerData[trailerSelect.value]; }
function updateSummary() {
  const t = getSelected();
  const dayCount = Math.max(1, Number(days.value) || 1);
  const hire = t.rate * dayCount;
  document.getElementById('selectedTrailer').textContent = `Trailer ${t.number} - ${trailerSelect.value}`;
  document.getElementById('selectedDimensions').textContent = t.dimensions;
  document.getElementById('dailyRate').textContent = money(t.rate);
  document.getElementById('hireDays').textContent = `${dayCount} day${dayCount === 1 ? '' : 's'}`;
  document.getElementById('hireSubtotal').textContent = money(hire);
  document.getElementById('depositTotal').textContent = money(t.deposit);
  return { t, dayCount, hire };
}
function setMinimumDate() {
  const local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  pickup.min = local.toISOString().slice(0,10);
}
function loadTrailerFromQuery() {
  const selected = new URLSearchParams(location.search).get('trailer');
  if (selected && trailerData[selected]) trailerSelect.value = selected;
}
[trailerSelect, pickup, days, nameInput, phoneInput].forEach(el => el.addEventListener('input', updateSummary));
whatsappButton.addEventListener('click', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const { t, dayCount, hire } = updateSummary();
  const message = [
    'Hi Apex Trailers, please check availability for this exact trailer:',
    '',
    `Customer: ${nameInput.value.trim()}`,
    `Phone: ${phoneInput.value.trim()}`,
    `Trailer: Trailer ${t.number} - ${trailerSelect.value}`,
    `Dimensions: ${t.dimensions}`,
    `Preferred pickup date: ${pickup.value}`,
    `Hire period: ${dayCount} day${dayCount === 1 ? '' : 's'}`,
    `Daily hire: ${money(t.rate)}`,
    `Estimated hire amount: ${money(hire)}`,
    `Refundable deposit: ${money(t.deposit)}`,
    '',
    'Please confirm availability and the next booking steps. I understand that I should not make payment until availability is confirmed.'
  ].join('\n');
  window.open(`https://wa.me/27687121066?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
setMinimumDate();
loadTrailerFromQuery();
updateSummary();

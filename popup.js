const MSG_UNDER = "It has been less than 6 months since {DATE}. This request cannot be processed yet.";
const MSG_OVER  = "It has been more than 6 months since {DATE}. This request is eligible for processing.";

function parse(raw) {
  const date = raw.trim();

  const withTime = date.match(/^(\d{1,2}):(\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})$/);
  if (withTime) {
    const [, hh, mm, mo, dd, yyyy] = withTime.map(Number);
    return new Date(yyyy, mo - 1, dd, hh, mm, 0).getTime();
  }

  const dateOnly = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dateOnly) {
    const [, mo, dd, yyyy] = dateOnly.map(Number);
    return new Date(yyyy, mo - 1, dd, 0, 0, 0).getTime();
  }

  return null;
}

document.getElementById('checkBtn').addEventListener('click', run);
document.getElementById('input').addEventListener('keydown', e => {
  if (e.key === 'Enter') run();
});

function run() {
  const raw = document.getElementById('input').value;
  const resultEl  = document.getElementById('result');
  const resultText = document.getElementById('resultText');
  const messageEl = document.getElementById('message');
  const copyBtn   = document.getElementById('copyBtn');

  const input = parse(raw);

  if (input === null) {
    resultEl.className = 'result show err';
    resultText.textContent = 'Invalid format. Use MM/DD/YYYY or hh:mm MM/DD/YYYY';
    messageEl.style.display = 'none';
    copyBtn.style.display = 'none';
    return;
  }

  const now = Date.now();

  if (input > now) {
    resultEl.className = 'result show err';
    resultText.textContent = 'Date is in the future';
    messageEl.style.display = 'none';
    copyBtn.style.display = 'none';
    return;
  }

  const sixMonthsLater = new Date(input);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  const over = now >= sixMonthsLater.getTime();
  const template = over ? MSG_OVER : MSG_UNDER;
  const message = template.replace(/\{DATE\}/g, raw.trim());

  resultEl.className = 'result show ' + (over ? 'ok' : 'warn');
  resultText.textContent = over ? '✔ More than 6 months' : '✘ Less than 6 months';
  messageEl.textContent = message;
  messageEl.style.display = 'block';
  copyBtn.style.display = 'block';
  copyBtn.textContent = 'Copy';
  copyBtn.className = 'copy-btn';
}
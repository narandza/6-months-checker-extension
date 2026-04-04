// Custom responses 

const MSG_UNDER = "It has been less than 6 months since {DATE}. This request cannot be processed yet.";
const MSG_OVER  = "It has been more than 6 months since {DATE}. This request is eligible for processing.";


function parse(raw) {
    const date = raw.trim();

    // Parse date with time "13:12 07/26/2025"
    const withTime = date.match(/^(\d{1,2}):(\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})$/);
    if (withTime) {
    const [, hh, mm, mo, dd, yyyy] = withTime.map(Number);
    return Date.UTC(yyyy, mo - 1, dd, hh, mm, 0);
  }
    

  // Parse with date only "13:12 07/26/2025"
    const dateOnly = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dateOnly) {
    const [, mo, dd, yyyy] = dateOnly.map(Number);
    return Date.UTC(yyyy, mo - 1, dd, 0, 0, 0);
  }
}
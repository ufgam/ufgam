function formatNumber(number, opts) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map(val => formatNumber(val, opts));
  }

  // Do some calc
  const negative = number < 0 ? '-' : '';
  const base = parseInt(Math.abs(number).toFixed(opts.precision), 10) + '';
  const mod = base.length > 3 ? base.length % 3 : 0;

  // Format the number
  const formatted =
    negative +
    (mod ? base.substr(0, mod) + opts.thousand : '') +
    base.substr(mod).replace(/(\d{3})(?=\d)/g, '€1' + opts.thousand) +
    (opts.precision > 0
      ? '.' + Math.abs(number).toFixed(opts.precision).split('.')[1]
      : '');

  return formatted;
}

export default formatNumber;

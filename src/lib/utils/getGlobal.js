
export default function() {
  if (typeof wx !== 'undefined' && wx) {
    return wx;
  }
  if (typeof my !== 'undefined' && my) {
    return my;
  }
  if (typeof swan !== 'undefined' && swan) {
    return swan;
  }
  if (typeof tt !== 'undefined' && tt) {
    return tt;
  }
  return global;
}
/* Pure planning helpers; no inferred weather or invented unlock levels. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HeartopiaPlanner = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function clock(now, offset) {
    const value = new Date(new Date(now).getTime() + Number(offset) * 60000);
    const pad = n => String(n).padStart(2, '0');
    return {date: `${value.getUTCFullYear()}-${pad(value.getUTCMonth()+1)}-${pad(value.getUTCDate())}`,
      hour: value.getUTCHours(), minute: value.getUTCMinutes(), time: `${pad(value.getUTCHours())}:${pad(value.getUTCMinutes())}`};
  }
  function period(hour) { return hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'; }
  function forecast(days, day, hour) {
    const phases = days && days[day] && days[day].phases;
    if (!Array.isArray(phases) || !phases.length) return {type: null, reason: 'missing'};
    const timed = phases.filter(p => Number.isFinite(p.s) && Number.isFinite(p.e) && p.s >= 0 && p.e <= 24 && p.s < p.e);
    const active = timed.filter(p => hour >= p.s && hour < p.e);
    const baseline = phases.filter(p => p.s == null && p.e == null);
    const selected = active.length === 1 ? active[0] : active.length ? null : baseline.length === 1 ? baseline[0] : null;
    return {type: selected ? selected.t : null, reason: selected ? (selected.s == null ? 'day-only' : 'timed') : 'unspecified',
      ends: selected && selected.e != null ? selected.e : null};
  }
  function match(fish, state) {
    if (!state.browseAll && (!state.weather || !fish.weathers.includes(state.weather))) return false;
    if (!state.browseAll && !fish.times.includes('all') && !fish.times.includes(state.period)) return false;
    if (Number.isFinite(fish.minLevel) && fish.minLevel > state.level) return false;
    if (state.onlyUnlocked && !state.unlocked[fish.id]) return false;
    if (state.onlyMissing && state.caught[fish.id]) return false;
    const q = (state.query || '').trim().toLocaleLowerCase();
    return !q || `${fish.name} ${fish.loc} ${fish.note}`.toLocaleLowerCase().includes(q);
  }
  return {clock, period, forecast, match};
});

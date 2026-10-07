// TEMPORIZADOR (§18). Manual: nunca propone tiempos por receta (no hay recomendación fiable para cada caso).
// Sin dependencias del DOM: notifica cambios mediante callbacks.

export class Timer {
  constructor({ onTick = () => {}, onDone = () => {} } = {}) {
    this.totalMs = 0;
    this.remainingMs = 0;
    this.running = false;
    this.endsAt = 0;
    this.handle = null;
    this.onTick = onTick;
    this.onDone = onDone;
  }

  add(seconds) {
    this.remainingMs = Math.max(0, this.remainingMs + seconds * 1000);
    this.totalMs = Math.max(this.totalMs, this.remainingMs);
    if (this.running) this.endsAt = Date.now() + this.remainingMs;
    this.onTick(this.snapshot());
  }

  start() {
    if (this.running || this.remainingMs <= 0) return;
    this.running = true;
    this.endsAt = Date.now() + this.remainingMs;
    this.handle = setInterval(() => this.tick(), 250);
    this.onTick(this.snapshot());
  }

  pause() {
    if (!this.running) return;
    this.remainingMs = Math.max(0, this.endsAt - Date.now());
    this.running = false;
    clearInterval(this.handle);
    this.onTick(this.snapshot());
  }

  reset() {
    clearInterval(this.handle);
    this.running = false;
    this.remainingMs = 0;
    this.totalMs = 0;
    this.onTick(this.snapshot());
  }

  tick() {
    this.remainingMs = Math.max(0, this.endsAt - Date.now());
    if (this.remainingMs === 0) {
      clearInterval(this.handle);
      this.running = false;
      this.totalMs = 0;
      this.onTick(this.snapshot());
      this.onDone();
      return;
    }
    this.onTick(this.snapshot());
  }

  snapshot() {
    return { remainingMs: this.remainingMs, running: this.running, label: formatClock(this.remainingMs) };
  }
}

export function formatClock(ms) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

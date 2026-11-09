// The build's single clock. astro.config.mjs fixes SW_NOW once at the start of a build, so every page agrees on what is published.
// In dev and in the browser it is simply the current time.
export const nowMs = () => (process.env.SW_NOW ? new Date(process.env.SW_NOW).getTime() : Date.now());
export const nowDate = () => new Date(nowMs());

const IST_MS = 330 * 60000;
/** Stories go live by the day, not by the hour: the start (00:00 India time) of the day a story is dated. */
export const istDayStartMs = (ms: number) => Math.floor((ms + IST_MS) / 86400000) * 86400000 - IST_MS;
/** A story is published once its day has started. The 10-minute margin lets a release that starts just before midnight include the new day. */
export const isPublished = (dateMs: number, now = nowMs()) => istDayStartMs(dateMs) <= now + 10 * 60 * 1000;

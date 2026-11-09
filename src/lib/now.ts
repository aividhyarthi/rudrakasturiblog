// The build's single clock. astro.config.mjs fixes SW_NOW once at the start of a build, so every page agrees on what is published.
// In dev and in the browser it is simply the current time.
export const nowMs = () => (process.env.SW_NOW ? new Date(process.env.SW_NOW).getTime() : Date.now());
export const nowDate = () => new Date(nowMs());

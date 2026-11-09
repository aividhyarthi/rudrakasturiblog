// THE release clock. Stories go live, the site rebuilds, and held changes ship only at these India-time hours.
// Change the list here and nothing else: the rebuild workflow and the release check both read it.
export const SLOT_HOURS_IST = [7, 11, 15, 19];
const IST = 330 * 60000;
/** A number that goes up by one each time a slot passes. */
export const slotNumber = (ms) => {
  const t = new Date(ms + IST);
  const day = Math.floor(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) / 86400000);
  const h = t.getUTCHours() + t.getUTCMinutes() / 60;
  return day * SLOT_HOURS_IST.length + SLOT_HOURS_IST.filter((s) => h >= s).length;
};
/** UTC cron lines, a few minutes after each slot (the 10-minute publish margin means stories due at the slot are already in). */
export const slotCrons = (minute = 2) => SLOT_HOURS_IST.map((h) => { const m = h * 60 + minute - 330, mm = ((m % 1440) + 1440) % 1440; return `${mm % 60} ${Math.floor(mm / 60)} * * *`; });
if (process.argv[2] === 'crons') console.log(slotCrons().join('\n'));

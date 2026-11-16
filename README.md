# Donegal Farm – Herd Tracker

**Open the app:** https://spectretactical.github.io/donegal-farm/

This is the Donegal Farm record book for calves, weaning, auction sales and herd movements. It keeps one shared
farm database, so everyone who has been approved sees the same records, and changes show up live on the other phones.
Only family members approved by an admin can see or change anything.

## Getting started (family members)
1. Open the link above in Brave or Chrome, on your phone or laptop.
2. Tap **Create an account**. Enter your name, your email and a password of at least 8 characters.
   Don't use an ID number or cell number as your name.
3. You'll see **Waiting for approval**. Gideon gets your request on the **Members** page.
   Once he approves you, the app opens by itself. You can leave the page open or come back later.
4. On a phone, use the browser menu → **Add to Home screen** so it opens like an app.

Forgot your password? On the sign-in screen tap **Forgot password?** and a reset link will be emailed to you.

## Using it
- **Calves**: date born, tag (optional), sex, dam, birth weight, alive/died/stillborn and notes.
- **Weaning**: tick off tagged calves with their weights, or do a **Batch weaning** for untagged calves.
- **Sales**: fill in what's on the auction slip. Gross, commission, net, R/kg and R/head are worked out for you.
- **Herd**: the animal register (visual tag, RFID chip number, sex, role, group / tag colour, status, birth year,
  first seen, notes) with search (tag, group, notes or the last digits of the RFID) and a status filter; purchases,
  adult deaths and a running head count. **Import RFID scan CSV…** reads the scanner's CSV export and shows a preview
  (new / already in the app / skipped, by group and birth year) before anything is saved. It matches on the RFID first,
  then the visual tag, so importing the same file again adds nothing, and it never overwrites what you typed – it only
  fills blank fields. The **Grazing load** card adds up everything that grazes (own herd, legacy animals being phased
  out, and workers) against the farm's capacity (425 LSU by default, 1 head = 1 LSU). Legacy and worker animals are
  left out of the own-herd and group figures.
- **Dashboard**: figures per season, year-on-year comparison and charts. **Print / PDF report** gives an A4 report.
- **Market**: weekly weaner calf prices – RPO (bull calves, national) and AMT (weaners 200–250 kg, weight classes and
  regions) – with a trend chart, your own weaner sales compared with the benchmark for that week, and a calculator for
  what the current weaners could fetch. Prices come from a public feed
  (https://spectretactical.github.io/donegal-prices/) that checks RPO and AMT three times a day; the sources publish
  once a week. The last prices are kept on the phone for use without signal. A link opens the official RMIS price
  dashboard. Figures belong to RPO and AMT and are shown for private family use with attribution. They are auction
  averages, not farm-gate prices, and heifers usually fetch several R/kg less than bulls.
- **Data**: JSON backup and CSV exports for spreadsheets.
- Each record shows who entered it and who last changed it.
- **No signal on the farm?** Keep working. Changes are kept on the phone and sync once you have signal. The top-right
  indicator shows **Online**, **Offline · N to sync** and, in Setup, when it last synced.
  Don't sign out while there are changes still waiting to sync.
- If two people change the same record, the last one saved is kept. The app warns you if someone else changed it
  while you were editing.
- Deleting anything always asks first.
- Never enter ID numbers or cell numbers; the app refuses them. Buyer is a name only.

## Files
- `index.html` – the app (version shown in Setup, currently v2.2)
- `sw.js` – lets the app open without signal (the price feed is never served from its cache)
- `firestore.rules` – database security rules (published in the Firebase console, see ADMIN-SETUP.md)

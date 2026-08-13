// Google Apps Script: Append RSVP to Google Sheet
// Usage:
// 1. Replace SHEET_ID with your Google Sheet ID.
// 2. Replace EXPECTED_TOKEN with a secret value and keep it private.
// 3. Deploy > New deployment > Select "Web app". Execute as: "Me". Who has access: "Anyone" (or restrict to signed-in users).
// 4. Copy the Web App URL and set it to VITE_APPS_SCRIPT_URL in your deployment. Set the token to VITE_APPS_SCRIPT_TOKEN.

const SHEET_ID = '1AgBisS51AY75lY3ID-X0ERP_dvrHVKAITC-kWkox6dg';
const EXPECTED_TOKEN = 'rsvp2026_x7Kp9mQ2vL8nR4tY';

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents;
    const data = raw ? JSON.parse(raw) : {};
    const token = (data && data.token) || (e.parameter && e.parameter.token) || '';

    if (EXPECTED_TOKEN && token !== EXPECTED_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'invalid token' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.attendance || '',
      data.message || '',
      data._subject || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

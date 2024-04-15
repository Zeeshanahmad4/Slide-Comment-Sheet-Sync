// SheetsHelper.gs

/**
 * Adds a new row to the Google Sheet with the comment text and a link to the slide comment.
 * @param {string} commentText - The text of the comment.
 * @param {string} slideUrl - The URL to the specific slide with the comment.
 * @param {string} sheetId - The ID of the Google Sheet where the data will be added.
 */
function addCommentToSheet(commentText, slideUrl, sheetId) {
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Comments'); // Assumes there is a 'Comments' sheet
    if (!sheet) {
      console.error('The specified sheet "Comments" was not found in the spreadsheet.');
      return;
    }
    // Append a new row with the comment and the slide URL
    sheet.appendRow([new Date(), commentText, slideUrl]);
    Logger.log('New row added to the sheet with the comment.');
  } catch (error) {
    Logger.log('Failed to add the comment to the sheet: ' + error.toString());
  }
}

/**
 * Ensures that the required headers are present in the sheet.
 * @param {string} sheetId - The ID of the Google Sheet.
 */
function setupSheetHeaders(sheetId) {
  const headers = ['Timestamp', 'Comment', 'Slide URL'];
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Comments'); // Assumes there is a 'Comments' sheet
  if (!sheet) {
    console.error('The specified sheet "Comments" was not found in the spreadsheet.');
    return;
  }
  // Check if the first row contains the headers
  const range = sheet.getRange(1, 1, 1, headers.length);
  const firstRowValues = range.getValues();
  
  // If the first row doesn't match the headers, set them
  if (!firstRowValues[0] || firstRowValues[0].length !== headers.length || !firstRowValues[0].every((value, index) => value === headers[index])) {
    range.setValues([headers]);
    Logger.log('Headers set in the sheet: ' + headers.join(', '));
  }
}

/**
 * A helper function to clear all content from the sheet, useful during development or testing.
 * @param {string} sheetId - The ID of the Google Sheet.
 */
function clearSheetContent(sheetId) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Comments');
  if (!sheet) {
    console.error('The specified sheet "Comments" was not found in the spreadsheet.');
    return;
  }
  sheet.clear();
  Logger.log('All content in the sheet has been cleared.');
}

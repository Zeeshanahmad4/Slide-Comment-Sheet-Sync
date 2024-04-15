// Code.gs

/**
 * Sets up the trigger to run whenever a comment is added in Google Slides.
 */
function setupTrigger() {
  const slideId = 'YOUR_SLIDES_ID'; // Placeholder for your Google Slides ID
  ScriptApp.newTrigger('processNewComment')
           .forSpreadsheet(SpreadsheetApp.openById(slideId))
           .onEdit()
           .create();
}

/**
 * Main function that processes new comments in Google Slides.
 */
function processNewComment(e) {
  // Check if the edit includes a comment with "@googlesheet"
  if (e.value.includes("@googlesheet")) {
    const commentText = e.value;
    const slideUrl = e.source.getUrl();
    SlidesHelper.addCommentToSheet(commentText, slideUrl);
  }
}

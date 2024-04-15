// SlidesHelper.gs

/**
 * Checks all slides in a presentation for new comments tagged with "@googlesheet"
 * and passes them along to the Sheets module to be logged.
 * @param {string} presentationId - The ID of the Google Slides presentation.
 */
function checkForNewComments(presentationId) {
  const presentation = SlidesApp.openById(presentationId);
  const slides = presentation.getSlides();
  slides.forEach(slide => {
    const comments = slide.getNotesPage().getSpeakerNotesShape().getText().asString();
    // Regex to find "@googlesheet" mentions
    const regex = /@googlesheet/gi;
    if (regex.test(comments)) {
      const commentText = comments.match(regex)[0];
      const slideUrl = getSlideUrl(presentationId, slide.getObjectId());
      SheetsHelper.addCommentToSheet(commentText, slideUrl, 'YOUR_SHEET_ID'); // Ensure to replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
    }
  });
}

/**
 * Constructs the URL for a specific slide in a presentation.
 * @param {string} presentationId - The ID of the presentation.
 * @param {string} slideObjectId - The object ID of the slide.
 * @return {string} - The URL to the specific slide.
 */
function getSlideUrl(presentationId, slideObjectId) {
  return `https://docs.google.com/presentation/d/${presentationId}/edit#slide=id.${slideObjectId}`;
}

/**
 * Setup initial triggers for checking comments on a periodic basis, if required.
 * This is an optional setup function depending on your use case.
 * @param {string} presentationId - The ID of the Google Slides presentation to monitor.
 */
function setupPeriodicCommentCheck(presentationId) {
  ScriptApp.newTrigger('checkForNewComments')
           .timeBased()
           .everyMinutes(5) // Frequency can be adjusted based on needs
           .create();
}

/**
 * A manual trigger function to invoke comment checking for testing purposes.
 * @param {string} presentationId - The ID of the Google Slides presentation.
 */
function manualTriggerCheckComments(presentationId) {
  checkForNewComments(presentationId);
}

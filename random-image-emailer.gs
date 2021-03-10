// Send random Google Photos image in an email

// Here, we send it to IFTTT as an attachment
// You can then use IFTTT to do whatever with the image
// Image date is also included in the body and can be used

function sendRandomImage() {
  // Google Photos Album ID
  // Can be obtained using the API tester on the right
  // https://developers.google.com/photos/library/reference/rest/v1/albums/list
  var albumId = "";

  var headers = {"Authorization": "Bearer " + ScriptApp.getOAuthToken()};
  var url = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
  var mediaItems = [];
  var pageToken = "";
  do 
  {
    var params = {
      method: "post",
      headers: headers,
      contentType: "application/json",
      payload: JSON.stringify({albumId: albumId, pageSize: 100, pageToken: pageToken}),
    }
    var res = UrlFetchApp.fetch(url, params);
    var obj = JSON.parse(res.getContentText());
    
    Array.prototype.push.apply(mediaItems, obj.mediaItems);
    
    pageToken = obj.nextPageToken || "";

  } while (pageToken);

  var photos = mediaItems;

  // Gets random photo
  var randomPhoto = photos[Math.floor(Math.random() * photos.length)]

  // Gets image creation date
  var date = randomPhoto.mediaMetadata.creationTime

  // Email parameters
  var to      = "trigger@applet.ifttt.com"      // comma-separated list of email addresses
  var subject = "Random Google Photo"  // subject line
  var body    = `${date}` // email body

  // Takes image URL and converts to blob 
  // This is necessary to use it as an attachment
  var randomPhotoBlob = UrlFetchApp
    .fetch(randomPhoto.baseUrl)
    .getBlob();

  // Attach img
  // https://developers.google.com/apps-script/reference/mail/mail-app#advanced-parameters
  
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
    attachments: [randomPhotoBlob]
  });
function doGet(request) {
  return HtmlService.createTemplateFromFile('Page')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function requestBot(formObject) {
  eval(UrlFetchApp.fetch('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js').getContentText());
  var startDate = moment.utc(formObject.startDate).format('MMMM D, Y HH:mm') + ' EDT';
  var endDate = moment.utc(formObject.endDate).format('MMMM D, Y HH:mm') + ' EDT';
  var name = formObject.name;
  var department = formObject.department;
  var timeType = formObject.timeType;
  var title = name + '-' + department + '-' + timeType;
  var regHours = formObject.regHours;
  var ptoReq = formObject.ptoReq;
  var partialEx = formObject.partialEx;
  var description = "Name: " + name + " Team: " + department + " Starting Day and Date: " + startDate +  " Ending (Last) Day and Date: " + endDate + " Regular Schedule: " + regHours + "PTO Requested: " + ptoReq + " Partial Day Details(if applicable): " + partialEx;
  var location = 'BAH Service Desk ' + department;
  
  if(timeType === 'FH' || startDate === endDate) {
    var floatEvent = CalendarApp.getDefaultCalendar()
    .createAllDayEvent(title,new Date(startDate),{location: location, description:description, guests: 'jody.nusom@compucom.com , ken.blinn@compucom.com, beatrice.overstreet@compucom.com', sendInvites: false});
  }else {
   var ptoEvent = CalendarApp.getDefaultCalendar()
   .createEvent(title, new Date(startDate), new Date(endDate),{location: location, description:description, guests: 'jody.nusom@compucom.com , ken.blinn@compucom.com, beatrice.overstreet@compucom.com', sendInvites: false});

  }
}




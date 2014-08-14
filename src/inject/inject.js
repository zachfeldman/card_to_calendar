chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

	 function generate_calendar_link(){
  		
      var event_title = document.getElementsByClassName('aHz')[0].innerHTML
  	  var start_time = document.getElementsByClassName('aHz')[1].innerHTML
      var end_time = document.getElementsByClassName('aHz')[2].innerHTML
      var confirmation_number = /.*<span.*<\/span>(.*)/.exec(document.getElementsByClassName('aHB')[0].innerHTML)[1]
      var date = /(.*)<span.*<\/span>.*/.exec(document.getElementsByClassName('aHB')[0].innerHTML)[1]
      var location_from = document.getElementsByClassName('aHB aX4')[0].innerHTML
      var location_to = document.getElementsByClassName('aHB aX4')[1].innerHTML
      
      function parse_date(date, time){
        var parsed_date_step_one = moment(date + " " + time).format()
        var parsed_date_step_two = parsed_date_step_one.replace(/-/g, "").replace(/:/g, "")
        return parsed_date_step_two.substring(0,parsed_date_step_two.length-4) + "Z" 
      }
      
      var parsed_start_date = parse_date(date, start_time);
      var parsed_end_date = parse_date(date, end_time)
      var details = confirmation_number + "\nFrom: " + location_from + "\nTo: " + location_to + "\nConfirmation #: " + confirmation_number

      var link = "http://www.google.com/calendar/event?action=TEMPLATE&dates="+parsed_start_date+"%2F"+parsed_end_date+"&text="+encodeURIComponent(event_title)+"&details="+encodeURIComponent(details)
      var before_elem = document.getElementById(':2z')
      before_elem.insertAdjacentHTML('afterEnd', "<a href='"+link+"' target='_new'>Add to Calendar</a>")
    }
    setTimeout(generate_calendar_link, 3000)
  }
	}, 10);
});
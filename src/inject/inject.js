chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.command && (msg.command == "generate_link")) {

    function parse_date(date, time){
      var parsed_date_step_one = moment(date + " " + time).format();
      var parsed_date_step_two = parsed_date_step_one.replace(/-/g, "").replace(/:/g, "");
      return parsed_date_step_two.substring(0,parsed_date_step_two.length-4);
    }

    function parse_flight_container(flight_container){
      var event_title = flight_container.children().first().text();

      var date_confirmation = flight_container.children().eq(1).text();
      
      var date = date_confirmation.split("-")[0] + ", " + new Date().getFullYear();
      var confirmation_number = date_confirmation.split("-")[1];

      var start_time = flight_container.children().eq(2).children().eq(0).children().eq(0).children().eq(1).text();
      var end_time = flight_container.children().eq(2).children().eq(4).children().eq(0).children().eq(1).text();
   
      var location_from = flight_container.children().eq(2).children().eq(0).children().eq(0).children().eq(0).text();
      var location_to = flight_container.children().eq(2).children().eq(4).children().eq(0).children().eq(0).text();
      
      var parsed_start_date = parse_date(date, start_time);
      var parsed_end_date = parse_date(date, end_time);
      var details = confirmation_number + "\nFrom: " + location_from + "\nTo: " + location_to + "\nConfirmation #: " + confirmation_number;

      var link = "http://www.google.com/calendar/event?action=TEMPLATE&dates="+parsed_start_date+"%2F"+parsed_end_date+"&text="+encodeURIComponent(event_title)+"&details="+encodeURIComponent(details);

      flight_container.children().eq(2).append("<a href='"+link+"' target='_new'>Add to Calendar</a>");
    }

    results = []
    var filter = $("table[role='presentation']").find("div").filter(function() {
      if($(this).css("background-image").search(/mail\/sprites/)!= -1){
        results.push($(this));
      } 
    });

    if(results.length > 2){
      parse_flight_container(results[0].first().parent().next().children("div"));
      parse_flight_container(results[2].first().parent().next().children("div"));
    }else{
      parse_flight_container(results[0].first().parent().next().children("div"));
    }
  }

});
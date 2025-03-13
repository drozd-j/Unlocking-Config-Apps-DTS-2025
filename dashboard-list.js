var backgroundColor = IIf($datapoint.attr_IncidentTypeCategory == "RX", "#f3f3f3", '')
var card_color = IIf($datapoint.attr_IncidentTypeCategory == "RX", "#e0e0e0", '#FCFAF0')

// ATTRIBUTES
// Casing of incident names
var incident_proper = Proper($datapoint.poly_IncidentName)

// State
var state = When($datapoint.attr_POOState == "US-TX", "Texas",
$datapoint.attr_POOState == "US-WI", "Wisconsin",
$datapoint.attr_POOState == "US-CA", "California",
$datapoint.attr_POOState == "US-MO", "Missouri",
$datapoint.attr_POOState == "US-FL", "Florida",
"Undefined")

// WILDFIRE TYPES
// Define text to display if incident is wildfire or prescribed fire
var type = When($datapoint.attr_IncidentTypeCategory == "WF", "Wildfire", $datapoint.attr_IncidentTypeCategory == "RX", "Prescribed", "Undefined")

// Set colors for incident type tag
var type_color = When($datapoint.attr_IncidentTypeCategory == "WF", "#d9534f", $datapoint.attr_IncidentTypeCategory == "RX", "#808080", "#808080")

// PERCENT CONTAINED GAGE
// Find percent contained attribute and define filled color and background gage color
var contained = $datapoint.attr_PercentContained
var filledcolor = '#d9534f'
var gaugecolor = '#D6D6D6'

// Create gradient effect
var filled = Concatenate(filledcolor, ' ', (contained - 4))
var gauge = Concatenate(gaugecolor, ' ', contained)

// If no PercentContained attribute, hide the gage
var gauge_disp = IIf(IsEmpty(contained), 'none', 'flex')

// Create gauge chart
var chart = Concatenate('<div style="background:linear-gradient(to right,' + filled + '%, ' + gauge+ '%); display:' + gauge_disp + '; justify-content:center; border-radius:4px;margin: 0px 16px 16px"><p style="padding: 5px;color:#f0f0f0; font-size:20px; letter-spacing: .2rem"><strong>' + contained + '% Contained</strong></p></div>')

// DATE FORMATTING
// Return date suffix, like "st", "nd", etc.
var date_num = Text($datapoint.attr_FireDiscoveryDateTime, "D")
var date_suff = When (Right(date_num, 1) == "1", "st", 
        Right(date_num, 1) == "2", "nd", 
        Right(date_num, 1) == "3", "rd", 
        Right(date_num, 2) == "11", "th", 
        Right(date_num, 2) == "12", "th", 
        Right(date_num, 2) == "13", "th", "th")

var discovery_date = Text($datapoint.attr_FireDiscoveryDateTime, "MMM D") + date_suff + Text($datapoint.attr_FireDiscoveryDateTime, ", Y") + " at " + Text($datapoint.attr_FireDiscoveryDateTime,  "h:mm A")


return {
  textColor: '',
  backgroundColor: backgroundColor,
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
  attributes: {
    card_color: card_color,
    incident_proper: incident_proper,
    state: state,
    discovery_date: discovery_date,
    type_color: type_color,
    type: type,
    chart: chart
  }
}
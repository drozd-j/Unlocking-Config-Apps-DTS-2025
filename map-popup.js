// ATTRIBUTES
// Casing of incident names
var incident_proper = Proper($feature.poly_IncidentName)

// Define text to display if incident is wildfire or prescribed fire
var type = When($feature.attr_IncidentTypeCategory == "WF", "Wildfire", $feature.attr_IncidentTypeCategory == "RX", "Prescribed", "Undefined")

// Set colors for incident type tag
var type_color = When($feature.attr_IncidentTypeCategory == "WF", "#d9534f", $feature.attr_IncidentTypeCategory == "RX", "#808080", "#808080")

// State
var state = When($feature.attr_POOState == "US-TX", "Texas",
$feature.attr_POOState == "US-WI", "Wisconsin",
$feature.attr_POOState == "US-CA", "California",
$feature.attr_POOState == "US-MO", "Missouri",
$feature.attr_POOState == "US-FL", "Florida",
"Undefined")

// METRICS
// Display of incident size, cause, etc.
var disc_disp = IIf(IsEmpty($feature.attr_DiscoveryAcres), "none", "")
var size_disp = IIf(IsEmpty($feature.attr_IncidentSize), "none", "")
var cause_disp = IIf(IsEmpty($feature.attr_FireCause), "none", "")
var cost_disp = IIf(IsEmpty($feature.attr_EstimatedFinalCost), "none", "")

// Formatting of cost, final acres
var cost_text = Text($feature.attr_EstimatedFinalCost, "$" + "###,###")
var disc_text = Text($feature.attr_DiscoveryAcres, "###,###.###")
var size_text = Text($feature.attr_IncidentSize, "###,###.###")

// DATE FORMATTING
// Return date suffix, like "st", "nd", etc.
var date_num = Text($feature.attr_FireDiscoveryDateTime, "D")
var date_suff = When (Right(date_num, 1) == "1", "st", 
        Right(date_num, 1) == "2", "nd", 
        Right(date_num, 1) == "3", "rd", 
        Right(date_num, 2) == "11", "th", 
        Right(date_num, 2) == "12", "th", 
        Right(date_num, 2) == "13", "th", "th")

var discovery_date = Text($feature.attr_FireDiscoveryDateTime, "MMM D") + date_suff + Text($feature.attr_FireDiscoveryDateTime, ", Y") + " at " + Text($feature.attr_FireDiscoveryDateTime,  "h:mm A")

return { 
	type : 'text', 
	text : `<div style="background-color: #FCFAF0;border-radius: 2px;border: 2px solid #171717">
    <div style="display: flex; justify-content: space-between;">
        <p style="font-weight: bold;margin:8px;font-size: 20px;">
            ${incident_proper} Incident
        </p>
        <p style="background-color: ${type_color}; color:#f0f0f0; padding:4px;margin:4px 0px 12px 4px;border-radius:4px 0px 0px 4px;font-size: 16px; font-weight:bold; letter-spacing: .1rem">
            ${type}
        </p>
    </div>
    <hr width=80%; color="#171717">
    <p style="font-weight: 400;margin:16px 16px 8px 32px;font-size: 16px;">${$feature.attr_POOCounty} County, ${state}</p>
    <div style="padding: 8px 8px 0px; font-size: 18px; display:grid; grid-template-columns: 10ch 8ch;justify-content: space-around;">
        <p style="display: ${disc_disp};"><span style="font-weight:600; font-size:20px">${disc_text}</span> Discovery Acres</p>
        <p style="display: ${size_disp};"><span style="font-weight:600; font-size:20px">${size_text}</span> Total Acres</p>
        <p style="display: ${cause_disp}"><span style="font-weight:600; font-size:20px">${$feature.attr_FireCause}</span> Cause</p>
        <p style="display: ${cost_disp}"><span style="font-weight:600; font-size:18px">${cost_text}</span> Final Cost</p>
    </div>
    <p style="margin: 0px 0px 8px 8px; font-style: italic; font-weight: 400; font-size: 12px;">Discovered: ${discovery_date}</p>
</div>`
	}
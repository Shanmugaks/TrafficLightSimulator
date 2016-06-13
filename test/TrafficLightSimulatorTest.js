var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


QUnit.module('Input Validation', {
    setup: function () {
        $('<h2> Traffic Light Simulator </h2> Yellow light duration: (ms)<br><input type="text" id="YellowDuration" value="1000"/><br>Lights switching duration: (ms)<br><input type="text" id="SwitchingDuration" value="5000"/><br>Total Demo duration: (ms)<br><input type="text" id="TotalDuration" value="20000"/><br><input type="button" id="Start_Simulation" value="Start Simulation"/><br/> <label id="ValidationResult"/><br/>').appendTo('#qunit-fixture');

    },
    teardown: function () {
        $("#qunit-fixture").children().remove();
    }
});

test('Init ', function ()
{
    ok(Init(), 'Passed - Simulation button is initialized properly ');
    
    $("#qunit-fixture").children().remove();

    ok(!Init(), 'Passed - Simulation button is not initialized ');;
    
})

test('ValidateInput ', function () {

    document.getElementById("YellowDuration").value = parseInt('200');
    equal(200, ValidateInput("YellowDuration"), 'Passed - All positive Integers are valid ');

    document.getElementById("YellowDuration").value = parseInt('-1');
    equal(ValidateInput("YellowDuration"), 0, 'Passed - Negative value is not valid ');

    document.getElementById("YellowDuration").value = parseInt('0');
    equal(ValidateInput("YellowDuration"), 0, 'Passed - Zero value is not valid ');

    document.getElementById("YellowDuration").value = "";
    equal(0, ValidateInput("YellowDuration"), 'Passed - No entry value is not valid ');

})

test('ValidateAllValues ', function () {

    
    YellowDuration = 1000;
    SwitchingDuration = 5000;
    TotalDuration = 20000;
    ok(ValidateAllValues(), 'Passed - All positive Integers are valid ');

    YellowDuration = 9000;
    SwitchingDuration = 5000;
    TotalDuration = 20000;
    ok(!ValidateAllValues(), 'Passed - Yellow duration should be less than Switching duration ');
   

})


QUnit.module('Trigger', {
    setup: function ()
    {
        $('<div id="North" class="TrafficLightPanel"> <p id="RedLight" class="ON"></p><p id="YellowLight"></p><p id="GreenLight"></p></div><div id="South" class="TrafficLightPanel"> <p id="RedLight" class="ON"></p><p id="YellowLight"></p><p id="GreenLight"></p></div><div id="West" class="TrafficLightPanel"> <p id="RedLight" class="ON"></p><p id="YellowLight"></p><p id="GreenLight"></p></div><div id="East" class="TrafficLightPanel"> <p id="RedLight" class="ON"></p><p id="YellowLight"></p><p id="GreenLight"></p></div>').appendTo('#qunit-fixture');

   
    },
    teardown: function ()
    {
        $("#qunit-fixture").children().remove();
    }
});

test('All Traffic Lights ', function () {
  
    ok(Trigger("#North"), 'Passed - North Traffic Light is available');
    ok(Trigger("#South"), 'Passed - South Traffic Light is  available');
    ok(Trigger("#East"), 'Passed - West Traffic Light is  available');
    ok(Trigger("#West"), 'Passed - East tTraffic Light is  available');

})

test('Only North Light ', function ()
{
    $("#South").remove();
    $("#East").remove();
    $("#West").remove();

    ok(Trigger("#North"), 'Passed - North Traffic Light is available');
    ok(!Trigger("#South"), 'Passed - South Traffic Light is not available');
    ok(!Trigger("#East"), 'Passed - West Traffic Light is not available');
    ok(!Trigger("#West"), 'Passed - East tTraffic Light is not available');
   
})

test('Only South Light ', function () {

    $("#North").remove();
    $("#East").remove();
    $("#West").remove();

    ok(!Trigger("#North"), 'Passed - North Traffic Light is not available');
    ok(Trigger("#South"), 'Passed - South Traffic Light is  available');
    ok(!Trigger("#East"), 'Passed - West Traffic Light is not available');
    ok(!Trigger("#West"), 'Passed - East tTraffic Light is not available');

})

test('Only West Light ', function () {
    $("#North").remove();
    $("#East").remove();
    $("#South").remove();
    ok(!Trigger("#North"), 'Passed - North Traffic Light is not available');
    ok(!Trigger("#South"), 'Passed - South Traffic Light is not available');
    ok(!Trigger("#East"), 'Passed - West Traffic Light is not available');
    ok(Trigger("#West"), 'Passed - East tTraffic Light is  available');

})

test('Only East Light ', function () {
    $("#North").remove();
    $("#West").remove();
    $("#South").remove();
    ok(!Trigger("#North"), 'Passed - North Traffic Light is not available');
    ok(!Trigger("#South"), 'Passed - South Traffic Light is not available');
    ok(Trigger("#East"), 'Passed - West Traffic Light is  available');
    ok(!Trigger("#West"), 'Passed - East tTraffic Light is not available');

})

test('No Lights ', function () {
    $("#qunit-fixture").children().remove();
    ok(!Trigger("#North"), 'Passed - North Traffic Light is not available');
    ok(!Trigger("#South"), 'Passed - South Traffic Light is not available');
    ok(!Trigger("#East"), 'Passed - West Traffic Light is  not available');
    ok(!Trigger("#West"), 'Passed - East tTraffic Light is not available');

})

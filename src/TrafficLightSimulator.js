var YellowDuration = 0
var SwitchingDuration = 0;
var TotalDuration = 0;
var GreenDuration = 0;

var TimerIntervalID = 0;

$(document).ready(function () {
    Init();
});

function Init() {
    var $StartSimulation = $("#Start_Simulation")

    if ($StartSimulation.length == 0) {
        return false;
    }
    $StartSimulation.click(function () {
        return OnStartSimulation();
    });

    return true;
}

function Validation() {
    YellowDuration = ValidateInput("YellowDuration");
    if (0 == YellowDuration) {
        return false;
    }
    SwitchingDuration = ValidateInput("SwitchingDuration");
    if (0 == SwitchingDuration) {
        return false;
    }
    TotalDuration = ValidateInput("TotalDuration");
    if (0 == TotalDuration) {
        return false;
    }

    if (false == ValidateAllValues()) {
        return false;
    }

    GreenDuration = SwitchingDuration - YellowDuration;

    return true;
}

function ValidateInput(fieldName) {
    var tmpElement = document.getElementById(fieldName);
    if (tmpElement == null) {
        return 0;
    }

    if (true == isNaN(tmpElement.value)) {
        return 0;
    }

    var value = parseInt(tmpElement.value);

    if (true == isNaN(value)) {
        return 0;
    }

    if (value <= 0) {
        return 0;
    }

    return value;
}

function ValidateAllValues() {
    if (TotalDuration < SwitchingDuration || SwitchingDuration < YellowDuration) {
        return false;
    }

    return true;

}


function OnStartSimulation() {
    if (false == Validation()) {
        ShowValidationError();
        return false;
    }

    ShowValidationSuccess();

    
    ShowDemo();

    return true;
}

function ShowDemo() {
    TrafficLightTrigger();
    TimerIntervalID = setInterval(TrafficLightTrigger, 2 * SwitchingDuration);
    setTimeout(EndDemo, TotalDuration);

}

function EndDemo() {
    clearInterval(TimerIntervalID);
    document.getElementById("Start_Simulation").disabled = false;
}

function ShowValidationError() {

    document.getElementById("ValidationResult").value = "Input Validation error!!";
    document.getElementById("ValidationResult").style.backgroundColor = 'red';

}

function ShowValidationSuccess() {
    document.getElementById("ValidationResult").value = "Input Validation success!!";
    document.getElementById("ValidationResult").style.backgroundColor = 'green';
    document.getElementById("Start_Simulation").disabled = true;

}


function TrafficLightTrigger() {
    Start("#North");
    Start("#South");
    setTimeout(Start, SwitchingDuration, "#West");
    setTimeout(Start, SwitchingDuration, "#East");
}

function Start(trafficlight) {
    console.log(" Start invoked");
    Trigger(trafficlight);
    setTimeout(Trigger, GreenDuration, trafficlight);
    setTimeout(Trigger, SwitchingDuration, trafficlight);
}

function Trigger(trafficlight)
{
    if ($(trafficlight).length == 0)
    {
        return false;
    }

    var CurrNode = $(trafficlight).find('.ON');

    // 
    if (CurrNode.prev().length) {
        // If the current node is ON and it's second & 3rd node
        CurrNode
            .removeClass('ON')
            .prev()
            .addClass('ON');
    }
    else {
        // If the current node is ON and first node of type 'p' then move to the last.
        CurrNode
            .removeClass('ON')
            .parent()
            .find('p:last')
            .addClass('ON');
    }

    return true;
}

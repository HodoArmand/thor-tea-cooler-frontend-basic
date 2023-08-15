import {formatFloat, capitalizeFirstLetter, enableById, disableById} from "/js/TtcClientUtilities.js";
import {TeaState} from "/js/TtcState.js";

const setTempValues = (teaState) =>
{
    document.getElementById('temperature').innerText = formatFloat(teaState.temperature);
    document.getElementById('targetTemperature').innerText = formatFloat(teaState.targetTemperature);
    document.getElementById('temperatureBar').style.width = formatFloat(teaState.temperature) + '%';
    document.getElementById('targetTemperatureBar').style.width = formatFloat(teaState.targetTemperature) + '%';
};

const hideAllRelayIcons = () =>
{
    document.getElementById("relayStateIcon1On").classList.add("hidden");
    document.getElementById("relayStateIcon1Off").classList.add("hidden");
    document.getElementById("relayStateIcon2On").classList.add("hidden");
    document.getElementById("relayStateIcon2Off").classList.add("hidden");
};

const setRelayValue = (relayNumber, isOn) =>
{
    if (isOn)
    {
        document.getElementById("relayStateIcon" + relayNumber + "On").classList.remove("hidden");
        document.getElementById("relayStateDesc" + relayNumber).innerText = "On";
    }
    else
    {
        document.getElementById("relayStateIcon" + relayNumber + "Off").classList.remove("hidden");
        document.getElementById("relayStateDesc" + relayNumber).innerText = "Off";
    }
};

const setRelayValues = (teaState) =>
{
    hideAllRelayIcons();
    setRelayValue(1, teaState.relay1);
    setRelayValue(2, teaState.relay2);

};

const setManualControls = (isOn) =>
{
    if (isOn)
    {
        enableById("manualSwitchRelay1Button");
        enableById("manualSwitchRelay2Button");
    }
    else
    {
        disableById("manualSwitchRelay1Button");
        disableById("manualSwitchRelay2Button");
    }
};

const setAutoControls = (mode) =>
{
    switch (mode)
    {
        case "manual":
            disableById("modeAutoStart");
            disableById("modeAutoStop");
            break;
        case "autoReady":
            enableById("modeAutoStart");
            disableById("modeAutoStop");
            break;
        case "autoCooling":
            disableById("modeAutoStart");
            enableById("modeAutoStop");
            break;
        case "autoFinished":
            disableById("modeAutoStart");
            disableById("modeAutoStop");
            break;
    }
};

const setModeControls = (mode) =>
{
    switch (mode)
    {
        case "manual":
            enableById("modeButtonAuto");
            disableById("modeButtonManual");
            break;
        case "autoReady":
            disableById("modeButtonAuto");
            enableById("modeButtonManual");
            break;
        case "autoCooling":
            disableById("modeButtonAuto");
            enableById("modeButtonManual");
            break;
        case "autoFinished":
            enableById("modeButtonAuto");
            enableById("modeButtonManual");
            break;
    }
};

const setModeValues = (teaState) =>
{
    const modeString = capitalizeFirstLetter(teaState.mode);

    let modeIcons = document.getElementsByClassName("mode-icon");
    for (const modeIcon of modeIcons)
    {
        modeIcon.classList.add("hidden");
    }

    let modeTitles = document.getElementsByClassName("mode-title");
    for (const modeTitle of modeTitles)
    {
        modeTitle.classList.add("hidden");
    }

    let modeDescriptions = document.getElementsByClassName("mode-desc");
    for (const modeDescription of modeDescriptions)
    {
        modeDescription.classList.add("hidden");
    }

    document.getElementById('modeIcon' + modeString).classList.remove("hidden");
    document.getElementById('mode' + modeString + 'Title').classList.remove("hidden");
    document.getElementById('mode' + modeString + 'Desc').classList.remove("hidden");

    setModeControls(teaState.mode);
    setAutoControls(teaState.mode);
    teaState.mode === "manual" ? setManualControls(true) : setManualControls(false);

};

class TtcUi
{
    constructor()
    {
        this.setTempValues = setTempValues;
        this.setModeValues = setModeValues;
        this.setRelayValues = setRelayValues;
    }
}

export {TtcUi};
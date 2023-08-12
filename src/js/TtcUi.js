import {formatFloat, capitalizeFirstLetter} from "/js/TtcClientUtilities.js";
import {TeaState} from "/js/TtcState.js";

const setTempValues = (teaState) =>
{
    document.getElementById('temperature').innerText = formatFloat(teaState.temperature);
    document.getElementById('targetTemperature').innerText = formatFloat(teaState.targetTemperature);
    document.getElementById('temperatureBar').style.width = formatFloat(teaState.temperature) + '%';
    document.getElementById('targetTemperatureBar').style.width = formatFloat(teaState.targetTemperature) + '%';
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
    document.getElementById('mode' + modeString+'Title').classList.remove("hidden");
    document.getElementById('mode' + modeString+'Desc').classList.remove("hidden");
};

class TtcUi
{
    constructor()
    {
        this.setTempValues = setTempValues;
        this.setModeValues = setModeValues;
    }
}

export {TtcUi};
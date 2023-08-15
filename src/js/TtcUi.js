import {formatFloat, capitalizeFirstLetter, enableById, disableById} from "/js/TtcClientUtilities.js";
import {TeaState} from "/js/TtcState.js";

const toggleButtonLoading = (buttonId) =>
{
    let button = document.getElementById(buttonId);
    let buttonLoader = document.getElementById(buttonId + "Loader");

    button.classList.toggle("!hidden");
    buttonLoader.classList.toggle("!hidden");

};

const toggleManualSwitchButtonsLoading = (relayNumber) =>
{
    relayNumber === 1 ? toggleButtonLoading("manualSwitchRelay1Button") : relayNumber === 2 ? toggleButtonLoading("manualSwitchRelay2Button"): this.ui.openModal('Info','bad relay #', 'The entered relayNumber is invalid. There are only two active cooling fan relays, #1 and #2.');
};

const toggleTargetTempButtonsLoading = () =>
{
    toggleButtonLoading("targetTemperatureDecreaseButton");
    toggleButtonLoading("targetTemperatureIncreaseButton");
    toggleButtonLoading("setTargetTemperatureRangeSliderButton");
};

const toggleModeButtonsLoading = () =>
{
    toggleButtonLoading("modeButtonAuto");
    toggleButtonLoading("modeButtonManual");
    toggleButtonLoading("modeAutoStart");
    toggleButtonLoading("modeAutoStop");

};

const setTempValues = (teaState) =>
{
    document.getElementById('temperature').innerText = formatFloat(teaState.temperature);
    document.getElementById('targetTemperature').innerText = formatFloat(teaState.targetTemperature);
    document.getElementById('temperatureBar').style.width = formatFloat(teaState.temperature) + '%';
    document.getElementById('targetTemperatureBar').style.width = formatFloat(teaState.targetTemperature) + '%';
};

const setTargetTemperatureControls = (isDecreaseOn, isIncreaseOn) =>
{
    isDecreaseOn ? enableById("targetTemperatureDecreaseButton") : disableById("targetTemperatureDecreaseButton");
    isIncreaseOn ? enableById("targetTemperatureIncreaseButton") : disableById("targetTemperatureIncreaseButton");
}

const followTargetTemperatureSliderValue = () =>
{
    document.getElementById("targetTemperatureRangeButtonCelsius").innerText = document.getElementById("targetTemperatureRangeSlider").value;
}

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

const openModal = (type, title, desc) =>
{
    let ModalId = type + 'Modal';
    HSOverlay.open(document.getElementById(ModalId));
    document.getElementById(type + "ModalTitle").innerText = title;
    document.getElementById(type + "ModalDesc").innerText = desc;

}

const closeModal = (type) =>
{
    let ModalId = type + 'Modal';
    HSOverlay.close(document.getElementById(ModalId));
    document.getElementById(type + "ModalTitle").innerText = "";
    document.getElementById(type + "ModalDesc").innerText = "";
}

class TtcUi
{
    constructor()
    {
        this.setTempValues = setTempValues;
        this.setModeValues = setModeValues;
        this.setRelayValues = setRelayValues;
        this.setTargetTemperatureControls = setTargetTemperatureControls;
        this.followTargetTemperatureSliderValue = followTargetTemperatureSliderValue;

        this.toggleButtonLoading = toggleButtonLoading;
        this.toggleTargetTempButtonsLoading = toggleTargetTempButtonsLoading;
        this.toggleModeButtonsLoading = toggleModeButtonsLoading;
        this.toggleManualSwitchButtonsLoading = toggleManualSwitchButtonsLoading;

        this.openModal = openModal;
        this.closeModal = closeModal;

    }
}

export {TtcUi};
import {formatFloat, capitalizeFirstLetter, enableById, disableById} from "./TtcClientUtilities.js";
import {TeaState} from "./TtcState.js";

const toggleButtonLoading = (buttonId) =>
{
    let button = document.getElementById(buttonId);
    let buttonLoader = document.getElementById(buttonId + "Loader");

    button.classList.toggle("!hidden");
    buttonLoader.classList.toggle("!hidden");

};

const toggleManualSwitchButtonsLoading = (relayNumber) =>
{
    relayNumber === 1 ? toggleButtonLoading("manualSwitchRelay1Button") : relayNumber === 2 ? toggleButtonLoading("manualSwitchRelay2Button") : this.ui.openModal('Info', 'bad relay #', 'The entered relayNumber is invalid. There are only two active cooling fan relays, #1 and #2.');
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

const temperatureToBarLength = (temperature) =>
{
    let barLength = 30.00;
    if (temperature <= 30.00)
    {
        return barLength;
    }
    else
    {
        barLength = temperature % 100;

        return barLength;
    }
};

const setTempValues = (teaState) =>
{
    document.getElementById('temperature').innerText = formatFloat(teaState.temperature);
    document.getElementById('targetTemperature').innerText = formatFloat(teaState.targetTemperature);

    document.getElementById('temperatureBar').style.width = formatFloat(temperatureToBarLength(teaState.temperature)) + '%';
    document.getElementById('targetTemperatureBar').style.width = formatFloat(temperatureToBarLength(teaState.targetTemperature)) + '%';
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

};

const closeModal = (type) =>
{
    let ModalId = type + 'Modal';
    HSOverlay.close(document.getElementById(ModalId));
    document.getElementById(type + "ModalTitle").innerText = "";
    document.getElementById(type + "ModalDesc").innerText = "";
};

const configSidebarClose = () =>
{
    const spanElements = document.querySelectorAll('#configSidebar a span');

    spanElements.forEach(span =>
    {
        span.classList.add("!hidden");
        span.classList.add("px-4");
        span.classList.remove("px-2");
    });

    const aElements = document.querySelectorAll('#configSidebar a');

    aElements.forEach(a =>
    {
        a.classList.add("justify-center");
        a.classList.remove("justify-start");
    });

    const close = document.getElementById("configSideBarClose");
    close.classList.add("!hidden");

    const open = document.getElementById("configSideBarOpen");
    open.classList.remove("!hidden");

    const configSideBar = document.getElementById("configSidebar");
    configSideBar.classList.remove("w-64");
    configSideBar.classList.add("w-20");
};

const configSidebarOpen = () =>
{
    const spanElements = document.querySelectorAll('#configSidebar a span');

    spanElements.forEach(span =>
    {
        span.classList.remove("!hidden");
        span.classList.remove("px-4");
        span.classList.add("px-2");
    });

    const aElements = document.querySelectorAll('#configSidebar a');

    aElements.forEach(a =>
    {
        a.classList.remove("justify-center");
        a.classList.add("justify-start");
    });


    const open = document.getElementById("configSideBarOpen");
    open.classList.add("!hidden");

    const close = document.getElementById("configSideBarClose");
    close.classList.remove("!hidden");

    const configSideBar = document.getElementById("configSidebar");
    configSideBar.classList.add("w-64");
    configSideBar.classList.remove("w-20");
};

/**
 * Utilities to manipulate ChartJS data and labels
 */
class ChartUtils
{
    addData = (chart, label, temperature, targetTemperature) =>
    {
        chart.data.labels.push(label);

        chart.data.datasets[0].data.push(temperature);
        chart.data.datasets[1].data.push(targetTemperature);

        chart.update();
    }

    removeLastData = (chart) =>
    {
        chart.data.labels.pop();
        chart.data.datasets[0].data.pop();
        chart.data.datasets[1].data.pop();
        chart.update();
    }

    removeFirstData = (chart) =>
    {
        chart.data.labels.splice(0, 1);
        chart.data.datasets[0].data.splice(0, 1);
        chart.data.datasets[1].data.splice(0, 1);
        chart.update();
    }
};

class TtcUi
{
    constructor()
    {
        let url = window.location.href;
        let isIndexPage = (url.indexOf("login") === -1 && url.indexOf("configuration") === -1 && url.indexOf("Configuration") === -1);
        let isConfigPage = (url.indexOf("configuration") !== -1 || url.indexOf("Configuration") !== -1);

        if (isConfigPage)
        {
            this.configSidebarClose = configSidebarClose;
            this.configSidebarOpen = configSidebarOpen;
        }
        else if (isIndexPage)
        {
            this.chartUtil = new ChartUtils();
            this.temperatureChart = new Chart(document.getElementById('temperatureChart'), {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Temperature',
                            data: [],
                            borderWidth: 3,
                            borderColor: '#fde047', // yellow-300
                            backgroundColor: '#fef08a', //  yellow-200
                            tension: 0.4,
                        },
                        {
                            label: 'Target temperature',
                            data: [],
                            borderWidth: 3,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                            tension: 0.4,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Celsius ℃'
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                        }
                    }
                }
            });

            this.setTempValues = setTempValues;
            this.setModeValues = setModeValues;
            this.setRelayValues = setRelayValues;
            this.setTargetTemperatureControls = setTargetTemperatureControls;
            this.followTargetTemperatureSliderValue = followTargetTemperatureSliderValue;

            this.toggleTargetTempButtonsLoading = toggleTargetTempButtonsLoading;
            this.toggleModeButtonsLoading = toggleModeButtonsLoading;
            this.toggleManualSwitchButtonsLoading = toggleManualSwitchButtonsLoading;
        }

        this.toggleButtonLoading = toggleButtonLoading;

        this.openModal = openModal;
        this.closeModal = closeModal;
    }

    addDataToTemperatureChart = (temperature, targetTemperature) =>
    {
        if (this.temperatureChart.data.datasets[0].data.length >= 15)
        {
            this.chartUtil.removeFirstData(this.temperatureChart);
        }
        this.chartUtil.addData(this.temperatureChart, new Date().toTimeString().substring(0, 8), temperature, targetTemperature);
    }

}

export {TtcUi};
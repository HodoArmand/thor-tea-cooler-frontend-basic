import {formatFloat} from "/js/TtcClientUtilities.js";
import {TeaState} from "/js/TtcState";

const setTempValues = (teaState) =>
{
    document.getElementById('temperature').innerText = formatFloat(teaState.temperature);
    document.getElementById('targetTemperature').innerText = formatFloat(teaState.targetTemperature);
};

class TtcUi
{
    constructor()
    {
        this.setTempValues = setTempValues;
    }
}

export {TtcUi};
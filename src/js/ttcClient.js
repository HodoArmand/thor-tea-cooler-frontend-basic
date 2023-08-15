import {TtcApiInterface} from "/js/TtcApiInterface.js";
import {TtcUi} from "/js/TtcUi.js";
import {formatFloat} from "/js/TtcClientUtilities.js";

class TtcClient
{
    sse;

    get ui()
    {
        return this._ui;
    }

    set ui(value)
    {
        this._ui = value;
    }

    get api()
    {
        return this._api;
    }

    set api(value)
    {
        this._api = value;
    }

    constructor()
    {
        this._api = new TtcApiInterface();
        this._ui = new TtcUi();
        this.sse = new EventSource('//' + this.api.ttcIp + '/events');
        this.initSSEventlisteners = initSSEventlisteners;

        this.initSSEventlisteners(this.sse);

        this.setTeaStateValues();
    }

    setTeaStateValues = () =>
    {
        this.ui.setTempValues(this.api.teaState);
        this.ui.setModeValues(this.api.teaState);
        this.ui.setRelayValues(this.api.teaState);
        this.ui.setTargetTemperatureControls(this.api.teaState.targetTemperature > 20, this.api.teaState.targetTemperature < 75);
    }


    targetTemperatureDecrease = () =>
    {
        this.ui.toggleTargetTempButtonsLoading();

        this.api.hwRequests.setTargetTemperature(this.api.teaState.targetTemperature - 1)
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- setTargetTemperature: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setTargetTemperature error: " + error.status + error.msg + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', error.status, error.msg + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleTargetTempButtonsLoading();
            });
    }

    targetTemperatureIncrease = () =>
    {
        this.ui.toggleTargetTempButtonsLoading();

        this.api.hwRequests.setTargetTemperature(this.api.teaState.targetTemperature + 1)
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- setTargetTemperature: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                // TODO: durther QA testing for no response errors
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setTargetTemperature error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleTargetTempButtonsLoading();
            });
    };

    setTargetTemperature = () =>
    {
        this.ui.toggleTargetTempButtonsLoading();

        let newTargetTemperature = document.getElementById("targetTemperatureRangeSlider").value;

        this.api.hwRequests.setTargetTemperature(newTargetTemperature)
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- setTargetTemperature: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                // TODO: durther QA testing for no response errors
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setTargetTemperature error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleTargetTempButtonsLoading();
            });
    };

    setModeAutoReady = () =>
    {
        this.ui.toggleModeButtonsLoading();

        this.api.hwRequests.setModeAuto()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- setModeAutoReady: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setModeAutoReady error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleModeButtonsLoading();
            });
    };

    setModeManual = () =>
    {
        this.ui.toggleModeButtonsLoading();

        this.api.hwRequests.setModeManual()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- setModeManual: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setModeManual error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleModeButtonsLoading();
            });
    };

    startAutoCooling = () =>
    {
        this.ui.toggleModeButtonsLoading();

        this.api.hwRequests.startAutoCooling()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- startAutoCooling: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- startAutoCooling error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleModeButtonsLoading();
            });
    };

    stopAutoCooling = () =>
    {
        this.ui.toggleModeButtonsLoading();

        this.api.hwRequests.stopAutoCooling()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- stopAutoCooling: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- stopAutoCooling error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleModeButtonsLoading();
            });
    };

    switchRelay = (relayNumber) =>
    {
        this.ui.toggleManualSwitchButtonsLoading(relayNumber);
        this.api.hwRequests.switchRelay(relayNumber)
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    console.log(result.msg);
                }
                else
                {
                    console.log("-1- switchRelay: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- switchRelay error: " + error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.message + ' / ' + error.response + '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleManualSwitchButtonsLoading(relayNumber);
            });
    };


}

const initSSEventlisteners = (sse) =>
{
    if (!!window.EventSource)
    {
        sse.addEventListener('open', function (event)
        {
            console.log("Connected SSE channel.");
        }, false);

        sse.addEventListener('error', function (event)
        {
            if (event.target.readyState !== EventSource.OPEN)
            {
                console.log("SSE channel disconnected.");
            }
        }, false);

        sse.addEventListener('message', function (event)
        {
            console.log("message", event.data);
        }, false);

        sse.addEventListener('teaState', function (event)
        {
            let teaState_ = JSON.parse(event.data);
            console.log("Tea state received trough SSE: " + event.data);
            window.ttcClient.api.teaState.setFromResponse(teaState_);
            window.ttcClient.setTeaStateValues();
            window.ttcClient.ui.addDataToTemperatureChart(teaState_.temperature, teaState_.targetTemperature,);

        }, false);
    }
}


window.ttcClient = new TtcClient();

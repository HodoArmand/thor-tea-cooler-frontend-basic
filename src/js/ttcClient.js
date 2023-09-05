import {TtcApiInterface} from "./TtcApiInterface.js";
import {TtcUi} from "./TtcUi.js";
import {formatFloat, enableById, disableById, getFormDataByDataTag, setFormDataFromResponse} from "./TtcClientUtilities.js";

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

        let url = window.location.href;
        let isIndexPage = (url.indexOf("login") === -1 && url.indexOf("configuration") === -1 && url.indexOf("Configuration") === -1);
        let isConfigPage = (url.indexOf("configuration") !== -1 || url.indexOf("Configuration") !== -1);

        if (isIndexPage)
        {
            this.sse = new EventSource('//' + this.api.ttcIp + '/events');
            this.initSSEventlisteners = initSSEventlisteners;

            this.initSSEventlisteners(this.sse);

            this.setTeaStateValues();
        }
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
                console.log("-1- setTargetTemperature error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- setTargetTemperature error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- setModeAutoReady error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- setModeManual error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- startAutoCooling error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- stopAutoCooling error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
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
                console.log("-1- switchRelay error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleManualSwitchButtonsLoading(relayNumber);
            });
    };

    login = () =>
    {
        this.ui.toggleButtonLoading("loginButton");

        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;

        this.api.auth.login(name, password)
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    this.api.auth.userName = name;
                    this.api.auth.apiKey = result.msg;
                    window.location.replace("./");
                }
                else
                {
                    console.log("-1- login: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- login error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("loginButton");
            });
    };

    logout = () =>
    {
        this.api.auth.logout()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 201 && result.status === "ok")
                {
                    this.api.auth.userName = 'unset';
                    this.api.auth.apiKey = 'unset';
                    window.location.replace('./login');
                }
                else
                {
                    console.log("-1- logout: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- logout error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            });
    };

    isTtcTest = () =>
    {

        this.ui.toggleButtonLoading("ttcIpTestButton");

        let address = document.getElementById("ttcIp").value;

        axios.defaults.baseURL = "http://" + address;

        document.getElementById("ttcIpOk").classList.add("!hidden");
        document.getElementById("ttcIpNotOk").classList.add("!hidden");

        let url = window.location.href;
        let isConfigPage = (url.indexOf("configuration") !== -1 || url.indexOf("Configuration") !== -1);

        this.api.hwRequests.isTtc()
            .then(result =>
            {
                let fieldErrors = result.fieldErrors ? result.fieldErrors.join('\n') : 'none';
                if (result.statusCode === 200 && result.status === "yes")
                {
                    this.api.ttcIp = address;
                    document.getElementById("ttcIpOk").classList.remove("!hidden");
                    isConfigPage ? '' : enableById("loginButton");
                }
                else
                {
                    console.log("-1- isTtc: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', 'Error - Not a TTC Device', 'No TTC Device was found at the given address.');

                    document.getElementById("ttcIpNotOk").classList.remove("!hidden");
                    isConfigPage ? '' : disableById("loginButton");
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- isTtc error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error - Not a TTC Device or System error.', 'No TTC Device was found at the given address or there was a system error when making the request.');

                document.getElementById("ttcIpNotOk").classList.remove("!hidden");
                isConfigPage ? '' : disableById("loginButton");
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("ttcIpTestButton");
            });
    };

    getNetworkConfig = () =>
    {
        this.api.configRequests.getNetworkConfig()
            .then(result =>
            {
                if (result.statusCode === 200 && result.status === "ok")
                {
                    let config = JSON.parse(result.msg);
                    setFormDataFromResponse(config);
                }
                else
                {
                    console.log("-1- getNetworkConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- getNetworkConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            });
    };

    setNetworkConfig = () =>
    {
        this.ui.toggleButtonLoading("saveTtcNetworkConfigButton");

        let formData = getFormDataByDataTag("setConfigurationRequest");

        this.api.configRequests.setNetworkConfig(formData)
            .then(result =>
            {
                if (result.statusCode === 201 && result.status === "ok")
                {
                    this.ui.openModal('info', result.status, "Configuration saved successfully.");
                }
                else
                {
                    console.log("-1- setNetworkConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setNetworkConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("saveTtcNetworkConfigButton");
            });
    };

    getHardwareConfig = () =>
    {
        this.api.configRequests.getHardwareConfig()
            .then(result =>
            {
                if (result.statusCode === 200 && result.status === "ok")
                {
                    let config = JSON.parse(result.msg);
                    setFormDataFromResponse(config);
                }
                else
                {
                    console.log("-1- getHardwareConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- getHardwareConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            });
    };

    setHardwareConfig = () =>
    {
        this.ui.toggleButtonLoading("saveTtcHardwareConfigButton");

        let formData = getFormDataByDataTag("setConfigurationRequest");

        this.api.configRequests.setHardwareConfig(formData)
            .then(result =>
            {
                if (result.statusCode === 201 && result.status === "ok")
                {
                    this.ui.openModal('info', result.status, "Configuration saved successfully.");
                }
                else
                {
                    console.log("-1- setHardwareConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setHardwareConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("saveTtcHardwareConfigButton");
            });
    };

    getServerConfig = () =>
    {
        this.api.configRequests.getServerConfig()
            .then(result =>
            {
                if (result.statusCode === 200 && result.status === "ok")
                {
                    let config = JSON.parse(result.msg);
                    setFormDataFromResponse(config);
                }
                else
                {
                    console.log("-1- getServerConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- getServerConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            });
    };

    setServerConfig = () =>
    {
        this.ui.toggleButtonLoading("saveTtcServerConfigButton");

        let formData = getFormDataByDataTag("setConfigurationRequest");

        this.api.configRequests.setServerConfig(formData)
            .then(result =>
            {
                if (result.statusCode === 201 && result.status === "ok")
                {
                    this.ui.openModal('info', result.status, "Configuration saved successfully.");
                }
                else
                {
                    console.log("-1- setServerConfig: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setHardwareConfig error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("saveTtcServerConfigButton");
            });
    };

    editUser = () =>
    {
        this.ui.toggleButtonLoading("editUserButton");

        let formData = getFormDataByDataTag("editUserRequest");

        this.api.configRequests.editUser(formData)
            .then(result =>
            {
                if (result.statusCode === 201 && result.status === "ok")
                {
                    localStorage.setItem("ttcUserName", formData.name);
                    document.getElementById("info-name").innerText = formData.name;

                    this.ui.openModal('info', result.status, "User data saved successfully.");
                }
                else
                {
                    console.log("-1- editUser: " + result.status + result.msg + '\nField Errors:\n' + fieldErrors);
                    this.ui.openModal('info', result.status, result.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch( error =>
            {
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- editUser error: " + error.msg +  '\nField Errors:\n' + fieldErrors);
                this.ui.openModal('info', 'Error', error.msg +  '\nField Errors:\n' + fieldErrors);
            })
            .finally(() =>
            {
                this.ui.toggleButtonLoading("editUserButton");
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

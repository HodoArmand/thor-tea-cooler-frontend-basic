import {TeaState, HardwareConfig, NetworkConfig, ServerConfig} from "/js/TtcState.js";

import {TtcApiAuth} from "/js/TtcApiAuth.js";
import {TtcApiHardwareRequests} from "/js/TtcApiHardwareRequests.js";

class TtcApiInterface
{
    get ttcIp()
    {
        return this._ttcIp;
    }

    set ttcIp(value)
    {
        this._ttcIp = value;
        localStorage.setItem('ttcIp', value);
    }

    constructor()
    {
        this.state = "uninitialized";
        let storedTtcIp = localStorage.getItem("ttcIp");
        this._ttcIp = storedTtcIp ? storedTtcIp : "unset";

        this.teaState = new TeaState();
        this.hwConfig = new HardwareConfig();
        this.networkConfig = new NetworkConfig();
        this.serverConfig = new ServerConfig();

        this.auth = new TtcApiAuth();
        this.hwRequests = new TtcApiHardwareRequests();

        axios.defaults.timeout = 5000;
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['Accept'] = 'application/json';

        let url = window.location.href;
        let isIndexPage = (url.indexOf("login") === -1 && url.indexOf("configuration") === -1 && url.indexOf("Configuration") === -1);
        let isConfigPage = (url.indexOf("configuration") !== -1 || url.indexOf("Configuration") !== -1);

        if (storedTtcIp !== "unset" && this.auth.apiKey !== "unset" && (isIndexPage || isConfigPage))
        {
            axios.defaults.baseURL = "http://" + this.ttcIp;
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.auth.apiKey;

            this.hwRequests.isTtc()
                .then(result =>
                {
                    if (result.statusCode === 200 && result.status === "yes")
                    {
                        this.state = "ipOk";
                        this.hwRequests.getHardwareState()
                            .then(result =>
                            {
                                if (result.statusCode === 200 && result.status === "ok")
                                {
                                    this.state = "initialized";
                                    this.teaState.setFromResponse(JSON.parse(result.msg));
                                }
                                else
                                {
                                    this.state = "badAuth";
                                }
                            })
                            .catch(error =>
                            {
                                this.state = "badAuth";
                            });
                    }
                    else
                    {
                        this.state = "badTtcIp";
                    }
                })
                .catch(error =>
                {
                    this.state = "badTtcIp";
                });
        }

        this.getHardwareState = () =>
        {
            this.hwRequests.getHardwareState()
                .then(result =>
                {
                    console.log(result);
                    if (result.statusCode === 200 && result.status === "ok")
                    {
                        this.teaState.setFromResponse(JSON.parse(result.msg));
                    }
                    else
                    {
                        console.log("-1- getHardwareState error: " + result.state + result.msg);
                    }
                })
                .catch(error =>
                {
                    console.log("-1- getHardwareState error: " + error.state + error.msg);
                });
        };

    }
}

export {TtcApiInterface};
import {TtcApiInterface} from "/js/TtcApiInterface.js";
import {TtcUi} from "/js/TtcUi.js";


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
        this.sse = new EventSource('//'+this.api.ttcIp + '/events');

        this.initSSEventlisteners();
    }

    setTeaStateValues = () =>
    {
        this.ui.setTempValues(this.api.teaState);
        this.ui.setModeValues(this.api.teaState);
        this.ui.setRelayValues(this.api.teaState);
    }

    initSSEventlisteners = () =>
    {
        if (!!window.EventSource)
        {
            this.sse.addEventListener('open', function (event)
            {
                console.log("Connected SSE channel.");
            }, false);

            this.sse.addEventListener('error', function (event)
            {
                if (event.target.readyState !== EventSource.OPEN)
                {
                    console.log("SSE channel disconnected.");
                }
            }, false);

            this.sse.addEventListener('message', function (event)
            {
                console.log("message", event.data);
            }, false);

            this.sse.addEventListener('teaState', function (event)
            {
                let teaState_ = JSON.parse(event.data);
                console.log("Tea state received trough SSE: " + event.data);
                window.ttcClient.api.teaState.setFromResponse(teaState_);
                window.ttcClient.setTeaStateValues();

            }, false);
        }
    }
}

window.ttcClient = new TtcClient();

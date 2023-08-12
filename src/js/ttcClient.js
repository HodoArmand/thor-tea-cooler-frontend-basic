import {TtcApiInterface} from "/js/TtcApiInterface.js";
import {TtcUi} from "/js/TtcUi.js";


class TtcClient
{
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
    }

    setTeaState = () =>
    {
        this.ui.setTempValues(this.api.teaState);
        this.ui.setModeValues(this.api.teaState);
    }
}

window.ttcClient = new TtcClient();

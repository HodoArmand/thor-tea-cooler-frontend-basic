import {TtcApiInterface} from "/js/TtcApiInterface.js";
import {TtcUi} from "/js/TtcUi.js";

class TtcClient
{
    constructor()
    {
        this.api = new TtcApiInterface();
        this.ui = new TtcUi();
    }
}

window.ttcClient = new TtcClient();

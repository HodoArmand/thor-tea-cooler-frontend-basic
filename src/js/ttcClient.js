import {TtcApiInterface} from "/js/TtcApiInterface.js";

class TtcClient
{
    constructor()
    {
        this.ttcApi = new TtcApiInterface();
    }
}

window.ttcClient = new TtcClient();
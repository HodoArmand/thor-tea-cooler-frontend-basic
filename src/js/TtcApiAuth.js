class TtcApiAuth
{
    get userName()
    {
        return this._userName;
    }

    set userName(value)
    {
        this._userName = value;
        localStorage.setItem("ttcUserName", value);
    }

    get apiKey()
    {
        return this._apiKey;
    }

    set apiKey(value)
    {
        this._apiKey = value;
        localStorage.setItem("ttcApiKey", value);
    }

    constructor()
    {
        let storedApiKey = localStorage.getItem("ttcApiKey");
        this._apiKey = storedApiKey ? storedApiKey : "unset";

        let storedUserName = localStorage.getItem("ttcUserName");
        this._userName = storedUserName ? storedUserName : "unset";
    }
}

export {TtcApiAuth};
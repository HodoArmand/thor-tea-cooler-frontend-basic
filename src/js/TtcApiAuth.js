import {responseToTtcApiResponse, responseToTtcApiResponseComplexMsg, errorResponseToTtcApiResponse} from "./TtcClientUtilities.js";

const login = (name_, password_) =>
{

    let requestData = new URLSearchParams({
        name: name_,
        password: password_,
    });

    return axios.post('login', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

const logout = () =>
{
    return axios.post('logout')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

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

        this.login = login;
        this.logout = logout;
    }
}

export {TtcApiAuth};
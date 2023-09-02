import {responseToTtcApiResponse, responseToTtcApiResponseComplexMsg, errorResponseToTtcApiResponse} from "./TtcClientUtilities.js";

const getNetworkConfig = () =>
{
    return axios.get('getNetworkConfig')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

const setNetworkConfig = (formData) =>
{
    let requestData = new URLSearchParams({
        debugMode: formData.debugMode,
        ssid: formData.ssid,
        password: formData.password,
    });

    return axios.put('setNetworkConfig', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};


class TtcApiConfigurationRequests
{
    constructor()
    {
        this.getNetworkConfig = getNetworkConfig;
        this.setNetworkConfig = setNetworkConfig;
    }
}

export {TtcApiConfigurationRequests};
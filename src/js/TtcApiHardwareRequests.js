import {responseToTtcApiResponse, responseToTtcApiResponseComplexMsg, errorResponseToTtcApiResponse} from "./TtcClientUtilities.js";

const switchRelay = (relayNumber) =>
{

    let requestData = new URLSearchParams({
        relay: relayNumber,
    });

    return axios.post('switchRelay', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const getHardwareState = () =>
{
    return axios.get('getHardwareState')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return responseToTtcApiResponseComplexMsg(error);
        });

};

const setRelays = (relay1_, relay2_) =>
{

    let requestData = new URLSearchParams({
        relay1: relay1_,
        relay2: relay2_,
    });

    return axios.post('setRelays', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const setModeManual = () =>
{
    return axios.post('setModeManual')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const setTargetTemperature = (targetTemperature_) =>
{

    let requestData = new URLSearchParams({
        targetTemperature: targetTemperature_,
    });

    return axios.post('setTargetTemperature', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const setModeAuto = () =>
{
    return axios.post('setModeAuto')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const startAutoCooling = () =>
{
    return axios.post('startAutoCooling')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const stopAutoCooling = () =>
{
    return axios.post('stopAutoCooling')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const restartMcu = () =>
{
    return axios.post('restartMcu')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};

const isTtc = () =>
{
    return axios.get('isTtc')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });

};


class TtcApiHardwareRequests
{
    constructor()
    {
        this.switchRelay = switchRelay;
        this.getHardwareState = getHardwareState;
        this.setRelays = setRelays;
        this.setModeManual = setModeManual;
        this.setTargetTemperature = setTargetTemperature;
        this.setModeAuto = setModeAuto;
        this.startAutoCooling = startAutoCooling;
        this.stopAutoCooling = stopAutoCooling;
        this.restartMcu = restartMcu;
        this.isTtc = isTtc;
    }
}

export {TtcApiHardwareRequests};
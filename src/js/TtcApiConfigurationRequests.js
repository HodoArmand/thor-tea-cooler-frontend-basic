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

const getHardwareConfig = () =>
{
    return axios.get('getHardwareConfig')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

const setHardwareConfig = (formData) =>
{
    let requestData = new URLSearchParams({
        debugMode: formData.debugMode,
        relayIoPin1: formData.relayIoPin1,
        relayIoPin2: formData.relayIoPin2,
        oneWireIoPin: formData.oneWireIoPin,
        temperatureSensorOffsetCelsius: formData.temperatureSensorOffsetCelsius,
        temperatureTargetDefault: formData.temperatureTargetDefault,
    });

    return axios.put('setHardwareConfig', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

const getServerConfig = () =>
{
    return axios.get('getServerConfig')
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            return errorResponseToTtcApiResponse(error);
        });
};

const setServerConfig = (formData) =>
{
    let requestData = new URLSearchParams({
        debugMode: formData.debugMode,
        port: formData.port,
        apiKeyLength: formData.apiKeyLength,
        apiThrottleIntervalMs: formData.apiThrottleIntervalMs,
        maxStoredUsers: formData.maxStoredUsers,
        maxApiKeysPerUser: formData.maxApiKeysPerUser,
        maxApiKeysTotal: formData.maxApiKeysTotal,
        selfHostMode: formData.selfHostMode,
    });

    return axios.put('setServerConfig', requestData)
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
        this.getHardwareConfig = getHardwareConfig;
        this.setHardwareConfig = setHardwareConfig;
        this.getServerConfig = getServerConfig;
        this.setServerConfig = setServerConfig;
    }
}

export {TtcApiConfigurationRequests};
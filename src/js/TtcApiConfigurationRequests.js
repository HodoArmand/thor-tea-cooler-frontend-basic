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
            throw errorResponseToTtcApiResponse(error);
        });
};

const setNetworkConfig = (formData) =>
{
    let requestData = new URLSearchParams(formData);

    return axios.put('setNetworkConfig', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
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
            throw errorResponseToTtcApiResponse(error);
        });
};

const setHardwareConfig = (formData) =>
{
    let requestData = new URLSearchParams(formData);

    return axios.put('setHardwareConfig', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
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
            throw errorResponseToTtcApiResponse(error);
        });
};

const setServerConfig = (formData) =>
{
    let requestData = new URLSearchParams(formData);

    return axios.put('setServerConfig', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });
};

const editUser = (formData) =>
{
    let requestData = new URLSearchParams(formData);

    return axios.put('editUser', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
        });
};

const registerUser = (formData) =>
{
    let requestData = new URLSearchParams(formData);

    return axios.post('registerUser', requestData)
        .then(response =>
        {
            return responseToTtcApiResponse(response);
        })
        .catch(error =>
        {
            throw errorResponseToTtcApiResponse(error);
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

        this.editUser = editUser;
        this.registerUser = registerUser;
    }
}

export {TtcApiConfigurationRequests};
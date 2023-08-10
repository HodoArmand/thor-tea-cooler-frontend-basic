const responseToTtcApiResponse = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: response.data.msg,
    };
};

const responseToTtcApiResponseComplexMsg = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: JSON.parse(response.data.msg),
    };
};

const errorResponseToTtcApiResponse = (error) =>
{
    return {
        statusCode: error.response.status,
        status: error.response.data.status,
        msg: error.response.data.msg,
    };
};

export {responseToTtcApiResponse, responseToTtcApiResponseComplexMsg, errorResponseToTtcApiResponse};
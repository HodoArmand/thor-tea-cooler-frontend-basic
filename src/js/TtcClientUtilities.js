export const responseToTtcApiResponse = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: response.data.msg,
    };
};

export const responseToTtcApiResponseComplexMsg = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: JSON.parse(response.data.msg),
    };
};

export const errorResponseToTtcApiResponse = (error) =>
{
    return {
        statusCode: error.response.status,
        status: error.response.data.status,
        msg: error.response.data.msg,
    };
};

export const formatFloat = (stringValue) =>
{
    let parsedValue = parseFloat(stringValue);
    return parsedValue.toFixed(2);
};

export const capitalizeFirstLetter = (string) =>
{
    const firstLetterCap = string.charAt(0).toUpperCase();
    const remainingLetters = string.slice(1);

    string = firstLetterCap + remainingLetters;
    return string;
};

export const enableById = (id) =>
{
    document.getElementById(id).removeAttribute('disabled');
};

export const disableById = (id) =>
{
    document.getElementById(id).setAttribute('disabled', '');
};

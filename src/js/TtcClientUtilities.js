export const responseToTtcApiResponse = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: response.data.msg,
        fieldErrors: response.data.fieldErrors
    };
};

export const responseToTtcApiResponseComplexMsg = (response) =>
{
    return {
        statusCode: response.status,
        status: response.data.status,
        msg: JSON.parse(response.data.msg),
        fieldErrors: response.data.fieldErrors
    };
};

export const errorResponseToTtcApiResponse = (error) =>
{
    return {
        statusCode: error.response.status,
        status: error.response.data.status,
        msg: error.response.data.msg,
        fieldErrors: error.response.data.fieldErrors
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

export const getFormDataByDataTag = (uniqueFormInputDataTag) =>
{
    let data = {};

    const inputs = document.querySelectorAll('[data-' + uniqueFormInputDataTag + '="true"]');

    for (const input of inputs)
    {
        if (input.type === "checkbox")
        {
            data[input.name] = input.checked;
        }
        else
        {
            data[input.name] = input.value;
        }
    }

    return data;
};

export const setFormDataFromResponse = (responseData) =>
{
    for (const dataName in responseData)
    {
        let input = document.getElementsByName(dataName)[0];
        if (input.type === "checkbox")
        {
            input.checked = responseData[dataName] === true || responseData[dataName] === "true" || responseData[dataName] === "1";
        }
        else
        {
            input.value = responseData[dataName];
        }
    }
};
class TeaState
{
    get mode()
    {
        return this._mode;
    }

    set mode(value)
    {
        this._mode = value;
    }

    get targetTemperature()
    {
        return this._targetTemperature;
    }

    set targetTemperature(value)
    {
        this._targetTemperature = value;
    }

    get temperature()
    {
        return this._temperature;
    }

    set temperature(value)
    {
        this._temperature = value;
    }

    get relay2()
    {
        return this._relay2;
    }

    set relay2(value)
    {
        this._relay2 = value;
    }

    get relay1()
    {
        return this._relay1;
    }

    set relay1(value)
    {
        this._relay1 = value;
    }

    constructor()
    {
        this._relay1 = false;
        this._relay2 = false;
        this._temperature = 0.00;
        this._targetTemperature = 0.00;
        this._mode = "manual";
    }

    setFromResponse = (responseBody) =>
    {
        this._relay1 = responseBody.relay1;
        this._relay2 = responseBody.relay2;
        this._temperature = responseBody.temperature;
        this._targetTemperature = responseBody.targetTemperature;
        this._mode = responseBody.mode;
    }
}

class HardwareConfig
{
    get debugMode()
    {
        return this._debugMode;
    }

    set debugMode(value)
    {
        this._debugMode = value;
    }

    get temperatureTargetDefault()
    {
        return this._temperatureTargetDefault;
    }

    set temperatureTargetDefault(value)
    {
        this._temperatureTargetDefault = value;
    }

    get temperatureSensorOffsetCelsius()
    {
        return this._temperatureSensorOffsetCelsius;
    }

    set temperatureSensorOffsetCelsius(value)
    {
        this._temperatureSensorOffsetCelsius = value;
    }

    get oneWireIoPin()
    {
        return this._oneWireIoPin;
    }

    set oneWireIoPin(value)
    {
        this._oneWireIoPin = value;
    }

    get relayIoPin2()
    {
        return this._relayIoPin2;
    }

    set relayIoPin2(value)
    {
        this._relayIoPin2 = value;
    }

    get relayIoPin1()
    {
        return this._relayIoPin1;
    }

    set relayIoPin1(value)
    {
        this._relayIoPin1 = value;
    }

    constructor()
    {
        this._debugMode = false;
        this._relayIoPin1 = 0;
        this._relayIoPin2 = 0;
        this._oneWireIoPin = 0;
        this._temperatureSensorOffsetCelsius = 0;
        this._temperatureTargetDefault = 50;
    }

    setFromResponse = (responseBody) =>
    {
        this.debugMode = responseBody.debugMode;
        this.relayIoPin1 = responseBody.relayIoPin1;
        this.relayIoPin2 = responseBody.relayIoPin2;
        this.oneWireIoPin = responseBody.oneWireIoPin;
        this.temperatureSensorOffsetCelsius = responseBody.temperatureSensorOffsetCelsius;
        this.temperatureTargetDefault = responseBody.temperatureTargetDefault;
    }

}

class NetworkConfig
{
    get password()
    {
        return this._password;
    }

    set password(value)
    {
        this._password = value;
    }

    get ssid()
    {
        return this._ssid;
    }

    set ssid(value)
    {
        this._ssid = value;
    }

    get debugMode()
    {
        return this._debugMode;
    }

    set debugMode(value)
    {
        this._debugMode = value;
    }

    constructor()
    {
        this._debugMode = false;
        this._ssid = "";
        this._password = "";
    }

    setFromResponse = (responseBody) =>
    {
        this.debugMode = responseBody.debugMode;
        this.ssid = responseBody.ssid;
        this.password = responseBody.password;
    }
}

class ServerConfig
{
    get selfHostMode()
    {
        return this._selfHostMode;
    }

    set selfHostMode(value)
    {
        this._selfHostMode = value;
    }

    get maxApiKeysTotal()
    {
        return this._maxApiKeysTotal;
    }

    set maxApiKeysTotal(value)
    {
        this._maxApiKeysTotal = value;
    }

    get maxApiKeysPerUser()
    {
        return this._maxApiKeysPerUser;
    }

    set maxApiKeysPerUser(value)
    {
        this._maxApiKeysPerUser = value;
    }

    get maxStoredUsers()
    {
        return this._maxStoredUsers;
    }

    set maxStoredUsers(value)
    {
        this._maxStoredUsers = value;
    }

    get apiThrottleIntervalMs()
    {
        return this._apiThrottleIntervalMs;
    }

    set apiThrottleIntervalMs(value)
    {
        this._apiThrottleIntervalMs = value;
    }

    get apiKeyLength()
    {
        return this._apiKeyLength;
    }

    set apiKeyLength(value)
    {
        this._apiKeyLength = value;
    }

    get port()
    {
        return this._port;
    }

    set port(value)
    {
        this._port = value;
    }

    get debugMode()
    {
        return this._debugMode;
    }

    set debugMode(value)
    {
        this._debugMode = value;
    }

    constructor()
    {
        this._debugMode = false;
        this._port = 80;
        this._apiKeyLength = 50;
        this._apiThrottleIntervalMs = 1000;
        this._maxStoredUsers = 20;
        this._maxApiKeysPerUser = 3;
        this._maxApiKeysTotal = 60;
        this._selfHostMode = false;
    }

    setFromResponse = (responseBody) =>
    {
        this.debugMode = responseBody.debugMode;
        this.port = responseBody.port;
        this.apiKeyLength = responseBody.apiKeyLength;
        this.apiThrottleIntervalMs = responseBody.apiThrottleIntervalMs;
        this.maxStoredUsers = responseBody.maxStoredUsers;
        this.maxApiKeysPerUser = responseBody.maxApiKeysPerUser;
        this.maxApiKeysTotal = responseBody.maxApiKeysTotal;
        this.selfHostMode = responseBody.selfHostMode;
    }
}

export {TeaState, HardwareConfig, NetworkConfig, ServerConfig};
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getAllData = async (types, deviceId) => {
    if (!types ||!deviceId) {
        throw new Error("Missing types or deviceId parameter");
    }
    return await axios.get(`${API_URL}/api/get-all-data`,{
        params: { types, deviceId },
    });
};

export const getDataDay = async (types, date, deviceId) => {
    if (!types ||!deviceId) {
        throw new Error("Missing types or deviceId parameter");
    }

    return await axios.get(`${API_URL}/api/get-data-day`, {
        params: { types, date, deviceId },
    });
};

export const getDataWeek = async (types, date, deviceId) => {
    if (!types || !deviceId) {
        throw new Error("Missing types or deviceId parameter");
    }
    
    return await axios.get(`${API_URL}/api/get-data-week`, {
        params: { types, date, deviceId },
    });
};

export const getDataMonth = async (types, month, year, deviceId) => {
    if (!types || !deviceId) {
        throw new Error("Missing types or deviceId parameter");
    }
    
    return await axios.get(`${API_URL}/api/get-data-month`, {
        params: { types, month, year, deviceId },
    });
};

export const login = async (credentials) => {
    return await axios.post(`${API_URL}/api/login`, credentials);
};


export const getLatestData = async (types, deviceId) => {
    if (!types || !deviceId) {
        throw new Error("Missing types or deviceId parameter");
    }
    
    return await axios.get(`${API_URL}/api/get-latest-data`, {
        params: { types, deviceId },
    });
};


export const controlDevice = async (controlData) => {
    return await axios.post(`${API_URL}/api/control`, controlData);
};

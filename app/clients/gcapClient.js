// GCapiClient.js

import axios from 'axios';

export class GCapiClient {
    constructor(baseURL) {
        this.baseURL = baseURL || process.env.GCAP_API_BASE_URL;
        this.session = null;
    }

    async login(username, password, appKey) {
        try {
            const response = await axios.post(`${this.baseURL}/session`, {
                UserName: username || process.env.GAPCAP_USERNAME,
                Password: password || process.env.GAPCAP_PASSWORD,
                AppKey: appKey || process.env.GAPCAP_API_KEY
            });
            const resp = response.data;
            if (resp.StatusCode !== 1) throw new Error(JSON.stringify(resp));
            this.session = resp.Session;
            return resp.Session;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }

    async getAccountBalance() {
        if (!this.session) {
            throw new Error('Please login first to get the account balance.');
        }

        try {
            const response = await axios.get(`${this.baseURL}/margin/ClientAccountMargin`, {
                headers: {
                    'Content-Type': 'application/json',
                    'UserName': process.env.GAPCAP_USERNAME,
                    'Session': this.session
                }
            });
            return response.data.Cash;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
}

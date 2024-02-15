interface Credentials {
    baseURL?: string;
    UserName?: string;
    Password?: string;
    AppKey?: string;
    TradingAccountId?: string;
    session?: string;
}

function makeAuthData(action: string, credentials: Credentials, session: any) {
    if (action === 'session') {
        let url = 'session';
        let body = {
            'UserName': credentials.UserName,
            'Password': credentials.Password,
            "AppVersion": "1",
            "AppComments": "A Forex Bot Trader",
            'AppKey': credentials.AppKey
        };
        return { url, body }
    }
    let url = 'session/validate';
    let body = {
        'UserName': credentials.UserName,
        'Session': session, // Access session from constructor
        'TradingAccountId': credentials.TradingAccountId,
    };
    return { url, body }
}

export default class GCapiClient {
    baseURL?: string;
    UserName?: string;
    Password?: string;
    AppKey?: string;
    TradingAccountId?: string;
    session: any | null;
    IsAuthenticated: boolean;

    constructor(credentials: Credentials) {
        this.baseURL = credentials.baseURL || process.env.GCAP_API_BASE_URL;
        this.UserName = credentials.UserName || process.env.GCAP_USERNAME;
        this.Password = credentials.Password || process.env.GCAP_PASSWORD;
        this.AppKey = credentials.AppKey || process.env.GCAP_APPKEY;
        this.TradingAccountId = credentials.TradingAccountId || process.env.GCAP_TRADINGACCOUNTID;
        this.session = credentials.session || null; // Initialize session to null
        this.IsAuthenticated = false; // Initialize session to null
    }

    async getSession(credentials: Credentials) {
        const { url, body } = makeAuthData('session', credentials, null)
        // console.log(`${this.baseURL}/${url}`, JSON.stringify(body))
        try {
            await fetch(`${this.baseURL}/${url}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                .then((response) => response.json())
                .then(async (data) => {
                    // console.log(data)
                    this.session = data?.session; // Initialize session to null
                    // console.log("Session", this.session);
                    const { url, body } = makeAuthData('validate', credentials, this.session)
                    // console.log(url, body)
                    await fetch(`${this.baseURL}/${url}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify(body)
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            this.IsAuthenticated = data;
                            // console.log("IsAuthenticated", this.IsAuthenticated);
                            return this.IsAuthenticated;
                        });
                })
        } catch (error: any) {
            throw new Error(error);
        }

    }

    async getAccountInfo() {
        let payload = []
        let credentials = {
            baseURL: this.baseURL,
            UserName: this.UserName,
            Password: this.Password,
            AppKey: this.AppKey,
            TradingAccountId: this.TradingAccountId,
            session: this.session
        }
        // console.log("Data", credentials);
        if (!this.session) {
            await this.getSession(credentials);
            payload.push({"forexAuth" : this.IsAuthenticated})
        }
        try {
            let url = 'userAccount/ClientAndTradingAccount';
            let headers = {
                'Content-Type': 'application/json',
                'UserName': this.UserName,
                'Session': this.session, // Access session from constructor
            };
            const accountData = await fetch(`${this.baseURL}/${url}`, { headers })
                .then((res) => res.json())
                .then(async (data) => {
                    payload.push({"tradingAccountInfo": data})
                    let url = 'margin/clientAccountMargin';
                    let headers = {
                        'Content-Type': 'application/json',
                        'UserName': this.UserName,
                        'Session': this.session, // Access session from constructor
                    };
                    // const firstClientId = data.clientAccounts[0].clientAccountId
                    // accounts.forEach(async (clientAccount: any) => {
                    //     let id = clientAccount.clientAccountId
                    //     const balanceresponse = await fetch(`${this.baseURL}/${url}?clientAccountId=${id}`, { headers })
                    //         .then((balanceresponse) => balanceresponse.json())
                    //     return balanceresponse
                    // });
                    const accounts = data.clientAccounts
                    payload.push({"accounts": accounts})
                    const firstClientId = accounts[0].clientAccountId
                    console.log(accounts)
                    await fetch(`${this.baseURL}/${url}?clientAccountId=${firstClientId}`, { headers })
                        .then((balanceresponse) => balanceresponse.json())
                        .then(async (balanceresponse) => {
                            let url = 'tradehistory';
                            let headers = {
                                'Content-Type': 'application/json',
                                'UserName': this.UserName,
                                'Session': this.session, // Access session from constructor
                            };
                            payload.push({"balances": balanceresponse})
                        const historyresponse = await fetch(`${this.baseURL}/${url}?clientAccountId=${firstClientId}`, { headers })
                            .then((historyresponse) => historyresponse.json())
                            payload.push({"historyResponse": historyresponse})
                            return payload
                        })
                    
                });
                console.log(payload)
                return payload
        } catch (error: any) {
            throw new Error(error);
        }
    }
}


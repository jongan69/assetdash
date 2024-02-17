interface Credentials {
    baseURL?: string;
    UserName?: string;
    Password?: string;
    AppKey?: string;
    TradingAccountId?: string;
    session?: string;
}
// Note: Not all Gain Capital APIs are using the new base url v2 ie news
const oldBaseURL = 'https://ciapi.cityindex.com/TradingAPI'

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
                    this.session = data?.session; // Initialize session to null
                    const { url, body } = makeAuthData('validate', credentials, this.session)
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
        } catch (Exception) {
            throw Exception;
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
        if (!this.session) {
            await this.getSession(credentials);
            payload.push({ "forexAuth": this.IsAuthenticated })
        }
        try {
            let url = 'userAccount/ClientAndTradingAccount';
            let headers = {
                'Content-Type': 'application/json',
                'UserName': this.UserName,
                'Session': this.session, // Access session from constructor
            };
            await fetch(`${this.baseURL}/${url}`, { headers })
                .then((res) => res.json())
                .then(async (data) => {
                    payload.push({ "tradingAccountInfo": data })
                    let url = 'margin/clientAccountMargin';
                    let headers = {
                        'Content-Type': 'application/json',
                        'UserName': this.UserName,
                        'Session': this.session, // Access session from constructor
                    };
                    const accounts = data.clientAccounts
                    payload.push({ "accounts": accounts })
                    const firstClientId = accounts[0].clientAccountId
                    // console.log(accounts)
                    await fetch(`${this.baseURL}/${url}?clientAccountId=${firstClientId}`, { headers })
                        .then((balanceresponse) => balanceresponse.json())
                        .then(async (balanceresponse) => {
                            let url = 'tradehistory';
                            let headers = {
                                'Content-Type': 'application/json',
                                'UserName': this.UserName,
                                'Session': this.session, // Access session from constructor
                            };
                            payload.push({ "balances": balanceresponse })
                            const historyresponse = await fetch(`${this.baseURL}/${url}?clientAccountId=${firstClientId}`, { headers })
                                .then((historyresponse) => historyresponse.json())
                            payload.push({ "historyResponse": historyresponse })
                            return payload
                        })
                });
            return payload
        } catch (Exception) {
            throw Exception;
        }
    }

    async getUSNewsHeadlines() {
        let payload = []
        let credentials = {
            baseURL: this.baseURL,
            UserName: this.UserName,
            Password: this.Password,
            AppKey: this.AppKey,
            TradingAccountId: this.TradingAccountId,
            session: this.session
        }
        if (!this.session) {
            await this.getSession(credentials);
            payload.push({ "forexAuth": this.IsAuthenticated })
        }
        try {
            let headers = {
                'Content-Type': 'application/json',
                'UserName': this.UserName,
                'Session': this.session, // Access session from constructor
            };
            await fetch(`${oldBaseURL}/news/newsheadlines?region=FX&cultureId=9&maxResults=500`, {
                headers
            }).then((data) => data.json())
                .then((USHeadlines) => {
                    payload.push({ "USHeadlines": USHeadlines })
                })
            return payload
        } catch (Exception) {
            throw Exception;
        }
    }


    async getUSNews() {
        let payload = []
        let credentials = {
            baseURL: this.baseURL,
            UserName: this.UserName,
            Password: this.Password,
            AppKey: this.AppKey,
            TradingAccountId: this.TradingAccountId,
            session: this.session
        }
        if (!this.session) {
            await this.getSession(credentials);
            payload.push({ "forexAuth": this.IsAuthenticated })
        }
        try {
            let headers = {
                'Content-Type': 'application/json',
                'UserName': this.UserName,
                'Session': this.session, // Access session from constructor
            };
            await fetch(`${oldBaseURL}/news/news?region=FX&cultureId=69&maxResults=500`, {
                headers
            }).then((data) => data.json())
                .then((USHeadlines) => {
                    payload.push({ "USHeadlines": USHeadlines })
                })
            return payload
        } catch (Exception) {
            throw Exception;
        }
    }


}


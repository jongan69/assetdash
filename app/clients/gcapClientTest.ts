const {GCapiClient} = require("./gcapClient.ts");

const credentials = {
    baseURL: 'example.com',
    UserName: 'username',
    Password: 'password',
    AppKey: 'appkey'
};

const client = new GCapiClient(credentials);
client.login();
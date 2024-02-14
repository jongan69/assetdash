import { Kraken } from 'kraken-js-client';

// Configure authentication options
const AuthOpts = {
    apiKey: 'YOUR_API_KEY',
    apiSecret: 'YOUR_API_SECRET'
};

// Create a Kraken client instance
const krakenClient = new Kraken({}, AuthOpts);

// Handler function for the portfolio endpoint
export default async function handler(req, res) {
    try {
        // Retrieve portfolio balance
        const balance = await krakenClient.Balance.get();
        res.status(200).json(balance);
    } catch (error) {
        console.error('Error fetching portfolio balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
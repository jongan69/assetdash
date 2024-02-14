// app/api/forex

import { GCapiClient } from '../../clients/gcapClient'; // Adjust the import path as per your project structure

export default async function handler(req, res) {
  const { NEXT_PUBLIC_BASE_URL, GAPCAP_USERNAME, GAPCAP_PASSWORD, GAPCAP_API_KEY } = process.env;

  try {
    const client = new GCapiClient(NEXT_PUBLIC_BASE_URL);

    // Login to obtain session
    await client.login(GAPCAP_USERNAME, GAPCAP_PASSWORD, GAPCAP_API_KEY);

    // Get the account balance
    const balance = await client.getAccountBalance();

    // Send the account balance as the response
    res.status(200).json({ balance });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
}

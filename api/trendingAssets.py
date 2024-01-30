import os
import requests
from datetime import datetime, timedelta
from finbert_utils import estimate_sentiment
from dotenv import load_dotenv

 # Load environment variables from .env
load_dotenv()
API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
endpoint = os.getenv("API_ENDPOINT")

def get_trending_assets_news(days_back):
    trendingAssets = {}
    # Calculate the date range
    today = datetime.utcnow()
    three_days_prior = today - timedelta(days=days_back)

    # Set the API key and secret in the headers
    headers = {
        'Apca-Api-Key-Id': API_KEY,
        'Apca-Api-Secret-Key': API_SECRET
    }

    # Set the request parameters
    params = {
        'start': three_days_prior.strftime('%Y-%m-%d')
    }

    # Make the request to the Alpaca news endpoint
    news = requests.get(endpoint, headers=headers, params=params)

    # Check if the request was successful (status code 200)
    if news.status_code == 200:
        # Parse the JSON response
        news_data = news.json()
        # Access the news articles
        news_articles = news_data.get('news', [])

        # Process or print the news articles as needed
        for article in news_articles:
            probability, sentiment = estimate_sentiment(article['headline'])
            symbols = article['symbols']
            if sentiment == 'positive':
                print(f"Headline: {article['headline']}")
                print(f"Source: {article['source']} {article['url']}")
                print(f"Symbols: {article['symbols']}")
                print(f"Sentiment: {sentiment} Probability: {probability}")
                print("\n")
                for symbol in symbols:
                    trendingAssets[symbol] = probability.item()
        sortedSymbols = sorted(trendingAssets.items(), key=lambda item: item[1], reverse=True)
        print(f"Positively Trending Assets Ordered by Probability: {sortedSymbols}")
        return sortedSymbols
    else:
        # Print an error message if the request was not successful
        print(f"Error: {news.status_code}, {news.text}")
        return 0
    
if __name__ == "__main__":
   
    # Call the function to get news about trending assets
    get_trending_assets_news(days_back=3)
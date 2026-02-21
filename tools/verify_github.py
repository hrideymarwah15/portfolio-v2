import os
import requests
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
USERNAME = "hrideymarwah15" # Assuming this from project path, adjust if needed

def verify_github():
    print("Verifying GitHub API connection...")
    
    if GITHUB_TOKEN == "your_github_token_here" or not GITHUB_TOKEN:
            print("❌ GITHUB_TOKEN not configured. Please update .env")
            return

    url = "https://api.github.com/graphql"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    }
    
    query = """
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
    """
    
    try:
        response = requests.post(url, json={'query': query, 'variables': {'userName': USERNAME}}, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        if 'errors' in data:
            print(f"❌ GraphQL Error: {data['errors']}")
            return
            
        total = data['data']['user']['contributionsCollection']['contributionCalendar']['totalContributions']
        print(f"✅ GitHub Connection Successful!")
        print(f"📊 Total Contributions for {USERNAME}: {total}")
        
        # Save sample data for analysis
        with open(".tmp/github_sample.json", "w") as f:
            f.write(response.text)
        print("📁 Sample data saved to .tmp/github_sample.json")
            
    except Exception as e:
        print(f"❌ Exception occurred: {e}")

if __name__ == "__main__":
    verify_github()

import requests
import json
import os

USERNAME = "hrideymarwah15" # Ensure this matches the user's LeetCode handle

def verify_leetcode():
    print("Verifying LeetCode API connection...")
    
    # We will use the alfa-leetcode-api endpoint
    url = f"https://alfa-leetcode-api.onrender.com/{USERNAME}/calendar"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if "errors" in data or "message" in data and data["message"] == "User not found":
            print(f"❌ API Error: User '{USERNAME}' not found or other error: {data}")
            return
            
        print(f"✅ LeetCode Connection Successful!")
        # Save sample data for analysis
        with open(".tmp/leetcode_sample.json", "w") as f:
            json.dump(data, f, indent=2)
            
        # Optional: Print some basic insights if available
        # The calendar endpoint usually provides a submissionCalendar object
        if 'submissionCalendar' in data:
           submissions = json.loads(data['submissionCalendar'])
           print(f"📊 Found {len(submissions)} days with submissions.")
        
        print("📁 Sample data saved to .tmp/leetcode_sample.json")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request Exception occurred: {e}")
    except Exception as e:
         print(f"❌ Exception occurred: {e}")

if __name__ == "__main__":
    verify_leetcode()

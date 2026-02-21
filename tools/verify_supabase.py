import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

def verify_supabase():
    print("Verifying Supabase connection...")

    if not SUPABASE_URL or not SUPABASE_KEY or SUPABASE_URL == "your_supabase_url_here":
        print("❌ Supabase API credentials not configured. Please update .env")
        return

    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Test basic connection by fetching table info or a simple query
        # We query the 'daily_stats' table which we plan to use. It might not exist yet, 
        # but the request itself shouldn't fail with a connection error.
        response = supabase.table("daily_stats").select("*").limit(1).execute()
        
        print(f"✅ Supabase Connection Successful!")
        print(f"📊 Query Result (Top 1 from 'daily_stats'): {response.data}")
        
    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        # Identify if it's a 'table not found' vs 'connection refused'
        if "relation \"public.daily_stats\" does not exist" in str(e):
             print("⚠️ Note: The 'daily_stats' table does not exist yet. This is expected if the schema hasn't been created, but connection IS working.")

if __name__ == "__main__":
    verify_supabase()

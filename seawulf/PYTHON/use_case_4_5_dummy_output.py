# Example Output for State Assembly Election Winners by District
election_winners_output = {
    "district": [1, 2, 3, 4, 5],
    "democratic_votes": [5200, 4300, 5000, 5600, 4700],
    "republican_votes": [4800, 4700, 4500, 4400, 5300],
    "winner": ["Democrat", "Republican", "Democrat", "Democrat", "Republican"]
}

# Convert to DataFrame for better visualization
import pandas as pd
election_winners_df = pd.DataFrame(election_winners_output)
print(election_winners_df)

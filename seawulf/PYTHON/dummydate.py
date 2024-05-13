import pandas as pd

# Example of dummy data for precincts in South Carolina
data = {
    "precinct_id": ["001", "002", "003", "004", "005"],
    "total_population": [1200, 1500, 1800, 1600, 1400],
    "voting_age_population": [900, 1200, 1400, 1300, 1100],
    "hispanic_population": [100, 200, 300, 400, 500],
    "white_population": [900, 800, 700, 600, 500],
    "black_population": [150, 400, 600, 500, 300],
    "asian_population": [50, 100, 200, 300, 100],
    "pres_dem_votes_2020": [500, 600, 700, 650, 625],
    "pres_rep_votes_2020": [400, 500, 600, 550, 475],
    "sen_dem_votes_2022": [510, 610, 710, 660, 630],
    "sen_rep_votes_2022": [390, 490, 590, 540, 470]
}

# Convert to DataFrame
precinct_data = pd.DataFrame(data)
print(precinct_data)
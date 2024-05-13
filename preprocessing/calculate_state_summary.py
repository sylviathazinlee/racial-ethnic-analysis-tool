import geopandas as gpd
import json

def calculate_state_summary(state_file, output_file):
    state = gpd.read_file(state_file)

    total_votes = state['trumpVotes'].sum() + state['bidenVotes'].sum()
    total_population = state['total'].sum()
    total_white = state['white'].sum()
    total_black = state['black'].sum()
    total_hispanic_latino = state['hispanicLatino'].sum()
    total_asian = state['asian'].sum()

    percentage_republican = (state['trumpVotes'].sum() / total_votes) * 100
    percentage_democratic = (state['bidenVotes'].sum() / total_votes) * 100
    percentage_white = (total_white / total_population) * 100
    percentage_black = (total_black / total_population) * 100
    percentage_hispanic_latino = (total_hispanic_latino / total_population) * 100
    percentage_asian = (total_asian / total_population) * 100

    summary_data = {
        "Percentage Republican voters": percentage_republican,
        "Percentage Democratic voters": percentage_democratic,
        "Percentage White population": percentage_white,
        "Percentage Black population": percentage_black,
        "Percentage Hispanic/Latino population": percentage_hispanic_latino,
        "Percentage Asian population": percentage_asian
    }

    with open(output_file, 'w') as json_file:
        json.dump(summary_data, json_file)

calculate_state_summary('statedata/sc/district_data.geojson', 'statedata/sc/state_summary.json')
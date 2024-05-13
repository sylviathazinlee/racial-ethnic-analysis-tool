import json

def calculate_regression_points(input_file, output_file):
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    results = []
    for precinct in data:
        election_stats = calculate_election_stats(precinct)
        percentage_by_race = calculate_racial_percentages(precinct)
        for race, percentage in percentage_by_race.items():
            precinct_result = {
                'precinctID': precinct['precinctID'],
                'state': precinct['state'],
                'race': race,
                'electionStats': election_stats,
                'racialPercentage': percentage
            }
            results.append(precinct_result)
    
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=4)

def calculate_election_stats(precinct):
    dem_votes = precinct['properties']['bidenVotes']
    rep_votes = precinct['properties']['trumpVotes']
    total_votes = dem_votes + rep_votes
    dem_share = 0
    rep_share = 0
    winner = 'none'

    if total_votes != 0:
        dem_share = dem_votes / total_votes
        rep_share = rep_votes / total_votes
        winner = 'dem' if dem_votes > rep_votes else 'rep'
    return {'demShare': dem_share, 'repShare': rep_share, 'winner': winner}

def calculate_racial_percentages(precinct):
    total = precinct['properties']['total']
    if total == 0:
        return {'white': 0, 'black': 0, 'hispanicLatino': 0, 'asian': 0}
    
    demographic_data = {
        'white': precinct['properties']['white'],
        'black': precinct['properties']['black'],
        'hispanicLatino': precinct['properties']['hispanicLatino'],
        'asian': precinct['properties']['asian']
    }
    percentages = {race: (demographic_data[race] / total) for race in demographic_data}
    return percentages

calculate_regression_points('statedata/ny/precinct_adjacencies.geojson', 'statedata/ny/regression_data.json')
import pandas as pd

def clean_demographic_data(input_file):
    demographic_data = pd.read_csv(input_file)

    columns_to_keep = ['GEO_ID', 'P4_001N', 'P4_002N', 'P4_005N', 'P4_006N', 'P4_008N',]
    demographic_data = demographic_data[columns_to_keep]
    demographic_data.columns = ['GEO_ID', 'total', 'hispanicLatino', 'white', 'black', 'asian']
    demographic_data['GEO_ID'] = demographic_data['GEO_ID'].str.replace('1000000US', '')
    demographic_data = demographic_data.drop(0)
    demographic_data.to_csv('statedata/sc/voting_age_population_cleaned.csv', index=False)

def merge_demographic_and_boundary_data(demographic_data, boundary_data, output_file):
    racial_data = pd.read_csv(demographic_data)
    boundary_data = pd.read_json(boundary_data)

    racial_data['GEO_ID'] = racial_data['GEO_ID'].astype(str)
    merged_block_data = boundary_data.merge(racial_data, left_on='GEOID20', right_on='GEO_ID', how='left')
    columns_to_keep = ['total', 'hispanicLatino', 'white', 'black', 'asian']
    merged_block_data = merged_block_data[columns_to_keep]
    merged_block_data.to_json(output_file)

clean_demographic_data('statedata/sc/voting_age_population.csv')
merge_demographic_and_boundary_data('statedata/sc/voting_age_population_cleaned.csv', 'statedata/sc/block_boundary.json', 'statedata/sc/block_data.json')

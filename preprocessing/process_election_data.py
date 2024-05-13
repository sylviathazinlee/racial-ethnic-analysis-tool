import geopandas as gpd

def process_election_data(input_file):
    gdf = gpd.read_file(input_file)
    columns_to_remove = ['G20PRELJOR', 'G20PREGHAW', 'G20PREAFUE', 'G20USSRGRA', 'G20USSDHAR', 'G20USSCBLE', 'G20USSOWRI']
    gdf = gdf.drop(columns_to_remove)
    gdf.to_file('statedata/sc/precinct_data_cleaned.geojson', driver='GeoJSON')

process_election_data('statedata/sc/precinct_data.geojson')

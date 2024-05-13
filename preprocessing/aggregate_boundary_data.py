import geopandas as gpd
import maup

# Used to map blocks to precincts and precincts to districts
def aggregate_boundary_data(source_file, target_file, columns, output_file):
    source = gpd.read_file(source_file)
    target = gpd.read_file(target_file)

    source = source.to_crs('EPSG:3857')
    target = target.to_crs('EPSG:3857')

    assignment = maup.assign(source, target)
    target[columns] = source[columns].groupby(assignment).sum()
    target.to_file(output_file, driver='GeoJSON')

columns = ['total', 'hispanicLatino', 'white', 'black', 'asian', 'trumpVotes', 'bidenVotes']
aggregate_boundary_data('statedata/sc/block_data.json','statedata/sc/precinct_boundary.json', columns, 'statedata/sc/precinct_data.geojson')
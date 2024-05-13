import geopandas as gpd
from shapely.geometry import shape
from shapely.strtree import STRtree

def calculate_precinct_neighbors(precinct_file, output_file):
    precincts = gpd.read_file(precinct_file)

    precinct_geometries = [shape(geometry) for geometry in precincts.geometry]
    index = STRtree(precinct_geometries)
    precincts['neighbors'] = None

    for i, precinct_geometry in enumerate(precinct_geometries):
        neighbors_list = []
        buffered_precinct = precinct_geometry.buffer(200)
        possible_neighbors = index.query(buffered_precinct)

        for precinct in possible_neighbors:
            if precinct == i:
                continue            
            precinct_geometry = precinct_geometries[precinct]
            if precinct_geometry.intersects(buffered_precinct):
                neighbor_name = precincts.iloc[precinct]['precinctName']
                neighbors_list.append(neighbor_name)   

        neighbors_str = ', '.join(neighbors_list)
        precincts.at[i, 'neighbors'] = neighbors_str
        
    precincts.to_file(output_file, driver='GeoJSON')

calculate_precinct_neighbors('statedata/sc/precinct_data_cleaned.geojson', 'statedata/sc/precinct_adjacencies.geojson')
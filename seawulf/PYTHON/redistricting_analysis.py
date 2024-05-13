import argparse
import pandas as pd
from gerrychain import Graph, Partition, Election, MarkovChain
from gerrychain.updaters import Tally, cut_edges
from gerrychain.constraints import single_flip_contiguous
from gerrychain.proposals import recom
from gerrychain.accept import always_accept
import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import geopandas as gpd
import tqdm

def load_graph(state):
    # Placeholder function to load graph data
    return Graph.from_json(f"{state}_graph.json")

# SeaWulf-2. Run MGGG ReCom algorithm on the SeaWulf (required) (AD) 
def run_chain(graph, steps, election_data):
    election = Election("2022_Statewide", {"Democratic": "DEM_VOTE", "Republican": "REP_VOTE"})
    initial_partition = Partition(graph, "DISTRICT", updaters={
        "cut_edges": cut_edges,
        "population": Tally("population", alias="population"),
        "2022_Statewide": election
    })

    proposal = recom("pop_col", pop_target=graph["population"] / len(initial_partition), epsilon=0.05, node_repeats=2)
    chain = MarkovChain(
        proposal=proposal,
        constraints=[single_flip_contiguous],
        accept=always_accept,
        initial_state=initial_partition,
        total_steps=steps
    )
    return chain

# SeaWulf-4. Calculate election winners (required) (AD)
def calculate_election_results(partition):
    # Extract vote counts for the Democratic and Republican parties in each district
    results = {district: {"Democratic": 0, "Republican": 0} for district in partition.parts}
    for district, data in partition["2022_Statewide"].items():
        results[district]["Democratic"] += data["Democratic"]
        results[district]["Republican"] += data["Republican"]
    return results

# SeaWulf-10. Identify opportunity districts in each random district plan (required)
def identify_opportunity_districts(partition, thresholds=[0.37, 0.50]):
    # Identify opportunity districts based on racial demographic thresholds
    opportunity_districts = {t: [] for t in thresholds}
    for district, pop_data in partition["population"].items():
        racial_composition = partition.graph.nodes[pop_data]["racial_composition"]  # Assuming a structure for racial data
        for threshold in thresholds:
            if racial_composition["minority_percentage"] >= threshold:
                opportunity_districts[threshold].append(district)
    return opportunity_districts

def store_plan_details(partition, results, filename="plans.json"):
    # Store partition details in a JSON file for further analysis
    with open(filename, "a") as file:
        json.dump({"partition": dict(partition.assignment), "results": results}, file)
        file.write("\n")  # newline for separating JSON entries

'''
INCOMPLETE
'''
# SeaWulf-6. Identify and store additional random district plans of note (required) (AD)
def store_ensemble_data(ensemble_results, filename):
    with open(filename, "w") as file:
        json.dump(ensemble_results, file)

# SeaWulf-11. Calculate ensemble measures (required) (AD) [This doesn't store the data, but the data should be the same as the data that would need to be stored in the JSON file.]
def summary_statistics(ensemble_results):
    # Example to compute some statistics for Democratic and Republican votes
    all_democratic_votes = []
    all_republican_votes = []
    all_opportunity_district_counts = []

    for ensemble in ensemble_results:
        for result in ensemble:
            all_democratic_votes.append(sum(d['Democratic'] for d in result['results'].values()))
            all_republican_votes.append(sum(d['Republican'] for d in result['results'].values()))
            all_opportunity_district_counts.append(len(result['opportunity_districts']))

    # Calculating statistics
    mean_dem_votes = np.mean(all_democratic_votes)
    mean_rep_votes = np.mean(all_republican_votes)
    mean_opportunity_districts = np.mean(all_opportunity_district_counts)
    
    print(f"Average Democratic Votes per Ensemble: {mean_dem_votes}")
    print(f"Average Republican Votes per Ensemble: {mean_rep_votes}")
    print(f"Average Number of Opportunity Districts per Ensemble: {mean_opportunity_districts}")
    # Additional statistics like median, variance, etc. can be added here

# SeaWulf-12. Calculate box & whisker data (required) (AD) [This doens't store the data, but the data should be the same as the data that would need to be stored in the JSON file.]
def generate_box_and_whisker_plots(ensembles_results):
    all_democratic_votes = []
    all_republican_votes = []

    for ensemble in ensembles_results:
        ensemble_dem_votes = [sum(d['Democratic'] for d in result['results'].values()) for result in ensemble]
        ensemble_rep_votes = [sum(d['Republican'] for d in result['results'].values()) for result in ensemble]
        all_democratic_votes.append(ensemble_dem_votes)
        all_republican_votes.append(ensemble_rep_votes)

    # Boxplot for Democratic votes
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=all_democratic_votes)
    plt.title('Distribution of Democratic Votes Across Ensembles')
    plt.xlabel('Ensemble Index')
    plt.ylabel('Total Democratic Votes')
    plt.show()

    # Boxplot for Republican votes
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=all_republican_votes)
    plt.title('Distribution of Republican Votes Across Ensembles')
    plt.xlabel('Ensemble Index')
    plt.ylabel('Total Republican Votes')
    plt.show()

# TESTING: We can plot the district plan using the following function to test to see if the district plan looks reasonable
def plot_districts(graph, partition):
    # Create a GeoDataFrame from the graph data
    gdf = gpd.GeoDataFrame([graph.nodes[node] for node in graph.nodes], 
                           index=[node for node in graph.nodes])
    # Map district assignments to each node
    gdf['district'] = gdf.index.map(partition.assignment)
    # Plot using geopandas
    fig, ax = plt.subplots(figsize=(8, 8))
    gdf.dissolve(by='district').plot(ax=ax, cmap='viridis', legend=True)
    plt.title('District Plan')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.show()

def main(state, election_data_file, num_ensembles, steps_per_ensemble):
    graph = load_graph(state)
    election_data = pd.read_csv(f"{state}_2022_election_results.csv")  # Adapt filename as needed
    ensembles_results = []
    for i in range(num_ensembles):
        chain = run_chain(graph, steps_per_ensemble, election_data, "population", 0.05, len(graph.parts))
        ensemble_results = []
        for partition in chain:
            results = calculate_election_results(partition)
            opp_districts = identify_opportunity_districts(partition)
            ensemble_results.append({"results": results, "opportunity_districts": opp_districts})
        ensembles_results.append(ensemble_results)
        store_ensemble_data(ensemble_results, f"{state}_ensemble_{i}.json")
        summary_statistics(ensemble_results)
    generate_box_and_whisker_plots(ensembles_results) 

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run redistricting analysis")
    parser.add_argument("--state", required=True, help="State to analyze")
    parser.add_argument("--election_data_file", required=True, help="CSV file with election results")
    parser.add_argument("--num_ensembles", type=int, default=250, help="Number of ensembles to generate")
    parser.add_argument("--steps", type=int, default=10000, help="Number of steps in the Markov Chain")
    args = parser.parse_args()
    main(args.state, args.election_data_file, args.num_ensembles, args.steps_per_ensemble)

# import unittest
# from unittest.mock import MagicMock

# class TestRedistrictingFunctions(unittest.TestCase):
#     def test_identify_opportunity_districts(self):
#         partition = MagicMock()
#         partition["population"].items = MagicMock(return_value={
#             0: {"racial_composition": {"minority_percentage": 0.35}},
#             1: {"racial_composition": {"minority_percentage": 0.40}},
#             2: {"racial_composition": {"minority_percentage": 0.55}}
#         }.items())
        
#         expected_opp_districts = {
#             0.37: [1, 2],
#             0.50: [2]
#         }
#         opp_districts = identify_opportunity_districts(partition)
#         self.assertEqual(opp_districts, expected_opp_districts)

# if __name__ == "__main__":
#     unittest.main()
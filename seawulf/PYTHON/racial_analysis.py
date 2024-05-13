from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
from gerrychain.tree import bipartition_tree
from gerrychain.constraints import contiguous
import json

graph = Graph.from_json("./district_plan.json")

# Define the elections and candidates by race
elections = [
    Election(f"District{i}_2022", {"White": f"D{i}W_2022", "Black": f"D{i}B_2022", "Hispanic": f"D{i}H_2022", "Asian": f"D{i}A_2022"})
    for i in range(1, 151)  # Assuming 150 districts
]

# Updaters calculate quantities of interest from the partition (e.g., election results, demographics)
my_updaters = {
    "population": updaters.Tally("population", alias="population"),  # Total population by district
    "race_population": updaters.Tally("race_pop", alias="race_population")  # Racial demographics
}
election_updaters = {election.name: election for election in elections}
my_updaters.update(election_updaters)

initial_partition = GeographicPartition(
    graph,
    assignment="district",
    updaters=my_updaters
)

# Function to analyze election results and racial representation
def analyze_elections(partition):
    results = []
    for district, pop_data in partition["race_population"].items():
        election_result = {race: partition[election.name][district] for election in elections for race in election.parties}
        racial_demo = partition["race_population"][district]
        results.append({
            "district": district,
            "election_results": election_result,
            "racial_demographics": racial_demo
        })
    return results

# Perform the analysis
analysis_results = analyze_elections(initial_partition)

# Save the results to a JSON file for further analysis or reporting
with open("election_analysis_results.json", "w") as f:
    json.dump(analysis_results, f)

print("Analysis complete. Results saved to 'election_analysis_results.json'.")
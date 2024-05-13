import argparse
from gerrychain import (GeographicPartition, Partition, Graph, MarkovChain,
                        proposals, updaters, constraints, accept, Election)
from gerrychain.proposals import recom
from functools import partial
from gerrychain.tree import bipartition_tree
from gerrychain.constraints import contiguous
import json

# Set up argument parser
parser = argparse.ArgumentParser(description="Run GerryChain simulations.")
parser.add_argument('--total_steps', type=int, default=20, help='Number of steps in the Markov Chain')
parser.add_argument('--epsilon', type=float, default=0.01, help='Population balance tolerance')
args = parser.parse_args()

# Load graph
graph = Graph.from_json("./gerrymandria.json")
elections = [
    Election("ASM22", {"Democratic": "ASM22D", "Republican": "ASM22R"}),
    # Election("SEN22", {"Democratic": "SEN22D", "Republican": "SEN22R"}),
    # Election("PRES20", {"Democratic": "T20PRESD", "Republican": "T20PRESR"})
]

my_updaters = {
    "population": updaters.Tally("TOTPOP"),
    "cut_edges": updaters.cut_edges
}

election_updaters = {election.name: election for election in elections}
my_updaters.update(election_updaters)

initial_partition = GeographicPartition(
    graph,
    assignment="district",
    updaters=my_updaters
)

ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

proposal = partial(
    recom,
    pop_col="TOTPOP",
    pop_target=ideal_population,
    epsilon=args.epsilon,
    node_repeats=1
)

compactness_bound = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.02)

chain = MarkovChain(
    proposal=proposal,
    constraints=[
        contiguous,
        pop_constraint,
        compactness_bound],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=args.total_steps
)

assignment_list = []

for partition in chain:
    assignment_list.append({
        "district": partition.assignment,
        "cut_edges": len(partition["cut_edges"]),
        "population": partition["population"]
    })

with open("election_analysis_results.json", "w") as f:
    json.dump(assignment_list, f)

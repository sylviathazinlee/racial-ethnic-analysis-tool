# Using the MGGG GerryChain library in order to analyze state assembly district racial/ethnic composition and fairness and also redistricting
# This code is a part of the MGGG GerryChain library and is used to analyze redistricting and election results for state assembly districts

#SeaWulf-2: Run MGGG ReCom Algorithm
using GerryChain
using DataFrames
using CSV
using GeoInterface

# Load your data
graph = Graph.load("graph_file.json")

# Define the initial partition
initial_partition = Partition(
    graph,
    assignment="assignment_field",
    updaters=Dict(
        "population" => Tally("population_field"),
        "vote_dem" => Tally("dem_vote_field"),
        "vote_rep" => Tally("rep_vote_field")
    )
)

election_metrics = [
    vote_count("count_d", election, "SEN22D"),
    efficiency_gap("efficiency_gap_d", election, "SEN22D"),
    seats_won("seats_won_d", election, "SEN22D"),
    vote_count("count_r", election, "SEN22R"),
    efficiency_gap("efficiency_gap_r", election, "SEN22R"),
    seats_won("seats_won_r", election, "SEN22R"),
]

# Define population balance constraint
pop_constraint = PopulationBalanceConstraint("population", 0.02) # 2% tolerance
contiguity_constraint = ContiguityConstraint()

# Run ReCom
chain = recom_chain(
    initial_partition,
    pop_constraint,
    contiguity_constraint,
    proposal=propose_random_flip,
    total_steps=250  # Small ensemble size
)

# Collecting and exporting results
results = DataFrame(run_chain(chain))
CSV.write("ensemble_results.csv", results)



#SeaWulf-4, 5: Calculate Election Results and Party Splits
function calculate_election_results(results)
    results[:winner] = map(row -> row[:vote_dem] > row[:vote_rep] ? "Dem" : "Rep", eachrow(results))
    results[:dem_share] = map(row -> row[:vote_dem] / (row[:vote_dem] + row[:vote_rep]), eachrow(results))
    results[:rep_share] = map(row -> row[:vote_rep] / (row[:vote_dem] + row[:vote_rep]), eachrow(results))
end

calculate_election_results(results)
CSV.write("election_results.csv", results)



#SeaWulf-6: Save Plans of Note
# Filtering and storing interesting plans
interesting_plans = filter(row -> row[:dem_share] < 0.3 || row[:rep_share] < 0.3, results) # Example criteria
CSV.write("interesting_plans.csv", interesting_plans)



#SeaWulf-7, 10: Calculate Ensemble Measures and Identify Opportunity Districts
# Function to identify opportunity districts
function identify_opportunity_districts(results, threshold)
    filter(row -> row[:demographic_percentage] >= threshold, results)
end

# Calculating ensemble measures
ensemble_measures = describe(results, :all, cols=[:dem_share, :rep_share])
CSV.write("ensemble_measures.csv", ensemble_measures)

# Identifying opportunity districts
opportunity_districts_37 = identify_opportunity_districts(results, 37)
opportunity_districts_50 = identify_opportunity_districts(results, 50)



#SeaWulf-12: Calculate Box & Whisker Data
# Using DataFrames to calculate statistics needed for box & whisker plots
using Statistics

function box_whisker_data(results)
    by(results, :group, df -> DataFrame(
        min = minimum(df[:dem_share]),
        q1 = quantile(df[:dem_share], 0.25),
        median = median(df[:dem_share]),
        q3 = quantile(df[:dem_share], 0.75),
        max = maximum(df[:dem_share])
    ))
end

bw_data = box_whisker_data(results)
CSV.write("box_whisker_data.csv", bw_data)

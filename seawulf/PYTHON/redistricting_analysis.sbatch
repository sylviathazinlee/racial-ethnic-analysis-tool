#!/bin/bash
#SBATCH --job-name=redistricting_analysis
#SBATCH --time=02:00:00
#SBATCH --mem=16G
#SBATCH --cpus-per-task=4
#SBATCH --output=redistricting_analysis_%j.out

# module load python/3.8
# module load any-other-module
module load python/3.10.2
source activate myenv

# Run the script
srun python redistricting_analysis.py --state "NewYork" --election_data_file "NY_2022_election_results.csv" --steps 10000
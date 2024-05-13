#!/bin/bash
#SBATCH --job-name=redistricting
#SBATCH --output=redistricting_%j.out
#SBATCH --error=redistricting_%j.err
#SBATCH --time=02:00:00
#SBATCH --ntasks=1
#SBATCH --mem=4G

module load python3
source activate myenv

# Execute the Python script with parameters
python democrat_and_republican.py --total_steps $1 --epsilon $2

#EXAMPLE USAGE: sbatch democrat_and_republican.sh 50 0.01
#This will run the script with 50 total steps and epsilon of 0.01
# import gerrytools as gt

# Path: PYTHON/gerrytools.py
# We are going to use gerrytools in order to display some of the results of the redistricting analysis

from gerrytools.scoring import *
from gerrytools.plotting import *
import pandas as pd
import geopandas as gpd
from gerrychain import Graph
import matplotlib.pyplot as plt


plan = gpd.read_file("data/NY_CD_example")


ga_county = gpd.read_file("ny_county.zip")
ga_county.columns

new_plan = plan.dissolve(by='CD').reset_index()
new_plan["CD"]


import matplotlib.pyplot as plt
import gerrytools.plotting.colors as colors
import numpy as np

N = len(new_plan)

dists = new_plan.to_crs("EPSG:3857")
dists["CD"] = dists["CD"].astype(int)
dists=dists.sort_values(by="CD")
dists["colorindex"] = list(range(N))
dists["color"] = colors.districtr(N)

ax = drawplan(plan, assignment="CD",overlays=[ga_county])
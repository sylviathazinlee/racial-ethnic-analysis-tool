import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Dummy Data for Box & Whisker Plot for Hispanic Population in Districts
box_whisker_data = {
    "plan": np.repeat(["Plan A", "Plan B", "Plan C", "Plan D"], 5),
    "district": [1, 2, 3, 4, 5]*4,
    "hispanic_population": [
        100, 200, 150, 180, 220,   # Plan A
        130, 210, 160, 190, 230,   # Plan B
        105, 205, 155, 185, 225,   # Plan C
        135, 215, 165, 195, 235    # Plan D
    ]
}

# Convert to DataFrame for plotting
box_whisker_df = pd.DataFrame(box_whisker_data)

# # Plot using seaborn
# sns.boxplot(x="district", y="hispanic_population", hue="plan", data=box_whisker_df)
# plt.title("Hispanic Population Distribution by District Across Different Plans")
# plt.ylabel("Hispanic Population")
# plt.xlabel("District")
# plt.legend(title="Redistricting Plan")
# plt.show()

# Create a larger figure
plt.figure(figsize=(12, 8))  # You can adjust the size as needed

# Plot using seaborn with increased linewidth
sns.boxplot(x="district", y="hispanic_population", hue="plan", data=box_whisker_df, linewidth=2.5)

# Enhance title and label font sizes
plt.title("Hispanic Population Distribution by District Across Different Plans", fontsize=16)
plt.ylabel("Hispanic Population", fontsize=14)
plt.xlabel("District", fontsize=14)
plt.xticks(fontsize=12)  # Adjust ticks size
plt.yticks(fontsize=12)
plt.legend(title="Redistricting Plan", title_fontsize='13', fontsize='12')  # Adjust legend font size

# Show the plot
plt.show()
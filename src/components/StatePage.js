import React, { useState } from "react";
import StateMap from "./StateMap";
import DistrictInfoTable from "./DistrictInfoTable";
import StateAssemblyTable from "./StateAssemblyTable";
import StateSummary from "./StateSummary";
import AssemblyBarChart from "./AssemblyBarChart";
import BlackAssemblyScatterPlot from "./GinglesChart/BlackGinglesChart";
import AsianAssemblyScatterPlot from "./GinglesChart/AsianGinglesChart";
import WhiteAssemblyScatterPlot from "./GinglesChart/WhiteGinglesChart";
import HispanicAssemblyScatterPlot from "./GinglesChart/HispanicGinglesChart";
import WhiteBoxWhiskers from "./BoxWhiskers/WhiteBoxWhiskers";
import AsianBoxWhiskers from "./BoxWhiskers/AsianBoxWhiskers";
import BlackBoxWhiskers from "./BoxWhiskers/BlackBoxWhiskers";
import HispanicBoxWhiskers from "./BoxWhiskers/HispanicBoxWhiskers";
import NYOpportunityDistrict from "./OpportunityBar/NYOpportunityDistrict";
import AsianEIBiden from "./EI/AsianEIBiden";
import AsianEITrump from "./EI/AsianEITrump";
import WhiteEIBiden from "./EI/WhiteEIBiden";
import WhiteEITrump from "./EI/WhiteEITrump";
import HispanicEIBiden from "./EI/HispanicEIBiden";
import HispanicEITrump from "./EI/HispanicEITrump";
import BlackEIBiden from "./EI/BlackEIBiden";
import BlackEITrump from "./EI/BlackEITrump";
import EnsembleSum250 from "./EnsembleSummary/250_EnsembleSum";
import EnsembleSum5000 from "./EnsembleSummary/5000_EnsembleSum";
import EIGraph from "./EI/EIGraph";

const StatePage = ({
  selectedState,
  showTable,
  displayTable,
  showStateSummary,
  showChart,
  displayChart,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState();

  return (
    <>
      <div className="content-map">
        <StateMap
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
        />
      </div>

      <div
        className={
          displayTable || showStateSummary || displayChart ? "" : "hide"
        }
        style={{
          position: "absolute",
          zIndex: 1000,
          left: "20px",
          bottom: "20px",
          pointerEvents: "none",
          width: "80%",
        }}
      >
        {showStateSummary && <StateSummary selectedState={selectedState} />}
        {displayChart === "assembly-bar-graph" && (
          <AssemblyBarChart
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "white-gingles" && (
          <WhiteAssemblyScatterPlot
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "black-gingles" && (
          <BlackAssemblyScatterPlot
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "hispanic-gingles" && (
          <HispanicAssemblyScatterPlot
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "asian-gingles" && (
          <AsianAssemblyScatterPlot
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "white-boxwhiskers" && (
          <WhiteBoxWhiskers
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "black-boxwhiskers" && (
          <BlackBoxWhiskers
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "hispanic-boxwhiskers" && (
          <HispanicBoxWhiskers
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "asian-boxwhiskers" && (
          <AsianBoxWhiskers
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "opportunity" && (
          <NYOpportunityDistrict
            selectedState={selectedState}
            showChart={showChart}
          />
        )}
        {displayChart === "ei" && (
          <EIGraph selectedState={selectedState} showChart={showChart} />
        )}

        <div className="content-table">
          {displayTable === "250-ensemble-sum" && (
            <EnsembleSum250
              selectedState={selectedState}
              showTable={showTable}
            />
          )}
          {displayTable === "5000-ensemble-sum" && (
            <EnsembleSum5000
              selectedState={selectedState}
              showTable={showTable}
            />
          )}
          {displayTable === "state-table" && (
            <StateAssemblyTable
              selectedState={selectedState}
              showTable={showTable}
              onDistrictClick={(id) => setSelectedDistrict(id)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StatePage;

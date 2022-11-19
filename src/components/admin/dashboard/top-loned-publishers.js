import React, { useEffect, useState } from "react";
import { getTopPublishers } from "../../../api/publisher-service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../general/loading/loading";

const TopLoanedPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await getTopPublishers(10);

    setPublishers(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  let publisherObje = {
    id: 0,
    publisherName: "",
    count: 0,
  };

  function arr2obj(publishers) {
    let publishersArray = [];
    for (let i = 0; i < publishers.length; i++) {
      // Extract the key and the value
      publishersArray[i] = {
        id: publishers[i][0],
        publisherName: publishers[i][1],
        count: publishers[i][2],
      };
    }

    // Return the object
    return publishersArray;
  }

  return (
    <>
      <h3>Most Popular Publishers</h3>

      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="95%" height={300}>
          <BarChart
            data={arr2obj(publishers)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="publisherName"
              angle={-35}
              offset={5}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" barSize={40} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default TopLoanedPublishers;

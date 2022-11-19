import React, { useEffect, useState } from "react";
import { getTopAuthors } from "../../../api/author-service";
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

const TopLoanedAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await getTopAuthors(10);

    setAuthors(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  let authorObje = {
    id: 0,
    authorName: "",
    count: 0,
  };

  function arr2obj(authors) {
    let authorsArray = [];
    for (let i = 0; i < authors.length; i++) {
      // Extract the key and the value
      authorsArray[i] = {
        id: authors[i][0],
        authorName: authors[i][1],
        count: authors[i][2],
      };
    }

    // Return the object
    return authorsArray;
  }

  return (
    <>
      <h3>Most Popular Authors</h3>

      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="95%" height={300}>
          <BarChart
            data={arr2obj(authors)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="authorName" angle={-35} offset={5} interval={0} />
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

export default TopLoanedAuthors;

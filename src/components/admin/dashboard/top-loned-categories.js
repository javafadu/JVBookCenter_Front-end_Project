import React, { useEffect, useState } from "react";
import { getTopCategories } from "../../../api/category-service";
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

const TopLoanedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await getTopCategories(10);

    setCategories(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  let categoryObje = {
    id: 0,
    categoryName: "",
    count: 0,
  };

  function arr2obj(categories) {
    let categoriesArray = [];
    for (let i = 0; i < categories.length; i++) {
      // Extract the key and the value
      categoriesArray[i] = {
        id: categories[i][0],
        categoryName: categories[i][1],
        count: categories[i][2],
      };
    }

    // Return the object
    return categoriesArray;
  }

  return (
    <>
      <h3>Top Categories</h3>

      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="95%" height={300}>
          <BarChart
            data={arr2obj(categories)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoryName" angle={-35} offset={5} interval={0} />
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

export default TopLoanedCategories;

import React, { useEffect, useState } from "react";
import { mostBorrowers } from "../../../api/report-service";
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

const TopLoaners = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await mostBorrowers(10);

    setUsers(resp.data.content);

    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  let userObje = {
    id: 0,
    firstName: "",
    isbn: "",
    count: 0,
  };

  function arr2obj(users) {
    let usersArray = [];
    for (let i = 0; i < users.length; i++) {
      // Extract the key and the value
      usersArray[i] = {
        id: users[i][0],
        firstName: `${users[i][1]}  ${users[i][2]} `,
        lastName: users[i][2],
        count: users[i][3],
      };
    }

    // Return the object
    return usersArray;
  }

  return (
    <>
      <h3>Most Borrowers</h3>
      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="95%" height={300}>
          <BarChart
            data={arr2obj(users)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="firstName" angle={-35} offset={5} interval={0} />
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

export default TopLoaners;

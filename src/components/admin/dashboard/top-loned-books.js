import React, { useEffect, useState } from "react";
import { getTopBooks } from "../../../api/book-service";
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

const TopLoanedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await getTopBooks(10);

    setBooks(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  let bookObje = {
    id: 0,
    bookName: "",
    isbn: "",
    count: 0,
  };

  function arr2obj(books) {
    let booksArray = [];
    for (let i = 0; i < books.length; i++) {
      // Extract the key and the value
      booksArray[i] = {
        id: books[i][0],
        bookName: books[i][1],
        isbn: books[i][2],
        count: books[i][3],
      };
    }

    // Return the object
    return booksArray;
  }

  console.log(arr2obj(books));

  return (
    <>
      <h3>Top Loaned Books</h3>
      <ResponsiveContainer width="95%" height={300}>
        <BarChart
          data={arr2obj(books)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bookName" angle={-35} offset={5} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={40} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TopLoanedBooks;

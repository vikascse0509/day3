import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log(d);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (click) => {
    if (click === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (click === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Fetch Data from API
      </h1>
      <table
        border="1"
        className="table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-lg w-1/2"
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left text-grey-400">ID</th>
            <th className="border px-4 py-2 text-left text-grey-400">Title</th>
            <th className="border px-4 py-2 text-left text-grey-400">
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className=" border border-gray-300 px-4 py-2">{item.id}</td>
              <td className=" border border-gray-300 px-4 py-2">
                {item.title}
              </td>
              <td className=" border border-gray-300 px-4 py-2">
                {item.completed ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md mx-2 disabled:opacity-50"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md mx-2 disabled:opacity-50"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

import React from "react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { bookBaseUrl } from "../axiosInstance";
import Navbar from "./Navbar";

const Home = () => {
  const [book, setBook] = useState({
    bookName: "",
    bookTitle: "",
    Author: "",
    sellingPrice: "",
    publishDate: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("/bookList");
      setBookList(data.bookList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !book?.bookName ||
        !book.bookTitle ||
        !book.Author ||
        !book.sellingPrice
      ) {
        alert("All field are required");

        return;
      }

      if (isUpdating) {
        const { data } = await bookBaseUrl.put("/updateBook", book);

        if (data.success) {
          alert("Updated successfully");
          getAllBookList();
        }
        setBook({
           bookName: "",
        bookTitle: "",
        Author: "",
        sellingPrice: "",
        publishDate: "",
        Id: "",
        });
        setIsUpdating(false)
        return;
      }

      const { data } = await bookBaseUrl.post("/addBook", book);

      if (data.success) {
        alert("added");
        getAllBookList();
      }

      setBook({
        bookName: "",
        bookTitle: "",
        Author: "",
        sellingPrice: "",
        publishDate: "",
        Id: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const { data } = await bookBaseUrl.post("/deleteBook", { Id: id });

    if (data?.success) {
      alert("deleted");
    }
    getAllBookList();
  };

  const handleUpdate = (data) => {
    setIsUpdating(true)
    setBook({
      bookName: data?.bookName,
      bookTitle: data?.bookTitle,
      Author: data?.Author,
      sellingPrice: data?.sellingPrice,
      publishDate: data?.publishDate,
      Id: data?._id,
    });
  };

  return (
   <> 
<Navbar/>
      <div className=" px-10 py-6">
      <div className=" grid grid-cols-5 gap-3 ">
        <div>
          <label className="font-semibold">book name</label>
          <br />
          <input
            type="text"
            className="border rounded-md border-gray-500 h-7 px-2 w-full"
            name="bookName"
            value={book.bookName}
            onChange={handleFormChange}
          ></input>
        </div>

        <div>
          <label className="font-semibold">book Title</label>
          <br />
          <input
            type="text"
            className="border border-gray-500 h-7 px-2 rounded-md w-full"
            name="bookTitle"
            value={book.bookTitle}
            onChange={handleFormChange}
          ></input>
        </div>

        <div>
          <label className="font-semibold">Author</label>
          <br />
          <input
            type="text"
            className="border border-gray-500 h-7 px-2 rounded-md w-full"
            name="Author"
            value={book.Author}
            onChange={handleFormChange}
          ></input>
        </div>

        <div>
          <label className="font-semibold">Selling Price</label>
          <br />
          <input
            type="text"
            className="border border-gray-500 h-7 px-2 rounded-md w-full"
            name="sellingPrice"
            value={book.sellingPrice}
            onChange={handleFormChange}
          ></input>
        </div>

        <div>
          <label className="font-semibold">Publish Date</label>
          <br />
          <input
            type="date"
            className="border border-gray-500 h-7 px-2 rounded-md w-full"
            name="publishDate"
            value={book.publishDate}
            onChange={handleFormChange}
          ></input>
        </div>
      </div>

      <button
        className="px-3 mt-5  py-1 border bg-blue-400 block ml-auto rounded-md cursor-pointer"
        onClick={handleSubmit}
      >
        submit
      </button>

      <table className="w-full mt-10 border border-gray-400 border-collapse text-center">
        <thead>
          <tr className=" text-left bg-gray-300">
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center"> book name </th>
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center">book Title</th>
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center">Author</th>
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center">Selling Price</th>
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center">Publish Date</th>
            <th className="whitespace-nowrap p-2 border border-gray-400 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookList.map((book, index) => {
            return (
              <tr key={index} >
                <td className="whitespace-nowrap p-2 border border-gray-400 ">{book.bookName}</td>
                <td className="whitespace-nowrap p-2 border border-gray-400 ">{book.bookTitle}</td>
                <td className="whitespace-nowrap p-2 border border-gray-400 ">{book.Author}</td>
                <td className="whitespace-nowrap p-2 border border-gray-400 ">{book.sellingPrice}</td>
                <td className="whitespace-nowrap p-2 border border-gray-400 ">{book.publishDate}</td>
                <td className="whitespace-nowrap p-2 border border-gray-400 ">
                  <div className="flex justify-center gap-5">
                    <div
                      className="h-8 w-8 flex justify-center items-center  text-red-700 cursor-pointer"
                      onClick={() => handleDelete(book._id)}
                    >
                      <MdDelete />
                    </div>
                    <div
                      className="h-8 w-8 flex justify-center items-center  text-green-700 cursor-pointer"
                      onClick={() => handleUpdate(book)}
                    >
                      <FaPen />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
   </>

 
  );
};

export default Home;

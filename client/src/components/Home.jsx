import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id:""
  });

  const [bookList, setBookList] = useState([]);
  const[isUpdating,setIsUpdating]=useState(false)

  const getAllBookList = async (req, res) => {
    try {
      const { data } = await bookBaseUrl.get("bookLists");
      setBookList(data?.bookList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
  try {
    if (
      !bookForm?.BookName ||
      !bookForm.BookTitle ||
      !bookForm.Author ||
      !bookForm.SellingPrice
    ) {
      alert("All field are required");
      return;
    }

    if (isUpdating) {
      const { data } = await bookBaseUrl.put("/updateBook", bookForm);

      if (data?.success) {
        alert("Updated successfully");
        getAllBookList();

        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
          Id: ""
        });

        setIsUpdating(false);
      }

      return;
    }

    const { data } = await bookBaseUrl.post("/addBook", bookForm);

    console.log(data);

    if (data?.success) {
      alert("added");
      getAllBookList();

      setBookForm({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: "",
        Id: ""
      });
    }

  } catch (err) {
    console.log(err);
  }
};

  const handleDelete=async(id)=>{
    try{
      const {data}=await bookBaseUrl.post("deleteBook",{
        Id:id
      })

      if(data?.success){
      alert("Deleted successfully");
      getAllBookList();
      }

    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate=(data)=>{
  setBookForm(
    {
       BookName: data?.BookName,
          BookTitle: data?.BookTitle,
          Author: data?.Author,
          SellingPrice:  data?.SellingPrice,
          PublishDate:  data?.PublishDate,
             Id: data?._id 
    }
  )
  setIsUpdating(true)
  }
  console.log(bookForm);
  return (
    <div className="w-full px-9 min-h-screen mt-5 ">
      <div className="w-full grid grid-cols-5 gap-3">
        <div className="w-full flex flex-col  gap-2">
          <label>Book name</label>
          <input
            type="text"
            placeholder="Book name"
            className="w-full border border-gray-500 "
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Book Title</label>
          <input
            type="text"
            placeholder="Book title"
            className="w-full border border-gray-500 "
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Author</label>
          <input
            type="text"
            placeholder="Book Author"
            className="w-full border border-gray-500 "
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Selling price</label>
          <input
            type="text"
            placeholder="selling price"
            className=" w-full border border-gray-500 "
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>publish date</label>
          <input
            type="date"
            placeholder="publish date"
            className="w-full border border-gray-500 "
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          ></input>
        </div>
      </div>

      <div className="w-full flex justify-end ">
        <button
          className="bg-gray-400 h-10 w-20 rounded-md cursor-pointer "
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>

      <div className="w-full mt-10 ">
        <table className="w-full bg-white">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                book name
              </th>
              <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                book title
              </th>
              <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Author
              </th>
              <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Selling price
              </th>
              <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                publish date
              </th>
               <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookList?.map((book, index) => {
              return (
                <tr className="hover:bg-gray-200" key={index}>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.BookName}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.BookTitle}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.Author}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.SellingPrice}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.PublishDate}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="w-20 flex justify-center gap-5">
                      <div className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-700 rounded cursor-pointer" onClick={()=>handleDelete(book._id)}>
                        <MdDelete />
                      </div>

                      <div className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-700 rounded cursor-pointer" onClick={()=>handleUpdate(book)}>
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
    </div>
  );
};

export default Home;

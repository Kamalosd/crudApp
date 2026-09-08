import React, { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
const Home = () => {

  const [bookForm,setBookForm]=useState(
    {
      BookName:"",
      BookTitle:"",
      Author:"",
      SellingPrice:"",
      PublishData:""
    }
  )

  const handleFormChange=(e)=>{
    const {name,value}=e.target
    setBookForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit=async()=>{

    try{
      if(!bookForm?.BookName|| !bookForm.BookTitle|| !bookForm.Author|| !bookForm.SellingPrice){
        alert("All field are required")
 return
      }
     const {data}= await bookBaseUrl.post('/addBook',bookForm)
     console.log(data)
     if(data?.success){
      alert("added")
      setBookForm(
         {
      BookName:"",
      BookTitle:"",
      Author:"",
      SellingPrice:"",
      PublishData:""
    }
      )
     }
    }catch(err){
   console.log(err)
    }

  }
  console.log(bookForm)
  return (
    <div className="w-full px-9 h-9 mt-5 ">
      <div className="w-full grid grid-cols-5 gap-3">
        <div className="w-full flex flex-col  gap-2">
          <label>Book name</label>
          <input
            type="text"
            placeholder="Book name"
            className="w-full border border-gray-500 "
            name="BookName" value={bookForm.BookName} onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Book Title</label>
          <input
            type="text"
            placeholder="Book title"
            className="w-full border border-gray-500 "
              name="BookTitle" value={bookForm.BookTitle} onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Author</label>
          <input
            type="text"
            placeholder="Book Author"
            className="w-full border border-gray-500 "
              name="Author" value={bookForm.Author} onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>Selling price</label>
          <input
            type="text"
            placeholder="selling price"
            className=" w-full border border-gray-500 "
              name="SellingPrice" value={bookForm.SellingPrice} onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex flex-col gap-2  ">
          <label>publish date</label>
          <input
            type="date"
            placeholder="publish date"
            className="w-full border border-gray-500 "
              name="PublishData" value={bookForm.PublishData} onChange={handleFormChange}
          ></input>
        </div>
      </div>

      <div className="w-full flex justify-end ">
        <button className="bg-gray-400 h-10 w-20 rounded-md cursor-pointer " onClick={handleSubmit}>
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
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-200">
              <td className="px-6 py-3 whitespace-nowrap">name</td>
              <td className="px-6 py-3 whitespace-nowrap">name</td>
              <td className="px-6 py-3 whitespace-nowrap">name</td>
              <td className="px-6 py-3 whitespace-nowrap">name</td>
              <td className="px-6 py-3 whitespace-nowrap">name</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

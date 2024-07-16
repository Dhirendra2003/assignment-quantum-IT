import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [verification, setVerification] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      setVerification(false)
      navigate('/login');
      window.alert("you need to login first")
    }
    else {
      setVerification(true)
    }
  }, [])
  function data() {
    return (
      <tr className="text-center table-spacing">
        <td>1</td>
        <td>
          <div className="flex  place-content-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              className="w-10 h-10"
            />

            <p className="m-[auto]">Michael Holz</p>
          </div>
        </td>
        <td>4/10/2023</td>
        <td>Admin</td>
        <td>
          <div className="flex gap-2 place-content-center">
            <GoDotFill className="my-[auto]" color="green" />
            <p>Active</p>
          </div>
        </td>
      </tr>
    )
  }
  return (<>
    {verification ? <div className="  bg-white/90 shadow-md m-4 p-2 rounded ">
      <h1 className="text-2xl p-4">Home</h1>
      <div>
        <table>
          <tbody>
            <tr className=" table-spacing font-bold bg-gradient-to-r from-red-300 to-purple-300  ">
              <th>#</th>
              <th>Name</th>
              <th> Date created</th>

              <th>Status</th>
              <th>Action</th>
            </tr>

            {data()}
            {data()}
            {data()}
            {data()}
            {data()}
            {data()}
            {data()}
            {data()}
          </tbody>
        </table>
      </div>
    </div> : ""}
    
  </>
  );
}

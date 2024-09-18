'use client'
import Layout from '@/components/Dashboard/Layout'
import { BaseApiUrl } from '@/utils/constanst';
import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice'
import { useRouter } from "next/navigation";

function page() {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([])
  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 401 Unauthorized), handle it
      localStorage.removeItem('token');
      router.push("/");
    }

    const json = await response.json();
    if (json) {
      console.log(json);
      let newData = {

        userName: json.user.userName,
        userId: json.user.id,
        role: json.user.roleName,
        email: json.user.email

      }
      setData(newData)

      // dispatch(setUser(json.user));
    }
  }


  useEffect(() => {
    fetchUser()
  }, [])

  // const userdata = useSelector((store) => store.user);


  return (
    <div>
      <Layout data={data} />
    </div>
  )
}

export default page
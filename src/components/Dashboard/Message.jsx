'use client'

import AuthPage from "./component/authPage";
import ChatsPage from "./component/chatsPage";
import { useState } from "react";


export default function MessagingApp({data}) {
  
  // const [user, setUser] = useState();
  console.log(data);
  

  // if (!user) {
  //   return <AuthPage onAuth={(user) => setUser(user)} />;
  // } else {
    // return (<>mess</>);
    return <ChatsPage user={data} />;
  // }

}
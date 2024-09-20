'use client'

import AuthPage from "./component/authPage";
import ChatsPage from "./component/chatsPage";
import { useState } from "react";


export default function MessagingApp() {
  
  const [user, setUser] = useState();

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }

}
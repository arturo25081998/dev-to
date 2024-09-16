import { useEffect, useState } from "react";

//Hook to know if the user is looged

export function userLogged() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserLogged(true);
    }
  }, []);

  //console.log(userLogged);

  return userLogged;
}

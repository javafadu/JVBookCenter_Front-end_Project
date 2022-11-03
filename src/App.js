import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomRoutes from "./router/custom-routes";
import secureLocalStorage from "react-secure-storage";
import { getUser } from "./api/user-service";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import { settings } from "./utils/settings";
import Loading from "./components/general/loading/loading";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      let token = secureLocalStorage.getItem("token");
      if (token) {
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    document.title = `${settings.siteName} | Premimum Car Rental`;
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="App">
          <CustomRoutes />
        </div>
      )}
    </>
  );
}

export default App;

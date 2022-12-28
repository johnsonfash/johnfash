export const a = null;
// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import googleImg from "../assets/google-icon.png";
// import ENUM from "../services/enum";
// import { normalRequest } from "../services/request";
// import { useAppDispatch } from "../store/hooks";
// import { updateAccount } from "../store/slice/account";

// function GoogleLogin({
//   register = false,
//   setLoading,
// }: {
//   register?: boolean;
//   setLoading?: (val: boolean) => void;
// }) {
//   const googleRef = useRef<HTMLDivElement>(null);
//   const route = useNavigate();
//   const http = useAppDispatch();

//   useEffect(() => {
//     if (!window.google || !googleRef.current) return;
//     try {
//       window.google?.accounts?.id?.initialize({
//         client_id: ENUM.CLIENT_ID,
//         callback: handleCredentialResponse,
//       });
//       window.google?.accounts?.id?.renderButton(googleRef.current, {
//         theme: "outline",
//         size: "large",
//         text: "continue_with",
//         shape: "circle",
//       });
//     } catch (error: any) {}
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [register]);

//   const handleCredentialResponse = async (response: any) => {
//     setLoading && setLoading(true);
//     const res = await normalRequest("/auth/google", {
//       google_id_token: response.credential,
//     });
//     setLoading && setLoading(false);
//     if (res.error) {
//     } else {
//       http(
//         updateAccount({
//           loading: "done",
//           error: false,
//           errorMessage: null,
//           data: res.data,
//         })
//       );
//       route("/");
//     }
//   };

//   return (
//     <div className="text-center">
//       <div ref={googleRef} className="mt-3 d-inline-block">
//         <span className="box-shadow btn-light text-start d-inline-flex align-items-center  p-2 border rounded-5">
//           <img src={googleImg} alt="" className="mw-1" />
//           <span className="d-inlin-block ms-2">Continue with Google</span>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default GoogleLogin;

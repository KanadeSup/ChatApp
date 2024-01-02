export default function checkRefreshTokenTimeOut() {
   const refreshToken = localStorage.getItem("refreshToken");
   if (!refreshToken) {
      location.href = "/Login";
   }
    let refreshTokenTimeOut = localStorage.getItem("refreshTokenTimeOut");
    const now = new Date().getTime();
    refreshTokenTimeOut = new Date(refreshTokenTimeOut).getTime();
    if (now > refreshTokenTimeOut) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenTimeOut");
      return true;
    }
    return false;
}
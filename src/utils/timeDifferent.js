export default function formatTime(time) {
    // Tạo đối tượng thời gian từ chuỗi thời gian
    const date = new Date(time);
  
    // Lấy ngày giờ hiện tại
    const now = new Date();
  
    // Tính toán khoảng cách thời gian giữa thời gian hiện tại và thời gian cần hiển thị
    const diff = now - date;
  
    // So sánh khoảng cách thời gian với các mốc thời gian chuẩn
    if (diff < 1000) {
      // Nếu thời gian chưa đến 1 giây
      return "Vừa mới";
    } else if (diff < 60 * 1000) {
      // Nếu thời gian chưa đến 1 phút
      return Math.round(diff / 1000) + " giây trước";
    } else if (diff < 60 * 60 * 1000) {
      // Nếu thời gian chưa đến 1 giờ
      return Math.round(diff / (60 * 1000)) + " phút trước";
    } else if (diff < 24 * 60 * 60 * 1000) {
      // Nếu thời gian chưa đến 1 ngày
      return Math.round(diff / (60 * 60 * 1000)) + " giờ trước";
    } else if (diff < 24 * 60 * 60 * 1000 * 7) {
      // Nếu thời gian chưa đến 1 tuần
      const dayDiff = Math.round(diff / (60 * 60 * 24 * 1000));
      return dayDiff === 1 ? "Hôm qua" : dayDiff === 2 ? "Hôm kia" : dayDiff + " ngày trước";
    } else if (diff < 24 * 60 * 60 * 1000 * 2 * 7) {
      // Nếu thời gian chưa đến 2 tuần
      const weekDiff = Math.round(diff / (60 * 60 * 24 * 1000 * 7));
      return weekDiff === 1 ? "Tuần trước" : weekDiff === 2 ? "2 tuần trước" : weekDiff + " tuần trước";
    } else if (diff < 24 * 60 * 60 * 1000 * 30) {
      // Nếu thời gian chưa đến 1 tháng
      const monthDiff = Math.round(diff / (60 * 60 * 24 * 1000 * 30));
      return monthDiff === 1 ? "Tháng trước" : monthDiff + " tháng trước";
    } else {
      // Nếu thời gian hơn 1 tháng
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
  }
  
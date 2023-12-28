export default function formatTime(time) {
  // Create a date object from the time string
  const date = new Date(time);

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference between the current time and the time to be displayed
  const diff = now - date;

  // Compare the time difference with standard time milestones
  if (diff < 1000) {
    // If the time is less than 1 second
    return "Now";
  }
  if (diff < 60 * 1000) {
    // If the time is less than 1 minute
    return Math.round(diff / 1000) + " seconds ago";
  }
  if (diff < 60 * 60 * 1000) {
    // If the time is less than 1 hour
    return Math.round(diff / (60 * 1000)) + " minutes ago";
  }
  if (diff < 24 * 60 * 60 * 1000) {
    // If the time is less than 1 day
    return Math.round(diff / (60 * 60 * 1000)) + " hours ago";
  }
  if (diff < 24 * 60 * 60 * 1000 * 7) {
    // If the time is less than 1 week
    const dayDiff = Math.round(diff / (60 * 60 * 24 * 1000));
    return dayDiff === 1 ? "Yesterday" : dayDiff + " days ago";
  }
  if (diff < 24 * 60 * 60 * 1000 * 2 * 7) {
    // If the time is less than 2 weeks
    const weekDiff = Math.round(diff / (60 * 60 * 24 * 1000 * 7));
    return weekDiff + " weeks ago";
  }
  if (diff < 24 * 60 * 60 * 1000 * 30) {
    // If the time is less than 1 month
    const monthDiff = Math.round(diff / (60 * 60 * 24 * 1000 * 30));
    return monthDiff + " months ago";
  }
  {
    // If the time is more than 1 month
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
}

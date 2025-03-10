export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getHoursAgo = (publishedAt) => {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffInMs = now - publishedDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  return diffInHours === 0 ? "Just now" : `${diffInHours} hours ago`;
};

export const menuItems = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Sport", path: "/sport" },
  { name: "Business", path: "/business" },
  { name: "Health", path: "/health" },
  { name: "Science", path: "/science" },
  { name: "Technology", path: "/technology" },
  { name: "Entertainment", path: "/entertainment" },
];

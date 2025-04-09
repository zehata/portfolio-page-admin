import Sidebar from "@/components/Sidebar";
import getAllBlogs from "@/lib/getAllBlogs";

export const SidebarPanel = async () => {
  const allBlogs = await getAllBlogs();
  return <Sidebar blogItems={allBlogs} />;
};

export default SidebarPanel;

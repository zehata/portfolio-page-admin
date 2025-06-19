import Sidebar from "@/components/Sidebar";
import { getAllArticles } from "@/lib/getAllArticles";
import { ArticleType } from "@/lib/types";

const SidebarPanel = async () => {
  const allBlogs = await getAllArticles(ArticleType.Blog);
  const allProjects = await getAllArticles(ArticleType.Project);
  return <Sidebar blogItems={allBlogs} projectItems={allProjects} />;
};

export default SidebarPanel;

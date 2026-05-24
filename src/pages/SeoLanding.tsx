import { useParams } from "react-router-dom";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { seoLandingConfigs } from "@/lib/seoLandingConfigs";
import NotFound from "./NotFound";

const SeoLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? seoLandingConfigs[slug] : undefined;
  if (!config) return <NotFound />;
  return <SeoLandingPage {...config} />;
};

export default SeoLanding;

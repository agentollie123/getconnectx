import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog — ConnectX"
        description="Updates, trust & safety policies, and insights from the ConnectX team on building startups and finding co-founders."
        path="/blog"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <header className="mb-12 pb-8 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Blog
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              From the ConnectX team
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              Policies, product updates, and stories from founders building the next generation of startups.
            </p>
          </header>

          <ul className="space-y-6">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-1 rounded-md bg-secondary text-foreground/80 font-medium">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="font-display font-semibold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

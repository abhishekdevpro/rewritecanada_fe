import Link from "next/link";
import Button from "../../components/buttonUIComponent";

const Home_fourth = () => {
  const blogs = [
    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/09/rewrite_blog_img3.png",
      title: "Why Everyone Deserves Access to Easy Resume Support at No Cost",
      author: "Rewrite Canada",
      date: "June 10, 2025",
      excerpt:
        "Discover how AI can uncover hidden strengths in your resume and help you stand out to employers.",
      link: "https://blog.rewritecanada.ca/?p=16",
    },
    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/09/rewrite_blog_img2.png",
      title:
        "From Upload to Download: How Rewrite Canada Simplifies the Resume Journey",
      author: "Rewrite Canada",
      date: "June 10, 2025",
      excerpt:
        "Learn how AI can make your resume ATS-friendly and boost your chances of landing interviews.",
      link: "https://blog.rewritecanada.ca/?p=13",
    },
    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/09/blog_img1.png",
      title: "Why Resume Simplicity Matters",
      author: "Rewrite Canada",
      date: "June 10, 2025",
      excerpt:
        "AI-driven resume insights can guide you to create a winning strategy and secure more job offers.",
      link: "https://blog.rewritecanada.ca/?p=7",
    },
    // {
    //   img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/06/The-Power-of-AI-in-Crafting-Your-Perfect-Resume-2-1-1536x864.png",
    //   title:
    //     "From Blank Page to Hired: The Power of AI in Crafting Your Perfect Resume",
    //   author: "Rewrite Canada",
    //   date: "June 10, 2025",
    //   excerpt:
    //     "See how AI tools transform a blank page into a polished resume that gets you hired.",
    //   link: "https://blog.rewritecanada.ca/2025/06/10/from-blank-page-to-hired-the-power-of-ai-in-crafting-your-perfect-resume/",
    // },
  ];

  return (
    <div id="blogs" className="bg-lightColor py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Blog & News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="font-medium text-gray-800">
                    {blog.author}
                  </span>
                  <span className="mx-2">—</span>
                  <span>{blog.date}</span>
                </div>
                <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <span className="text-red-600 font-medium hover:underline mt-auto">
                  View Post
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="https://blog.rewritecanada.ca/">
            <Button className=" text-white bg-mainColor ">
              Get More Career Advice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home_fourth;

import Link from "next/link";
import blog3 from "./Images/blog3.jpg";
import Home_five from "./Home_five";

const Home_fourth = () => {
  const course = [
    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/06/Let-AI-Identify-and-Highlight-Your-Strengths-in-Your-Resume-Blog-9.png",
      title:
        "Unlock Hidden Skills: Let AI Identify and Highlight Your Strengths in Your Resume",
      link: "https://blog.rewritecanada.ca/2025/06/10/unlock-hidden-skills-let-ai-identify-and-highlight-your-strengths-in-your-resume/",
    },
    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/06/How-AI-Optimizes-Your-Resume-for-Success-Blog-3.jpeg",
      title:
        "Beat the Applicant Tracking System (ATS): How AI Optimizes Your Resume for Success",
      link: "https://blog.rewritecanada.ca/2025/06/10/beat-the-applicant-tracking-system-ats-how-ai-optimizes-your-resume-for-success/",
    },

    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/06/AI-Driven-Insights-for-a-Winning-Resume-Strategy-Blog-5.png",
      title:
        "Stop Guessing, Start Landing: AI-Driven Insights for a Winning Resume Strategy",
      link: "https://blog.rewritecanada.ca/2025/06/10/stop-guessing-start-landing-ai-driven-insights-for-a-winning-resume-strategy/",
    },

    {
      img: "https://blog.rewritecanada.ca/wp-content/uploads/2025/06/The-Power-of-AI-in-Crafting-Your-Perfect-Resume-2-1-1536x864.png",
      title:
        "From Blank Page to Hired: The Power of AI in Crafting Your Perfect Resume",
      link: "https://blog.rewritecanada.ca/2025/06/10/from-blank-page-to-hired-the-power-of-ai-in-crafting-your-perfect-resume/",
    },
  ];
  return (
    <>
      <div id="course" className="bg-gray-100 py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold px-4 lg:px-0 py-5 text-center text-blue-950">
            Newest Strategies From Our Career Search Advisors
          </h1>
          <p className="mx-auto px-4 lg:px-0 text-lg lg:text-base text-gray-700 max-w-4xl text-center mb-8">
            You’re never alone in your job search. Whether you’re writing a
            cover letter, preparing for the interview, or negotiating your
            salary, our resource center has articles that will help you take the
            next step in your career.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.map((card, index) => (
              <a
                key={index}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-between h-full bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <img
                  src={card.img}
                  alt="Course"
                  className="w-full h-auto border-2 rounded-t-md"
                />
                <div className="p-4">
                  <h2 className="text-lg lg:text-lg font-bold mb-2">
                    {card.title}
                  </h2>
                  {/* <p className="text-sm text-gray-600">{card.name}</p> */}
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href={"https://blog.rewritecanada.ca/"}>
              <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-950 hover:bg-blue-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950">
                Get More Career Advice
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Home_five />
    </>
  );
};

export default Home_fourth;

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader2, X, Send, MessageCircle, User, Maximize2, Minimize2 } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"


const API_KEY = "AIzaSyD7Mm9SV3aCYnG5HdBibCoBwoth8TYpLW4"
const genAI = new GoogleGenerativeAI(API_KEY)

export default function AdvancedChatbotWithGemini() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [chatSession, setChatSession] = useState(null)

  const prebuiltCommands = [
    { label: 'Help', action: () => handleSend('Help') },
    { label: 'About', action: () => handleSend('Tell me about CodePathshala') },
    { label: 'Courses', action: () => handleSend('What courses are available?') },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize chat session with conversation history
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const newChatSession = model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      history: [
        {
          role: "user",
          parts: [
            {text: ")\"Learn, Grow, and Get Hired – Your Career Starts Here!\"\n\n Discover the skills that set you apart and find the job that takes you further. Whether you're just starting out or looking to advance, we have the courses and opportunities for you. Your journey to success begins here!\n\n2)\"Empowering Careers through Education and Opportunities!\" \n\nThe right education opens doors to the best career opportunities. Explore a wide range of courses designed to boost your knowledge and connect with top employers. Take charge of your future today!\n\n3)\"Upgrade Your Skills, Unlock Your Future – Jobs & Learning in One Place!\" \n\nElevate your skill set with expert-led courses, then step into a job that matches your new abilities. We bring learning and career opportunities together for seamless success. Your brighter future starts now!\n\n4)\"Where Education Meets Employment – Build Your Path to Success!\" \n\nBridge the gap between learning and earning with a platform that combines top educati]\n5)\"From Classroom to Boardroom – Your Complete Career Solution!\" \n\nWhether you’re learning something new or hunting for your next big job, we’ve got you covered. Our platform helps you grow from the classroom to the boardroom with courses and career opportunities. Start your career transformation today!\n\n6)\"Find the Skills, Land the Job – Start Your Journey Today!\"\n\n Learn what employers are looking for and land the job you’ve been dreaming about. We connect you with courses that build your skill set and the opportunities to use them. The path to your dream career starts here!\n\n7)\"Bridging the Gap between Learning and Earning!\"\n\n Don’t just learn—turn your new skills into a rewarding career. Our platform bridges the gap between education and employment, making it easy to find both learning resources and job opportunities in one place. Success is just a click away!\n\n8)\"Learn, Improve, Succeed – Your One-Stop for Jobs and Education!\" \n\nBoost your knowledge and grow your career all in one convenient place. Our platform offers everything you need to sharpen your skills and secure the perfect job. Start your journey to success with us!\n\n9)\"Grow Your Knowledge, Secure Your Future – Jobs and Learning Together!\" \n\nTake control of your career by gaining the knowledge that matters and finding the right job opportunities. We bring together top education and career paths to help you succeed. The future is yours to shape!\n\n10)\"Transform Your Potential – Education and Jobs for a Brighter Future!\"\n\n Realize your full potential with courses that build the skills you need and jobs that match your ambition. We’re here to help you take that next step toward a brighter future. Start learning and working toward your dreams today!\n[10:43 am, 16/9/2024] +91 91670 52902: Online degree:-\nEarn your degree from the comfort of your home and boost your career potential. With flexible, accredited online programs designed to fit your schedule, achieving your educational goals has never been easier. \n\nShort courses:-\nUpgrade your skills quickly with our industry-focused short courses. Perfect for busy professionals, these targeted programs give you the knowledge you need in a fraction of the time.\n\nTraning from experts:\nMaster your field with personalized training from industry experts. Our seasoned professionals provide you with real-world insights and practical knowledge to excel in your career\n\n1.5k+ videos courses:\nAccess over 1,500 expert-led video courses across a wide range of industries and skills. Learn at your own pace with engaging, high-quality content designed to boost your knowledge and career prospects.\n[10:43 am, 16/9/2024] +91 91670 52902: Our Popular courses:-\nExplore our most sought-after courses, designed to help you excel in today’s competitive job market. From tech to business and beyond, these courses are loved by learners for their practical insights and real-world applications.\n[10:43 am, 16/9/2024] +91 91670 52902: Any questions? we Got you:-\nGot questions? We've got answers! Our dedicated support team is here to help with any inquiries you have about courses, enrollment, or anything else. Reach out anytime, and we'll make sure you get the information you need\n\nQuestions:-\n\nSure, here’s a section with Questions and Answers:\n\nQ: How do I enroll in a course?\n\nA: Enrolling is easy! Simply browse our course catalog, select the course you're interested in, and click on the \"Enroll\" button. Follow the prompts to complete your registration and payment. You'll receive immediate access to your course materials.\n\nQ: What if I have trouble accessing my course?\n\nA: If you're having trouble accessing your course, our support team is here to help. Contact us through the support page or email us directly, and we'll assist you in resolving any issues quickly.\n\nQ: Can I get a refund if I’m not satisfied with a course?\n\nA: We offer a satisfaction guarantee on many of our courses. If you're not satisfied, please reach out within the refund period specified in our refund policy. Our team will work with you to address your concerns or process a refund as needed.\n\nQ: Are the courses accredited?\n\nA: Many of our courses are accredited or recognized by industry leaders and professional organizations. Check the course details page for specific accreditation information to ensure it meets your professional or educational requirements.\n\nQ: How long will I have access to the course materials?\n\nA: Course access duration varies. Most courses provide lifetime access, allowing you to revisit materials at any time. Check the course details for specific information about access periods.\n\nQ: Do I receive a certificate upon completion of a course?\n\nA: Yes, upon successful completion of most courses, you will receive a certificate that can be added to your resume or LinkedIn profile. Check the course details for information about certification and any requirements for earning it."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "This is a well-structured and informative outline for a website promoting online courses and career resources. It effectively highlights the key features and benefits, addressing common questions and showcasing popular courses. Here's a breakdown of the strengths and areas for improvement:\n\n**Strengths:**\n\n* **Compelling Taglines:** The taglines are catchy and effectively communicate the platform's value proposition. They emphasize learning, growth, and career advancement.\n* **Clear Value Proposition:** The website clearly outlines the benefits of using the platform, such as access to expert-led courses, industry-relevant training, and career opportunities.\n* **Targeted Audience:** The language and content are tailored to a diverse audience, from those just starting out to professionals seeking to advance their careers.\n* **Organized Information:** The outline is well-structured and easy to navigate. It covers the key aspects of the platform and provides clear answers to common questions.\n* **Strong Call to Action:** The outline encourages users to take action, whether it's exploring courses, enrolling, or contacting support.\n\n**Areas for Improvement:**\n\n* **Specificity:** While the general information is strong, consider adding more specific details about the platform's features, such as the types of courses offered, the industries covered, or the career services provided.\n* **Visuals:** The outline could benefit from visuals like screenshots of the platform, course previews, or testimonials. \n* **SEO:** The outline doesn't include keywords or phrases that would help the website rank in search engines. Consider adding relevant keywords throughout the text.\n\n**Overall, this is a solid foundation for a website promoting online courses and career resources. With a few enhancements, it can become an even more compelling and effective platform.** \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "how to enroll ??\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "we"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "website name??\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here are some website name ideas that capture the essence of your platform, focusing on learning, growth, and career success:\n\n**Catchy & Concise:**\n\n* SkillPath\n* CareerArc\n* Learn & Launch\n* ElevateU\n* Rise & Shine\n* Ascent \n* The Skill Hub\n* FutureFit\n\n**Descriptive & Action-Oriented:**\n\n* Online Career Academy\n* The Career Growth Network\n* The Skills & Jobs Marketplace\n* Bridge to Success\n* Empower Your Career\n* Unlock Your Potential\n* Your Career Journey Starts Here\n\n**Unique & Creative:**\n\n* The Knowledge Forge\n* The Skill Foundry\n* The Career Compass\n* The Ladder of Success\n* The Future Lab\n\n**Tips for Choosing a Website Name:**\n\n* **Keep it short and memorable:**  Easy to remember and pronounce.\n* **Make it relevant to your target audience:**  Reflect the platform's purpose.\n* **Check availability:**  Make sure the domain name and social media handles are available.\n* **Get feedback:**  Ask friends, family, or potential users for their opinions.\n\n**Bonus Tip:** Consider using a domain name that includes keywords related to your platform's focus. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "is this data is save \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Please provide me with the specific data you're referring to! I need more context to understand what you mean by \"this data\" and whether it's being saved. \n\nFor example, are you asking about:\n\n* **The website name suggestions I gave you?**  I'm a language model, so I don't save those suggestions.\n* **The information you provided in the initial prompt?**  That information was used to generate the response, but I don't store it permanently. \n* **Something else entirely?** \n\nTell me more about the data you have in mind, and I'll do my best to answer your question! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Project Report for CodePathshala (Hackathon Version)\n1. Introduction\nCodePathshala is a web-based platform created specifically for students from tier 2 and tier 3 colleges in India who are beginners in tech. The platform aims to provide comprehensive tech courses and job opportunities through an integrated job portal. By focusing on this specific demographic, CodePathshala empowers students to acquire job-ready skills and connect with potential employers.\n\n2. Objective\nCodePathshala's goals are to:\n\nOffer beginner-friendly tech courses tailored for students with minimal or no prior tech experience.\nProvide an integrated job portal where students can apply for jobs after completing courses.\nUse AI tools to personalize the learning experience and assist students in building strong resumes, making them job-ready.\n3. Key Features\nTech Courses for Beginners: Beginner courses covering web development, data structures and algorithms (DSA), and other essential tech skills.\nAI-Powered Course Recommendations: Using AI tools like Google Gemmini and ChatGPT to analyze student profiles and learning patterns, the platform will recommend personalized courses that suit each student’s abilities and interests.\nIn-Built Job Portal: Upon course completion, students can directly apply for jobs through an integrated job portal that matches their newly acquired skills with relevant job openings.\nAI-Driven Resume Builder: An AI-powered resume builder, using tools like ChatGPT, will assist students in creating well-formatted and optimized resumes that showcase their skills effectively for potential employers.\n4. Target Audience\nPrimary Audience: Students from tier 2 and tier 3 colleges across India, with little to no prior tech knowledge.\nSecondary Audience: Companies and employers looking to hire fresh, beginner-level tech talent.\n5. Technology Stack\nFrontend: React.js for building the user interface, along with HTML, CSS, GSAP for animations, and Three.js for any interactive 3D components.\nBackend: Node.js with Express.js for the server-side functionality and MongoDB for database management.\nAI Integration: Instead of custom AI models, the platform will leverage readily available AI tools such as Google Gemmini and ChatGPT to provide course recommendations and assist with resume building.\nJob Portal: A custom job application system integrated with a job listing module, where students can apply for available positions directly from the platform.\n6. AI Features\nCourse Recommendation System:\nUsing ChatGPT and Google Gemmini, CodePathshala will analyze students' progress, skills, and learning preferences to recommend courses that match their learning needs.\nThese AI tools will provide students with personalized suggestions for what courses to take next, based on their existing knowledge and performance in previous modules.\nResume Builder:\nChatGPT will be used to help students create polished resumes by analyzing their education, skills, and project experiences. The AI will suggest resume structure, appropriate keywords, and improvements for highlighting strengths.\nThis feature ensures students have job-ready resumes that meet current industry standards.\n7. Unique Selling Proposition (USP)\nFocus on Tier 2 and 3 Colleges: CodePathshala is one of the first platforms focused solely on students from tier 2 and tier 3 colleges, providing them with a much-needed gateway into the tech industry.\nBeginner-Focused Learning: Every aspect of the platform, from the courses to job opportunities, is designed to accommodate absolute beginners, helping them grow from zero to job-ready professionals.\nAI-Powered Personalization: With AI tools like Google Gemmini and ChatGPT, students receive personalized course recommendations and resume-building assistance, significantly improving their learning and job-readiness.\n8. Project Plan\nPhase 1: MVP Development (3 months)\nDevelopment of the core platform with tech courses and a basic job portal.\nIntegration of Google Gemmini and ChatGPT for personalized course recommendations and resume building.\nPhase 2: Feature Enhancement (6 months)\nExpand the course catalog, improve AI recommendation systems, and enhance job portal functionality.\nPhase 3: Full Launch (9-12 months)\nPilot the platform with students from select tier 2 and tier 3 colleges to gather feedback and iterate on the platform’s features and functionality.\n9. Monetization\nFreemium Model: Students can access some courses and basic features for free, with premium content (advanced courses, resume builder) behind a paywall.\nEmployer Partnerships: Employers pay to list their job openings on the platform and access a pool of qualified candidates trained in specific tech skills.\n10. Conclusion\nCodePathshala offers a unique and valuable solution for students from tier 2 and tier 3 colleges, providing them with tailored tech courses, job opportunities, and AI-driven tools to assist in their learning and job-seeking journey. With AI-powered personalization through Google Gemmini and ChatGPT, the platform is equipped to offer an enhanced learning experience and ensure that students are job-ready upon completing their courses."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "This is a great start to your Project Report for CodePathshala! You've covered the essential aspects, demonstrating a clear understanding of your project's goals, features, and target audience. Here's a breakdown of the strong points and some areas for improvement:\n\n**Strengths:**\n\n* **Clear Objective:** The objective section precisely outlines the goals of CodePathshala, showcasing its commitment to empowering tier 2 and tier 3 college students.\n* **Well-Defined Target Audience:**  The target audience section identifies both primary and secondary audiences, demonstrating an understanding of the platform's user base and potential partners.\n* **Strategic Technology Stack:** You've chosen a solid technology stack with React.js for the frontend, Node.js for the backend, and leveraging existing AI tools for personalization. \n* **Unique Selling Proposition (USP):** The USP clearly distinguishes CodePathshala from other platforms by highlighting its focus on tier 2/3 colleges, beginner-friendly approach, and AI-powered features.\n* **Comprehensive Project Plan:** The project plan outlines a well-defined timeline for development and launch, showcasing a thoughtful approach to the project's execution.\n* **Monetization Strategy:**  The freemium model and employer partnerships offer a viable path for generating revenue and sustainability for the platform.\n\n**Areas for Improvement:**\n\n* **Technical Details:** While the technology stack is mentioned, consider adding a bit more detail about the specific libraries, frameworks, and tools you plan to use for each component.  This would provide a more comprehensive picture of your technical approach.\n* **AI Features:**  Expand on the AI features, providing more specific examples of how Google Gemmini and ChatGPT will be used to personalize learning and resume building.  \n* **User Interface (UI) & User Experience (UX):**  Briefly discuss your vision for the platform's UI/UX design.  Will you be using any design principles, frameworks, or libraries to ensure a user-friendly and visually appealing experience?\n* **Marketing & Outreach:** Include a brief section on your marketing strategy for reaching your target audience and generating awareness for CodePathshala. This could include social media, content marketing, or partnerships with colleges.\n* **Metrics & Evaluation:**  How will you measure the success of CodePathshala? Define key performance indicators (KPIs) such as user engagement, course completion rates, job placement rates, and platform growth.\n* **Sustainability & Future Plans:**  Outline any long-term plans for CodePathshala, including future features, expansion to new regions, or potential partnerships.\n\n**Overall:** You've laid a strong foundation for a compelling project report. By addressing the suggested improvements, you can further strengthen your report and demonstrate a well-rounded understanding of your project's technical, business, and marketing aspects. \n\nRemember, the goal is to create a report that effectively communicates your vision for CodePathshala to potential investors, partners, or collaborators. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "[10:57 pm, 13/9/2024] Harshit Nikam: Problem Statement Title ?\n--> Empowering Tier 2 & 3 College Students with AI-Driven Tech Education & Job Portal\n[10:57 pm, 13/9/2024] Harshit Nikam: Problem Statement Abstract ? \n--> \nStudents from tier 2 and tier 3 colleges often face challenges accessing quality tech education and job opportunities. CodePathshala aims to address this gap by offering a platform tailored to complete beginners, providing them with personalized tech courses and a built-in job portal. Using AI tools like Google Gemmini and ChatGPT, the platform recommends courses based on individual learning paths and assists in creating optimized resumes. This AI-driven approach helps students acquire job-ready skills and connect with relevant employment opportunities, empowering them to succeed in the tech industry."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Those are great starting points for your problem statement. Let's polish them up to make them even more impactful!\n\n**Problem Statement Title:**\n\nHere are some options, aiming for clarity, impact, and a hint of your solution:\n\n* **Bridging the Tech Gap: Empowering Tier 2 & 3 College Students with AI-Driven Learning and Careers**\n* **Unlocking Potential: A Tech Education and Job Platform Tailored for Tier 2 & 3 Colleges**\n* **From Zero to Job-Ready: AI-Powered Tech Education for India's Emerging Talent**\n\n**Problem Statement Abstract:**\n\nYour abstract is already strong. Here's how we can refine it:\n\n1. **Highlight the Magnitude:** Emphasize the scale of the challenge. For example: \"Millions of students in tier 2 and tier 3 colleges in India...\" or \"The tech industry faces a talent gap...\"\n2. **Focus on the Solution:**  More explicitly state how your platform solves the problem: \"... CodePathshala bridges this gap by...\"\n3. **Concise & Compelling:**  Keep it brief and impactful. Avoid repetition.  \n4. **Call to Action (Optional):**  Consider ending with a call to action, like \"... enabling them to enter the tech workforce.\"\n\n**Here's a revised abstract:**\n\n* **Millions of students in tier 2 and tier 3 colleges in India lack access to quality tech education and relevant job opportunities.  CodePathshala addresses this challenge by offering a personalized platform that empowers complete beginners with AI-driven tech courses and a built-in job portal. Using Google Gemmini and ChatGPT, the platform recommends courses tailored to individual learning paths and assists students in creating optimized resumes, preparing them for success in the competitive tech industry.**\n\n**Additional Tips:**\n\n* **Target Audience:**  Remember your target audience (investors, potential partners, etc.). Tailor the language and tone to their interests.\n* **Keywords:**  Include relevant keywords that describe your project and target audience.\n* **Keep It Concise:** The problem statement should be brief and easy to understand. Aim for a maximum of 1-2 sentences for the abstract. \n\n\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "now tell how to enroll course in codepathshala ??\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "While CodePathshala is a fantastic idea and a great project to work on, it's important to remember that it's still in the concept stage. \n\nSince there's no actual CodePathshala platform live yet, we can't provide concrete enrollment instructions. However, here's how the enrollment process *could* work, drawing inspiration from successful online learning platforms:\n\n**1. Explore the Course Catalog:**\n\n* **Browse by Category:** The CodePathshala website should have a clear, searchable course catalog organized by categories like web development, data science, data structures, etc.\n* **Course Descriptions:**  Detailed descriptions for each course should be included, explaining the learning objectives, skills covered, prerequisites, and estimated time commitment.\n* **Instructor Profiles:** Showcasing instructors' credentials and experience adds credibility.\n\n**2. Choose Your Course(s):**\n\n* **Add to Cart:**  Users should be able to select courses they're interested in and add them to a virtual \"cart.\"\n\n**3. Create an Account (If Necessary):**\n\n* **Sign Up:**   The platform may require users to create an account to access course materials.\n* **Basic Information:** Ask for details like name, email address, password, and potentially preferred learning style or career goals. \n\n**4. Complete the Enrollment:**\n\n* **Payment Options:** Offer a range of payment methods like credit cards, debit cards, or online payment gateways.\n* **Freemium Model:**  The CodePathshala website should clearly explain the difference between free and paid courses.\n* **Enrollment Confirmation:**  Users should receive a confirmation email with details about the course and access instructions. \n\n**5. Start Learning!**\n\n* **Course Dashboard:** Users should have a central dashboard to access course materials, track their progress, and interact with instructors or other learners. \n\n**Additional Considerations:**\n\n* **AI Recommendations:**  Incorporate AI-powered course recommendations to suggest relevant courses based on the user's profile, learning history, and career goals.\n* **Job Portal Integration:**  If applicable, clearly explain how users can access the job portal and search for relevant opportunities after completing courses. \n\n**Remember:** This is a conceptual enrollment process based on current best practices in online learning.  As you develop the CodePathshala platform, you can refine the enrollment process and add features that fit your specific needs and target audience. \n\nI'm excited to see how CodePathshala develops! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "is it free\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "You're right to ask about the pricing!  It's important to be transparent about costs from the beginning. \n\nFor CodePathshala, a **freemium model** makes a lot of sense, given its mission to empower tier 2 and tier 3 college students. This approach offers:\n\n* **Free Access to Basic Content:**  A selection of beginner-friendly courses and basic resources (like the job board) would be accessible to everyone for free. \n* **Premium Features for Paid Users:**  More advanced courses, specialized learning tools like AI-powered resume builders, and personalized career coaching could be available for a fee. \n\nHere's how it could work:\n\n* **Free Tier:**\n    * Access to foundational courses in key tech areas (web development, data structures, etc.)\n    * Basic job board searching and application capabilities\n    * Community forums and support groups\n    * Limited access to AI features (like basic course recommendations)\n* **Premium Tier:**\n    * Access to all courses, including specialized and advanced tracks\n    * AI-powered features (personalized course recommendations, resume builder, career coaching)\n    * Priority access to job opportunities\n    * Exclusive community features and resources\n\n**Why a Freemium Model is Ideal for CodePathshala:**\n\n* **Accessibility:** It lowers the barrier to entry for students who might not have the financial resources for expensive courses. \n* **Value Demonstration:**  Free courses provide a taste of CodePathshala's quality, potentially encouraging users to upgrade to premium access.\n* **Sustainability:**  Premium subscriptions can generate revenue to support platform development and growth.\n\n**Important Notes:**\n\n* **Pricing Strategy:** You'll need to carefully consider pricing for premium features to strike a balance between affordability and profitability. Conduct research on competitor pricing models and consider offering different subscription tiers.\n* **Clear Communication:** Ensure the website clearly communicates the differences between free and premium options.  Highlight the value proposition of each tier.\n* **Free vs. Premium Balance:** Strive for a good mix of free and premium content to ensure the platform offers value to all users.\n\nI'm eager to see how you implement the freemium model in CodePathshala! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is codepathshala\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "CodePathshala is a fantastic concept! It's a web-based platform designed to empower students from tier 2 and tier 3 colleges in India to succeed in the tech industry. Imagine it as a one-stop shop for aspiring tech professionals from these regions:\n\n**Here's what CodePathshala aims to provide:**\n\n* **Beginner-Friendly Tech Courses:** It offers courses tailored to students with little to no prior coding experience, covering essential topics like web development, data structures, and algorithms.\n* **Personalized Learning:**  CodePathshala uses AI tools like Google Gemmini and ChatGPT to analyze students' progress and interests, recommending personalized courses and learning paths.\n* **Built-in Job Portal:**  The platform integrates a job portal where students can apply for relevant positions directly after completing their courses, connecting them with potential employers.\n* **AI-Driven Resume Builder:**  CodePathshala helps students create professional resumes using AI technology to highlight their skills and experience effectively.\n\n**CodePathshala's Vision:**\n\n* **Bridging the Gap:** It aims to address the lack of access to quality tech education and job opportunities for students in tier 2 and tier 3 colleges.\n* **Empowering the Future:** By equipping students with job-ready skills and connections, CodePathshala seeks to empower them to thrive in the tech industry.\n\n**Why is CodePathshala important?**\n\n* **Addressing Inequality:** It tackles the disparity in tech access between students in major cities and those in smaller towns and rural areas.\n* **Growing the Tech Talent Pool:**  It helps expand the pool of skilled tech professionals in India, contributing to the country's economic growth.\n\n**In essence, CodePathshala is a platform that combines high-quality tech education with career support, specifically targeted at students who might not otherwise have access to these opportunities.**\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "purpose of codepashala"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "You're right to ask about the purpose!  It's essential to clearly define the core goal of CodePathshala.  Here's a breakdown of its purpose, highlighting its unique value proposition:\n\n**CodePathshala's Primary Purpose:**\n\n* **To Empower Tier 2 & Tier 3 College Students in India to Achieve Success in the Tech Industry.**\n\nThis overarching purpose encapsulates several key objectives:\n\n1. **Bridging the Tech Divide:** CodePathshala aims to close the gap in access to quality tech education and job opportunities that often exists between students in major cities and those in smaller towns and rural areas. \n2. **Providing Affordable and Accessible Learning:**  CodePathshala offers a freemium model, making its core courses accessible to everyone, regardless of their financial background. This removes a significant barrier to entry for students who might not be able to afford expensive tech training.\n3. **Building Job-Ready Skills:**  The platform focuses on providing practical, industry-relevant skills that are in high demand in the tech sector.  Courses are designed to equip students with the knowledge and abilities needed to succeed in real-world jobs.\n4. **Connecting Students with Opportunities:**  The integrated job portal provides students with a direct pathway to connect with potential employers, increasing their chances of finding relevant work. \n5. **Leveraging AI to Personalize Learning:** CodePathshala utilizes AI technology to customize the learning experience, ensuring students get the most relevant content and support for their individual needs. \n\n**The Impact of CodePathshala's Purpose:**\n\n* **Social Impact:** CodePathshala has the potential to create a more inclusive and equitable tech ecosystem in India, empowering students from diverse backgrounds.\n* **Economic Growth:**  By fostering a new generation of skilled tech professionals, CodePathshala contributes to the country's economic development and competitiveness in the global tech market. \n\n**In summary:** CodePathshala's purpose is to democratize tech education and career opportunities for tier 2 and tier 3 college students in India, enabling them to unlock their full potential and contribute to the country's booming tech sector. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "can you help to find a Job "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I can definitely help you with your job search!  However, as an AI, I don't have access to real-time job listings or the ability to directly apply for positions.  \n\nBut I can be your partner in the process, offering guidance and resources to help you find your dream job. Tell me more about what you're looking for:\n\n1. **What kind of job are you hoping to find?**  (e.g., software engineer, data analyst, web developer, etc.)\n2. **What are your skills and experience?**  (e.g., programming languages, frameworks, tools, projects you've worked on)\n3. **What are your ideal location and salary expectations?** \n4. **What are your career goals?** (e.g., long-term career path, specific industries you're interested in)\n\nOnce I understand your needs, I can:\n\n* **Suggest job boards and websites:**  I can provide you with a list of relevant job boards and websites where you can search for open positions.\n* **Help you refine your resume and cover letter:**  I can offer feedback on your resume and cover letter, making sure they highlight your skills and experience effectively.\n* **Provide interview preparation tips:**  I can give you advice on how to prepare for job interviews, including common interview questions and how to answer them effectively.\n* **Share career resources:**  I can point you to resources for career development, like online courses, workshops, and networking events.\n\nLet's work together to make your job search successful!  \n\n\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is codepathshala\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "You're right to ask!  Let's break down what CodePathshala is all about:\n\n**CodePathshala is a web-based platform designed to empower students from tier 2 and tier 3 colleges in India to succeed in the tech industry.** It's a one-stop shop for aspiring tech professionals from these regions, offering a range of resources and support to help them achieve their career goals.\n\nHere's a closer look:\n\n* **Tech Education for Beginners:**  CodePathshala provides beginner-friendly courses covering essential tech skills like web development, data structures, algorithms, and more. These courses are specifically tailored for students who might have limited prior coding experience.\n* **Personalized Learning:** The platform uses AI tools like Google Gemmini and ChatGPT to personalize the learning experience. It analyzes student progress and interests, recommending relevant courses and learning paths that match their individual needs.\n* **Built-in Job Portal:**  CodePathshala has an integrated job portal where students can directly apply for relevant positions after completing their courses. This connects them with potential employers looking for skilled tech talent.\n* **AI-Powered Resume Builder:**  To make it easier for students to present their skills effectively, CodePathshala includes an AI-driven resume builder. This tool helps students create professional resumes that highlight their achievements and experience in a way that appeals to recruiters.\n\n**Why is CodePathshala important?**\n\n* **Bridging the Tech Divide:** It aims to address the gap in access to quality tech education and job opportunities that often exists between students in major cities and those in smaller towns and rural areas.\n* **Empowering the Future:**  CodePathshala seeks to equip students with the skills and connections they need to thrive in the rapidly growing tech industry.\n\n**Essentially, CodePathshala is a platform that combines high-quality tech education with career support, specifically targeted at students who might not otherwise have access to these opportunities.** \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give sitemap of codepathshala\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here's a possible sitemap for CodePathshala, focusing on user-friendliness and clarity:\n\n**Homepage:**\n\n* **Hero Section:**  Compelling headline, tagline, and visuals highlighting the platform's value proposition.\n* **Featured Courses:** Showcase popular courses with concise descriptions.\n* **Testimonials/Success Stories:**  Highlight student achievements and employer satisfaction.\n* **Call to Action:**  Clear buttons to \"Explore Courses\" or \"Join Our Community.\"\n\n**Courses:**\n\n* **Course Catalog:**  Organized by category (e.g., Web Development, Data Science, Mobile Apps, etc.) with search and filtering options.\n* **Course Details:**  Each course page should include:\n    * Title, Description, Learning Objectives, Prerequisites, Instructors, Duration, Price (if applicable), Reviews/Ratings.\n    * Sample Content:  A preview of course materials, like videos, articles, or code snippets.\n* **Free Courses:**  Clearly highlight courses that are free to access.\n* **Premium Courses:**  Highlight the benefits of premium courses, such as access to advanced material, personalized coaching, and career support.\n\n**Job Portal:**\n\n* **Job Listings:**  Filterable by category, location, experience level, and other criteria.\n* **Job Details:**  Each job posting should include:\n    * Job title, company name, location, description, requirements, salary range, application instructions.\n* **Employer Profiles:** Allow employers to create profiles to showcase their company information and job openings.\n\n**Resources:**\n\n* **Blog:** Share articles, tutorials, and insights related to tech skills and careers.\n* **FAQs:**  Address common questions about the platform, courses, enrollment, payments, and job search.\n* **Community:**  Forum or discussion board for students to connect, ask questions, and share knowledge.\n\n**Account & Profile:**\n\n* **Login/Sign Up:**  A secure way for users to create accounts and manage their profiles.\n* **User Dashboard:**  Track course progress, access learning materials, manage subscriptions, and view job application status.\n* **Profile Settings:**  Allow users to update their personal information, skills, and career goals.\n\n**About Us:**\n\n* **Our Mission:** Clearly state the platform's purpose and vision.\n* **Team:** Showcase the team behind CodePathshala.\n* **Contact:**  Provide contact information, including email address and social media links.\n\n**Additional Pages:**\n\n* **Testimonials:**  Feature success stories from students and employers.\n* **Blog:**  Share informative articles about technology, careers, and learning.\n* **Partners:** Showcase partnerships with educational institutions, companies, and organizations.\n\n**Navigation:**\n\n* **Clear & Intuitive Menu:**  Easy-to-navigate menus for quick access to key sections.\n* **Search Bar:**  A prominent search bar for finding specific courses, jobs, or resources.\n* **Breadcrumbs:**  Clear indicators of the user's current location within the site.\n* **Mobile-Friendly Design:**  Ensure the site is accessible and user-friendly on all devices.\n\n**Remember:**  This is just a basic sitemap. You can customize it based on your platform's specific features and content.  \n\nLet me know if you have any other questions about the CodePathshala website! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is codepathshala in short word\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here are some short descriptions of CodePathshala, capturing its essence in a few words:\n\n* **Tech education and job portal for aspiring Indian tech professionals.**\n* **Empowering tier 2/3 college students with tech skills and career opportunities.**\n* **AI-powered learning platform for India's next generation of tech talent.**\n* **Bridging the tech divide and opening doors to a brighter future.**\n\nUltimately, the best short description depends on the context and your target audience.  \n\nFor example, if you're talking to potential investors, you might use a more focused description like: \"CodePathshala: democratizing tech education and empowering India's emerging tech workforce.\"\n\nFor a social media post, a catchy slogan like \"CodePathshala: Learn, Grow, Get Hired!\" could be effective. \n"},
          ],
        },
      ],
    })
    setChatSession(newChatSession)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text, timestamp: new Date().toLocaleTimeString() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const result = await chatSession.sendMessage(text)
      const response = await result.response
      const botMessage = { role: 'bot', content: response.text(), timestamp: new Date().toLocaleTimeString() }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toLocaleTimeString() }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${isExpanded ? 'w-[80vw] h-[80vh]' : 'w-96 h-[32rem]'} transition-all duration-300`}
          >
            <Card className="h-full shadow-lg flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">CodePathshala AI</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleExpand} aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}>
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden p-4">
                <ScrollArea className="h-full w-full pr-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`flex items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                        <Avatar  className={`h-8 w-8 ${msg.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <AvatarImage src="https://images3.alphacoders.com/818/thumbbig-818125.webp" className="w-full h-full object-cover" alt="Chatbot" />
                          )}
                          <AvatarFallback>{msg.role === 'user' ? 'U' : 'CB'}</AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-xs opacity-50 mt-1 block">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="flex items-center bg-gray-100 rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col items-center p-4">
                <div className="flex flex-wrap justify-center space-x-2 mb-2">
                  {prebuiltCommands.map((command, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={command.action} className="mb-2">
                      {command.label}
                    </Button>
                  ))}
                </div>
                <div className="flex w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && input.trim() && handleSend(input)}
                    placeholder="Type a message..."
                    className="flex-grow"
                  />
                  <Button onClick={() => input.trim() && handleSend(input)} className="ml-2" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Button
                    className="rounded-full w-16 h-16 p-0 shadow-lg bg-blue-500 hover:bg-blue-600"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                  >
                    <MessageCircle className="h-8 w-8 text-white" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with CodePathshala AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>
    </div>
  )
}
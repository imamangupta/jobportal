import Footer from "@/components/Footer";
import Banner from "@/components/Home/Banner";
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/Home";
import NavbarBanner from "@/components/Home/NavbarBanner";
import NumberCounter from "@/components/Home/NumberCounter";
import SubjectCard from "@/components/Home/SubjectCard";
import Testimonial from "@/components/Home/Testimonial";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import NavBar from "@/components/NavBar";
import React from "react";
import Img1 from "@/assets/banner1.png";
import Img2 from "@/assets/banner2.png";
import AdvancedChatbotWithGemini from "@/components/AdvancedChatbotWithGemini";

const BannerData = {
  image: Img1,
  tag: "Learn at Your Own Pace",
  title: "Embrace the Freedom to Learn at Your Own Pace: Tailor Your Educational Journey to Fit Your Unique Schedule and Goals! ",
  subtitle:
    "Experience the freedom and flexibility to learn at your own pace, allowing you to tailor your educational journey to fit your unique schedule, learning preferences, and personal goals. With our self-paced courses, you can take the time to thoroughly grasp complex concepts, revisit materials as needed, and progress through the curriculum without the pressure of strict deadlines.",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "Explore Job Opportunities at Your Own Pace",
  title: "Discover Your Future: Explore Job Opportunities at Your Own Pace and Tailor Your Career Path to Fit Your Unique Aspirations! ",
  subtitle:
    "Discover career opportunities that fit your schedule with our job portal. Browse listings without pressure and use customizable filters to find roles aligned with your skills. Take your time to research companies and perfect your applications while balancing your commitments. Navigate your professional journey confidently and on your own terms! ",
  link: "#",
};

function page() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <NavbarBanner />
      <Home />
      <NumberCounter />
      <WhyChooseUs />
      <Banner {...BannerData} />
      <Banner {...BannerData2} reverse={true} />
      <SubjectCard />
      <Testimonial />
      <FAQ />
      <Footer />
      <div className="fixed bottom-4 left-4 z-50">
        <AdvancedChatbotWithGemini />
      </div>
    </div>
  );
}

export default page;

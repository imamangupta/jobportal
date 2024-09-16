import Footer from "@/components/Footer";
import AboutUsDashboard from "@/components/Home/AboutDashboard";
import Banner from "@/components/Home/Banner";
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/Home";
import NavbarBanner from "@/components/Home/NavbarBanner";
import NumberCounter from "@/components/Home/NumberCounter";
import PopularCourses from "@/components/Home/PopularCourses";
import SubjectCard from "@/components/Home/SubjectCard";
import Testimonial from "@/components/Home/Testimonial";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import SearchCourses from "@/components/Home/WhyChooseUs";
import NavBar from "@/components/NavBar";
import React from "react";
import Img1 from "../assets/banner1.png";
import Img2 from "../assets/banner2.png";



const BannerData = {
  image: Img1,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Personalized Professional Online Tutor on Your Schedule",
  subtitle:
    "Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form",
  link: "#",
};

const BannerData2 = {
  image:Img2,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Talented and Qualified Tutors to Serve You for Help",
  subtitle:
    "Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility. Lorem ipsum is a placeholder text commonly used",
  link: "#",
};



function page() {
  return (
    <div>
      <NavBar />
      <NavbarBanner/>
      <Home />
      <NumberCounter/>
      <WhyChooseUs/>
      <Banner {...BannerData}/>
      <Banner {...BannerData2} reverse={true}/>
      <SubjectCard/>
      <Testimonial/>
      <FAQ />
      <Footer />
    </div>
  );
}

export default page;

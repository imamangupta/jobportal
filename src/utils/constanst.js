import img1 from '../../public/assets/sideCourse.png'
import img2 from '../../public/assets/macBook.jpg'
import img3 from '../../public/assets/sampleUser.png'

export const BaseApiUrl = "https://jobportal-backend-wine.vercel.app/api";
// export const BaseApiUrl = "http://localhost:4000/api";

export const sideCourseImg = img1;
export const macBookImg = img2;
export const sampleUserImg = img3;

export const courseBenefit = [
    {
        id: 1,
        logo: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" className="bi bi-mortarboard" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
        </svg>,
        title: 'Online Degree',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur accusamus, beatae necessitatibus eaque perferendis corrupti.'
    },
    {
        id: 2,
        logo: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" className="bi bi-book" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
        </svg>,
        title: 'Short Courses',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur accusamus, beatae necessitatibus eaque perferendis corrupti.'
    },
    {
        id: 3,
        logo: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>,
        title: 'Training From Experts',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur accusamus, beatae necessitatibus eaque perferendis corrupti.'
    },
    {
        id: 4,
        logo: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" className="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
        </svg>,
        title: '1.5k+ Videos Courses',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur accusamus, beatae necessitatibus eaque perferendis corrupti.'
    }
];

export const PopularCoursesCardData = [
    {
        id: 1,
        img: macBookImg,
        title: 'Web Design & Development',
        type: 'UI/UX Design',
        price: '$560.00',
        students: '150',
        classes: '25',
        authorName: 'J. Morgan',
        authorImg: sampleUserImg,
        rating: '4.2'
    },
    {
        id: 2,
        img: macBookImg,
        title: 'Web Design & Development',
        type: 'UI/UX Design',
        price: '$560.00',
        students: '150',
        classes: '25',
        authorName: 'J. Morgan',
        authorImg: sampleUserImg,
        rating: '4.2'
    },
    {
        id: 3,
        img: macBookImg,
        title: 'Web Design & Development',
        type: 'UI/UX Design',
        price: '$560.00',
        students: '150',
        classes: '25',
        authorName: 'J. Morgan',
        authorImg: sampleUserImg,
        rating: '4.2'
    }
];

export const FAQData = [
    {
        id: 1,
        question: 'How do I enroll in a course?',
        answer: 'Enrolling is easy! Simply browse our course catalog, select the course youre interested in, and click on the "Enroll" button. Follow the prompts to complete your registration and payment. Youll receive immediate access to your course materials. '
    },
    {
        id: 2,
        question: 'What if I have trouble accessing my course? ',
        answer: 'If youre having trouble accessing your course, our support team is here to help. Contact us through the support page or email us directly, and well assist you in resolving any issues quickly.'
    },
    {
        id: 3,
        question: 'Can I get a refund if I’m not satisfied with a course?',
        answer: 'We offer a satisfaction guarantee on many of our courses. If youre not satisfied, please reach out within the refund period specified in our refund policy. Our team will work with you to address your concerns or process a refund as needed. '
    },
    {
        id: 4,
        question: 'Are the courses accredited?',
        answer: 'Many of our courses are accredited or recognized by industry leaders and professional organizations. Check the course details page for specific accreditation information to ensure it meets your professional or educational requirements.'
    }
];
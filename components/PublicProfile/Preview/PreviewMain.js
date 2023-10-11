import PrimaryBtn from "@/components/Btn/Primary";
import Input from "@/components/Dashboard/Input";
import Textarea from "@/components/Dashboard/Textarea";
import { ReasonIcon } from "@/constants/icons";
import Link from "next/link";
import { useState } from "react";
import styles from "../Preview/public-profile-preview.module.css";

const PreviewMain = () => {
  const offerings = [
    { name: 'Flights', description: 'We provide flights that are punctual, comfortable, and safe, catering to passengers\' needs during their journey.', featured: true },
    { name: 'Hotels', description: 'We provide amenities such as comfortable rooms, dining options, and concierge services to ensure a pleasant stay.', featured: true },
    { name: 'Taxi', description: 'We provide on-demand rides, with licensed drivers, to transport passengers to their desired destinations quickly and efficiently.', featured: false }
  ]
  const reasons = [
    { name: 'Reliability', description: 'We pride ourselves on being a reliable choice. Our track record of punctuality, safety, and consistent quality service sets us apart.' },
    {
      name: 'Exceptional Customer Care', description: 'We prioritize our customers\' satisfaction above all else.As we have friendly and professional staffs dedicated to give the best customer satisfaction'
    },
    { name: 'Competitive Pricing', description: 'We offer competitive pricing without compromising on the quality of service, ensuring access to wide range of travelers. ' }
  ]
  const testimonials = [
    { author: 'Jane Cooper', portfolio: 'CEO of ABC Corporation', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.' },
    { author: 'Jane Cooper', portfolio: 'CEO of ABC Corporation', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.' },
    { author: 'Jane Cooper', portfolio: 'CEO of ABC Corporation', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.' },]
  return (
    <div className={`${styles.main}`} >
      {/* HERO SECTION */}
      <div className={`${styles.section} ${styles.hero}`} >
        <div className={`${styles.inner}`} >
          <div className={styles.hero__texts}>
            <h1>Kelechi Travels</h1>
            <p>Welcome to Kelechi Travels, your gateway to unforgettable journeys. With a deep love for travel, we've become your trusted partner in crafting dream vacations. Our dedication to creating seamless, extraordinary experiences drives us to offer top-notch travel services. Explore the world with us and let your wanderlust lead the way.</p>
            <Link href="#" className={`primary_btn ${styles.book__btn}`}>
              Book Now
            </Link>
          </div>
          <div className={styles.hero__schedule}>
            <div className={styles.hero__schedule_col}>
              <h5>Monday - Fridays</h5>
              <p>Business Opening and Closing Days</p>
            </div>
            <div className={styles.hero__schedule_col}>
              <h5>8:00 AM - 6:00 PM</h5>
              <p>Business Opening and Closing Hours</p>
            </div>
          </div>
        </div>
      </div>
      {/* OFFERINGS SECTION */}
      <div className={`${styles.section} ${styles.offering}`} >
        <div className={`${styles.inner}`} >
          <div className={styles.text__header}>
            <h2>What We Offer</h2>
          </div>
          <div className={styles.offerings__card_grid}>
            {offerings.map(offering => <div className={styles.offerings__card} key={offering.name}>
              <div className={styles.offerings__card_image}>
                {offering.featured && <div className={styles.offerings__card_featured}>FEATURED OFFER</div>}
              </div>
              <div className={styles.offerings__card_texts}>
                <h5>{offering.name}</h5>
                <p>{offering.description}</p>
                <Link href="#" className={`primary_btn ${styles.book__btn}`}>
                  Book Now
                </Link>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      {/* REASONS SECTION */}
      <div className={`${styles.section} ${styles.reasons}`} >
        <div className={`${styles.inner}`} >
          <div className={styles.text__header}>
            <h2>Why Choose Us</h2>
          </div>
          <div className={styles.reasons__card_grid}>
            {reasons.map(reason => <div className={styles.reasons__card} key={reason.name}>
              <ReasonIcon />
              <div className={styles.reasons__card_texts}>
                <h5>{reason.name}</h5>
                <p>{reason.description}</p>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      {/* TESTIMONIALS SECTION */}
      <div className={`${styles.section} ${styles.testimonials}`} >
        <div className={`${styles.inner}`} >
          <div className={styles.text__header}>
            <h2>What Our Happy Clients Say</h2>
            <p>Don’t just take our word for it, Hear from our happy clients.</p>
          </div>
          <div className={styles.testimonials__card_grid}>
            {testimonials.map(testimonial => <div className={styles.testimonials__card} key={testimonial.name}>
              <div className={styles.testimonials__card_content}>
                <p>
                  {testimonial.content}
                </p>
              </div>
              <div className={styles.testimonials__card_user}>
                <img src="/profile.png" alt="" />
                <div className={styles.name}>{testimonial.author}</div>
                <div className={styles.portfolio}>{testimonial.portfolio}</div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
      {/* CONTACT SECTION */}
      <div className={`${styles.section} ${styles.contact}`} >
        <div className={`${styles.inner}`} >
          <div className={styles.text__header}>
            <h2>Your Thoughts, Our Action!</h2>
            <p>Your message matters.Fill out the form below, and we'll be in touch to make it happen.</p>
          </div>

          <form>
            <Input
              label="Full Name"
              placeholder="Kelechi Tavels"
              name="name"
            />
            <Input
              label="Email Address"
              placeholder="kelechi@travels.com"
              name="email"
            />
            <Textarea
              label="Message"
              placeholder="Leave a Message"
              type="textarea"
              name="message"
            />
            <PrimaryBtn text="Send Message" />
          </form>
        </div>
      </div>
    </div>
  )
};

export default PreviewMain;

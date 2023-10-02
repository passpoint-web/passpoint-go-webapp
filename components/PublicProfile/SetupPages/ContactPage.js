"use client";
import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import AuthStyles from "@/assets/styles/auth-screens.module.css";
import { useRouter } from "next/navigation";
import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
import functions from "@/utils/functions";

const ContactPage = ({ styles }) => {
  const { validEmail } = functions;
  const { push } = useRouter();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [socialForm, setSocialForm] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    phone: "",
    address: "",
    openingDay: "",
    closingDay: "",
    openingHour: "",
    closingHour: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
  };

  useEffect(() => {
    const { openingDay, closingDay, phone, address } = payload;
    if (openingDay && closingDay && phone && address && validEmail(email)) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <div className={styles.inner}>
      <h1>Contact Information</h1>
      {!socialForm ? (
        <form onSubmit={handleSubmit}>
          <Input
            label="Company’s Email Address"
            id="email"
            placeholder="Kelechi Tavels"
            name="email"
            value={payload.email}
            onChange={handleChange}
            error={ctaClicked && !validEmail(payload.email)}
            errorMsg={
              !payload.email
                ? "Email address is required"
                : !validEmail(payload.email)
                ? "Valid email is required"
                : "Email is required"
            }
          />
          <Input
            label="Company’s Phone Number"
            id="phone"
            placeholder="Kelechi Tavels"
            name="phone"
            value={payload.phone}
            error={ctaClicked && !payload.phone}
            errorMsg="Phone No is required"
            onChange={handleChange}
          />
          <Input
            label="Physical Address"
            id="address"
            placeholder="Kelechi Tavels"
            name="address"
            value={payload.address}
            error={ctaClicked && !payload.address}
            errorMsg="Address is required"
            onChange={handleChange}
          />
          <div className={AuthStyles.form_row}>
            <Input
              id="openingDay"
              label="Business Opening Day"
              error={ctaClicked && !payload.openingDay}
              errorMsg="opening day is required"
            >
              <CustomSelect
                fieldError={ctaClicked && !payload.openingDay}
                selectOptions={days}
                selectedOption={payload.openingDay}
                emitSelect={(e) =>
                  handleChange({
                    target: { name: "openingDay", value: e },
                  })
                }
              />
            </Input>
            <Input
              id="closingDay"
              label="Business Closing Day"
              error={ctaClicked && !payload.closingDay}
              errorMsg="closing day is required"
            >
              <CustomSelect
                fieldError={ctaClicked && !payload.closingDay}
                selectOptions={days}
                selectedOption={payload.closingDay}
                emitSelect={(e) =>
                  handleChange({
                    target: { name: "closingDay", value: e },
                  })
                }
              />
            </Input>
          </div>
          <div className={AuthStyles.form_row}>
            <Input
              label="Business Opening Hour"
              id="openingHour"
              type="time"
              name="openingHour"
              value={payload.openingHour}
              error={ctaClicked && !payload.openingHour}
              errorMsg="Opening hour is required"
              onChange={handleChange}
            />
            <Input
              label="Business Closing Hour"
              id="closingHour"
              type="time"
              name="closingHour"
              value={payload.closingHour}
              error={ctaClicked && !payload.closingHour}
              errorMsg="Closing hour is required"
              onChange={handleChange}
            />
          </div>
          <div className={styles.action_ctn}>
            <PrimaryBtn
              text="Save and continue"
              // loading={isLoading}
            />
          </div>
        </form>
      ) : (
        <form>
          <Input
            label="Facebook"
            id="facebook"
            placeholder="https://www.facebook.com/"
            name="facebook"
            value={payload.facebook}
            error={ctaClicked && !payload.facebook}
            errorMsg="Facebook username is required"
            onChange={handleChange}
          />
          <Input
            label="Twitter"
            id="twitter"
            placeholder="https://www.twitter.com/"
            name="twitter"
            value={payload.twitter}
            error={ctaClicked && !payload.twitter}
            errorMsg="Twitter username is required"
            onChange={handleChange}
          />
          <Input
            label="Instagram"
            id="instagram"
            placeholder="https://www.instagram.com/"
            name="instagram"
            value={payload.instagram}
            error={ctaClicked && !payload.instagram}
            errorMsg="Instagram username is required"
            onChange={handleChange}
          />
          <Input
            label="Facebook"
            id="youtube"
            placeholder="https://www.youtube.com/"
            name="youtube"
            value={payload.youtube}
            error={ctaClicked && !payload.youtube}
            errorMsg="Youtube username is required"
            onChange={handleChange}
          />
          <Input
            label="Snapchat"
            id="snapchat"
            placeholder="https://www.snapchat.com/"
            name="snapchat"
            value={payload.snapchat}
            error={ctaClicked && !payload.snapchat}
            errorMsg="Snapchat username is required"
            onChange={handleChange}
          />
          <Input
            label="Tiktok"
            id="tiktok"
            placeholder="https://www.tiktok.com/"
            name="tiktok"
            value={payload.tiktok}
            error={ctaClicked && !payload.tiktok}
            errorMsg="Tiktok username is required"
            onChange={handleChange}
          />
          <Input
            label="Whatsapp"
            id="whatsapp"
            placeholder="https://www.whatsapp.com/"
            name="whatsapp"
            value={payload.whatsapp}
            error={ctaClicked && !payload.whatsapp}
            errorMsg="Whatsapp username is required"
            onChange={handleChange}
          />
          <div className={styles.action_ctn}>
            <PrimaryBtn
              text="Save and continue"
              // loading={isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactPage;

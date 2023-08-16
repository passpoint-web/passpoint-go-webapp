
import { useState } from "react"
import BusinessChoiceBtn from "@/components/Btn/BusinessChoice"
import styles from '@/assets/styles/business-kind.module.css'

const BusinessChoice = ({emitSetOption}) => {
  const [option, setOption] = useState(undefined)
  const [currentOption, setCurrentOption] = useState({})
  const options = [
    {
      id: 0,
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="95" height="96" viewBox="0 0 95 96" fill="none">
        <g clipPath="url(#clip0_331_1629)">
          <rect x="0.21167" width="94.0766" height="95.9997" rx="47.0383" fill="#96D7E7" fillOpacity="0.5"/>
          <path d="M87 47.6162L81.2857 50.9163L47.0001 70.7108V24.5215L87 47.6162Z" fill="#DF752B"/>
          <path d="M46.9999 24.5215V70.7108L41.2857 67.4107L12.7143 50.9163L7 47.6162L46.9999 24.5215Z" fill="#973E00"/>
          <path d="M41.2856 67.4104V74.0107L12.7142 57.5163V50.916L41.2856 67.4104Z" fill="#054C5C"/>
          <path d="M41.2856 74.011V107L12.7142 90.5053V57.5166L41.2856 74.011Z" fill="#096378"/>
          <path d="M81.2856 50.916V57.5163L46.9999 77.3108L41.2856 74.0107V67.4104L46.9999 70.7105L81.2856 50.916Z" fill="#0B8CAA"/>
          <path d="M81.2856 57.5166V83.905L41.2856 107V74.011L46.9999 77.3111L81.2856 57.5166Z" fill="#009EC4"/>
          <path d="M72.3304 93.712V69.4268L54.4601 79.5074V101.96L72.3304 93.712Z" fill="#6BC7DD"/>
          <path d="M34.1709 27.5895V47.7924L28.342 51.1568V24.2197L34.1709 27.5895Z" fill="#93B1B6"/>
          <path d="M40.0049 24.2197V44.4279L34.1707 47.7924V27.5895L40.0049 24.2197Z" fill="#CEE3E7"/>
          <path d="M40.0051 24.2199L34.1709 27.5897L28.342 24.2199L34.1709 20.8555L40.0051 24.2199Z" fill="#D9D9D9"/>
        </g>
        <defs>
          <clipPath id="clip0_331_1629">
            <rect x="0.21167" width="94.0766" height="95.9997" rx="47.0383" fill="white"/>
          </clipPath>
        </defs>
      </svg>),
    heading: 'Non-registered business',
    content: {
      p: 'For a non-registered business, we’ll ask you to provide with us your:',
      list: [
        'Valid government ID (NIN, National Id card)',
        'BVN (Nigerians only)',
        'Utility bill (eg. Electricity)'
      ]
    }
    },
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="95" height="96" viewBox="0 0 95 96" fill="none">
        <g clipPath="url(#clip0_250_932)">
          <rect x="0.711685" width="94.0766" height="95.9997" rx="47.0383" fill="#96D7E7" fillOpacity="0.5"/>
          <path d="M45.3198 69.1109V120.544L19.8663 105.847V54.4141L26.2267 58.0853L45.3198 69.1109Z" fill="#096378"/>
          <path d="M45.3198 69.1103V120.543L77.1396 102.175V50.7363L45.3198 69.1103ZM54.4512 102.286L48.0908 105.958V98.6092L53.627 95.4114L54.4512 94.9379V102.286ZM54.4512 90.2903L48.0908 93.9616V86.6132L53.627 83.4155L54.4512 82.9419V90.2903ZM54.4512 78.2944L48.0908 81.9656V74.6172L53.627 71.4195L54.4512 70.9459V78.2944ZM64.407 96.7736L58.0465 100.451V93.1023L63.5827 89.9045L64.407 89.4251V96.7736ZM64.407 84.7776L58.0465 88.4547V81.1063L63.5827 77.9085L64.407 77.4292V84.7776ZM64.407 72.7816L58.0465 76.4587V69.1103L63.5827 65.9125L64.407 65.4332V72.7816ZM74.3686 91.2608L68.0023 94.9379V87.5895L73.5443 84.3917L74.3686 83.9182V91.2608ZM74.3686 79.2648L68.0023 82.9419V75.5935L73.5443 72.3957L74.3686 71.9222V79.2648ZM74.3686 67.2688L68.0023 70.9459V63.5975L73.5443 60.3998L74.3686 59.9262V67.2688Z" fill="#009EC4"/>
          <path d="M58.0465 25.0209V47.0661L51.6802 50.7433V21.3438L58.0465 25.0209Z" fill="#043440"/>
          <path d="M38.9535 21.3496V50.7374L32.593 47.0662V25.0209L38.9535 21.3496Z" fill="#043440"/>
          <path d="M19.8663 32.3682V39.7166L13.5 36.0453L19.8663 32.3682Z" fill="#043440"/>
          <path d="M45.3198 54.413V61.7615L38.9535 58.0843L32.593 54.413L26.2267 50.7359L19.8663 47.0646L13.5 43.3875V36.0449L19.8663 39.7162L26.2267 43.3875L32.593 47.0646L38.9535 50.7359L45.3198 54.413Z" fill="#843600"/>
          <path d="M32.593 25.0195V47.0648L26.2267 43.3877V28.6967L32.593 25.0195Z" fill="#699EA7"/>
          <path d="M83.5 39.7162L77.1396 43.3875L70.7733 47.0646L64.407 50.7418L58.0465 54.413L45.3198 61.7615V54.413L51.6802 50.7418L58.0465 47.0646L64.407 43.3933L70.7733 39.7221L77.1396 36.0449L83.5 39.7162Z" fill="#973E00"/>
          <path d="M51.6802 21.3438V50.7433L45.3198 54.4146V25.0209L51.6802 21.3438Z" fill="#93B1B6"/>
          <path d="M77.1395 36.0453L70.7732 39.7224V32.3682L77.1395 36.0453Z" fill="#043440"/>
          <path d="M83.5 39.7168V47.0652L77.1396 50.7365L45.3198 69.1105V61.7621L58.0465 54.4136L64.407 50.7423L70.7733 47.0652L77.1396 43.3881L83.5 39.7168Z" fill="#DF752B"/>
          <path d="M45.3198 61.7617V69.1101L26.2267 58.0845L19.8663 54.4132L13.5 50.7361V43.3877L19.8663 47.0648L26.2267 50.7361L32.593 54.4132L38.9535 58.0845L45.3198 61.7617Z" fill="#973E00"/>
          <path d="M64.4069 21.348V43.3933L58.0465 47.0646V17.6709L64.4069 21.348Z" fill="#93B1B6"/>
          <path d="M70.7732 17.6709V39.722L64.4069 43.3933V21.348L70.7732 17.6709Z" fill="#CEE3E7"/>
          <path d="M70.7732 17.6713L64.4069 21.3484L58.0465 17.6713L64.4069 14L70.7732 17.6713Z" fill="#D9D9D9"/>
          <path d="M45.3198 25.0209V54.4146L38.9535 50.7374V21.3496L38.9593 21.3438L45.3198 25.0209Z" fill="#699EA7"/>
          <path d="M38.9535 21.3487V21.3438H38.9584" stroke="black" strokeMiterlimit="10"/>
          <path d="M51.6802 21.3422L45.3198 25.0193L38.9593 21.3422L45.3198 17.6709L51.6802 21.3422Z" fill="#CEE3E7"/>
          <path d="M38.9584 21.3438H38.9535" stroke="black" strokeMiterlimit="10"/>
          <path d="M26.2267 28.6908V43.3877L19.8663 39.7164V25.0195L26.2267 28.6908Z" fill="#5D8991"/>
          <path d="M54.4512 70.9463V78.2947L48.0908 81.966V81.0189L53.6269 77.8212V71.4198L54.4512 70.9463Z" fill="#93B1B6"/>
          <path d="M53.6269 71.4199V77.8213L48.0908 81.019V74.6177L53.6269 71.4199Z" fill="#CEE3E7"/>
          <path d="M64.4069 65.4336V72.782L58.0465 76.4591V75.5062L63.5826 72.3085V65.913L64.4069 65.4336Z" fill="#93B1B6"/>
          <path d="M63.5826 65.9121V72.3076L58.0465 75.5054V69.1099L63.5826 65.9121Z" fill="#CEE3E7"/>
          <path d="M74.3685 59.9258V67.2684L68.0022 70.9455V69.9984L73.5442 66.8007V60.3993L74.3685 59.9258Z" fill="#93B1B6"/>
          <path d="M73.5442 60.3994V66.8008L68.0022 69.9985V63.5972L73.5442 60.3994Z" fill="#CEE3E7"/>
          <path d="M54.4512 82.9414V90.2898L48.0908 93.9611V93.0141L53.6269 89.8163V83.4149L54.4512 82.9414Z" fill="#93B1B6"/>
          <path d="M53.6269 83.415V89.8164L48.0908 93.0142V86.6128L53.6269 83.415Z" fill="#CEE3E7"/>
          <path d="M64.4069 77.4287V84.7771L58.0465 88.4543V87.5014L63.5826 84.3036V77.9081L64.4069 77.4287Z" fill="#93B1B6"/>
          <path d="M63.5826 77.9092V84.3047L58.0465 87.5025V81.1069L63.5826 77.9092Z" fill="#CEE3E7"/>
          <path d="M74.3685 71.9219V79.2644L68.0022 82.9416V81.9945L73.5442 78.7968V72.3954L74.3685 71.9219Z" fill="#93B1B6"/>
          <path d="M73.5442 72.3955V78.7969L68.0022 81.9946V75.5933L73.5442 72.3955Z" fill="#CEE3E7"/>
          <path d="M54.4512 94.9375V102.286L48.0908 105.957V105.01L53.6269 101.812V95.411L54.4512 94.9375Z" fill="#93B1B6"/>
          <path d="M53.6269 95.4111V101.812L48.0908 105.01V98.6089L53.6269 95.4111Z" fill="#CEE3E7"/>
          <path d="M64.4069 89.4248V96.7732L58.0465 100.45V99.4975L63.5826 96.2997V89.9042L64.4069 89.4248Z" fill="#93B1B6"/>
          <path d="M63.5826 89.9043V96.2998L58.0465 99.4976V93.1021L63.5826 89.9043Z" fill="#CEE3E7"/>
          <path d="M74.3685 83.918V91.2605L68.0022 94.9377V93.9906L73.5442 90.7929V84.3915L74.3685 83.918Z" fill="#93B1B6"/>
          <path d="M73.5442 84.3926V90.7939L68.0022 93.9917V87.5903L73.5442 84.3926Z" fill="#CEE3E7"/>
          <path d="M26.3612 28.8596L19.9306 25.0597L26.3612 21.2598L32.4995 25.0597L26.3612 28.8596Z" fill="#93B1B6"/>
        </g>
        <defs>
          <clipPath id="clip0_250_932">
            <rect x="0.711685" width="94.0766" height="95.9997" rx="47.0383" fill="white"/>
          </clipPath>
        </defs>
      </svg>),
    heading: 'Registered business',
    content: {
      p: 'For a registered business, we’ll ask you to provide with us your:',
      list: [
        'Full incorporation documents (CAC)',
        'Valid identification of directors',
        'Valid ID of shareholders with more than 5% ownership',
        'Utility bill (eg. Electricity)'
      ]
    }
    },
    
  ]

  const selectOption = (option) => {
    setOption(option)
    setCurrentOption(option)
    emitSetOption(option)
  }

  const listOptions = options.map((option, index)=> 
    <BusinessChoiceBtn key={index} onSelectOption={selectOption} option={option} currentOption={currentOption}>
      {option.icon}
      <h2>{option.heading}</h2>
      <div className={styles.content}>
        <p>{option.content.p}</p>
        <ol>
          {option.content.list.map((item, i)=> 
            <li key={i}>
              {item}
            </li>
          )}
        </ol>
      </div>
    </BusinessChoiceBtn>)

  return (
    <div className={styles.business_type_ctn}>
       {listOptions}
    </div>
  )
}

export default BusinessChoice

import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import "./index.css";
 
export const CouponBanner = () => {

  // 浏览器的高度 默认设置为0；
  const { t, i18n } = useTranslation();
  const [width, setWidth] = useState(0); 
  const [hours, setHours] = useState(24);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
 
  const resizeUpdate = (e: any) => {
      // 通过事件对象获取浏览器窗口的高度
      let h = e.target.innerWidth;
      setWidth(h);
  };

  useEffect(() => {
      // 页面刚加载完成后获取浏览器窗口的大小
      let h = window.innerWidth;
      setWidth(h)
      // 页面变化时获取浏览器窗口的大小 
      window.addEventListener('resize', resizeUpdate);

      return () => {
        // 组件销毁时移除监听事件
        window.removeEventListener('resize', resizeUpdate);
      }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // 如果还有剩余时间
      if (hours > 0 || minutes > 0 || seconds > 0) {
        // 计算时间
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
        }
        if (newMinutes < 0) {
          newHours -= 1;
          newMinutes = 59;
        }

        // 更新状态
        setSeconds(newSeconds);
        setMinutes(newMinutes);
        setHours(newHours);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);


  return (
    <>
      <button className="but" onClick={() => {i18n.changeLanguage(i18n.language == 'en' ? 'zh' : 'en')}}>切换{i18n.language == 'en' ? '中文' : '英文' }</button>
      <div className={'content'} >
        <div className="personImg" ></div>
        <div className="text">
          <p className="text_small">
            {t("enjoy")}
          </p>
          <p className="text_big">
              30% off
          </p>
        </div>
        <div className="part3">
           <div className="time">
            Ends in &nbsp;<span className="showTime">{hours.toString().padStart(2, "0")}</span>&nbsp; h
            &nbsp;<span className="showTime">{minutes.toString().padStart(2, "0")}</span> &nbsp;m
            &nbsp;<span className="showTime">{seconds.toString().padStart(2, "0")}</span> &nbsp; s
           </div>
           <div className="part3_btm">
              <div className="part3_btm_left">
                <p className="p_big">30%</p>
                <p className="p_small">OFF</p>
              </div>
              <div className="part3_btm_right">
                <div className="right_title">
                    Welcome Coupon
                </div>
                <div className="right_content">
                  {
                    width >=768 ? <> <p>{t("Aplicable")}</p> <p>Min. order 10€. Valid for 30 days from now. </p> </> :
                     <>
                      <p>{t("save")}</p>
                      <p>Min. spend: 10,00€. Valid for 30 day(s)</p>
                     </>
                  }
                </div>
                <div className="right_btn">
                {
                    width >=768 ? "¡Lo quiero! " : " I Want it"
                  }
                </div>
              </div>
           </div>
        </div>
      </div>
    </>
  )
}

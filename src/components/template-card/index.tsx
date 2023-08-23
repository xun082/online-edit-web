import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

interface TemplateCardProps {
  alt: string;
  src: string;
  onClick?: () => boolean | Promise<boolean>;
}

const TemplateCard: FC<TemplateCardProps> = (props: TemplateCardProps) => {
  const { src, alt, onClick } = props;
  const navigate = useNavigate();

  const handlerClick = async () => {
    let flag = true;
    if (onClick) {
      flag = await onClick();
    }
    if (flag) {
      navigate("/edit")
    }
  }

  return (
    <div className={styles["root"]} onClick={handlerClick}>
      <img className={styles["image"]} src={src} alt={alt} />
      <span>{alt}</span>
    </div>
  );
};

export default TemplateCard;

import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface TemplateCardProps {
  alt: string;
  src: string;
}

const TemplateCard: FC<TemplateCardProps> = (props: TemplateCardProps) => {
  const { src, alt } = props;
  const navigate = useNavigate();

  return (
    <div className={styles["root"]} onClick={() => navigate("/edit")}>
      <img className={styles["image"]} src={src} alt={alt} />
      <span>{alt}</span>
    </div>
  );
};

export default TemplateCard;

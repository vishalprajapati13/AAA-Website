"use client";

import styles from "../team.module.scss";
import Image from "next/image";
import profile_img from "../../../../public/images/profile-picture.jpg";

export default function TeamsCards({ employee }) {
  return (
    <>
      <div className={styles.team_cards}>
        <div>
          <Image
            className={styles.team_cards_img}
            src={employee.image || profile_img}
            width={130}
            height={130}
            alt="Image"
          />
        </div>
        <p className={styles.team_cards_name}>
          {employee?.first_name} {employee?.last_name}
        </p>
        <p className={styles.team_cards_title}> {employee?.designation} </p>
      </div>
    </>
  );
}

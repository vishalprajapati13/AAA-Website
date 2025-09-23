"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.scss";
import Logo from "../../../public/images/logo.svg";
import instagramIcon from "../../../public/images/instagram-icon.svg";
import youtubeIcon from "../../../public/images/youtube-icon.svg";
import { Container } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { ROUTE } from "@/utils/routeConstant";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/redux/slices/categorySlice";
import { getSettings } from "@/redux/slices/settingSlice";
import Cookies from "js-cookie";

const Footer = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { settings } = useSelector((state) => state.setting);

  const [refreshFlag, setRefreshFlag] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const settingsFetchedAt = Cookies.get("settingsFetchedAt");
    const now = Date.now();

    const fiveMinutes = 24 * 60 * 60 * 1000;

    const shouldFetchSettings =
      !settingsFetchedAt || now - parseInt(settingsFetchedAt) > fiveMinutes;

    if (!settings || shouldFetchSettings) {
      dispatch(getSettings()).then(() => {
        Cookies.set("settingsFetchedAt", Date.now().toString(), {
          expires: 1,
        });
        setRefreshFlag(false);
      });
    }

    if (settingsFetchedAt) {
      const timePassed = now - parseInt(settingsFetchedAt);
      const timeLeft = fiveMinutes - timePassed;

      const id = setTimeout(
        () => {
          setRefreshFlag((prev) => !prev);
        },
        timeLeft > 0 ? timeLeft : 0
      );

      setTimeoutId(id);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch, categories.length, settings, refreshFlag]);

  return (
    <Container>
      <div className={`${styles.footer_main_div}`}>
        <div className={`${styles.footer_container}`}>
          {categories ? (
            <div className={`${styles.footer_page_sec}`}>
              {categories.data?.map((item) => (
                <div key={item.category_slug}>
                  <Link
                    href={`/project-categories/${item.category_slug}`}
                    className={`${styles.title_text} ${
                      pathname.startsWith(
                        `/project-categories/${item.category_slug}`
                      ) && styles.active
                    }`}
                  >
                    {item.category_name}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className={`${styles.bootom_footer}`}>
            <Link
              href={ROUTE.AWARD}
              className={`${styles.link_btn} ${
                pathname === ROUTE.AWARD && styles.active
              }`}
            >
              Awards
            </Link>
            <div className={`${styles.bootom_footer_common_box} text-center`}>
              <Link href={"/"} className={`${styles.footer_logo}`}>
                <Image
                  src={Logo}
                  width={38}
                  height={25}
                  alt="Logo"
                  className="img-fluid"
                  priority
                />
              </Link>
            </div>
            <Link
              href={ROUTE.PUBLICATIONS}
              className={`${styles.link_btn} ${
                pathname === ROUTE.PUBLICATIONS && styles.active
              }`}
            >
              Publications
            </Link>
          </div>
          <div className={`${styles.social_icon_div}`}>
            {settings?.setting_youtube && (
              <Link href="#">
                <Image
                  src={youtubeIcon}
                  width={20}
                  height={20}
                  alt="Icon"
                  className="img-fluid"
                  priority
                />
              </Link>
            )}
            {settings?.setting_instagram && (
              <Link href="#">
                <Image
                  src={instagramIcon}
                  width={20}
                  height={20}
                  alt="Icon"
                  className="img-fluid"
                  priority
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;

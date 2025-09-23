"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.scss";
import Logo from "../../../public/images/arrow_back.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "@/redux/slices/pageSlice";

const Header = ({ showBackArrow }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pages = useSelector((state) => state.pages.list);
  const bannerRef = useRef(null);

  useEffect(() => {
    dispatch(getPages({ is_published: true }));
  }, [dispatch]);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bannerRef.current && !bannerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={`${styles.header_main_div}`}>
        <div className={`${styles.back_arrow_div}`}>
          {showBackArrow && (
            <Image
              src={Logo}
              width={18}
              height={18}
              alt="Icon"
              className="img-fluid"
              onClick={() => router.back()}
            />
          )}
        </div>
        <div className={`${styles.banner}`}>
          <label
            htmlFor="menu-control"
            className={`${styles.hamburger} ${styles.bar_icon_flex}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <i className={`${styles.bar_icon}`} />
            <i className={`${styles.bar_icon}`} />
            <i className={`${styles.bar_icon}`} />
          </label>
          <input
            type="checkbox"
            id="menu-control"
            checked={isMenuOpen}
            className={`${styles.menu_control}`}
            readOnly
          />
          <aside className={`${styles.sidebar}`}>
            <nav ref={bannerRef} className={`${styles.sidebar__menu}`}>
              {pages.map((page) => (
                <Link
                  key={page.page_slug}
                  href={`/${page.page_slug}`}
                  onClick={closeMenu}
                >
                  {page?.page_name}
                </Link>
              ))}
              <Link href="/contact-us" onClick={closeMenu}>
                Contact Us
              </Link>
              <Link href="/teams" onClick={closeMenu}>
                Teams
              </Link>
              <Link href="/apply" onClick={closeMenu}>
                Apply
              </Link>
            </nav>
            <label
              htmlFor="menu-control"
              className={`${styles.sidebar__close}`}
            ></label>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Header;

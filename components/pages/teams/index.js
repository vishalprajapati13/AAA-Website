"use client";

import Footer from "@/components/layout/Footer";
import styles from "./team.module.scss";
import TeamsCards from "./team-cards/page";

export default function TeamsForm({ EmployeeData }) {
  return (
    <>
      <div className="common_bg_page_banner contact_us_page_bg">
        <div className={styles.custom_container}>
          <h1 className={styles.page_title_text}>
            Meet the talented team <span> who make all this happen.</span>
          </h1>
          <p className={styles.page_info_text}>
            Meet our diverse team of creators, designers & problem solvers.
          </p>

          {EmployeeData && EmployeeData.length > 0 ? (
            <div className={styles.card_scroll_sec}>
              {EmployeeData.map((section) => (
                <div
                  className={styles.card_sec_main}
                  key={section.parent_designation}
                >
                  <h3 className={styles.card_sec_title}>
                    {section.parent_designation}
                  </h3>

                  {section.sub_designation?.map((sub) => (
                    <div
                      key={sub.designation}
                      className={styles.sub_designation_section}
                    >
                      {/* <h4 className={styles.sub_designation_title}>
                        {sub.designation}
                      </h4> */}
                      <div className={styles.team_cards_data_sec}>
                        {sub.employees?.map((employee) => (
                          <TeamsCards
                            key={employee.employee_id}
                            employee={employee}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.no_data_text}>Data Not Available</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

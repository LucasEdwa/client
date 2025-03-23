import React from "react";
import { styles } from "../constants/styles";
import { useTheme } from "../contexts/ThemeContext";

export const User = () => {
  const { theme } = useTheme();
  return (
    <div className={styles.user.container}>
      <div className={styles.user.section}>
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt="User"
          className="rounded-circle w-32 h-32"
        />
        <div className="mt-3">
          <h4>John Doe</h4>
          <p className="text-secondary mb-1">Full Stack Developer</p>
          <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
          <button className={theme.button}>Follow</button>
          <button className={theme.button}>Message</button>
        </div>
      </div>
    </div>
  );
};
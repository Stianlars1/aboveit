"use client";

import { useEffect, useState } from "react";

export const useNative = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const isMobileUserAgent = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      // Check for mobile-specific keywords in user agent
      const mobileKeywords = [
        "iphone",
        "ipad",
        "ipod",
        "android",
        "blackberry",
        "nokia",
        "opera mini",
        "windows mobile",
        "windows phone",
        "iemobile",
        "mobile",
        "palm",
        "webos",
        "symbian",
        "kindle",
        "silk",
        "mobilbank",
        "ios",
        "devicetype",
        "devicemodel",
      ];

      return mobileKeywords.some((keyword) => userAgent.includes(keyword));
    };

    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    const checkIfMobileDevice = () => {
      const hasSmallScreen = window.innerWidth <= 768;
      const hasMobileUserAgent = isMobileUserAgent();
      const hasTouchCapability = isTouchDevice();

      // Consider it a mobile/small device if:
      // 1. Screen width is less than 400px, OR
      // 2. User agent indicates mobile device, OR
      // 3. Device has touch capability AND screen width is less than 768px
      const isMobile =
        hasSmallScreen ||
        hasMobileUserAgent ||
        (hasTouchCapability && window.innerWidth < 768);

      setIsSmallDevice(isMobile);
    };

    // Check initial state
    checkIfMobileDevice();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobileDevice);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", checkIfMobileDevice);
    };
  }, []);

  return isSmallDevice;
};

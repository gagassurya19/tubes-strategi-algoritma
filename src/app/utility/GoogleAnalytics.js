// GoogleAnalytics.tsx

import React from 'react';
import Script from 'next/script';
import axios from 'axios';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

const event = ({ action, category, label, value }) => {
    (window).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

export {GoogleAnalytics, event};
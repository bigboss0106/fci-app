import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import DailyPlanner from './DailyPlanner';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const DailyPlannerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'daily_planner',
      element: <DailyPlanner />,
    },
  ],
};

export default DailyPlannerConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const DatatestConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default DatatestConfig;
*/

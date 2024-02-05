import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import MonthlyPlan from './MonthlyPlan';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const MonthlyPlanConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'monthly_plan',
      element: <MonthlyPlan />,
    },
  ],
};

export default MonthlyPlanConfig;

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

import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/dashboards/analytics',
  },
  {
    id: 'monthly_plan',
    title: 'Monthly Plan',
    type: 'item',
    icon: 'material-outline:edit_calendar',
    url: '/monthly_plan',
  },  
  {
    id: 'daily_planner',
    title: 'Daily Planner',
    type: 'item',
    icon: 'material-outline:today',
    url: '/daily_planner',
  }
];

export default navigationConfig;

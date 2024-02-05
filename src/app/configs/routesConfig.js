import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import HomeConfig from '../main/home/HomeConfig';
import DailyPlannerConfig from '../main/daily_planner/DailyPlannerConfig';
import MonthlyPlanConfig from '../main/monthly_plan/MonthlyPlanConfig';
import AnalyticsDashboardAppConfig from '../main/dashboards/admin/AnalyticsDashboardAppConfig';
import DatatestConfig from '../main/datatest/DatatestConfig';
import { authRoles } from "../auth";

const routeConfigs = [
  AnalyticsDashboardAppConfig,
  ExampleConfig,
  DatatestConfig,
  HomeConfig,
  MonthlyPlanConfig,
  DailyPlannerConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/dashboards/analytics" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;

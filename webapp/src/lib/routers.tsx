import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/dashboard/DashboardPage'
// import ChooseDepositPage from '../pages/exchange/ChooseDepositPage'
// import DepositPage from '../pages/exchange/DepositPage'
// import WithdrawPage from '../pages/exchange/WithdrawPage'
import SplashPage from '../pages/splash/SplashPage'
import SplashPageLocal from '../pages/splash/SplashPageLocal'
// import TablePage from '../pages/table/TablePage'
// import ChooseDepositPage from '../pages/exchange/ChooseDepositPage'
import DepositPage from '../pages/exchange/DepositPage'
// import WithdrawPage from '../pages/exchange/WithdrawPage'
import TablePage from '../pages/table/TablePage'
import { env } from './env'

const navigationRoutes = [
  { path: '/', element: env.VITE_HOST_ENV === 'local' ? <SplashPageLocal /> : <SplashPage /> },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/table/:tableId',
    element: <TablePage />,
  },
  {
    path: '/deposit/:userId/:address',
    element: <DepositPage />,
  },
  // { path: '/deposit/choose/:userId', element: <ChooseDepositPage /> },
  // { path: '/withdraw', element: <WithdrawPage /> },
  // { path: '/deposit/:userId/:dmId', element: <DepositPage /> },
  // { path: '/withdraw', element: <WithdrawPage /> },
]

const AppRoutes = () => {
  return (
    <Routes>
      {navigationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default AppRoutes

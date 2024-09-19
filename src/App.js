import { AuthProvider,KYCGuard,ProtectRoute,RoleGuard } from 'context'
import { GlobalStyles } from 'global'
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import {
  LoginScreen,
  ProjectListScreen,
  ProjectDetailsScreen,
  OfferingListScreen,
  OfferingDetailsScreen,
  SponsorRegisterScreen,
  MyOfferingListScreen,
  MyOfferingDetailsScreen,
  MyOfferingAddEditScreen,
  ProfileDetailsScreen,
  ProfileEditScreen,
  UsersListScreen,
  UserDetailsScreen,
  AdminTransactionsListScreen,
  ForgotPasswordScreen,
  TermsOfUseScreen,
  InvestorTransactionsListScreen,
  PrivacyPolicyScreen,
  KYCScreen,
  RegisterScreen,
  DocumentsScreen,
  WalletScreen,
  VerifyAccountScreen,
  ProfileChangePasswordScreen,
  UserEditScreen,
  SystemSettingsScreen,
  ProfileChangeEmailScreen,
  ProfileChangePhoeneNumberScreen,
  SystemHealthScreen,
  SystemLogsScreen,
  NotFoundScreen,
  ProjectSecondaryMarketplaceScreen,
} from 'screens'
import { Layout } from 'layout'
import { Roles,theme } from 'utility'
import { ScrollToTop } from 'components'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  },[])

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="login" element={<LoginScreen />} />
            <Route
              path="verify-account/:username"
              element={<VerifyAccountScreen />}
            />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="privacy-policy" element={<PrivacyPolicyScreen />} />
            <Route path="terms-of-use" element={<TermsOfUseScreen />} />
            <Route path="forgot-password" element={<ForgotPasswordScreen />} />
            <Route index element={<Navigate to="/app" replace />} />
            <Route
              path="app"
              element={
                // <ProtectRoute>
                <Layout>
                  <Outlet />
                </Layout>
                // </ProtectRoute>
              }
            >
              <Route index element={<Navigate to="/app/projects" replace />} />
              <Route
                path="kyc"
                element={
                  <RoleGuard roles={[Roles.investor,Roles.sponsor]}>
                    <KYCGuard>
                      <KYCScreen />
                    </KYCGuard>
                  </RoleGuard>
                }
              />
              <Route path="documents" element={<DocumentsScreen />} />
              <Route path="projects" element={<Outlet />}>
                <Route index element={<ProjectListScreen />} />
                <Route path="details/:id" element={<ProjectDetailsScreen />} />
                <Route
                  path="details/:id/secondary"
                  element={
                    <ProtectRoute>
                    <ProjectSecondaryMarketplaceScreen />
                    </ProtectRoute>
                  }
                />
              </Route>
              <Route
                path="offerings"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <Outlet />
                  </RoleGuard>
                }
              >
                <Route index element={<OfferingListScreen />} />
                <Route path="details/:id" element={<OfferingDetailsScreen />} />
                <Route path="edit/:id" element={<MyOfferingAddEditScreen />} />
                <Route
                  path="*"
                  element={<Navigate to="/app/offerings" replace />}
                />
              </Route>
              <Route
                path="my-offerings"
                element={
                  <RoleGuard roles={[Roles.sponsor]}>
                    <Outlet />
                  </RoleGuard>
                }
              >
                <Route index element={<MyOfferingListScreen />} />
                <Route path="add" element={<MyOfferingAddEditScreen />} />
                <Route path="edit/:id" element={<MyOfferingAddEditScreen />} />
                <Route
                  path="details/:id"
                  element={<MyOfferingDetailsScreen />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/app/my-offerings" replace />}
                />
              </Route>
              <Route
                path="system-settings"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <SystemSettingsScreen />
                  </RoleGuard>
                }
              />
              <Route
                path="system-health"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <SystemHealthScreen />
                  </RoleGuard>
                }
              />
               <Route
                path="system-logs"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <SystemLogsScreen />
                  </RoleGuard>
                }
              />
              <Route
                path="users"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <Outlet />
                  </RoleGuard>
                }
              >
                <Route index element={<UsersListScreen />} />
                <Route
                  path="sponsor-register"
                  element={<SponsorRegisterScreen />}
                />
                <Route path="details/:id" element={<UserDetailsScreen />} />
                <Route path="edit/:id" element={<UserEditScreen />} />
                <Route
                  path="*"
                  element={<Navigate to="/app/users" replace />}
                />
              </Route>
              <Route
                path="profile"
                element={
                  <ProtectRoute>
                    <Outlet />
                  </ProtectRoute>
                }
              >
                <Route index element={<ProfileDetailsScreen />} />
                <Route path="edit" element={<ProfileEditScreen />} />
                <Route
                  path="change-password"
                  element={<ProfileChangePasswordScreen />}
                />
                <Route
                  path="change-email"
                  element={<ProfileChangeEmailScreen />}
                />
                <Route
                  path="change-phone"
                  element={<ProfileChangePhoeneNumberScreen />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/app/profile" replace />}
                />
              </Route>
              <Route
                path="all-transactions"
                element={
                  <RoleGuard roles={[Roles.admin]}>
                    <AdminTransactionsListScreen />
                  </RoleGuard>
                }
              />
              <Route
                path="wallet"
                element={
                  <RoleGuard roles={[Roles.investor]}>
                    <WalletScreen />
                  </RoleGuard>
                }
              />
              <Route
                path="my-transactions"
                element={
                  <RoleGuard roles={[Roles.investor]}>
                    <InvestorTransactionsListScreen />
                  </RoleGuard>
                }
              />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
            <Route
              path="not-found"
              element={<Layout>
                <NotFoundScreen />
              </Layout>}
            />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

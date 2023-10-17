import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
const InstallSystemPage = lazy(() => import('../pages/InstallSystemPage'));
const SystemRequestPage = lazy(() => import('../pages/SystemRequestPage'));
const TechnicalOnSitePage = lazy(() => import('../pages/TechnicalOnSitePage'));
const AttentionPage = lazy(() => import('../pages/AttentionPage'));

export const ReportRoutes = () => {
    return (
        <Route path="/reports">
            <Route path="install-system" element={
                <Suspense fallback={<></>}>
                    <InstallSystemPage />
                </Suspense>
            }
            />
            <Route path="system-request" element={
                <Suspense fallback={<></>}>
                    <SystemRequestPage />
                </Suspense>
            }
            />
            <Route path="technical-on-site" element={
                <Suspense fallback={<></>}>
                    <TechnicalOnSitePage />
                </Suspense>
            }
            />
            <Route path="attention" element={
                <Suspense fallback={<></>}>
                    <AttentionPage />
                </Suspense>
            }
            />
        </Route>
    )
}

// export default ReportRoutes;
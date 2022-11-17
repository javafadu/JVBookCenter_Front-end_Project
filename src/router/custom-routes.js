import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/general/scroll-to-top/scroll-to-top";
import BookDetail from "../components/users/book-detail/book-detail";
import PasswordForm from "../components/users/profile/password-form";
import Profile from "../components/users/profile/profile";
import ProfileForm from "../components/users/profile/profile-form";
import MyBooks from "../components/users/profile/my-books";
import NotFoundPage from "../pages/common/not-found-page";
import UnauthorizedPage from "../pages/common/unauthorized-page";
import AuthPage from "../pages/users/auth-page";
import ContactPage from "../pages/users/contact-page";
import HomePage from "../pages/users/home-page";
import LibraryPage from "../pages/users/library-page";
import ProfilePage from "../pages/users/profile-page";
import UserTemplate from "../templates/user-template";
import ProtectedRoute from "./protected-route";
import AdminTemplate from "../templates/admin-template";
import AdminDashboardPage from "../pages/admin/admin-dashboard-page";
import AdminBooksPage from "../pages/admin/admin-books-page";
import AdminAuthorsPage from "../pages/admin/admin-authors-page";
import AdminPublishersPage from "../pages/admin/admin-publishers-page";
import AdminCategoriesPage from "../pages/admin/admin-categories-page";
import AdminUsersPage from "../pages/admin/admin-users-page";
import AdminReportsPage from "../pages/admin/admin-reports-page";
import AdminBookEditPage from "../pages/admin/admin-book-edit-page";
import AdminBookAddPage from "../pages/admin/admin-book-add-page";
import AdminAuthorEditPage from "../pages/admin/admin-author-edit-page";
import AdminAuthorAddPage from "../pages/admin/admin-author-add-page";
import AdminPublisherEditPage from "../pages/admin/admin-publisher-edit-page ";
import AdminPublisherAddPage from "../pages/admin/admin-publisher-add-page";

const CustomRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <UserTemplate>
                <HomePage />
              </UserTemplate>
            }
          />
          <Route
            path="library"
            element={
              <UserTemplate>
                <LibraryPage />
              </UserTemplate>
            }
          />
          <Route
            path="contact"
            element={
              <UserTemplate>
                <ContactPage />
              </UserTemplate>
            }
          />
          <Route
            path="book-detail"
            element={
              <UserTemplate>
                <BookDetail />
              </UserTemplate>
            }
          />

          <Route
            path="auth"
            element={
              <UserTemplate>
                <AuthPage />
              </UserTemplate>
            }
          />

          <Route
            path="unauthorized"
            element={
              <UserTemplate>
                <UnauthorizedPage />
              </UserTemplate>
            }
          />

          <Route path="user">
            <Route
              index
              element={
                <ProtectedRoute member={true}>
                  <UserTemplate>
                    <ProfilePage />
                  </UserTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="my-profile"
              element={
                <ProtectedRoute member={true}>
                  <UserTemplate>
                    <Profile>
                      <ProfileForm user={user} />
                    </Profile>
                  </UserTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="my-account"
              element={
                <ProtectedRoute member={true}>
                  <UserTemplate>
                    <Profile>
                      <PasswordForm />
                    </Profile>
                  </UserTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="my-books"
              element={
                <ProtectedRoute member={true}>
                  <UserTemplate>
                    <Profile>
                      <MyBooks user={user} />
                    </Profile>
                  </UserTemplate>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="admin">
            <Route
              index
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminDashboardPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="books"
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminBooksPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="book-edit"
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminBookEditPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="book-add"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminBookAddPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="authors"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminAuthorsPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="author-edit"
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminAuthorEditPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="author-add"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminAuthorAddPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="publishers"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminPublishersPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="publisher-edit"
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminPublisherEditPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="publisher-add"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminPublisherAddPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="categories"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminCategoriesPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="users"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminUsersPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />

            <Route
              path="reports"
              element={
                <ProtectedRoute admin={true}>
                  <AdminTemplate>
                    <AdminReportsPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <UserTemplate>
                <NotFoundPage />
              </UserTemplate>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;

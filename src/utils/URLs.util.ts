const URLs = {
  Home: '/',
  Login: '/login',
  VerifyOTP: '/verify-otp',

  Dashboard: '/dashboard',

  Products: '/products',
  ProductsAdd: '/products/add',
  ProductsEdit: '/products/edit/:id',
  ProductsView: '/products/view/:id',

  Categories: '/categories',
  CategoriesAdd: '/categories/add',
  CategoriesEdit: '/categories/edit/:id',
  CategoriesView: '/categories/view/:id',
  CategoriesSubcategories: '/categories/:id/subcategories',

  Brands: '/brands',
  BrandsAdd: '/brands/add',
  BrandsEdit: '/brands/edit/:id',
  BrandsView: '/brands/view/:id',

  Banners: '/banners',
  BannersAdd: '/banners/add',
  BannersEdit: '/banners/edit/:id',
  BannersView: '/banners/view/:id',

  Collections: '/collections',
  CollectionsAdd: '/collections/add',
  CollectionsEdit: '/collections/edit/:id',
  CollectionsView: '/collections/view/:id',

  Terms: '/terms',
  TermsAdd: '/terms/add',
  TermsEdit: '/terms/edit/:id',
  TermsView: '/terms/view/:id',

  Orders: '/orders',
  OrdersView: '/orders/view/:id',

  Users: '/users',
  UsersView: '/users/view/:id',

  Admins: '/admins',
  AdminsAdd: '/admins/add',
  AdminsEdit: '/admins/edit/:id',
  AdminsView: '/admins/view/:id',
  AdminsPermissions: '/admins/:id/permissions',

  Notifications: '/notifications',

  Reports: '/reports',
  ReportsSales: '/reports/sales',
  ReportsRevenue: '/reports/revenue',
  ReportsInventory: '/reports/inventory',

  Settings: '/settings/contact',
  SettingsContact: '/settings/contact',
  SettingsPayment: '/settings/payment',
  SettingsShipping: '/settings/shipping',
  SettingsTax: '/settings/tax',
  SettingsEmail: '/settings/email',
};

export default URLs;

/**
 * Function that replaces the string variables inside a URL with provided values.
 * @param {string} url URL string with params prefixed by `:`
 * @param {Record<string, string>} variables Object containing variable mappings
 * @returns {string} Interpolated URL
 * @example
 * makeURL(URLs.value, { key: value, })
 */
export const makeURL = (url: string, variables: Record<string, string | number>) => {
  return url.replace(/:(\w+)/g, (_, key) => {
    if (key in variables) {
      return encodeURIComponent(variables[key]);
    }
    throw new Error(`Missing variable: ${key}`);
  });
};

/**
 * Checks if the current pathname matches any of the given routes, ignoring dynamic segments.
 * @param currentPath The current pathname to be checked (e.g., '/reset-password/abcd1234').
 * @param listOfRoutes A list of routes to check against (e.g., ['/sign-up', '/reset-password/:token']).
 * @returns {boolean} Returns true if the current pathname matches any of the routes in the list (ignoring dynamic segments), otherwise returns false.
 */
export const isCurrentURLMatchesListOfURLs = (currentPath: string, listOfRoutes: any[]) => {
  return listOfRoutes.some(route => {
    const normalizedRoute = route.replace(/:[a-zA-Z0-9_]+/, '');
    return currentPath.includes(normalizedRoute);
  });
};

export const AuthRoutes = [URLs.Login, URLs.VerifyOTP];

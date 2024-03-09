export enum AppRoutes {
  NotFound = '404',
  Other = '**',
  Empty = '',
}

export enum ModuleRoutes {
  Auth = 'auth',
  Admin = 'admin',
  Products = 'products',
  Attributes = 'attributes',
}

export enum AuthRoutes {
  Login = 'login',
  Register = 'register',
  ResetPassword = 'reset-password',
  VerifyEmail = 'verify-email',
}

export enum AdminRoutes {
  Dashboard = 'dashboard',
  NewProduct = 'new-product',
}

export enum AttributeRoutes {
  Create = 'create',
  Edit = 'edit',
  AttributeValue = 'attribute-value',
}

export enum Params {
  Id = 'id',
  Token = ':token',
}

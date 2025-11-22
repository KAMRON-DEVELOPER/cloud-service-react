// ------------------------------------------------
// --------------- USER ---------------------------
// ------------------------------------------------
export type UserRole = 'admin' | 'regular';
export type UserStatus = 'active' | 'suspended' | 'pending_verification';

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  picture?: string | null;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  oauthUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayload {
  sub: string;
  type: string;
  iat: number;
  exp: number;
}

export interface OAuthUser {
  id: string;
  provider: string;
  username?: string;
  email?: string;
  password?: string;
  picture?: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}

export interface RedirectResponse {
  redirectTo: string;
}

export interface ErrorResponse {
  error: string;
}

// export type ApiResponseWithRedirect<T> = T | ErrorResponse | RedirectResponse;
// export type ApiResponse<T> = T | ErrorResponse;

// export type GetUserResponse = ApiResponse<User>;
// export type UpdateUserResponse = User | ErrorResponse;
// export type DeleteUserResponse = User | ErrorResponse;
// export type GetOAuthUserResponse = OAuthUser | ErrorResponse | RedirectResponse;
// export type ContinueWithEmailResponse = AuthResponse | ErrorResponse | RedirectResponse;
// export type CompleteProfileResponse = AuthResponse | ErrorResponse;
// export type RefreshTokenResponse = Tokens | ErrorResponse;

// ------------------------------------------------
// ------------- PROJECTS -------------------------
// ------------------------------------------------
export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

// ------------------------------------------------
// ------------- DEPLOYMENTS ----------------------
// ------------------------------------------------
export type DeploymentStatus = 'pending' | 'running' | 'succeeded' | 'failed' | 'terminated';

export interface ResourceSpec {
  cpuRequestMillicores: number;
  cpuLimitMillicores: number;
  memoryRequestMb: number;
  memoryLimitMb: number;
}

export interface Deployment {
  id: string;
  userId: string;
  projectId: string;
  name: string;
  image: string;
  envVars: Record<string, string>;
  replicas: number;
  resources: ResourceSpec;
  labels?: Record<string, string> | null;
  status: DeploymentStatus;
  clusterNamespace: string;
  clusterDeploymentName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeploymentRequest {
  name: string;
  image: string;
  port: number;
  subdomain?: string;
  replicas: number;
  envVars?: Record<string, string>;
  secrets?: Record<string, string>;
  resources?: ResourceSpec;
  labels?: Record<string, string>;
}

export interface UpdateDeploymentRequest {
  name?: string;
  image?: string;
  envVars?: Record<string, string>;
  replicas?: number;
  resources?: Partial<ResourceSpec>;
  labels?: Record<string, string>;
  status?: DeploymentStatus;
}

export interface DeploymentSecret {
  id: string;
  deploymentId: string;
  key: string;
  value: string;
  createdAt: string;
}

export interface DeploymentEvent {
  id: string;
  deploymentId: string;
  eventType: string;
  message?: string | null;
  createdAt: string;
}

// ------------------------------------------------
// ------------- BILLING --------------------------
// ------------------------------------------------
export interface Balance {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'free_credit' | 'usage_charge' | 'fund';

export interface Transaction {
  id: string;
  balanceId: string;
  amount: number;
  type: TransactionType;
  detail?: string | null;
  billingId?: string | null;
  createdAt: string;
}

export interface Billing {
  id: string;
  userId: string;
  deploymentId?: string | null;
  resourcesSnapshot: ResourceSpec;
  cpuMillicores: number;
  memoryMb: number;
  costPerHour: number;
  hoursUsed: number;
  totalCost: number;
  createdAt: string;
}

// ------------------------------------------------
// ------------- STATS ----------------------------
// ------------------------------------------------
export interface DashboardStats {
  totalProjects: number;
  totalDeployments: number;
  activeDeployments: number;
  totalCost: number;
  balance: number;
}

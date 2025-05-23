export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
}

export enum VerificationStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REQUIRES_MORE_INFO = 'requires_more_info',
}

export enum BusinessType {
  INDIVIDUAL = 'individual',
  SMALL_BUSINESS = 'small_business',
  MEDIUM_BUSINESS = 'medium_business',
  LARGE_BUSINESS = 'large_business',
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: UserRole;
  businessName?: string;
  businessType?: BusinessType;
  businessAddress?: string;
  businessLicense?: string;
  taxId?: string;
  industry?: string;
  verificationStatus: VerificationStatus;
  profileCompletion: number;
  materialCategories?: string[];
  warehouseLocations?: string[];
  deliveryCapabilities?: {
    radius: number;
    vehicleTypes: string[];
  };
  documents?: {
    businessLicense?: File | string;
    taxClearance?: File | string;
    qualityCertifications?: File | string;
  };
}
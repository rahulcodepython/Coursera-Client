export interface InitialLoginValuesType {
    email: string
    password: string
}

export interface InitialRegisterValuesType {
    first_name: string
    last_name: string
    email: string
    password: string
    confirmpassword: string
}

export interface UserType {
    username: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    is_superuser: boolean
}

export interface AuthStoreState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    user: UserType | null;
}

export interface AuthStoreActions {
    LoggedInUser: (access: string, refresh: string, user: UserType) => void;
    LogoutUser: () => void;
    UpdateUser: (user: UserType | null) => void;
}

export interface DurationTimeState {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ReferralType {
    id: string;
    user: string;
    email: string;
    date: string;
    status: "Active" | "Inactive" | "Purchased";
    reward: number;
}

export interface AllCourseType {
    id: string
    name: string
    short_description: string
    long_description?: string
    created_at: string
    duration: string
    price: number
    offer: number
    status: 'published' | 'draft'
    thumbnail: string
    videoURL?: string
    notesURL?: string
    presentationURL?: string
    codeURL?: string
    content?: string
}

export interface StudyCourseType {
    id: string
    name: string
    thumbnail: string
    videoURL: string
    notesURL: string
    presentationURL: string
    codeURL: string
    content: string
}

export interface ListCourseType {
    id: string
    name: string
    short_description: string
    created_at: string
    duration: string
    price: number
    offer: number
    thumbnail: string
    enrolled: boolean
}

export interface ListCourseDashboardType {
    id: string
    name: string
}

export interface ListCourseAdminDashboardType {
    id: string
    name: string
    created_at: string
    price: number
    offer: number
    status: 'published' | 'draft'
}

export interface DetailSingleCourseType {
    id: string
    name: string
    short_description: string
    long_description: string
    created_at: string
    duration: string
    price: number
    offer: number
    thumbnail: string
    enrolled: boolean
}

export interface ListCuponeCodeType {
    map(arg0: (coupne: any, index: any) => import("react").JSX.Element): import("react").ReactNode
    id: number,
    code: string,
    discount: number,
    expiry: string,
    create_at: string,
    used: number,
    quantity: null | number,
    is_unlimited: boolean,
    is_active: boolean
}

export interface CoursePriceResponseType {
    price: number,
    tax: number,
    offer: number,
    total: number,
    name: string,
    email: string,
    country: string
    city: string
    phone: string
    address: string
}
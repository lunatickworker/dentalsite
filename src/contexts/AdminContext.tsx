import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 타입 정의
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  joinDate: string;
  lastVisit: string;
  status: '활성' | '비활성';
  totalVisits: number;
  totalAmount: number;
  treatments: string[];
  notes: string;
  priority: 'high' | 'normal' | 'low';
  avatar?: string;
}

export interface Doctor {
  id: number;
  name: string;
  position: string;
  specialty: string;
  phone: string;
  email: string;
  experience: string;
  status: '활성' | '비활성';
  schedule: Record<string, string[]>;
  certifications: string[];
  bio: string;
  avatar?: string;
}

export interface Schedule {
  id: number;
  date: string;
  dayOfWeek: string;
  doctorId: number;
  doctorName: string;
  timeSlots: string[];
  bookedSlots: string[];
  status: '정상' | '휴진' | '특별진료';
}

export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: '진찰중' | '치료중' | '예약접수' | '확정' | '승인대기' | '완료' | '취소' | '노쇼' | '연기' | '보류' | '대기승인' | '예약확인' | '진료중' | '대기';
  type: '상담' | '일반' | '치료' | '응급';
  notes: string;
  createdAt: string;
  noShowCount?: number;
  lastNoShowDate?: string | null;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  content: string;
  category: '치료문의' | '예약문의' | '일반문의';
  status: '답변대기' | '답변완료';
  createdAt: string;
  answeredAt: string | null;
  answer: string | null;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  status: '활성' | '비활성';
  color: string;
}

export interface TreatmentDetail {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  order: number;
  status: '활성' | '비활성';
}

export interface Review {
  id: number;
  patientName: string;
  patientInfo: string;
  service: string;
  rating: number;
  content: string;
  doctorName: string;
  createdAt: string;
  status: '승인대기' | '승인완료' | '승인거부';
  isPublic: boolean;
  adminNotes: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  price: number;
  supplier: string;
  expiryDate: string;
  lastOrdered: string;
  status: 'normal' | 'low' | 'out' | 'expired';
}

// 상태 타입 정의
export interface AdminState {
  // 데이터 상태
  members: Member[];
  doctors: Doctor[];
  schedules: Schedule[];
  appointments: Appointment[];
  inquiries: Inquiry[];
  treatmentCategories: TreatmentCategory[];
  treatmentDetails: TreatmentDetail[];
  reviews: Review[];
  inventory: InventoryItem[];
  
  // UI 상태
  loading: boolean;
  error: string | null;
  activeTab: string;
  
  // 필터 상태
  filters: {
    members: {
      searchTerm: string;
      status: string;
      sortBy: string;
    };
    appointments: {
      searchTerm: string;
      status: string;
      sortBy: string;
    };
    inquiries: {
      searchTerm: string;
      status: string;
      category: string;
    };
    reviews: {
      searchTerm: string;
      status: string;
      rating: string;
    };
    inventory: {
      searchTerm: string;
      category: string;
      status: string;
    };
  };
  
  // 모달 상태
  modal: {
    isOpen: boolean;
    type: string;
    data: any;
  };
}

// 액션 타입 정의
export type AdminAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_MEMBERS'; payload: Member[] }
  | { type: 'SET_DOCTORS'; payload: Doctor[] }
  | { type: 'SET_SCHEDULES'; payload: Schedule[] }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'SET_INQUIRIES'; payload: Inquiry[] }
  | { type: 'SET_TREATMENT_CATEGORIES'; payload: TreatmentCategory[] }
  | { type: 'SET_TREATMENT_DETAILS'; payload: TreatmentDetail[] }
  | { type: 'SET_REVIEWS'; payload: Review[] }
  | { type: 'SET_INVENTORY'; payload: InventoryItem[] }
  | { type: 'UPDATE_MEMBER'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: number }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'APPROVE_APPOINTMENT'; payload: number }
  | { type: 'UPDATE_INQUIRY'; payload: Inquiry }
  | { type: 'APPROVE_REVIEW'; payload: number }
  | { type: 'UPDATE_FILTERS'; payload: { section: string; filters: any } }
  | { type: 'OPEN_MODAL'; payload: { type: string; data: any } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'RESET_STATE' };

// 초기 상태
const initialState: AdminState = {
  members: [],
  doctors: [],
  schedules: [],
  appointments: [],
  inquiries: [],
  treatmentCategories: [],
  treatmentDetails: [],
  reviews: [],
  inventory: [],
  loading: false,
  error: null,
  activeTab: 'dashboard',
  filters: {
    members: { searchTerm: '', status: 'all', sortBy: 'name' },
    appointments: { searchTerm: '', status: 'all', sortBy: 'date' },
    inquiries: { searchTerm: '', status: 'all', category: 'all' },
    reviews: { searchTerm: '', status: 'all', rating: 'all' },
    inventory: { searchTerm: '', category: 'all', status: 'all' },
  },
  modal: { isOpen: false, type: '', data: null },
};

// 리듀서
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'SET_MEMBERS':
      return { ...state, members: action.payload };
    
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    
    case 'SET_SCHEDULES':
      return { ...state, schedules: action.payload };
    
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    
    case 'SET_INQUIRIES':
      return { ...state, inquiries: action.payload };
    
    case 'SET_TREATMENT_CATEGORIES':
      return { ...state, treatmentCategories: action.payload };
    
    case 'SET_TREATMENT_DETAILS':
      return { ...state, treatmentDetails: action.payload };
    
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    
    case 'SET_INVENTORY':
      return { ...state, inventory: action.payload };
    
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id ? action.payload : member
        ),
      };
    
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload),
      };
    
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload.id ? action.payload : apt
        ),
      };
    
    case 'APPROVE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload ? { ...apt, status: '확정' as const } : apt
        ),
      };
    
    case 'UPDATE_INQUIRY':
      return {
        ...state,
        inquiries: state.inquiries.map(inq =>
          inq.id === action.payload.id ? action.payload : inq
        ),
      };
    
    case 'APPROVE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload 
            ? { ...review, status: '승인완료' as const, isPublic: true }
            : review
        ),
      };
    
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.section]: {
            ...state.filters[action.payload.section as keyof typeof state.filters],
            ...action.payload.filters,
          },
        },
      };
    
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: { isOpen: true, type: action.payload.type, data: action.payload.data },
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: { isOpen: false, type: '', data: null },
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context 생성
const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
} | undefined>(undefined);

// Provider 컴포넌트
export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}

// Custom Hook
export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

// Selector hooks for performance optimization
export function useAdminMembers() {
  const { state } = useAdmin();
  return state.members;
}

export function useAdminAppointments() {
  const { state } = useAdmin();
  return state.appointments;
}

export function useAdminFilters() {
  const { state } = useAdmin();
  return state.filters;
}

export function useAdminModal() {
  const { state } = useAdmin();
  return state.modal;
}
import { projectId, publicAnonKey } from './supabase/info'

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bcf9742a`

// API 호출 헬퍼 함수
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API 호출 에러:', error)
    throw error
  }
}

// ===================
// 진료과목 API
// ===================

export const treatmentAPI = {
  // 모든 진료과목 조회
  getAll: () => apiCall('/treatments'),
  
  // 진료과목 카테고리 업데이트
  updateCategories: (categories: any[]) => 
    apiCall('/treatments/categories', {
      method: 'POST',
      body: JSON.stringify({ categories })
    }),
  
  // 세부 진료과목 업데이트
  updateDetails: (details: any) => 
    apiCall('/treatments/details', {
      method: 'POST',
      body: JSON.stringify({ details })
    }),
  
  // 개별 치료 정보 조회
  getById: (id: string) => apiCall(`/treatments/${id}`)
}

// ===================
// 의료진 API
// ===================

export const doctorAPI = {
  // 의료진 목록 조회
  getAll: () => apiCall('/doctors'),
  
  // 의료진 추가
  create: (doctorData: any) => 
    apiCall('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData)
    }),
  
  // 의료진 수정
  update: (id: string, updateData: any) => 
    apiCall(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    }),
  
  // 의료진 삭제
  delete: (id: string) => 
    apiCall(`/doctors/${id}`, {
      method: 'DELETE'
    })
}

// ===================
// 공지사항 API
// ===================

export const noticeAPI = {
  // 공지사항 목록 조회
  getAll: () => apiCall('/notices'),
  
  // 공지사항 추가
  create: (noticeData: any) => 
    apiCall('/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData)
    }),
  
  // 공지사항 수정
  update: (id: string, updateData: any) => 
    apiCall(`/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    }),
  
  // 공지사항 삭제
  delete: (id: string) => 
    apiCall(`/notices/${id}`, {
      method: 'DELETE'
    })
}

// ===================
// 치료후기 API
// ===================

export const reviewAPI = {
  // 치료후기 목록 조회
  getAll: () => apiCall('/reviews'),
  
  // 치료후기 추가
  create: (reviewData: any) => 
    apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    }),
  
  // 치료후기 수정
  update: (id: string, updateData: any) => 
    apiCall(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    }),
  
  // 치료후기 삭제
  delete: (id: string) => 
    apiCall(`/reviews/${id}`, {
      method: 'DELETE'
    })
}

// ===================
// 예약 API
// ===================

export const appointmentAPI = {
  // 예약 목록 조회
  getAll: () => apiCall('/appointments'),
  
  // 예약 신청
  create: (appointmentData: any) => 
    apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    }),
  
  // 예약 상태 업데이트
  update: (id: string, updateData: any) => 
    apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    }),
  
  // 예약 삭제
  delete: (id: string) => 
    apiCall(`/appointments/${id}`, {
      method: 'DELETE'
    })
}

// ===================
// 문의사항 API
// ===================

export const contactAPI = {
  // 문의사항 목록 조회
  getAll: () => apiCall('/contacts'),
  
  // 문의사항 등록
  create: (contactData: any) => 
    apiCall('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData)
    }),
  
  // 문의사항 상태 업데이트
  update: (id: string, updateData: any) => 
    apiCall(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    })
}

// ===================
// 약품 재고 API
// ===================

export const inventoryAPI = {
  // 약품 재고 목록 조회
  getAll: () => apiCall('/inventory'),
  
  // 약품 재고 추가/수정
  save: (inventoryData: any) => 
    apiCall('/inventory', {
      method: 'POST',
      body: JSON.stringify(inventoryData)
    }),
  
  // 약품 재고 삭제
  delete: (id: string) => 
    apiCall(`/inventory/${id}`, {
      method: 'DELETE'
    })
}

// ===================
// 초기 데이터 설정
// ===================

export const initAPI = {
  // 초기 데이터 설정
  setupInitialData: () => 
    apiCall('/init-data', {
      method: 'POST'
    })
}

// ===================
// 헬스체크
// ===================

export const healthAPI = {
  check: () => apiCall('/health')
}
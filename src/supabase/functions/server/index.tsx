import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import * as kv from './kv_store.tsx'
import { Contact } from 'lucide-react'

const app = new Hono()

// CORS 설정
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// 로깅
app.use('*', logger(console.log))

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
)

// 헬스체크
app.get('/make-server-bcf9742a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ===================
// 진료과목 관리 API
// ===================

// 모든 진료과목 조회
app.get('/make-server-bcf9742a/treatments', async (c) => {
  try {
    const categories = await kv.get('treatment_categories') || []
    const details = await kv.get('treatment_details') || {}

    return c.json({
      success: true,
      data: {
        categories,
        details
      }
    })
  } catch (error) {
    console.log('진료과목 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 진료과목 카테고리 업데이트
app.post('/make-server-bcf9742a/treatments/categories', async (c) => {
  try {
    const { categories } = await c.req.json()
    await kv.set('treatment_categories', categories)

    return c.json({ success: true, message: '진료과목 카테고리가 업데이트되었습니다' })
  } catch (error) {
    console.log('진료과목 카테고리 업데이트 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 세부 진료과목 업데이트
app.post('/make-server-bcf9742a/treatments/details', async (c) => {
  try {
    const { details } = await c.req.json()
    await kv.set('treatment_details', details)

    return c.json({ success: true, message: '세부 진료과목이 업데이트되었습니다' })
  } catch (error) {
    console.log('세부 진료과목 업데이트 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 개별 치료 상세 정보 조회
app.get('/make-server-bcf9742a/treatments/:id', async (c) => {
  try {
    const treatmentId = c.req.param('id')
    const details = await kv.get('treatment_details') || {}
    const treatment = details[treatmentId]

    if (!treatment) {
      return c.json({ success: false, error: '치료 정보를 찾을 수 없습니다' }, 404)
    }

    return c.json({ success: true, data: treatment })
  } catch (error) {
    console.log('치료 상세 정보 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 의료진 관리 API
// ===================

// 의료진 목록 조회
app.get('/make-server-bcf9742a/doctors', async (c) => {
  try {
    const doctors = await kv.get('doctors') || []
    return c.json({ success: true, data: doctors })
  } catch (error) {
    console.log('의료진 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 의료진 추가
app.post('/make-server-bcf9742a/doctors', async (c) => {
  try {
    const doctorData = await c.req.json()
    const doctors = await kv.get('doctors') || []

    const newDoctor = {
      id: Date.now().toString(),
      ...doctorData,
      createdAt: new Date().toISOString()
    }

    doctors.push(newDoctor)
    await kv.set('doctors', doctors)

    return c.json({ success: true, data: newDoctor, message: '의료진이 추가되었습니다' })
  } catch (error) {
    console.log('의료진 추가 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 의료진 수정
app.put('/make-server-bcf9742a/doctors/:id', async (c) => {
  try {
    const doctorId = c.req.param('id')
    const updateData = await c.req.json()
    const doctors = await kv.get('doctors') || []

    const index = doctors.findIndex((d: any) => d.id === doctorId)
    if (index === -1) {
      return c.json({ success: false, error: '의료진을 찾을 수 없습니다' }, 404)
    }

    doctors[index] = { ...doctors[index], ...updateData, updatedAt: new Date().toISOString() }
    await kv.set('doctors', doctors)

    return c.json({ success: true, data: doctors[index], message: '의료진 정보가 수정되었습니다' })
  } catch (error) {
    console.log('의료진 수정 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 의료진 삭제
app.delete('/make-server-bcf9742a/doctors/:id', async (c) => {
  try {
    const doctorId = c.req.param('id')
    const doctors = await kv.get('doctors') || []

    const filteredDoctors = doctors.filter((d: any) => d.id !== doctorId)
    if (filteredDoctors.length === doctors.length) {
      return c.json({ success: false, error: '의료진을 찾을 수 없습니다' }, 404)
    }

    await kv.set('doctors', filteredDoctors)

    return c.json({ success: true, message: '의료진이 삭제되었습니다' })
  } catch (error) {
    console.log('의료진 삭제 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 공지사항 관리 API
// ===================

// 공지사항 목록 조회
app.get('/make-server-bcf9742a/notices', async (c) => {
  try {
    const notices = await kv.get('notices') || []
    return c.json({ success: true, data: notices })
  } catch (error) {
    console.log('공지사항 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 공지사항 추가
app.post('/make-server-bcf9742a/notices', async (c) => {
  try {
    const noticeData = await c.req.json()
    const notices = await kv.get('notices') || []

    const newNotice = {
      id: Date.now().toString(),
      ...noticeData,
      createdAt: new Date().toISOString(),
      views: 0
    }

    notices.unshift(newNotice) // 최신 공지사항을 맨 앞에 추가
    await kv.set('notices', notices)

    return c.json({ success: true, data: newNotice, message: '공지사항이 추가되었습니다' })
  } catch (error) {
    console.log('공지사항 추가 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 공지사항 수정
app.put('/make-server-bcf9742a/notices/:id', async (c) => {
  try {
    const noticeId = c.req.param('id')
    const updateData = await c.req.json()
    const notices = await kv.get('notices') || []

    const index = notices.findIndex((n: any) => n.id === noticeId)
    if (index === -1) {
      return c.json({ success: false, error: '공지사항을 찾을 수 없습니다' }, 404)
    }

    notices[index] = { ...notices[index], ...updateData, updatedAt: new Date().toISOString() }
    await kv.set('notices', notices)

    return c.json({ success: true, data: notices[index], message: '공지사항이 수정되었습니다' })
  } catch (error) {
    console.log('공지사항 수정 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 공지사항 삭제
app.delete('/make-server-bcf9742a/notices/:id', async (c) => {
  try {
    const noticeId = c.req.param('id')
    const notices = await kv.get('notices') || []

    const filteredNotices = notices.filter((n: any) => n.id !== noticeId)
    if (filteredNotices.length === notices.length) {
      return c.json({ success: false, error: '공지사항을 찾을 수 없습니다' }, 404)
    }

    await kv.set('notices', filteredNotices)

    return c.json({ success: true, message: '공지사항이 삭제되었습니다' })
  } catch (error) {
    console.log('공지사항 삭제 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 치료후기 관리 API
// ===================

// 치료후기 목록 조회
app.get('/make-server-bcf9742a/reviews', async (c) => {
  try {
    const reviews = await kv.get('reviews') || []
    return c.json({ success: true, data: reviews })
  } catch (error) {
    console.log('치료후기 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 치료후기 추가
app.post('/make-server-bcf9742a/reviews', async (c) => {
  try {
    const reviewData = await c.req.json()
    const reviews = await kv.get('reviews') || []

    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString(),
      status: 'pending' // 관리자 승인 대기
    }

    reviews.unshift(newReview)
    await kv.set('reviews', reviews)

    return c.json({ success: true, data: newReview, message: '치료후기가 등록되었습니다' })
  } catch (error) {
    console.log('치료후기 추가 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 치료후기 수정
app.put('/make-server-bcf9742a/reviews/:id', async (c) => {
  try {
    const reviewId = c.req.param('id')
    const updateData = await c.req.json()
    const reviews = await kv.get('reviews') || []

    const index = reviews.findIndex((r: any) => r.id === reviewId)
    if (index === -1) {
      return c.json({ success: false, error: '치료후기를 찾을 수 없습니다' }, 404)
    }

    reviews[index] = { ...reviews[index], ...updateData, updatedAt: new Date().toISOString() }
    await kv.set('reviews', reviews)

    return c.json({ success: true, data: reviews[index], message: '치료후기가 수정되었습니다' })
  } catch (error) {
    console.log('치료후기 수정 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 치료후기 삭제
app.delete('/make-server-bcf9742a/reviews/:id', async (c) => {
  try {
    const reviewId = c.req.param('id')
    const reviews = await kv.get('reviews') || []

    const filteredReviews = reviews.filter((r: any) => r.id !== reviewId)
    if (filteredReviews.length === reviews.length) {
      return c.json({ success: false, error: '치료후기를 찾을 수 없습니다' }, 404)
    }

    await kv.set('reviews', filteredReviews)

    return c.json({ success: true, message: '치료후기가 삭제되었습니다' })
  } catch (error) {
    console.log('치료후기 삭제 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 예약 관리 API
// ===================

// 예약 목록 조회
app.get('/make-server-bcf9742a/appointments', async (c) => {
  try {
    const appointments = await kv.get('appointments') || []
    return c.json({ success: true, data: appointments })
  } catch (error) {
    console.log('예약 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 예약 신청
app.post('/make-server-bcf9742a/appointments', async (c) => {
  try {
    const appointmentData = await c.req.json()
    const appointments = await kv.get('appointments') || []

    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      createdAt: new Date().toISOString(),
      status: 'pending' // 대기, confirmed, cancelled
    }

    appointments.unshift(newAppointment)
    await kv.set('appointments', appointments)

    return c.json({ success: true, data: newAppointment, message: '예약 신청이 완료되었습니다' })
  } catch (error) {
    console.log('예약 신청 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 예약 상태 업데이트
app.put('/make-server-bcf9742a/appointments/:id', async (c) => {
  try {
    const appointmentId = c.req.param('id')
    const updateData = await c.req.json()
    const appointments = await kv.get('appointments') || []

    const index = appointments.findIndex((a: any) => a.id === appointmentId)
    if (index === -1) {
      return c.json({ success: false, error: '예약을 찾을 수 없습니다' }, 404)
    }

    appointments[index] = { ...appointments[index], ...updateData, updatedAt: new Date().toISOString() }
    await kv.set('appointments', appointments)

    return c.json({ success: true, data: appointments[index], message: '예약 정보가 업데이트되었습니다' })
  } catch (error) {
    console.log('예약 업데이트 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 예약 삭제
app.delete('/make-server-bcf9742a/appointments/:id', async (c) => {
  try {
    const appointmentId = c.req.param('id')
    const appointments = await kv.get('appointments') || []

    const filteredAppointments = appointments.filter((a: any) => a.id !== appointmentId)
    if (filteredAppointments.length === appointments.length) {
      return c.json({ success: false, error: '예약을 찾을 수 없습니다' }, 404)
    }

    await kv.set('appointments', filteredAppointments)

    return c.json({ success: true, message: '예약이 삭제되었습니다' })
  } catch (error) {
    console.log('예약 삭제 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 문의사항 관리 API
// ===================

// 문의사항 목록 조회
app.get('/make-server-bcf9742a/contacts', async (c) => {
  try {
    const contacts = await kv.get('contacts') || []
    return c.json({ success: true, data: contacts })
  } catch (error) {
    console.log('문의사항 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 문의사항 등록
app.post('/make-server-bcf9742a/contacts', async (c) => {
  try {
    const contactData = await c.req.json()
    const contacts = await kv.get('contacts') || []

    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
      status: 'new' // new, responded
    }

    contacts.unshift(newContact)
    await kv.set('contacts', contacts)

    return c.json({ success: true, data: newContact, message: '문의사항이 등록되었습니다' })
  } catch (error) {
    console.log('문의사항 등록 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 문의사항 상태 업데이트
app.put('/make-server-bcf9742a/contacts/:id', async (c) => {
  try {
    const contactId = c.req.param('id')
    const updateData = await c.req.json()
    const contacts = await kv.get('contacts') || []

    const index = contacts.findIndex((contact: any) => contact.id === contactId)
    if (index === -1) {
      return c.json({ success: false, error: '문의사항을 찾을 수 없습니다' }, 404)
    }

    contacts[index] = { ...contacts[index], ...updateData, updatedAt: new Date().toISOString() }
    await kv.set('contacts', contacts)

    return c.json({ success: true, data: contacts[index], message: '문의사항이 업데이트되었습니다' })
  } catch (error) {
    console.log('문의사항 업데이트 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 약품 재고 관리 API
// ===================

// 약품 재고 목록 조회
app.get('/make-server-bcf9742a/inventory', async (c) => {
  try {
    const inventory = await kv.get('inventory') || []
    return c.json({ success: true, data: inventory })
  } catch (error) {
    console.log('약품 재고 조회 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 약품 재고 추가/수정
app.post('/make-server-bcf9742a/inventory', async (c) => {
  try {
    const inventoryData = await c.req.json()
    const inventory = await kv.get('inventory') || []

    const existingIndex = inventory.findIndex((item: any) => item.id === inventoryData.id)

    if (existingIndex >= 0) {
      // 기존 항목 수정
      inventory[existingIndex] = { ...inventory[existingIndex], ...inventoryData, updatedAt: new Date().toISOString() }
    } else {
      // 새 항목 추가
      const newItem = {
        id: Date.now().toString(),
        ...inventoryData,
        createdAt: new Date().toISOString()
      }
      inventory.push(newItem)
    }

    await kv.set('inventory', inventory)

    return c.json({ success: true, data: inventory, message: '약품 재고가 업데이트되었습니다' })
  } catch (error) {
    console.log('약품 재고 업데이트 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 약품 재고 삭제
app.delete('/make-server-bcf9742a/inventory/:id', async (c) => {
  try {
    const itemId = c.req.param('id')
    const inventory = await kv.get('inventory') || []

    const filteredInventory = inventory.filter((item: any) => item.id !== itemId)
    if (filteredInventory.length === inventory.length) {
      return c.json({ success: false, error: '약품을 찾을 수 없습니다' }, 404)
    }

    await kv.set('inventory', filteredInventory)

    return c.json({ success: true, message: '약품이 삭제되었습니다' })
  } catch (error) {
    console.log('약품 재고 삭제 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// ===================
// 초기 데이터 설정 API
// ===================

// 초기 데이터 설정
app.post('/make-server-bcf9742a/init-data', async (c) => {
  try {
    // 기본 진료과목 카테고리 설정
    const defaultCategories = [
      {
        id: 'implant',
        title: '임플란트',
        description: '자연치아와 같은 기능을 회복하는 임플란트 치료',
        items: [
          { id: 'implant-general', title: '일반 임플란트' },
          { id: 'implant-immediate', title: '즉시 임플란트' },
          { id: 'implant-navigation', title: '네비게이션 임플란트' },
          { id: 'implant-allon4', title: 'All-on-4' },
          { id: 'implant-bone', title: '뼈이식 임플란트' },
          { id: 'implant-sinus', title: '상악동거상술' }
        ]
      },
      {
        id: 'orthodontics',
        title: '교정치료',
        description: '아름답고 건강한 치아 배열을 만드는 교정 치료',
        items: [
          { id: 'ortho-invisible', title: '투명교정' },
          { id: 'ortho-lingual', title: '설측교정' },
          { id: 'ortho-partial', title: '부분교정' },
          { id: 'ortho-adult', title: '성인교정' },
          { id: 'ortho-ceramic', title: '세라믹교정' },
          { id: 'ortho-self', title: '셀프라이게이션' }
        ]
      },
      {
        id: 'aesthetic',
        title: '심미치료',
        description: '아름다운 미소를 만드는 심미적 치료',
        items: [
          { id: 'aesthetic-laminate', title: '라미네이트' },
          { id: 'aesthetic-allceramic', title: '올세라믹' },
          { id: 'aesthetic-whitening', title: '치아미백' },
          { id: 'aesthetic-gum', title: '잇몸성형' },
          { id: 'aesthetic-inlay', title: '인레이/온레이' },
          { id: 'aesthetic-veneer', title: '베니어' }
        ]
      },
      {
        id: 'general',
        title: '일반진료',
        description: '기본적인 치아 건강을 지키는 일반 진료',
        items: [
          { id: 'general-cavity', title: '충치치료' },
          { id: 'general-nerve', title: '신경치료' },
          { id: 'general-gum', title: '잇몸치료' },
          { id: 'general-scaling', title: '스케일링' },
          { id: 'general-wisdom', title: '사랑니발치' },
          { id: 'general-denture', title: '틀니' }
        ]
      }
    ]

    // 기본 의료진 데이터
    const defaultDoctors = [
      {
        id: '1',
        name: '김믿음',
        position: '대표원장',
        specialty: '임플란트 전문의',
        experience: '20년',
        education: [
          '서울대학교 치의학과 졸업',
          '서울대학교 치의학대학원 박사',
          '대한임플란트학회 정회원'
        ],
        image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzQzMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: '이신뢰',
        position: '부원장',
        specialty: '교정치료 전문의',
        experience: '15년',
        education: [
          '연세대학교 치의학과 졸업',
          '연세대학교 치의학대학원 교정과 전문의',
          '대한교정치과학회 정회원'
        ],
        image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzQzMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: '박안전',
        position: '진료과장',
        specialty: '심미치료 전문의',
        experience: '10년',
        education: [
          '고려대학교 치의학과 졸업',
          '고려대학교 치의학대학원 보존과 전문의',
          '대한심미치과학회 정회원'
        ],
        image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzQzMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        createdAt: new Date().toISOString()
      }
    ]

    await kv.set('treatment_categories', defaultCategories)
    await kv.set('doctors', defaultDoctors)
    await kv.set('notices', [])
    await kv.set('reviews', [])
    await kv.set('appointments', [])
    await kv.set('contacts', [])
    await kv.set('inventory', [])

    return c.json({ success: true, message: '초기 데이터가 설정되었습니다' })
  } catch (error) {
    console.log('초기 데이터 설정 에러:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ success: false, error: errorMessage }, 500)
  }
})

// 에러 핸들링
app.onError((err, c) => {
  console.log('서버 에러:', err)
  return c.json({ success: false, error: '서버 내부 오류가 발생했습니다' }, 500)
})

// Node.js 서버 시작 (Express 또는 다른 Node.js 프레임워크 필요)
export default app
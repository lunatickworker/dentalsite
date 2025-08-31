import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  UserCheck, Search, Plus, Edit, Eye, Trash2, Phone, Mail,
  Award, Calendar, Clock, Users
} from 'lucide-react';
import { useAdmin, Doctor } from '../../contexts/AdminContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function DoctorsManagement() {
  const { state, dispatch } = useAdmin();
  const { doctors, loading } = state;

  // 통계 계산
  const stats = useMemo(() => {
    const total = doctors.length;
    const active = doctors.filter(d => d.status === '활성').length;
    const specialists = doctors.filter(d => d.certifications.length > 0).length;
    const avgExperience = total > 0 
      ? doctors.reduce((sum, d) => sum + parseInt(d.experience), 0) / total
      : 0;

    return {
      total,
      active,
      specialists,
      avgExperience: Math.round(avgExperience * 10) / 10
    };
  }, [doctors]);

  const getStatusColor = (status: string) => {
    return status === '활성' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleAddDoctor = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'doctor-add', data: null }
    });
  };

  const handleEditDoctor = (doctor: Doctor) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'doctor-edit', data: doctor }
    });
  };

  const handleViewDoctor = (doctor: Doctor) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'doctor-view', data: doctor }
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
              <UserCheck className="w-6 h-6 mr-3 text-purple-600" />
              의료진 관리
            </h2>
            <p className="text-gray-600 mt-2">의료진 정보와 일정을 관리하세요</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleAddDoctor}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              의료진 추가
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">총 의료진</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total}명</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">활동 중</p>
                <p className="text-2xl font-bold text-green-800">{stats.active}명</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">전문의</p>
                <p className="text-2xl font-bold text-red-800">{stats.specialists}명</p>
              </div>
              <Award className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">평균 경력</p>
                <p className="text-2xl font-bold text-purple-800">{stats.avgExperience}년</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              {/* Doctor Profile */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-100">
                  {doctor.avatar ? (
                    <ImageWithFallback
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-600 font-bold text-lg">
                      {doctor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-purple-600 font-medium">{doctor.position}</p>
                  <div className="flex items-center mt-1">
                    <Badge className={getStatusColor(doctor.status)} variant="outline">
                      {doctor.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium mb-1">전문분야</p>
                <p className="text-gray-900">{doctor.specialty}</p>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">경력 {doctor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserCheck className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">전문의 {doctor.certifications.length}개</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {doctor.certifications.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">자격증</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.certifications.slice(0, 2).map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-blue-600 border-blue-200">
                        {cert}
                      </Badge>
                    ))}
                    {doctor.certifications.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.certifications.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="mb-4 space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{doctor.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 truncate">{doctor.email}</span>
                </div>
              </div>

              {/* Schedule Summary */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium mb-2">이번 주 일정</p>
                <div className="grid grid-cols-7 gap-1">
                  {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
                    const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                    const isWorking = doctor.schedule[dayKey] && !doctor.schedule[dayKey].includes('휴진');
                    return (
                      <div
                        key={day}
                        className={`text-xs text-center py-1 rounded ${
                          isWorking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bio Preview */}
              {doctor.bio && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {doctor.bio}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onClick={() => handleViewDoctor(doctor)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  상세보기
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                  onClick={() => handleEditDoctor(doctor)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  수정
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="text-center py-12">
            <UserCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">의료진이 등록되지 않았습니다</h3>
            <p className="text-gray-600 mb-6">새로운 의료진을 추가해보세요</p>
            <Button 
              onClick={handleAddDoctor}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              의료진 추가
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
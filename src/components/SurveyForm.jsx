// src/components/SurveyForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';
import { surveyAPI } from '../services/api';

const FormContainer = styled.div`
  background: white; padding: 2rem 2.5rem; border-radius: 25px; max-width: 600px; margin: 0 auto;
`;
const SubmitButton = styled.button`
  width: 100%; padding: 1rem; background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const surveyData = surveys[i18n.language] || surveys.ko;

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
    defaultValues: { date: today, age: 25, userId: '' }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Raw form data:", data);
      
      // 데이터 검증 및 변환
      const processedData = {
        ...data,
        userId: Math.max(0, Math.min(9999, parseInt(data.userId) || 0)),
        age: Math.max(1, Math.min(100, parseInt(data.age) || 25)),
        question1: Math.max(1, Math.min(5, parseInt(data.question1) || 1)),
        question2: Math.max(1, Math.min(5, parseInt(data.question2) || 1)),
        question3: Math.max(1, Math.min(5, parseInt(data.question3) || 1)),
        question4: Math.max(1, Math.min(5, parseInt(data.question4) || 1)),
        question5: Math.max(1, Math.min(5, parseInt(data.question5) || 1)),
        question6: Math.max(1, Math.min(5, parseInt(data.question6) || 1)),
        question7: Math.max(1, Math.min(5, parseInt(data.question7) || 1)),
        question8: Math.max(1, Math.min(5, parseInt(data.question8) || 1)),
        isViewed: false, // 감상여부를 기본값 false로 설정
      };
      
      // 필수 필드 검증
      const requiredFields = ['userId', 'name', 'question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'];
      const missingFields = requiredFields.filter(field => !processedData[field] && processedData[field] !== 0);
      
      if (missingFields.length > 0) {
        toast.error(`필수 항목이 누락되었습니다: ${missingFields.join(', ')}`);
        return;
      }
      
      console.log("Processed data before sending:", processedData);
      const result = await surveyAPI.createSurvey(processedData);
      console.log("Server response:", result);
      
      // 설문 제출 후 isViewed 필드 자동 수정 (백그라운드에서 실행)
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001';
        await fetch(`${API_BASE_URL}/api/surveys/fix-isviewed`);
        console.log('isViewed 필드 자동 수정 완료');
      } catch (error) {
        console.log('isViewed 필드 자동 수정 실패:', error);
      }
      
      toast.success('설문이 성공적으로 제출되었습니다!');
      reset();
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.error?.message || '제출 중 오류가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        <input type="hidden" name="form-name" value="survey-submit" />

        {surveyData.map((field) => (
          <FormField
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            register={register}
            errors={errors}
            options={field.options}
            validation={field.validation || {}}
            readOnly={field.readOnly}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            watch={watch}
            setValue={setValue}
          />
        ))}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('AnalyzePage.submitload') : t('AnalyzePage.submit')}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SurveyForm;
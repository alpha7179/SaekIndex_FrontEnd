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
  background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto;
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
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await surveyAPI.createSurvey(data);
      console.log("Server response:", result);
      toast.success('설문이 성공적으로 제출되었습니다!');
      reset();
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
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
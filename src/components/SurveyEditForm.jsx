// src/components/SurveyEditForm.jsx
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormField from './FormField';
import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

const Panel = styled.div` background: white; border-radius: 12px; padding: 1rem; `;
const Actions = styled.div` display: flex; gap: 0.5rem; margin-top: 1rem; `;
const Button = styled.button` /* ... */ `;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyEditForm({ selectedSurvey, onSubmit, onReset, isSubmitting, isReadOnly }) {
  const { i18n } = useTranslation();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  
  const surveyData = surveys[i18n.language] || surveys.ko;

  useEffect(() => {
    if (selectedSurvey) {
      surveyData.forEach(field => {
        let value = selectedSurvey[field.name] || '';
        if (field.name === 'date' && value) {
          value = new Date(value).toISOString().split('T')[0];
        }
        setValue(field.name, value);
      });
    } else {
      reset();
    }
  }, [selectedSurvey, setValue, reset, surveyData]);

  return (
    <Panel>
      <h3>{selectedSurvey ? `${selectedSurvey.name}님의 설문 상세` : '항목 선택'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {surveyData.map((field) => (
          <FormField
            key={field.name}
            readOnly={isReadOnly || field.readOnly} 
            type={field.type}
            name={field.name}
            label={field.label}
            register={register}
            errors={errors}
            options={field.options}
            validation={{}}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            watch={watch}
            setValue={setValue}
          />
        ))}
        
        {!isReadOnly && (
          <Actions>
            <Button type="submit" disabled={isSubmitting || !selectedSurvey}>수정하기</Button>
            <Button type="button" onClick={onReset}>폼 초기화</Button>
          </Actions>
        )}
      </form>
    </Panel>
  );
}

export default SurveyEditForm;
/* src/components/FormField.jsx */
import React from 'react';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: ${props => 
    props.name && props.name.startsWith('question') ? '3rem' : '2rem'}; 
`;
const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: ${props => 
    (props.type === 'radio' || props.type === 'checkbox') ? '0.5rem' : '0.5rem'};
`;
const Input = styled.input`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
  &[type='range'] {
    padding: 0;
  }
`;
const Select = styled.select`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; resize: vertical; min-height: 100px;
`;
const ErrorMessage = styled.span`
  color: #ff4757; font-size: 0.875rem; margin-bottom: 1rem; display: block;
`;
const OptionWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 0.25rem; flex: 1;
`;
const RequiredMark = styled.span`
  color: red; margin-left: 0.25rem;
`;
const RangeContainer = styled.div`
  display: flex; align-items: center; gap: 1rem;
`;
const NumberInput = styled(Input)`
  width: 80px; text-align: center;
`;



const FormField = ({ label, name, type, register, errors, options, validation, min, max, watch, setValue, readOnly, ...rest }) => {
  const validationRules = { ...validation };
  if (min !== undefined) {
    validationRules.min = { value: min, message: `최소 ${min} 이상이어야 합니다.` };
  }
  if (max !== undefined) {
    validationRules.max = { value: max, message: `최대 ${max} 이하여야 합니다.` };
  }

  const watchedValue = watch ? watch(name) : undefined;

  return (
    <FormGroup name={name}>
      <Label htmlFor={name} type={type}>
        {label}
        {validation?.required && <RequiredMark>*</RequiredMark>}
      </Label>
      
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
      
      {(() => {
        switch (type) {
          case 'range':
            return (
              <RangeContainer>
                <Input
                  id={name}
                  type="range"
                  min={min}
                  max={max}
                  {...register(name, validationRules)}
                  {...rest}
                  disabled={readOnly}
                />
                <NumberInput
                  type="number"
                  min={min}
                  max={max}
                  value={watchedValue === undefined ? '' : watchedValue}
                  onChange={(e) => setValue(name, parseInt(e.target.value) || 0)}
                  disabled={readOnly}
                />
              </RangeContainer>
            );
          case 'textarea':
            return <Textarea id={name} {...register(name, validationRules)} {...rest} disabled={readOnly} />;
          case 'select':
            return (
              <Select id={name} {...register(name, validationRules)} {...rest} disabled={readOnly}>
                {options.map(option => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                ))}
              </Select>
            );
          case 'radio':
  // 읽기 전용 모드일 때 선택된 옵션만 표시
  if (readOnly) {
    const selectedOption = options.find(option => option.value == watchedValue);
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        border: '2px solid #e9ecef',
        marginTop: '1rem'
      }}>
        <div style={{ 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          color: '#495057',
          textAlign: 'center'
        }}>
          선택된 답변: {selectedOption ? selectedOption.label : `값 ${watchedValue}`}
        </div>
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#6c757d',
          textAlign: 'center',
          marginTop: '0.5rem'
        }}>
          (점수: {watchedValue}/5)
        </div>
      </div>
    );
  }
  
  // 일반 모드일 때는 기존 라디오 버튼 표시
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      {options.map((option, index) => (
        <label key={option.value} htmlFor={`${name}-${option.value}`} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.25rem', 
            flex: 1 
        }}>
          <input 
            id={`${name}-${option.value}`}
            type="radio" 
            value={option.value} 
            {...register(name, {
              ...validationRules,
              setValueAs: (value) => parseInt(value) || 1  // 문자열을 숫자로 변환
            })} 
            disabled={readOnly} 
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
          case 'checkbox':
            return (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {options.map((option, index) => (
                  <OptionWrapper key={option.value}>
                    <input 
                      id={index === 0 ? name : `${name}-${option.value}`}
                      type="checkbox" 
                      value={option.value} 
                      {...register(name, validationRules)} 
                      disabled={readOnly} 
                    />
                    <span>{option.label}</span>
                  </OptionWrapper>
                ))}
              </div>
            );
          default:
            const registerOptions = type === 'number' ? {
              ...validationRules,
              setValueAs: (value) => value === '' ? undefined : parseInt(value) || 0
            } : validationRules;
            return <Input id={name} type={type} {...register(name, registerOptions)} {...rest} disabled={readOnly} />;
        }
      })()}
    </FormGroup>
  );
};

export default FormField;
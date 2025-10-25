/* src/components/FormField.jsx */
import React from 'react';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 2.5rem; 
`;
const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: ${props => 
    (props.type === 'radio' || props.type === 'checkbox') ? '1rem' : '0.5rem'};
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
  color: #ff4757; font-size: 0.875rem; margin-top: 0.25rem; display: block;
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
    <FormGroup>
      <Label htmlFor={name} type={type}>
        {label}
        {validation?.required && <RequiredMark>*</RequiredMark>}
      </Label>
      
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
                  onChange={(e) => { }}
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
            return (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {options.map(option => (
                  <OptionWrapper key={option.value}>
                    <input type="radio" value={option.value} {...register(name, validationRules)} disabled={readOnly} />
                    <span>{option.label}</span>
                  </OptionWrapper>
                ))}
              </div>
            );
          case 'checkbox':
            return (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {options.map(option => (
                  <OptionWrapper key={option.value}>
                    <input type="checkbox" value={option.value} {...register(name, validationRules)} disabled={readOnly} />
                    <span>{option.label}</span>
                  </OptionWrapper>
                ))}
              </div>
            );
          default:
            return <Input id={name} type={type} {...register(name, validationRules)} {...rest} disabled={readOnly} />;
        }
      })()}

      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;
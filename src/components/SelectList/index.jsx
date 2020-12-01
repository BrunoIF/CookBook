import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import * as S from './styles';

function SelectList({ options, onChange, ...props }) {
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleChange = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleReset = () => {
    setIsOpen(false);
    setSelectedValue(options[0]);
    onChange('');
  };

  useEffect(() => {
    if (selectedValue !== options[0]) {
      onChange(selectedValue);
      setIsResetOpen(true);
    } else {
      setIsResetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <S.Wrapper {...props}>
      {isResetOpen && (
        <S.ResetButton onClick={() => handleReset()}>&times;</S.ResetButton>
      )}
      <S.SelectedValue onClick={() => setIsOpen((prevState) => !prevState)}>
        {selectedValue}
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </S.SelectedValue>
      <S.OptionsWrapper open={isOpen}>
        {options.slice(1, options.length).map((option) => (
          <S.Option key={option} onClick={() => handleChange(option)}>
            {option}
          </S.Option>
        ))}
      </S.OptionsWrapper>
    </S.Wrapper>
  );
}

export default SelectList;

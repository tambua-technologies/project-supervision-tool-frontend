import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionBarButton from '../ActionBarButton';

describe('ActionButton', () => {

    it('triggers file uploading', () => {

        const spyFunc = jest.fn(() => ({click: () => {}}));
        Object.defineProperty(global.document, 'getElementById', { value: spyFunc });
      
        
        // stub triggerFileUpload
        const triggerFileUpload = jest.fn();
        render(<ActionBarButton
            btnName="Import EHS or Safeguard concerns"
            btnAction={() => { }}
            btnType="upload"
        />);
        const button = screen.getByText('Import EHS or Safeguard concerns');
        
        button.click();
        expect(spyFunc).toHaveBeenCalled()


    });

});
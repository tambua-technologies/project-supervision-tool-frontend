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
            btnName="Import OHS or Safeguard concerns"
            btnAction={() => { }}
            btnType="upload"
        />);
        const button = screen.getByText('Import OHS or Safeguard concerns');
        
        button.click();
        expect(spyFunc).toHaveBeenCalled()


    });

});
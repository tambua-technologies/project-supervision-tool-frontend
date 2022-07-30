import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionBar from '../';

describe('ActionBar', () => {
    it('renders action bar', () => {
        render(<ActionBar
            actionButtonProp={{
                title: "Overview",
                arrActions: [
                    {
                        btnName: "Import EHS or Safeguard concerns",
                        btnAction: () => { },
                        btnType: 'upload',
                    },
                    {
                        btnName: "Add Field Note ",
                        btnAction: () => { },
                    },
                    {
                        btnName: "New Monthly Report",
                        btnAction: () => { },
                    },
                ],
            }}
        />);
        expect(screen.getByText('Import EHS or Safeguard concerns')).toBeInTheDocument();
        expect(screen.getByText('New Monthly Report')).toBeInTheDocument();

    });

});
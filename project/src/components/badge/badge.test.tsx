import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../history-route/history-route';

import Badge from './badge';

describe('Component: Badge', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRoute history={history}>
        <Badge text='Premium' className='place-card' />
      </HistoryRoute>,
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

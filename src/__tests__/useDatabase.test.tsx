import { renderHook, act } from '@testing-library/react-hooks';
import useDatabase from '../hooks/useDatabase';

describe('useDatabase', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useDatabase());

    expect(result.current.searchString).toBe('');
    expect(result.current.initialSearch).toBe(false);
    expect(result.current.possibleResults).toEqual([]);
    expect(result.current.searchResults).toEqual([]);
  });

  it('should update searchString and possibleResults on onSearchStringChange', () => {
    const { result } = renderHook(() => useDatabase());

    act(() => {
      result.current.onSearchStringChange('React');
    });

    expect(result.current.searchString).toBe('React');
    expect(result.current.possibleResults.length).toBeGreaterThan(0);
  });

  it('should update searchResults and initialSearch on search', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDatabase());

    await act(async () => {
      await result.current.search('React');
      //await waitForNextUpdate();
    });

    expect(result.current.initialSearch).toBe(true);
    expect(result.current.searchResults.length).toBeGreaterThan(10);
  });

});

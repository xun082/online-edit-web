import * as React from 'react';
import { PerfectCursor } from 'perfect-cursors';

export default function usePerfectCursor(cb: (point: number[]) => void, point?: number[]) {
  const [pc] = React.useState(() => new PerfectCursor(cb));

  React.useLayoutEffect(() => {
    if (point) pc.addPoint(point);

    return () => pc.dispose();
  }, [pc]);

  const onPointChange = React.useCallback((point: number[]) => pc.addPoint(point), [pc]);

  return onPointChange;
}

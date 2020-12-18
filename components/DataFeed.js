import { Fragment } from 'react';
import { Divider, Skeleton } from 'antd';

export default function DataFeed() {
  const data = new Array(3).fill(0).map((_, i) => i);

  return (
    <div>
      {data.map((i) => (
        <Fragment key={i}>
          <Skeleton active loading />
          <Divider />
        </Fragment>
      ))}
    </div>
  );
}

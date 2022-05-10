import React, { useState, useEffect } from 'react';
import { ConnectRC, Loading, IndexModelState, connect } from 'umi';
import Talks from '@/components/Talks';

interface PageProps {
  index: IndexModelState;
  loading: boolean;
}

const Index: ConnectRC<PageProps> = ({ index, dispatch }) => {
  const { name = '' } = index;
  return (
    <div>
      <Talks />
    </div>
  );
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(Index);

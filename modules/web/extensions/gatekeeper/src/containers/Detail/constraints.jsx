import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { constraintStore } from '../../store';

import { Icon, formatTime, DetailPage } from '@ks-console/shared';

const PATH = '/clusters/:cluster/gatekeeper.constraints/:name';

const ConstraintsDetails = () => {
  const { cluster, name } = useParams();
  const detailPageRef = useRef();
  const tabs = [{ path: `${PATH}/violations`, title: t('CONSTRAINT_VIOLATIONS') }];

  const attrs = data => {
    const newDate = constraintStore.mapper(data?.items[0]);

    return [
      { label: t('CLUSTER_PL'), value: cluster || '' },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(newDate.metadata.creationTimestamp),
      },
    ];
  };

  return (
    <>
      <DetailPage
        ref={detailPageRef}
        tabs={tabs}
        authKey={constraintStore.module}
        store={constraintStore}
        params={{ cluster, name }}
        sideProps={{
          attrs,
          icon: <Icon name="key" size={28} style={{ verticalAlign: 'middle' }} />,
          breadcrumbs: {
            label: t('CONSTRAINT'),
            url: `/clusters/${cluster}/gatekeeper.constraints`,
          },
        }}
      />
    </>
  );
};

export default ConstraintsDetails;

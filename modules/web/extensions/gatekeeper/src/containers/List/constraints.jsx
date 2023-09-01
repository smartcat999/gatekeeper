import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Banner,
  Field,
} from '@kubed/components';
import { Group } from '@kubed/icons';
import { DataTable, getOriginData } from '@ks-console/shared';

const ConstraintList = () => {
  const params = useParams();
  const constraintRef = useRef();

  const columns = [
    {
      title: t('Name'),
      field: 'name',
      sortable: false,
      searchable: false,
      render: (value, row) => (
        <Field value={value} as={Link} to={`/clusters/${params.cluster}/gatekeeper.constraints/${row.name}`} />
      ),
    },
    // {
    //   title: t('Description'),
    //   width: '70%',
    //   canHide: true,
    //   render: (value, row) => (
    //     <Field value={
    //       row.metadata.annotations["kubesphere.io/description"] == undefined ? "-" : row.metadata.annotations["kubesphere.io/description"]
    //     } />
    //   ),
    // },
    // {
    //   id: 'more',
    //   title: '',
    //   width: 20,
    //   render: (value, record) => renderItemActions({ ...record }),
    // },
  ];

  const formatFn = (data) => {
    return {
      _originData: getOriginData(data),
      ...data
    }
  }
  
  function formatServerData(serverData) {
    return {
      ...serverData,
      items: serverData.resources,
      totalItems: 10,
    };
  }

  return (
    <>
      <Banner
        icon={<Group />}
        title={t('Constraints')}
        description={t('CONSTRAINT_DESC')}
        className="mb12"
      />
      <DataTable
        ref={constraintRef}
        columns={columns}
        tableName="constraint-list"
        rowKey="name"
        format={data => {
          return formatFn(data)
        }}
        serverDataFormat={formatServerData}
        placeholder={t('SEARCH_BY_NAME')}
        url={`/apis/constraints.gatekeeper.sh/v1beta1`}
        useStorageState={false}
        disableRowSelect={false}
        selectType={false}
      />
    </>
  );
};

export default ConstraintList


import { BaseStore } from '@ks-console/shared';


const module = 'constrainttemplates';

const mapper = (item) => {
  return {name:item.metadata.name,...item} 
};

const getResourceUrl = (params) => `clusters/${params?.cluster}/kapis/templates.gatekeeper.sh/v1/constrainttemplates/${params?.name}`;

const { ...baseStore } = BaseStore({ module, mapper, getListUrlFn: getResourceUrl,
  getResourceUrlFn: getResourceUrl});

const store = {
  ...baseStore,
  module,
  mapper,
};

export default store;
//# sourceMappingURL=secret.d.ts.map

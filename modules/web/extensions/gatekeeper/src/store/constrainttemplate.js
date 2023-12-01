import { BaseStore } from '@ks-console/shared';

const module = 'constrainttemplates';

const mapper = item => {
  return { name: item.metadata.name, ...item };
};

const getResourceUrl = params => `/apis/templates.gatekeeper.sh/v1/${module}`; //`clusters/${params?.cluster}/kapis/templates.gatekeeper.sh/v1/${module}`;

const { ...baseStore } = BaseStore({
  module,
  mapper,
  getListUrlFn: getResourceUrl,
  getResourceUrlFn: getResourceUrl,
});

const store = {
  ...baseStore,
  module,
  mapper,
};

export default store;
//# sourceMappingURL=secret.d.ts.map

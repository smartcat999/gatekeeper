import { BaseStore } from '@ks-console/shared';

const module = 'constraint';

const mapper = item => {
  return { name: item.metadata.name || item.items[0].metadata.name, ...item }; //TODO:
};

const getResourceUrl = params => `apis/constraints.gatekeeper.sh/v1beta1`; //`clusters/${params?.cluster}/kapis/templates.gatekeeper.sh/v1/${module}`;

const { ...baseStore } = BaseStore({
  module,
  mapper,
  getListUrlFn: getResourceUrl,
  getResourceUrlFn: getResourceUrl,
});

const constraintStore = {
  ...baseStore,
  module,
  mapper,
};

export default constraintStore;
//# sourceMappingURL=secret.d.ts.map

import { BaseStore } from '@ks-console/shared';

const module = 'constrainttemplates';

const mapper = item => {
  return { name: item.metadata.name, ...item };
};

const yamlRawData = `apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: null
spec:
  crd:
    spec:
      names:
        kind: null
      validation:
        openAPIV3Schema:
          type: object
          properties: {}
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: ''
`

const getResourceUrl = params => `/apis/templates.gatekeeper.sh/v1/${module}`;

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
  yamlRawData
};

export default store;
//# sourceMappingURL=secret.d.ts.map

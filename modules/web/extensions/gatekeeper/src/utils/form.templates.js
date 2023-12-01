const getConstraintTemplatesTemplate = () => ({
  apiVersion: 'templates.gatekeeper.sh/v1',
  kind: 'ConstraintTemplate',
  metadata: {},
  spec: {
    crd: {
      spec: {
        names: {},
        validations: {
          openAPIV3Schema: {},
        },
      },
    },
    targets: [
      {
        target: 'admission.k8s.gatekeeper.sh',
        rego: '',
      },
    ],
  },
});

const FORM_TEMPLATES = {
  constrainttemplates: getConstraintTemplatesTemplate,
};

const MODULE_KIND_MAP = {
  constraints: 'ConstraintTemplate',
};

export default FORM_TEMPLATES;

export const getFormTemplate = (namespace, module) => {
  const kind = MODULE_KIND_MAP[module];

  if (!kind || !FORM_TEMPLATES[module]) {
    return {};
  }

  const template = FORM_TEMPLATES[module]({ namespace });

  return {
    [kind]: template,
  };
};

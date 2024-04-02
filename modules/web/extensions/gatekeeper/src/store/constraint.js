import { BaseStore, getPath, request } from '@ks-console/shared'
import { find, get, isEmpty } from 'lodash'
import { API_VERSIONS } from '../utils/constants'

const module = 'constraints'

const mapper = item => {
  return {
    name: item.metadata.name || item.items[0].metadata.name,
    uid: item.metadata.uid,
    ...item,
  } 
}

const yamlRawData = `apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPHostFilesystem
metadata:
  name: psp-host-filesystem
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
#    namespaces:
#      - name: kubesphere-system
#    namespaceSelector:
#      matchExpressions:
#        - key: kubesphere.io/workspace
#          operator: Exists
#      matchLabels:
#        kubesphere.io/workspace: system-workspace
  parameters: {}
`

const getResourceUrl = (params, ksVersion) => {
  if (ksVersion) {
    return `kapis/constraints.gatekeeper.sh/v1beta1${getPath(params)}/${module}`;
  } else {
    if (params.kind) {
      return `${API_VERSIONS[module]}${getPath(params)}/${params.kind.toLowerCase()}`;
    }
    return `${API_VERSIONS[module]}${getPath(params)}`;
  }
}

const fetchConstraintKind = async (params) => {
  const url = `${API_VERSIONS['constrainttemplates']}${getPath(params)}/constrainttemplates`
  const result = await request.get(url)
  const items = get(result, 'items', [])
  return {
    data: items,
    total: items.length,
  }
}

const checkNameFn = async ({ name, kind,cluster }) => {
  if (kind) {
    const url = `kapis/constraints.gatekeeper.sh/v1beta1${getPath({cluster})}/${module}`
    const result = await request.get(url)
    const items = get(result, 'items', [])
    return {exist:!isEmpty(find(items, (item)=>item.metadata.name===name&&item.kind===kind))}
  }
  return {exist:false}
}


const { ...baseStore } = BaseStore({
  module,
  mapper,
  getListUrlFn: getResourceUrl,
  getResourceUrlFn: getResourceUrl,
})

const constraintStore = {
  ...baseStore,
  module,
  mapper,
  fetchConstraintKind,
  yamlRawData,
  checkNameFn,
}

export default constraintStore


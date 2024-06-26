// The `xpath` dependency is about as large as `jszip`.
import xpath from 'xpath';
export default function (document, node, path) {
  var namespaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var select = xpath.useNamespaces(namespaces);
  return select(path, node || document);
}
//# sourceMappingURL=xpathNode.js.map
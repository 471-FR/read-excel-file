export function findChild(node, tagName) {
  var i = 0;
  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i];
    // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp
    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      return childNode;
    }
    i++;
  }
}
export function findChildren(node, tagName) {
  var results = [];
  var i = 0;
  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i];
    // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp
    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      results.push(childNode);
    }
    i++;
  }
  return results;
}
export function forEach(node, tagName, func) {
  // if (typeof tagName === 'function') {
  // 	func = tagName
  // 	tagName = undefined
  // }
  var i = 0;
  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i];
    if (tagName) {
      // `nodeType: 1` means "Element".
      // https://www.w3schools.com/xml/prop_element_nodetype.asp
      if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
        func(childNode, i);
      }
    } else {
      func(childNode, i);
    }
    i++;
  }
}
export function map(node, tagName, func) {
  var results = [];
  forEach(node, tagName, function (node, i) {
    results.push(func(node, i));
  });
  return results;
}
var NAMESPACE_REG_EXP = /.+\:/;
export function getTagName(element) {
  // For some weird reason, if an element is declared as,
  // for example, `<x:sheets/>`, then its `.tagName` will be
  // "x:sheets" instead of just "sheets".
  // https://gitlab.com/catamphetamine/read-excel-file/-/issues/25
  // Its not clear how to tell it to ignore any namespaces
  // when getting `.tagName`, so just replacing anything
  // before a colon, if any.
  return element.tagName.replace(NAMESPACE_REG_EXP, '');
}

// This function is only used for occasional debug messages.
export function getOuterXml(node) {
  // `nodeType: 1` means "Element".
  // https://www.w3schools.com/xml/prop_element_nodetype.asp
  if (node.nodeType !== 1) {
    return node.textContent;
  }
  var xml = '<' + getTagName(node);
  var j = 0;
  while (j < node.attributes.length) {
    xml += ' ' + node.attributes[j].name + '=' + '"' + node.attributes[j].value + '"';
    j++;
  }
  xml += '>';
  var i = 0;
  while (i < node.childNodes.length) {
    xml += getOuterXml(node.childNodes[i]);
    i++;
  }
  xml += '</' + getTagName(node) + '>';
  return xml;
}
//# sourceMappingURL=dom.js.map
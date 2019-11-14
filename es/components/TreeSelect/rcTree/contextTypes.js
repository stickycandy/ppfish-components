function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Webpack has bug for import loop, which is not the same behavior as ES module.
 * When util.js imports the TreeNode for tree generate will cause treeContextTypes be empty.
 */
import PropTypes from 'prop-types';
/**
 * Thought we still use `cloneElement` to pass `key`,
 * other props can pass with context for future refactor.
 */

export var treeContextTypes = {
  rcTree: PropTypes.shape({
    root: PropTypes.object,
    prefixCls: PropTypes.string,
    selectable: PropTypes.bool,
    showIcon: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    draggable: PropTypes.bool,
    checkable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    checkStrictly: PropTypes.bool,
    disabled: PropTypes.bool,
    openTransitionName: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    loadData: PropTypes.func,
    filterTreeNode: PropTypes.func,
    renderTreeNode: PropTypes.func,
    isKeyChecked: PropTypes.func,
    onNodeClick: PropTypes.func,
    onNodeDoubleClick: PropTypes.func,
    onNodeExpand: PropTypes.func,
    onNodeSelect: PropTypes.func,
    onNodeCheck: PropTypes.func,
    onNodeMouseEnter: PropTypes.func,
    onNodeMouseLeave: PropTypes.func,
    onNodeContextMenu: PropTypes.func,
    onNodeDragStart: PropTypes.func,
    onNodeDragEnter: PropTypes.func,
    onNodeDragOver: PropTypes.func,
    onNodeDragLeave: PropTypes.func,
    onNodeDragEnd: PropTypes.func,
    onNodeDrop: PropTypes.func // TODO: Remove this
    // onBatchNodeCheck: PropTypes.func,
    // onCheckConductFinished: PropTypes.func,
    // Tree will store the entities when the treeNode refresh.
    // User can pass the func to add more info to customize the additional info.
    // processTreeEntity: PropTypes.func,

  })
};
export var nodeContextTypes = _objectSpread({}, treeContextTypes, {
  rcTreeNode: PropTypes.shape({
    onUpCheckConduct: PropTypes.func
  })
});
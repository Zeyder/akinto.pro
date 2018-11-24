export default (id, context) => id in ((window.$appContent && window.$appContent[context]) || {})

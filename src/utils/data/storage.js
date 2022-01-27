/**
 * @author chenlingyu
 */

import engine from "store/src/store-engine"
import storages from "store/storages/all"
import plugins from "store/plugins/json2"

export default engine.createStore(storages, plugins)
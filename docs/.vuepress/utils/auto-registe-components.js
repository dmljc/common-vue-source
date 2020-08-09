const path = require('path');
const slugify = require('slugify');

function getModules() {
    let requireModules = require.context('@root/docs/components', true, /\.vue/);
    const modules = [];
    requireModules.keys().forEach((filePath) => {
        // filePath: ./a/b/c.vue
        // basename: 'c.vue'
        // filename: 'c'
        // dir: b
        // name: b-c  --this is component name
        const basename = path.basename(filePath);
        const filename = basename.substr(0, basename.lastIndexOf('.'));
        const dir = path.basename(path.dirname(filePath));
        const name = slugify(`${dir}-${filename}`.toLowerCase());
        const component = requireModules(filePath).default;
        modules.push({name, component});
    });
    return modules;
}

const modules = getModules();

export default {
    install(Vue) {
        modules.forEach(module => {
            Vue.component(module.name, module.component);
        });
    }
}
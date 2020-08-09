const slugify = require('slugify');

const getComponentName = (path, name) => {
    const dir = path.match(/components\/([\s\S]+)\//);
    return slugify(`${dir[1]} ${name}`);
}
const containerPlugin = [require('markdown-it-container'), 'code', {
    validate: function(params) {
        return params.trim().match(/^code(:([\S]+))*\s*(.*)$/);
    },
    render: function(tokens, idx, opts, ctx) {
        const token = tokens[idx];
        if(token.nesting === 1) {
            // const m = token.info.trim().match(/^code(:([\S]+))*\s*(.*)$/);
            // const componentName = getComponentName(ctx.relativePath, m[2] || '');
            return `<template><code-wrap><highlight-code lang="vue">`;
        }
        return '</highlight-code></code-wrap></template>';
    }
}]

module.exports = containerPlugin;
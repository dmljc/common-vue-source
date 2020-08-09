<script>
export default {
    name: 'TableColumn',
    props: {
        scope: {
            type: Object,
            default: () => ({})
        },
        column: {
            type: Object,
            default: () => ({})
        }
    },
    render(h) {
        /* eslint-disable */
        const row = this.scope.row || {};
        const column = this.column;
        return (
            <span>
            {
                column.render && typeof column.render === 'function' ? column.render(row, h) :  row[column.prop]
            }
            </span>
        )
        /* eslint-enable */
    }
};
</script>
const routes = {
    usuarios: {
        path: '/usuarios',
        children: {
            create: {
                path: ''
            },
            list: {
                path: '/list'
            },
            details: {
                path: '/:uuid'
            },
            edit: {
                path: '/edit/:uuid'
            }
        }
    }
}

export { routes }
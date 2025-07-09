import { Request, Response, NextFunction } from 'express'
import { routes } from '../../routes'
import { sendBadRequest } from '../util'

export function routesValidator(req: Request, res: Response, next: NextFunction): void {
    const rts = retrieveRoutes(routes)
    
    const path = req.route?.path || ''
    
    if (!rts.includes(path)) {
        sendBadRequest(res, {
            message: 'Essa rota não existe.'
        })
        return
    }
    next()
}

function retrieveRoutes(routes: any, basePath: string = ''): string[] {
    const allRoutes: string[] = []

    for (const [key, route] of Object.entries(routes)) {
        const routeConfig = route as any
        const currentPath = basePath + routeConfig.path

        allRoutes.push(currentPath)

        if (routeConfig.children) {
            const childRoutes = retrieveRoutes(routeConfig.children, currentPath)
            allRoutes.push(...childRoutes)
        }
    }

    return allRoutes
}
import dashboard from '../view/dashboard'
import profile from '../view/profile'
import users from '../view/users'
import developer from '../view/developer'
export const routes=[
    {
        path:'/dashboard',
        component:dashboard
    },
    {
        path:'/profile',
        component:profile
    },
    {
        path:'/users',
        component:users
    },
    {
        path:'/developer',
        component:developer
    }
]
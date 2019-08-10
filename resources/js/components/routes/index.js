import dashboard from '../view/dashboard'
import profile from '../view/profile'
import users from '../view/users'
import developer from '../view/developer'
import notfound from '../view/notfound'
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
    },
    {
        path:'*',
        component:notfound
    }
]
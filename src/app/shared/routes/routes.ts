import { Routes } from "@angular/router";
import { Error404Component } from "../../components/page/error404/error404.component";
import { AuthGuard } from "src/app/core/guard/auth.guard";

export const content: Routes = [
    {
        path: "",
        loadChildren: () => import("../../components/themes/themes.routes")
    },
    {
        path: "auth",
        loadChildren: () => import("../../components/auth/auth.routes")
    },
    {
        path: "account",
        loadChildren: () => import("../../components/account/account.routes"),
        canActivate : [AuthGuard]
    },
    {
        path: "",
        loadChildren: () => import("../../components/shop/shop.routes")
    },
    {
        path: "",
        loadChildren: () => import("../../components/blog/blog.routes")
    },
    {
        path: "",
        loadChildren: () => import("../../components/page/page.routes")
    },
    {
        path: '**',
        pathMatch: 'full',
        component: Error404Component
    }
]

import Vue from 'vue'
import {Button,ButtonGroup, Select, Divider,Checkbox,Aside,Container,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Dropdown,DropdownMenu,DropdownItem,Form,FormItem,Input} from 'element-ui';
//TODO 为啥不能动态引入css
[Button,ButtonGroup, Select, Divider,Checkbox,Aside,Container,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Dropdown,DropdownMenu,DropdownItem,Form,FormItem,Input].forEach(fo => {
    Vue.use(fo)
})
import("element-ui/packages/theme-chalk/src/button.scss")
import("element-ui/packages/theme-chalk/src/button-group.scss")
import("element-ui/packages/theme-chalk/src/select.scss")
import("element-ui/packages/theme-chalk/src/divider.scss")
import("element-ui/packages/theme-chalk/src/checkbox.scss")
import("element-ui/packages/theme-chalk/src/aside.scss")
import("element-ui/packages/theme-chalk/src/container.scss")
import("element-ui/packages/theme-chalk/src/menu.scss")
import("element-ui/packages/theme-chalk/src/submenu.scss")
import("element-ui/packages/theme-chalk/src/menu-item.scss")
import("element-ui/packages/theme-chalk/src/tooltip.scss")
import("element-ui/packages/theme-chalk/src/breadcrumb.scss")
import("element-ui/packages/theme-chalk/src/breadcrumb-item.scss")
import("element-ui/packages/theme-chalk/src/dropdown.scss")
import("element-ui/packages/theme-chalk/src/dropdown-menu.scss")
import("element-ui/packages/theme-chalk/src/descriptions-item.scss")
import("element-ui/packages/theme-chalk/src/form.scss")
import("element-ui/packages/theme-chalk/src/form-item.scss")
import("element-ui/packages/theme-chalk/src/input.scss")

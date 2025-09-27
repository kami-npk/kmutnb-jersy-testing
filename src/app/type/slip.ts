import { Order } from "./order"
export type Slip= {
    name:string,
    pickup_method:string,
    contact:string,
    order_items:Order[],
    slip_img_url:string,
    status:string
    shipping_address:string,
}
export type SlipforAdmin = {
    name:string,
    pickup_method:string,
    contact:string,
    order_items:Order[],
    slip_img_url:string,
    status:string
    shipping_address:string,
    create:string,
    update:string
}
export type CheckOrder = {
    name:string,
    order_items:Order[],
    pickup_method:string,
    shipping_address:string,
    contact:string,
}